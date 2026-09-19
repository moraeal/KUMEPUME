import { ArrowLeft, ArrowRight, Construction } from "lucide-react";
import { Link } from "react-router-dom";

type SectionKey = "about" | "programs" | "activities" | "transparency" | "join" | "contact" | "not-found";

const sections: Record<SectionKey, { eyebrow: string; title: string; description: string; next?: string }> = {
  about: { eyebrow: "ABOUT KUMEPUME", title: "소개 자료를 옮기고 있습니다", description: "기존 홈페이지의 인사말, 연혁, 조직, CI, 협력기관 자료를 원문과 이미지에 맞춰 순서대로 이전하고 있습니다.", next: "단체 소개 보기" },
  programs: { eyebrow: "WHAT WE DO", title: "사업 페이지를 만들고 있습니다", description: "기존 사업 기록을 꿈을 보듬다·시민을 키우다·공익을 지키다·세계와 잇다의 네 축으로 다시 정리하고 있습니다." },
  activities: { eyebrow: "ACTIVITIES & IMPACT", title: "활동과 성과를 정리하고 있습니다", description: "기존 활동 기사와 행사, 사진, 영상, 자료를 보존하면서 연도와 사업별로 쉽게 찾아볼 수 있도록 옮기고 있습니다." },
  transparency: { eyebrow: "TRUST & TRANSPARENCY", title: "투명경영 자료를 정비하고 있습니다", description: "단체 현황, 거버넌스, 사업계획, 기부금 사용 내역, 결산 공시와 보고서를 확인 가능한 자료부터 순차 공개합니다." },
  join: { eyebrow: "JOIN KUMEPUME", title: "함께하는 방법을 준비하고 있습니다", description: "후원, 회원 참여, 공익봉사, 재능기부와 기업협력 절차를 실제 접수 정보와 함께 안내할 예정입니다." },
  contact: { eyebrow: "CONTACT", title: "연락처를 최종 확인하고 있습니다", description: "기존 홈페이지의 주소와 전화, 이메일 정보를 최신 운영 정보와 대조한 뒤 공개하겠습니다." },
  "not-found": { eyebrow: "KUMEPUME", title: "페이지를 찾을 수 없습니다", description: "주소가 바뀌었거나 아직 이전되지 않은 페이지입니다. 기존 자료는 보존되어 있으며 새 메뉴 구조에 맞춰 순차 연결됩니다." },
};

export default function SectionPreview({ section }: { section: SectionKey }) {
  const copy = sections[section];
  return (
    <section className="min-h-[64vh] bg-[#f5f1e8] py-16 sm:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden bg-white px-7 py-14 shadow-[0_20px_60px_rgba(24,59,51,.08)] sm:px-12 sm:py-20 lg:px-20">
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-[#e7efd9]" aria-hidden="true" />
          <div className="relative max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#183b33] px-4 py-2 text-[11px] font-black tracking-[.16em] text-white"><Construction size={15}/>{copy.eyebrow}</span>
            <h1 className="mt-8 text-4xl font-black leading-tight tracking-[-.045em] text-[#183b33] sm:text-5xl">{copy.title}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-charcoal/65">{copy.description}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              {copy.next && <Link to="/about" className="kumepume-button-primary">{copy.next}<ArrowRight size={17}/></Link>}
              <Link to="/" className="kumepume-button-secondary"><ArrowLeft size={17}/>메인으로 돌아가기</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
