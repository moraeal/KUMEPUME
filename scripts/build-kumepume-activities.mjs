import { execFileSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const manifestPath = resolve(root, "src/data/kumepume/legacy-content-manifest.json");
const outputPath = resolve(root, "src/data/kumepume/activities.json");
const publicDir = resolve(root, "public/images/kumepume/activities");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

const slugByTitle = new Map([
  ["은행골가족 복지재단 후원활동", "bankgol-family-support-2013"],
  ["시앵쿠앙주 주정부 청사 방문", "xiengkhouang-government-visit-2013"],
  ["2023 다문화청소년 케이팝 아카데미", "multicultural-youth-kpop-academy-2023"],
  ["'새로운 출발 생명사랑회' 개최", "life-love-new-start-2024"],
  ["미얀마 농업부 방문", "myanmar-agriculture-ministry-2016"],
  ["2024 KUMEPUME K-POP CONTEST", "kpop-contest-2024"],
  ["노블하트 모금 캠페인을 위한 유엔 해비타트 협약식", "noble-heart-un-habitat-2016"],
  ["꿈에품에 케이팝 경연대회", "uzbekistan-kpop-contest-2024"],
  ["우즈베키스탄 주민들에게 펠릿 연료 물품기부", "uzbekistan-pellet-fuel-2023"],
  ["라오스 한파 긴급 모금활동", "laos-coldwave-fundraising-2016"],
  ["발달장애인 미술가 전시회 개최", "disability-art-exhibition-2024"],
  ["2024 KUMEPUME K-POP CONTEST Объявление Финалистов", "kpop-finalists-2024-ru"],
  ["꿈에품에 송년음악회", "year-end-concert-2013"],
  ["2025 Объявление финалистов Молодёжного K-Pop конкурса в Узбекистане!", "kpop-finalists-2025-ru"],
  ["사단법인 꿈에품에, 한국예술학교와 업무협약", "korea-art-school-partnership-2023"],
  ["2025 KUMEPUME K-POP CONTEST", "kpop-contest-2025"],
  ["타지키스탄 주민 돕기 재난구호 물품 기부식", "tajikistan-disaster-relief-2017"],
  ["라오스 한파 긴급 구호물품 전달", "laos-coldwave-relief-2016"],
  ["라오스 캉카이 마을 방문", "laos-kangkai-village-2015"],
  ["키르기스스탄 재외동포 문화교류 행사", "kyrgyzstan-cultural-exchange-2023"],
  ["시앵쿠앙주 주의회 방문", "xiengkhouang-council-visit-2013"],
]);

const altByTitle = new Map([
  ["2023 다문화청소년 케이팝 아카데미", "2023년 다문화·고려인 청소년 K-POP 아카데미 현장"],
  ["발달장애인 미술가 전시회 개최", "2024년 발달장애 미술작가 전시회 현장"],
  ["키르기스스탄 재외동포 문화교류 행사", "2023년 키르기스스탄 고려인 문화교류 참가자들"],
  ["우즈베키스탄 주민들에게 펠릿 연료 물품기부", "2023년 우즈베키스탄 호젤리시 펠릿 연료 기부식"],
]);

function categoryFor(title) {
  if (/장애.*미술|미술가/.test(title)) return "장애예술";
  if (/k-?pop|케이팝|한국예술학교|송년음악회/i.test(title)) return "문화예술";
  if (/생명사랑|노블하트|유엔 해비타트/.test(title)) return "공익협력";
  if (/복지재단/.test(title)) return "돌봄·나눔";
  return "국제협력";
}

function programFor(category) {
  if (category === "장애예술" || category === "돌봄·나눔") return "꿈을 보듬다";
  if (category === "문화예술") return "시민을 키우다";
  if (category === "공익협력") return "공익을 지키다";
  return "세계와 잇다";
}

function isoDateFrom(text, fallback) {
  const match = text.match(/(20\d{2})년\s*(\d{1,2})월\s*(\d{1,2})일/);
  if (!match) return fallback || "2009-09-01";
  return `${match[1]}-${match[2].padStart(2, "0")}-${match[3].padStart(2, "0")}`;
}

function cleanBody(page) {
  let text = page.contentBlocks.map((block) => block.text || "").join("\n").replaceAll("\0", " ");
  const loginIndex = text.indexOf("로그인 ");
  if (loginIndex >= 0) text = text.slice(loginIndex + 4).trim();
  if (text.startsWith(page.title)) text = text.slice(page.title.length).trim();
  if (page.kind === "post") {
    text = text.replace(/^\d{4}년\s*\d{1,2}월\s*\d{1,2}일\s+\d+분 분량(?:\s+최종 수정일:\s*\d{4}년\s*\d{1,2}월\s*\d{1,2}일)?\s*/, "");
  }
  text = text
    .replace(/현재 티켓을 판매하고 있지 않습니다\s*다른 이벤트 보기\s*/g, "")
    .replace(/접수 마감\s*다른 이벤트 보기\s*/g, "")
    .replace(/이벤트 공유하기[\s\S]*$/g, "")
    .replace(/더나눔 프로젝트[\s\S]*$/g, "")
    .replace(/태그:\s*[^\n]+[\s\S]*$/g, "")
    .replace(/모금계좌:[^\n]*/g, "")
    .replace(/StartFragment|EndFragment/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return text;
}

function paragraphsFrom(text) {
  if (!text) return ["기존 홈페이지에 사진 중심으로 보존된 활동 기록입니다. 세부 자료를 확인해 순차 보완합니다."];
  const sections = text.split(/\s+(?=■\s*)/).map((part) => part.trim()).filter(Boolean);
  const paragraphs = [];
  for (const section of sections) {
    const sentences = section.split(/(?<=[.!?]|니다\.|했다\.|하였다\.)\s+/).filter(Boolean);
    for (let index = 0; index < sentences.length; index += 4) paragraphs.push(sentences.slice(index, index + 4).join(" "));
  }
  return paragraphs;
}

function summaryFrom(text) {
  const normalized = text.replace(/시간 및 장소|이벤트 소개|더보기/g, "").trim();
  if (!normalized) return "기존 홈페이지에 보존된 꿈에품에 활동 기록입니다.";
  return normalized.length > 165 ? `${normalized.slice(0, 162).trim()}…` : normalized;
}

function imageFor(page) {
  return page.localImages.find((path) => !path.includes("908d9121314840a294d9a09056d96cb5"));
}

await mkdir(publicDir, { recursive: true });
const pages = manifest.pages.filter((page) => page.kind === "post" || page.kind === "event");
let duplicateEvent = 0;
const activities = [];

for (const page of pages) {
  const raw = page.contentBlocks.map((block) => block.text || "").join(" ");
  const date = isoDateFrom(raw, page.lastModified);
  const isDuplicateEvent = page.kind === "event" && page.title === "다문화 청소년 케이팝 체험";
  const slug = page.kind === "post"
    ? slugByTitle.get(page.title)
    : page.title === "케이팝 콘테스트"
      ? "kpop-contest-event-2024"
      : `multicultural-kpop-experience-2023-day-${++duplicateEvent}`;
  if (!slug) throw new Error(`Missing slug for ${page.title}`);
  const body = cleanBody(page);
  const category = categoryFor(page.title);
  const originalImage = imageFor(page);
  let image = "/images/kumepume/programs/multicultural-kpop-2023.webp";
  if (originalImage) {
    const outputFile = `${slug}.webp`;
    execFileSync("convert", [resolve(root, originalImage), "-auto-orient", "-resize", "1600x1600>", "-quality", "80", resolve(publicDir, outputFile)]);
    image = `/images/kumepume/activities/${outputFile}`;
  }
  activities.push({
    id: slug,
    title: page.title,
    date,
    year: Number(date.slice(0, 4)),
    category,
    program: programFor(category),
    kind: page.kind,
    summary: summaryFrom(body),
    paragraphs: paragraphsFrom(body),
    image,
    imageAlt: altByTitle.get(page.title) || `${page.title} 관련 꿈에품에 활동 사진`,
    sourceUrl: page.sourceUrl,
    originalImage: originalImage || null,
  });
}

activities.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, "ko"));
await writeFile(outputPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), count: activities.length, activities }, null, 2)}\n`);
console.log(`Created ${activities.length} activity records and ${activities.filter((item) => item.originalImage).length} optimized images.`);
