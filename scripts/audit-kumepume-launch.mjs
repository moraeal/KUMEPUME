import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = new URL("../", import.meta.url).pathname;
const read = (path) => readFileSync(join(root, path), "utf8");
const migration = JSON.parse(read("src/data/kumepume/migration-audit.json"));
const index = read("index.html");
const robots = read("public/robots.txt");
const header = read("src/components/Header.tsx");
const joinPage = read("src/pages/Join.tsx");
const aboutPage = read("src/pages/AboutSubpage.tsx");
const workflow = read(".github/workflows/deploy.yml");
const app = read("src/App.tsx");
const routeMetadata = read("src/components/KumepumeRouteMetadata.tsx");
const legacyStories = read("src/data/kumepume/legacyStories.ts");
const transparencyDir = join(root, "public/documents/transparency");
const publicPdfs = readdirSync(transparencyDir).filter((file) => file.endsWith(".pdf"));
const storyImages = [...legacyStories.matchAll(/image: "([^"]+)"/g)].map((match) => match[1]);
const missingStoryImages = storyImages.filter((path) => !existsSync(join(root, "public", path)));

const checks = [
  {
    id: "legacy-capture",
    status: migration.source.capturedUrls === 92 && migration.source.failedUrls === 0 ? "pass" : "fail",
    detail: `${migration.source.capturedUrls}/92개 기존 주소 수집, 실패 ${migration.source.failedUrls}건`,
  },
  {
    id: "legacy-assets",
    status: migration.source.downloadedOriginalImages === 157 && migration.source.failedImages === 0 ? "pass" : "fail",
    detail: `${migration.source.downloadedOriginalImages}/157개 소유 이미지 원본 보존`,
  },
  {
    id: "pending-migration",
    status: migration.renewal.pageStatusCounts["pending-migration"] === 0 ? "pass" : "fail",
    detail: `후속 이전 대상 ${migration.renewal.pageStatusCounts["pending-migration"]}건`,
  },
  {
    id: "verification-pending",
    status: migration.renewal.pageStatusCounts["verification-pending"] === 0 ? "pass" : "blocked",
    detail: `현행 정보 검증 대기 ${migration.renewal.pageStatusCounts["verification-pending"]}건`,
  },
  {
    id: "unverified-contact-hidden",
    status: !joinPage.includes("mailto:") && !joinPage.includes("tel:") && joinPage.includes("최신 연락처 검증 중") && aboutPage.includes("최신 법인정보 검증 중") ? "pass" : "fail",
    detail: "검증되지 않은 연락처·방문주소를 현재 정보로 노출하지 않음",
  },
  {
    id: "donation-disabled",
    status: !joinPage.includes("<form") && joinPage.includes("계좌와 CMS 신청은 최신 정보 확인 후 개방") ? "pass" : "fail",
    detail: "후원 계좌·CMS·신청 폼 비활성 상태",
  },
  {
    id: "transparency-pdfs",
    status: publicPdfs.length === 8 ? "pass" : "fail",
    detail: `공개용 기부금 PDF ${publicPdfs.length}/8건`,
  },
  {
    id: "legacy-story-images",
    status: storyImages.length === 13 && missingStoryImages.length === 0 ? "pass" : "fail",
    detail: `과거 기록 표시 이미지 ${storyImages.length - missingStoryImages.length}/${storyImages.length}건`,
  },
  {
    id: "route-metadata",
    status: app.includes("<KumepumeRouteMetadata />") && routeMetadata.includes("/stories/archive/") ? "pass" : "fail",
    detail: "메뉴·활동·과거 기록별 제목과 설명 적용",
  },
  {
    id: "preview-banner",
    status: header.includes('VITE_SITE_STAGE !== "production"') && header.includes("후원과 문의 기능은 준비 중") ? "pass" : "fail",
    detail: "미리보기 안내 배너 조건부 표시",
  },
  {
    id: "search-block",
    status: index.includes("noindex, nofollow, noarchive") && robots.includes("Disallow: /") ? "blocked" : "pass",
    detail: "현재 미리보기는 검색엔진 전체 차단 상태",
  },
  {
    id: "production-stage",
    status: workflow.includes("VITE_SITE_STAGE: production") ? "pass" : "blocked",
    detail: "배포 워크플로에 운영 단계 변수가 아직 없음",
  },
  {
    id: "custom-domain",
    status: existsSync(join(root, "public/CNAME")) ? "pass" : "blocked",
    detail: "공식 도메인 CNAME 미연결",
  },
];

const summary = checks.reduce((counts, check) => {
  counts[check.status] += 1;
  return counts;
}, { pass: 0, blocked: 0, fail: 0 });

const result = {
  auditedAt: new Date().toISOString(),
  readiness: summary.fail > 0 ? "needs-fix" : summary.blocked > 0 ? "blocked-before-launch" : "ready",
  summary,
  checks,
};

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log(`KUMEPUME launch audit: ${result.readiness}`);
  for (const check of checks) console.log(`[${check.status.toUpperCase()}] ${check.id}: ${check.detail}`);
  console.log(`PASS ${summary.pass} · BLOCKED ${summary.blocked} · FAIL ${summary.fail}`);
}

if (summary.fail > 0) process.exitCode = 1;
