import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import activities from "../data/kumepume/activities.json";
import { legacyStories } from "../data/kumepume/legacyStories";

type Meta = { title: string; description: string };

const siteName = "KUMEPUME 꿈에품에";
const defaultDescription = "꿈에품에는 나눔과 공익봉사를 통해 사람의 가능성을 키우고 시민과 기업의 책임 있는 참여를 사회적 변화로 연결하는 공익법인입니다.";

const routeMeta: Record<string, Meta> = {
  "/": { title: "꿈을 품고, 시민의 힘을 키웁니다", description: defaultDescription },
  "/about": { title: "단체 소개", description: "꿈에품에의 설립 취지와 나눔·공익봉사 활동의 가치와 방향을 소개합니다." },
  "/about/message": { title: "인사말", description: "기존 꿈에품에 홈페이지에 남아 있는 대표 인사말을 기록으로 보존합니다." },
  "/about/history": { title: "연혁", description: "2009년 출범부터 이어진 꿈에품에의 주요 활동 기록을 연도별로 살펴봅니다." },
  "/about/organization": { title: "조직·사람", description: "꿈에품에의 조직 운영 원칙과 현행 정보 검증 상태를 안내합니다." },
  "/about/identity": { title: "CI·비전", description: "꿈에품에의 이름, 하트링 상징과 나눔의 비전을 소개합니다." },
  "/about/partners": { title: "협력기관", description: "꿈에품에와 함께해 온 기업·기관의 과거 협력 기록을 안내합니다." },
  "/about/contact": { title: "오시는 길", description: "꿈에품에 공식 소재지와 연락처의 확인 상태를 안내합니다." },
  "/programs": { title: "주요 사업", description: "사람·시민·공익·세계를 잇는 꿈에품에의 네 가지 사업 방향을 소개합니다." },
  "/programs/care": { title: "꿈을 보듬다", description: "도움이 필요한 이웃의 삶과 꿈을 지원하는 꿈에품에 사업을 소개합니다." },
  "/programs/citizens": { title: "시민을 키우다", description: "시민의 참여와 공익봉사를 연결하는 꿈에품에 사업을 소개합니다." },
  "/programs/public-interest": { title: "공익을 지키다", description: "책임 있는 나눔과 투명한 공익활동을 위한 꿈에품에 사업을 소개합니다." },
  "/programs/global": { title: "세계와 잇다", description: "국제교류와 해외 생활·교육 지원을 이어 온 꿈에품에 사업을 소개합니다." },
  "/activities": { title: "활동과 성과", description: "꿈에품에가 현장에서 이어 온 활동과 변화의 기록을 확인합니다." },
  "/activities/stories": { title: "변화 이야기", description: "꿈에품에 활동이 사람과 지역에 남긴 변화의 기록을 확인합니다." },
  "/activities/events": { title: "행사", description: "꿈에품에의 캠페인·행사·협약 기록을 확인합니다." },
  "/activities/archive": { title: "연도별 활동", description: "꿈에품에의 활동 기록을 연도별로 살펴봅니다." },
  "/stories/archive": { title: "과거 기록", description: "기존 홈페이지의 노블하트·인물·기업협력 콘텐츠를 원문과 이미지 중심으로 보존합니다." },
  "/stories/videos": { title: "영상 기록", description: "기존 홈페이지에 공개됐던 꿈에품에 영상의 제목과 확인된 외부 주소를 보존합니다." },
  "/transparency": { title: "투명경영", description: "꿈에품에의 단체현황, 거버넌스, 기부금 활용과 공개자료를 확인합니다." },
  "/transparency/corporate": { title: "단체현황", description: "꿈에품에의 법인·등록 정보와 최신 검증 상태를 안내합니다." },
  "/transparency/governance": { title: "임원·거버넌스", description: "꿈에품에의 조직·임원 정보와 공개 원칙을 안내합니다." },
  "/transparency/plans": { title: "사업계획·보고", description: "꿈에품에의 사업계획과 사업보고 공개 준비 상태를 안내합니다." },
  "/transparency/donations": { title: "기부금 활용", description: "2017년부터 2024년까지 꿈에품에 기부금 모금·활용실적 원본 PDF를 공개합니다." },
  "/transparency/financials": { title: "결산·공시", description: "꿈에품에의 결산·공시 자료와 확인 상태를 안내합니다." },
  "/transparency/reports": { title: "보고서·자료", description: "꿈에품에의 보고서와 자료 원본 확보·공개 상태를 안내합니다." },
  "/join": { title: "함께하기", description: "후원, 회원, 자원봉사, 재능기부와 기업협력으로 꿈에품에 활동에 함께하는 방법을 안내합니다." },
  "/join/donate": { title: "후원하기", description: "꿈에품에 후원 절차와 기부금 공개 원칙을 안내합니다." },
  "/join/member": { title: "회원으로 함께하기", description: "꿈에품에 회원 참여 방식과 준비 상태를 안내합니다." },
  "/join/volunteer": { title: "자원봉사·재능기부", description: "시간과 전문성을 나누는 꿈에품에 봉사 참여 방법을 안내합니다." },
  "/join/corporate": { title: "기업·기관 협력", description: "기업·기관과 함께 공익사업을 기획하고 실행하는 협력 방향을 안내합니다." },
  "/contact": { title: "문의", description: "꿈에품에 공식 문의 창구의 준비 상태를 안내합니다." },
};

function setMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([name, value]) => element!.setAttribute(name, value));
}

function getMeta(pathname: string): Meta {
  const exact = routeMeta[pathname];
  if (exact) return exact;

  if (pathname.startsWith("/activities/")) {
    const id = decodeURIComponent(pathname.slice("/activities/".length));
    const activity = activities.activities.find((item) => item.id === id);
    if (activity) return { title: activity.title, description: activity.summary };
  }

  if (pathname.startsWith("/stories/archive/")) {
    const id = decodeURIComponent(pathname.slice("/stories/archive/".length));
    const story = legacyStories.find((item) => item.id === id);
    if (story) return { title: story.title, description: story.summary };
  }

  return { title: "페이지를 찾을 수 없습니다", description: defaultDescription };
}

export default function KumepumeRouteMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getMeta(pathname);
    const title = `${meta.title} | ${siteName}`;
    document.title = title;
    setMeta('meta[name="description"]', { name: "description", content: meta.description });
    setMeta('meta[property="og:title"]', { property: "og:title", content: title });
    setMeta('meta[property="og:description"]', { property: "og:description", content: meta.description });
    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    setMeta('meta[name="twitter:description"]', { name: "twitter:description", content: meta.description });

    const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "");
    if (configuredSiteUrl) {
      let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = `${configuredSiteUrl}${pathname === "/" ? "" : pathname}`;
    }
  }, [pathname]);

  return null;
}
