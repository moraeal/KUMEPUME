import manifest from "./legacy-story-source.json";

type LegacyBlock = { type: string; text: string };
type LegacyPage = { sourceUrl: string; title: string; contentBlocks: LegacyBlock[] };

export type LegacyStory = {
  id: string;
  sourcePath: string;
  sourceUrl: string;
  category: "노블하트" | "인물 기록" | "기부문화" | "기업협력";
  title: string;
  dateLabel: string;
  author?: string;
  summary: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
  references?: Array<{ label: string; url: string }>;
};

type StoryRule = Omit<LegacyStory, "sourceUrl" | "paragraphs"> & {
  mode: "paragraphs" | "lead" | "curated";
  start?: string;
  sourceUrl?: string;
  body?: string[];
};

const rules: StoryRule[] = [
  { id: "noble-heart-declaration", sourcePath: "/blank-10", category: "노블하트", title: "노블하트 운동 선언문", dateLabel: "2010.03.23", summary: "한국형 노블레스 오블리주 운동의 취지와 여섯 가지 실천 방향을 담은 창립 선언 기록입니다.", image: "images/kumepume/legacy-records/noble-heart-declaration.webp", imageAlt: "노블하트 운동 참가자들의 과거 행사 모습", mode: "lead", start: "노블하트 운동 선언문" },
  { id: "noble-heart-club", sourcePath: "/blank-11", category: "노블하트", title: "노블하트 클럽", dateLabel: "기존 홈페이지 기록", summary: "경주 최부자의 육훈에서 출발해 나눔·순환·행복의 가치를 설명한 노블하트 클럽 원문입니다.", image: "images/kumepume/legacy-records/noble-heart-club.webp", imageAlt: "기존 홈페이지에 실린 경주 최부자 관련 기록 사진", mode: "lead", start: "경주 최부자 육훈" },
  { id: "ryu-geun-cheol", sourcePath: "/578", category: "인물 기록", title: "578억 기부왕 류근철 박사", dateLabel: "2013.04.24", author: "박경석", summary: "평생 모은 재산을 과학 인재 양성을 위해 내놓고 검소하게 살았던 류근철 박사를 기록한 글입니다.", image: "images/kumepume/legacy-records/ryu-geun-cheol.webp", imageAlt: "류근철 박사", mode: "paragraphs" },
  { id: "jang-gi-ryeo", sourcePath: "/blank-22", category: "인물 기록", title: "그 사람 장기려", dateLabel: "2013.04.03", author: "박경석", summary: "가난한 환자를 위해 평생 인술과 나눔을 실천한 성산 장기려 박사의 삶을 돌아본 기록입니다.", image: "images/kumepume/legacy-records/jang-gi-ryeo.webp", imageAlt: "장기려 박사의 과거 기록 사진", mode: "paragraphs" },
  { id: "toshio-doko", sourcePath: "/blank-21", category: "인물 기록", title: "사회적 배려와 도코 도시오", dateLabel: "2013.02.28", author: "박경석", summary: "검소함과 공사 구분, 솔선수범을 실천한 일본 기업인 도코 도시오의 삶을 다룬 글입니다.", image: "images/kumepume/legacy-records/toshio-doko.webp", imageAlt: "도코 도시오의 과거 기록 사진", mode: "paragraphs" },
  { id: "jean-chretien", sourcePath: "/blank-6", category: "인물 기록", title: "말더듬이 총리 장 크레티앙", dateLabel: "2013.01.14–15", author: "박경석", summary: "신체적 어려움을 딛고 캐나다 총리를 지낸 장 크레티앙의 리더십을 두 편에 걸쳐 소개한 기록입니다.", image: "images/kumepume/legacy-records/jean-chretien.webp", imageAlt: "장 크레티앙 전 캐나다 총리", mode: "paragraphs" },
  { id: "kang-seok-sung", sourcePath: "/blank-25", category: "인물 기록", title: "10원의 나눔, 강석숭 할아버지", dateLabel: "2013.03.13", author: "박경석", summary: "연탄 한 장을 배달할 때마다 10원을 모아 장학금으로 나눈 강석숭 씨의 이야기입니다.", image: "images/kumepume/legacy-records/kang-seok-sung.webp", imageAlt: "연탄을 나르는 강석숭 씨의 과거 기록 사진", mode: "paragraphs" },
  { id: "kang-gyeong-hwan", sourcePath: "/blank-26", category: "인물 기록", title: "소금장수 강경환", dateLabel: "2013.04.15", author: "박경석", summary: "소금 한 포대를 팔 때마다 이웃을 위한 몫을 떼어 나눔을 이어 온 강경환 씨의 이야기입니다.", image: "images/kumepume/legacy-records/kang-gyeong-hwan.webp", imageAlt: "염전에서 소금을 거두는 과거 기록 사진", mode: "paragraphs" },
  {
    id: "charles-feeney",
    sourcePath: "/news/10%EC%A1%B0-%EA%B8%B0%EB%B6%80%ED%95%B4%EB%8F%84-%EC%9D%B4%EB%A6%84-%EB%94%B4-%EA%B1%B4%EB%AC%BC-%ED%95%98%EB%82%98-%EC%97%86%EC%97%88%EB%8B%A4...--%E7%BE%8E%EB%B6%80%ED%98%B8%EC%9D%98-%EC%98%81%EC%9B%85%2C-%EC%98%81%EB%A9%B4",
    sourceUrl: "https://kumepume.wixsite.com/main/news/10%EC%A1%B0-%EA%B8%B0%EB%B6%80%ED%95%B4%EB%8F%84-%EC%9D%B4%EB%A6%84-%EB%94%B4-%EA%B1%B4%EB%AC%BC-%ED%95%98%EB%82%98-%EC%97%86%EC%97%88%EB%8B%A4...--%E7%BE%8E%EB%B6%80%ED%98%B8%EC%9D%98-%EC%98%81%EC%9B%85%2C-%EC%98%81%EB%A9%B4",
    category: "기부문화",
    title: "10조 기부해도 이름 딴 건물 하나 없었다... 美부호의 영웅, 영면",
    dateLabel: "2023.10.13",
    summary: "평생 재산을 사회에 환원한 DFS 공동창업자 찰스 ‘척’ 피니의 삶과 ‘살아 있을 때 기부하기’를 돌아본 과거 기록입니다.",
    image: "images/kumepume/legacy-records/charles-feeney.webp",
    imageAlt: "찰스 척 피니의 기존 홈페이지 기록 사진",
    mode: "curated",
    body: [
      "이 기록은 2023년 10월 13일 기존 꿈에품에 홈페이지에 보관된 찰스 ‘척’ 피니 추모 글입니다. 기존 본문은 외부 보도를 바탕으로 작성됐지만 원출처 표기가 남아 있지 않아, 새 홈페이지에는 제목·날짜·핵심 내용과 기존 주소만 보존합니다.",
      "세계적인 면세점 기업 DFS의 공동창업자였던 피니는 1982년 애틀랜틱 필랜스로피를 세우고 교육·인권·과학·보건 분야에 80억 달러 이상을 지원했습니다. 자신의 이름을 앞세우기보다 생전에 재산을 사회에 돌려주는 ‘Giving While Living’을 실천한 인물로 기록됩니다.",
      "그가 남긴 핵심은 기부의 규모보다 방식에 있습니다. 부를 소유자의 명예를 세우는 수단으로 남기지 않고, 살아 있는 동안 사람과 사회의 기회를 넓히는 데 사용했다는 점입니다. 꿈에품에는 이 기록을 노블하트와 시민 참여형 기부의 의미를 생각하게 하는 단체의 기억으로 보존합니다."
    ],
    references: [
      { label: "The Atlantic Philanthropies · Chuck Feeney's Story", url: "https://www.atlanticphilanthropies.org/chuck-feeneys-story" },
      { label: "The Atlantic Philanthropies · Celebrating Chuck Feeney", url: "https://www.atlanticphilanthropies.org/remembrance" }
    ]
  },
  { id: "gh-partnership", sourcePath: "/blank-8", category: "기업협력", title: "경기도시공사와 함께한 라오스 농업용 댐 지원", dateLabel: "2015.12.06–11", summary: "라오스 시앵쿠앙주 뺑사이 마을의 농업용수 확보를 위해 진행한 소형 보 건설 지원 기록입니다.", image: "images/kumepume/legacy-records/gh-partnership.webp", imageAlt: "라오스 현지 주민과 더나눔 프로젝트 참가자들", mode: "lead", start: "가. 목적" },
  { id: "gkl-partnership", sourcePath: "/gkl", category: "기업협력", title: "GKL과 함께한 미얀마 농촌 자립 지원", dateLabel: "2016.04–2017.03 1차", summary: "미얀마 따웅지 인근 빈농마을의 협동농장과 문화예술교육을 지원한 1차 사업 기록입니다.", image: "images/kumepume/legacy-records/gkl-partnership.webp", imageAlt: "미얀마 농촌 자립 지원사업의 시설재배지", mode: "lead", start: "가. 사업기간" },
  { id: "lg-international-partnership", sourcePath: "/lg", category: "기업협력", title: "LG상사와 함께한 인도네시아 교량 지원", dateLabel: "2014년 사업 기록", summary: "인도네시아 스까다우군 주민과 학생의 이동 안전을 위해 교량을 신축·보수한 기록입니다.", image: "images/kumepume/legacy-records/lg-international-partnership.webp", imageAlt: "인도네시아 스까다우군에 완공된 지원 교량", mode: "lead", start: "인도네시아 스까다우군" },
  { id: "lg-electronics-partnership", sourcePath: "/lg-1", category: "기업협력", title: "LG전자와 함께한 미얀마 생활환경 지원", dateLabel: "기존 홈페이지 사업 기록", summary: "미얀마 양곤 스포츠인 양성학교의 목욕·세탁 시설과 청소년 체육활동을 지원한 기록입니다.", image: "images/kumepume/legacy-records/lg-electronics-partnership.webp", imageAlt: "미얀마 생활환경 개선 지원사업 관계자 기념사진", mode: "lead", start: "미얀마 양곤 지역주민" },
];

const pages = manifest.pages as LegacyPage[];
const chrome = new Set(["더나눔 프로젝트", "더보기", "Copyright © KUMEPUME All right reserved"]);

function extract(rule: StoryRule, page: LegacyPage) {
  if (rule.mode === "paragraphs") {
    const texts = page.contentBlocks
      .filter((block) => block.type === "p")
      .map((block) => block.text.replace(/\u0000/g, "").trim());
    const authorIndex = rule.author ? texts.indexOf(rule.author) : -1;
    return texts
      .slice(authorIndex >= 0 ? authorIndex + 1 : 0)
      .filter((text) => text && !chrome.has(text) && text !== "1 / 1");
  }
  const source = page.contentBlocks[0]?.text.replace(/\u0000/g, "") ?? "";
  const start = rule.start ? source.indexOf(rule.start) : 0;
  const body = source.slice(start >= 0 ? start : 0);
  const end = body.lastIndexOf("더나눔 프로젝트");
  return [(end > 0 ? body.slice(0, end) : body).trim()];
}

export const legacyStories: LegacyStory[] = rules.map((rule) => {
  const page = rule.sourceUrl ? undefined : pages.find((item) => item.sourceUrl.endsWith(rule.sourcePath));
  if (!page && !rule.sourceUrl) throw new Error(`Legacy story source missing: ${rule.sourcePath}`);
  const { mode: _mode, start: _start, body: _body, sourceUrl: explicitSourceUrl, ...story } = rule;
  const paragraphs = rule.mode === "curated" ? rule.body ?? [] : extract(rule, page!);
  return { ...story, sourceUrl: explicitSourceUrl ?? page!.sourceUrl, paragraphs };
});
