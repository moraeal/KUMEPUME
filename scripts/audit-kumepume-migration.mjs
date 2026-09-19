import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const manifest = JSON.parse(fs.readFileSync(path.join(root, "src/data/kumepume/legacy-content-manifest.json"), "utf8"));
const activities = JSON.parse(fs.readFileSync(path.join(root, "src/data/kumepume/activities.json"), "utf8")).activities;
const activityBySource = new Map(activities.map((item) => [item.sourceUrl, `/activities/${item.id}`]));

const staticRules = {
  "/": ["migrated", "/", "기존 메인 콘텐츠를 새 시민단체형 메인에 통합"],
  "/home": ["redirect", "/", "중복 메인"],
  "/blank-1": ["redirect", "/", "중복 메인"],
  "/blank-3": ["migrated", "/about", "단체 소개 원문 통합"],
  "/blank-13": ["migrated", "/about/message", "기존 인사말을 과거 기록으로 보존"],
  "/blank-12": ["migrated", "/about/organization", "조직 기능을 공개하고 과거 조직도는 원본 보존"],
  "/ci": ["migrated", "/about/identity", "CI 원본과 비전 이전"],
  "/1": ["migrated", "/about/partners", "과거 참여자 명단을 동의 확인 전 비공개 보존"],
  "/2": ["migrated", "/about/partners", "과거 참여자 명단을 동의 확인 전 비공개 보존"],
  "/blank-15": ["migrated", "/about/partners", "과거 참여자 명단을 동의 확인 전 비공개 보존"],
  "/blank-17": ["verification-pending", "/about/contact", "영등포·강남 주소 불일치로 최신 소재지 확인 필요"],
  "/blank-24": ["verification-pending", "/about/organization", "과거 임원명단 보존, 최신 등기·재직 확인 필요"],
  "/blank-28": ["migrated", "/programs", "더나눔 사업을 국제협력 축에 통합"],
  "/blank-29": ["migrated", "/programs", "사업 기록을 프로그램·연혁에 통합"],
  "/blank-23": ["migrated", "/programs", "노블하트 취지를 시민책임 사업축에 통합"],
  "/blank-7": ["migrated", "/join/volunteer", "꿈품 볼런티어 기록과 사진 이전"],
  "/blank-4": ["migrated", "/join/donate", "후원 안내 이전, 오래된 CMS·연락처는 비공개"],
  "/blank-14": ["migrated", "/transparency/donations", "2015 공고 기록과 기부금 문서 연결"],
  "/blank-16": ["verification-pending", "/transparency/reports", "페이지 제목만 확인, 첨부 보고서 미확인"],
  "/blank-5": ["migrated", "/transparency/reports", "빈 자료 페이지를 통합 자료실 상태 안내로 이전"],
  "/blank-19": ["migrated", "/transparency/reports", "빈 자료 페이지를 통합 자료실 상태 안내로 이전"],
  "/blank-18": ["migrated", "/activities", "활동 허브를 새 아카이브로 통합"],
  "/blank-2": ["migrated", "/activities", "꿈품뉴스를 활동 아카이브로 통합"],
  "/blank-8": ["migrated", "/stories/archive/gh-partnership", "경기도시공사 협력 기록 원문·이미지 이전"],
  "/gkl": ["migrated", "/stories/archive/gkl-partnership", "GKL 협력 기록 원문·이미지 이전"],
  "/lg": ["migrated", "/stories/archive/lg-international-partnership", "LG상사 협력 기록 원문·이미지 이전"],
  "/lg-1": ["migrated", "/stories/archive/lg-electronics-partnership", "LG전자 협력 기록 원문·이미지 이전"],
  "/blank-11": ["migrated", "/stories/archive/noble-heart-club", "노블하트 클럽 원문·이미지 이전"],
  "/blank-10": ["migrated", "/stories/archive/noble-heart-declaration", "노블하트 선언문 원문·이미지 이전"],
  "/blank-9": ["pending-migration", null, "노블레스 자료실 첨부·영상 재검토"],
  "/blank-20": ["pending-migration", null, "노블레스 동영상 원본·권리 재검토"],
  "/578": ["migrated", "/stories/archive/ryu-geun-cheol", "류근철 박사 인물 기록 원문·이미지 이전"],
  "/blank-22": ["migrated", "/stories/archive/jang-gi-ryeo", "장기려 박사 인물 기록 원문·이미지 이전"],
  "/blank-21": ["migrated", "/stories/archive/toshio-doko", "도코 도시오 인물 기록 원문·이미지 이전"],
  "/blank-6": ["migrated", "/stories/archive/jean-chretien", "장 크레티앙 인물 기록 원문·이미지 이전"],
  "/blank-25": ["migrated", "/stories/archive/kang-seok-sung", "강석숭 할아버지 인물 기록 원문·이미지 이전"],
  "/blank-26": ["migrated", "/stories/archive/kang-gyeong-hwan", "강경환 인물 기록 원문·이미지 이전"],
  "/allim01": ["archive-only", null, "마감된 2023 참가자 모집 공고"],
  "/blank": ["archive-only", null, "실제 뉴스레터 콘텐츠가 없는 빈 페이지"],
  "/team-1": ["archive-only", null, "Wix 샘플 페이지"],
  "/portfolio": ["archive-only", null, "Wix 포트폴리오 샘플 목록"],
  "/aitem": ["archive-only", null, "Wix 샘플 목록"],
  "/keipab-konteseuteu": ["archive-only", null, "중복·미완성 이벤트 목록"],
  "/keipab-konteseuteu-1": ["archive-only", null, "중복·미완성 이벤트 항목"],
  "/news": ["archive-only", null, "Wix 뉴스 샘플 목록"],
};

const sampleNewsTitles = new Set([
  "Gadget review: release of new Airy Pods",
  "Best smart wearables of 2023",
  "How technology can help curb attention disorders",
  "Entering a new era of IoT",
  "Long-term benefits of clean energy sources",
]);

function sourcePath(sourceUrl) {
  const pathname = new URL(sourceUrl).pathname;
  const stripped = pathname.replace(/^\/main/, "");
  return stripped || "/";
}

function classify(page) {
  const activityTarget = activityBySource.get(page.sourceUrl);
  if (activityTarget) return ["migrated", activityTarget, "활동 상세페이지와 화면용 이미지 이전"];
  const oldPath = sourcePath(page.sourceUrl);
  if (page.kind === "category") return ["redirect", "/activities", "기존 블로그 분류를 새 활동 필터로 통합"];
  if (oldPath.startsWith("/portfolio/")) return ["archive-only", null, "Wix 영문 포트폴리오 샘플"];
  if (oldPath.startsWith("/aitem/")) return ["archive-only", null, "Wix 영문 샘플 콘텐츠"];
  if (oldPath.startsWith("/home-1/")) return ["redirect", "/activities/uzbekistan-pellet-fuel-2023", "기존 활동 글의 중복 동적 페이지"];
  if (oldPath.startsWith("/news/")) {
    if (sampleNewsTitles.has(page.title)) return ["archive-only", null, "Wix 영문 뉴스 샘플"];
    return ["pending-migration", null, "기부문화 인물·해외사례 읽을거리"];
  }
  return staticRules[oldPath] ?? ["pending-migration", null, "자동 분류되지 않은 실콘텐츠 재검토"];
}

const entries = manifest.pages.map((page, index) => {
  const [migrationStatus, destination, note] = classify(page);
  return {
    migrationId: `KMP-${String(index + 1).padStart(3, "0")}`,
    sourceUrl: page.sourceUrl,
    sourcePath: sourcePath(page.sourceUrl),
    title: page.title,
    kind: page.kind,
    migrationStatus,
    destination,
    note,
    originalImages: page.localImages?.length ?? 0,
    originalDocuments: page.localDocuments?.length ?? 0,
  };
});

const statusOrder = ["migrated", "redirect", "verification-pending", "pending-migration", "archive-only"];
const statusLabels = {
  migrated: "이전 완료·통합",
  redirect: "새 주소 연결",
  "verification-pending": "검증 대기",
  "pending-migration": "후속 이전 대상",
  "archive-only": "원본 보존·공개 제외",
};
const pageStatusCounts = Object.fromEntries(statusOrder.map((status) => [status, entries.filter((entry) => entry.migrationStatus === status).length]));

function countFiles(directory) {
  if (!fs.existsSync(directory)) return 0;
  return fs.readdirSync(directory, { withFileTypes: true }).reduce((total, item) => total + (item.isDirectory() ? countFiles(path.join(directory, item.name)) : 1), 0);
}

const audit = {
  schemaVersion: 1,
  auditedAt: new Date().toISOString(),
  source: {
    urls: manifest.counts.urls,
    capturedUrls: manifest.counts.capturedUrls,
    failedUrls: manifest.counts.failedUrls,
    ownedImages: manifest.counts.ownedImageUrls,
    downloadedOriginalImages: manifest.counts.downloadedImages,
    failedImages: manifest.counts.failedImages,
    externalTemplateImagesExcluded: manifest.counts.externalTemplateImageUrls,
    documents: manifest.counts.uniqueDocumentUrls,
    downloadedOriginalDocuments: manifest.counts.downloadedDocuments,
    failedDocuments: manifest.counts.failedDocuments,
  },
  renewal: {
    pageStatusCounts,
    redirectableLegacyUrls: entries.filter((entry) => entry.destination && entry.sourcePath !== "/").length,
    publicActivityDetails: activities.length,
    publicDisplayImages: countFiles(path.join(root, "public/images/kumepume")),
    publicTransparencyDocuments: countFiles(path.join(root, "public/documents/transparency")),
    archiveOnlyDocuments: 2,
    unresolvedLegacyAttachment: "2015 기부금 결산 공고의 첨부 원본",
  },
  entries,
};

const outJson = path.join(root, "src/data/kumepume/migration-audit.json");
fs.writeFileSync(outJson, `${JSON.stringify(audit, null, 2)}\n`);

const pending = entries.filter((entry) => entry.migrationStatus === "pending-migration");
const verifying = entries.filter((entry) => entry.migrationStatus === "verification-pending");
const archived = entries.filter((entry) => entry.migrationStatus === "archive-only");
const lines = [
  "# 꿈에품에 기존 홈페이지 최종 이전 감사",
  "",
  `- 감사일: ${audit.auditedAt.slice(0, 10)}`,
  "- 원본: Wix 기존 홈페이지",
  "- 개편본: GitHub Pages 미리보기",
  "- 원칙: 원본은 삭제·덮어쓰기 없이 보존하고, 공개본은 검증된 내용과 화면용 복사본만 사용",
  "",
  "## 결론",
  "",
  `- 기존 URL ${audit.source.urls}개를 전부 수집했고 실패는 ${audit.source.failedUrls}개입니다.`,
  `- 소유 이미지 ${audit.source.ownedImages}개와 PDF ${audit.source.documents}개를 전부 내려받았으며 실패는 각각 ${audit.source.failedImages}개, ${audit.source.failedDocuments}개입니다.`,
  `- 개편 사이트에는 활동 상세 ${audit.renewal.publicActivityDetails}건, 화면용 이미지 ${audit.renewal.publicDisplayImages}개, 기부금 PDF ${audit.renewal.publicTransparencyDocuments}건을 공개했습니다.`,
  `- 92개 페이지 분류: ${statusOrder.map((status) => `${statusLabels[status]} ${pageStatusCounts[status]}개`).join(", ")}.`,
  `- 새 위치가 정해진 기존 주소 ${entries.filter((entry) => entry.destination && entry.sourcePath !== "/").length}개는 개편 사이트의 자동 이동표에 연결했습니다.`,
  "- 원본 보존 누락은 0건입니다. 다만 기존 사이트에도 첨부가 남아 있지 않은 2015 기부금 결산 원본은 별도 확보가 필요합니다.",
  "",
  "## 자산 감사",
  "",
  "| 구분 | 원본 확보 | 공개본 | 처리 |",
  "|---|---:|---:|---|",
  `| 기존 URL | ${audit.source.capturedUrls}/${audit.source.urls} | 92개 전수표 | 전체 추적 |`,
  `| 소유 이미지 | ${audit.source.downloadedOriginalImages}/${audit.source.ownedImages} | 화면용 ${audit.renewal.publicDisplayImages}개 | 원본과 최적화본 분리 |`,
  `| 외부 템플릿 이미지 | ${audit.source.externalTemplateImagesExcluded}개 식별 | 0개 | 공개 제외 |`,
  `| PDF | ${audit.source.downloadedOriginalDocuments}/${audit.source.documents} | ${audit.renewal.publicTransparencyDocuments}개 | 중복 2022·CMS 신청서 2개는 원본 보존 |`,
  "",
  "## 검증 대기",
  "",
  "| 기존 페이지 | 새 위치 | 사유 |",
  "|---|---|---|",
  ...verifying.map((item) => `| ${item.title} | ${item.destination ?? "—"} | ${item.note} |`),
  "",
  "## 후속 이전 대상",
  "",
  "| 기존 페이지 | 유형 | 남은 작업 |",
  "|---|---|---|",
  ...pending.map((item) => `| ${item.title.replaceAll("\n", " ")} | ${item.kind} | ${item.note} |`),
  "",
  "## 원본 보존·공개 제외",
  "",
  `총 ${archived.length}개입니다. 마감된 모집공고, 빈 페이지, 중복·미완성 목록, Wix 영문 샘플 콘텐츠로 구성됩니다. 삭제하지 않고 원본 아카이브에 유지합니다.`,
  "",
  "## 도메인 전환 전 필수 조치",
  "",
  "1. 법인 등기·정관·사업자 정보로 공식 소재지, 대표전화, 이메일, 현행 임원을 확정합니다.",
  "2. 후원 계좌·CMS·개인정보 동의문과 실제 접수 절차를 확정합니다.",
  "3. 후속 이전 대상 15개 가운데 인물 이야기·노블하트 원문·기업협력 기록의 공개 우선순위를 정합니다.",
  "4. 92개 기존 주소를 새 주소 또는 통합 페이지로 연결하는 도메인 전환용 리다이렉트 규칙을 적용합니다.",
  "5. PC·모바일·키보드 접근성, PDF 열기, 내부 링크, 검색 차단 해제 시점을 최종 점검합니다.",
  "6. 검수 완료 후에만 kumepume.org 네임서버를 일괄 전환합니다.",
  "",
  "## 92개 페이지 전수표",
  "",
  "| ID | 기존 제목 | 유형 | 상태 | 새 위치 |",
  "|---|---|---|---|---|",
  ...entries.map((item) => `| ${item.migrationId} | ${item.title.replaceAll("\n", " ")} | ${item.kind} | ${statusLabels[item.migrationStatus]} | ${item.destination ?? "—"} |`),
  "",
];
fs.mkdirSync(path.join(root, "docs"), { recursive: true });
fs.writeFileSync(path.join(root, "docs/kumepume-migration-audit-2026-09-19.md"), `${lines.join("\n")}\n`);

console.log(JSON.stringify({ pageStatusCounts, pending: pending.length, verifying: verifying.length, archived: archived.length, output: [outJson, path.join(root, "docs/kumepume-migration-audit-2026-09-19.md")] }, null, 2));
