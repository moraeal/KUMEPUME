import {
  ArrowRight,
  BookOpen,
  Building2,
  Globe2,
  HandHeart,
  HeartHandshake,
  Leaf,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const base = import.meta.env.BASE_URL;

const programs = [
  { number: "01", icon: HandHeart, title: "꿈을 보듬다", description: "어려움에 놓인 이웃이 자신의 가능성을 잃지 않고 다시 설 수 있도록 돕습니다.", tags: ["취약계층 지원", "장학·멘토링", "장애예술인"] },
  { number: "02", icon: Users, title: "시민을 키우다", description: "시민이 사실을 알고 스스로 판단하며 공동체 문제에 참여할 힘을 키웁니다.", tags: ["시민교육", "미디어 문해력", "시민 아카데미"] },
  { number: "03", icon: ShieldCheck, title: "공익을 지키다", description: "공익정보의 문을 열고 제도와 권력이 시민의 삶을 위해 작동하는지 살핍니다.", tags: ["씨앗의 소리", "공익감시", "정책연구"] },
  { number: "04", icon: Globe2, title: "세계와 잇다", description: "문화와 협력을 통해 국경을 넘어 사람과 가능성을 연결합니다.", tags: ["국제협력", "문화교류", "개발협력"] },
];

const stories = [
  { label: "장애예술", title: "발달장애 미술작가들의 작품을 시민과 만나다", summary: "다섯 명의 발달장애 미술작가와 함께 야외 전시와 시민 참여형 예술 프로그램을 진행했습니다.", image: `${base}images/kumepume/programs/disability-art-2024.webp`, alt: "2024년 발달장애 미술작가 전시회 현장", href: "/activities/disability-art-exhibition-2024" },
  { label: "청소년 문화예술", title: "다문화·고려인 청소년이 K-POP으로 가능성을 찾다", summary: "보컬과 댄스, 문화산업 교육을 통해 서로의 배경을 존중하고 자신의 재능을 발견했습니다.", image: `${base}images/kumepume/programs/multicultural-kpop-2023.webp`, alt: "2023년 다문화청소년 K-POP 아카데미 현장", href: "/activities/multicultural-youth-kpop-academy-2023" },
  { label: "국제 문화교류", title: "키르기스스탄 고려인과 ‘우리는 하나’를 나누다", summary: "고려인 단체와 함께 문화공연과 교류를 진행하고 지속적인 협력 기반을 만들었습니다.", image: `${base}images/kumepume/programs/kyrgyzstan-exchange-2023.webp`, alt: "2023년 키르기스스탄 고려인 문화교류 참가자들", href: "/activities/kyrgyzstan-cultural-exchange-2023" },
];

const impact = [
  { value: "3억 5,233만원", label: "2023년 공익목적사업 지출" },
  { value: "5개", label: "2023년 공익목적사업" },
  { value: "126명", label: "2024년 기준 정회원" },
  { value: "5명", label: "2024년 기준 실무진" },
];

const quickLinks = [
  { label: "단체 소개", detail: "꿈에품에가 지향하는 변화", href: "/about" },
  { label: "주요 사업", detail: "사람·시민·공익·세계", href: "/programs" },
  { label: "활동과 성과", detail: "숫자와 현장으로 보는 변화", href: "/activities" },
  { label: "함께하기", detail: "후원·봉사·기업협력", href: "/join" },
  { label: "투명경영", detail: "정관·공시·연차보고", href: "/transparency" },
];

export default function Home() {
  return (
    <div className="kumepume-home">
      <section className="kumepume-hero" aria-labelledby="hero-title">
        <img
          src={`${base}images/seed-language/public-interest-citizens-action.webp`}
          alt="세대가 다른 시민들이 지역의 미래를 함께 논의하는 모습"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,35,30,.76)_0%,rgba(10,35,30,.38)_48%,rgba(10,35,30,.12)_100%)]" />
        <div className="container-page relative z-10 flex min-h-[calc(100svh-86px)] items-center py-16">
          <h1 id="hero-title" className="max-w-5xl text-[clamp(2.55rem,6.5vw,6.4rem)] font-black leading-[1.08] tracking-[-.06em] text-white [text-shadow:0_3px_26px_rgba(0,0,0,.3)]">
            꿈을 키우고 품을 키웁니다.<br />시민이 자랍니다.
          </h1>
        </div>
      </section>

      <nav className="border-y border-[#183b33]/10 bg-white" aria-label="메인페이지 바로가기">
        <div className="container-page grid sm:grid-cols-2 lg:grid-cols-5">
          {quickLinks.map((item, index) => (
            <Link
              key={item.label}
              to={item.href}
              className={`group flex min-h-[112px] items-center justify-between gap-4 py-6 transition hover:bg-[#f2f7ed] sm:px-6 ${index > 0 ? "border-t border-[#183b33]/10 sm:border-t-0 lg:border-l" : ""} ${index === 2 || index === 4 ? "sm:border-l lg:border-l" : ""}`}
            >
              <span>
                <strong className="block text-base font-black text-[#183b33]">{item.label}</strong>
                <small className="mt-1.5 block text-xs leading-5 text-charcoal/48">{item.detail}</small>
              </span>
              <ArrowRight className="shrink-0 text-[#e47716] transition group-hover:translate-x-1" size={18} />
            </Link>
          ))}
        </div>
      </nav>

      <section id="work" className="scroll-mt-32 bg-white py-20 sm:py-24">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end"><div><p className="kumepume-eyebrow">WHAT WE DO</p><h2 className="kumepume-section-title">삶을 보듬고, 시민의 힘을 키웁니다</h2></div><p className="max-w-2xl text-base leading-8 text-charcoal/60">지원에 머물지 않고 자립으로, 정보에 머물지 않고 시민의 판단과 행동으로 이어지는 네 가지 사업을 펼칩니다.</p></div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm bg-[#183b33]/15 sm:grid-cols-2 xl:grid-cols-4">
            {programs.map(({ number, icon: Icon, title, description, tags }) => <article key={title} className="group min-h-[360px] bg-[#fffdf8] p-7 transition duration-300 hover:bg-[#f2f7ed] sm:p-8"><div className="flex items-center justify-between"><span className="text-xs font-black tracking-[.18em] text-charcoal/35">{number}</span><span className="grid size-12 place-items-center rounded-full bg-[#dfeccd] text-[#285748] transition group-hover:bg-[#e88920] group-hover:text-white"><Icon size={22} /></span></div><h3 className="mt-12 text-2xl font-black tracking-[-.035em] text-[#183b33]">{title}</h3><p className="mt-4 text-[15px] leading-7 text-charcoal/62">{description}</p><div className="mt-7 flex flex-wrap gap-2">{tags.map((tag) => <span key={tag} className="rounded-full border border-[#183b33]/15 px-3 py-1.5 text-xs font-bold text-[#183b33]/70">{tag}</span>)}</div></article>)}
          </div>
        </div>
      </section>

      <section id="impact" className="scroll-mt-32 bg-[#183b33] py-20 text-white sm:py-24">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><div><p className="text-xs font-black tracking-[.2em] text-[#ffc04c]">OUR IMPACT</p><h2 className="mt-5 text-4xl font-black leading-tight tracking-[-.045em] sm:text-5xl">좋은 뜻이<br />변화로 남도록</h2><p className="mt-5 max-w-lg text-base leading-8 text-white/65">우리는 얼마를 썼는지만이 아니라 누구의 삶이 어떻게 달라졌는지, 그 변화가 얼마나 지속되는지를 기록하겠습니다.</p></div><div className="grid gap-px overflow-hidden rounded-sm bg-white/15 sm:grid-cols-2">{impact.map((item) => <div key={item.label} className="bg-white/[.045] p-7 sm:p-9"><strong className="block text-3xl font-black tracking-[-.04em] text-[#ffc04c] sm:text-4xl">{item.value}</strong><span className="mt-3 block text-sm font-bold text-white/70">{item.label}</span></div>)}</div></div>
          <div className="mt-10 grid gap-4 border-t border-white/15 pt-8 md:grid-cols-3">
            {[
              ["01", "목표를 먼저 공개합니다", "무엇을 바꾸려는 사업인지 시작부터 분명히 밝힙니다."],
              ["02", "과정과 숫자를 기록합니다", "참여와 지출, 현장의 변화를 확인 가능한 자료로 남깁니다."],
              ["03", "다음 행동으로 연결합니다", "성과와 한계를 함께 공개하고 더 나은 사업으로 개선합니다."],
            ].map(([number, title, description]) => (
              <div key={number} className="grid grid-cols-[auto_1fr] gap-4 py-2">
                <span className="text-xs font-black tracking-[.15em] text-[#ffc04c]">{number}</span>
                <div><strong className="block text-base font-black">{title}</strong><p className="mt-2 text-sm leading-6 text-white/55">{description}</p></div>
              </div>
            ))}
          </div>
          <p className="mt-7 text-xs text-white/38">※ 공익법인 결산 공시 및 2024년 단체현황 자료 기준</p>
        </div>
      </section>

      <section id="stories" className="scroll-mt-32 bg-[#f4f0e7] py-20 sm:py-24">
        <div className="container-page"><p className="kumepume-eyebrow">CHANGE STORIES</p><div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><h2 className="kumepume-section-title">변화는 사람과 현장에서 시작됩니다</h2><Link to="/activities" className="inline-flex items-center gap-2 text-sm font-black text-[#183b33]">활동 기록 전체 보기 <ArrowRight size={17} /></Link></div><div className="mt-12 grid gap-6 lg:grid-cols-3">{stories.map((story) => <Link to={story.href} key={story.title} className="group overflow-hidden bg-white"><div className="aspect-[4/3] overflow-hidden"><img src={story.image} alt={story.alt} className="size-full object-cover transition duration-700 group-hover:scale-[1.035]" /></div><div className="p-7"><p className="text-xs font-black tracking-[.14em] text-[#e47716]">{story.label}</p><h3 className="mt-3 text-2xl font-black leading-8 tracking-[-.035em] text-[#183b33]">{story.title}</h3><p className="mt-4 text-[15px] leading-7 text-charcoal/60">{story.summary}</p></div></Link>)}</div></div>
      </section>

      <section id="seed-voice" className="scroll-mt-32 bg-white py-20 sm:py-24">
        <div className="container-page"><div className="grid overflow-hidden rounded-sm border border-[#183b33]/12 lg:grid-cols-[1fr_.86fr]">
          <div className="flex flex-col justify-center bg-[#eef3e7] p-8 sm:p-12 lg:p-16"><div className="flex items-center gap-3"><BookOpen className="text-[#e88920]" size={26} /><p className="kumepume-eyebrow">PUBLIC INTEREST MEDIA</p></div><h2 className="mt-6 text-4xl font-black leading-tight tracking-[-.045em] text-[#183b33] sm:text-5xl">공익을 지키는<br />시민의 목소리</h2><p className="mt-6 max-w-xl text-base leading-8 text-charcoal/65">씨앗의 소리는 시민의 알 권리와 공익정보 접근을 넓히고 국가와 시민사회 권력을 감시하는 독립 시민저널입니다.</p><a href="https://seedvoice.kr" target="_blank" rel="noreferrer" className="mt-8 inline-flex w-fit items-center gap-2 border-b-2 border-[#183b33] pb-1 text-sm font-black text-[#183b33]">씨앗의 소리 바로가기 <ArrowRight size={17} /></a></div>
          <div className="relative min-h-[390px] bg-[#183b33] p-8 text-white sm:p-12 lg:p-16"><div className="absolute right-7 top-7 opacity-15"><Leaf size={130} strokeWidth={1.2} /></div><p className="text-xs font-black tracking-[.18em] text-[#ffc04c]">KUMEPUME PROJECT</p><p className="relative mt-20 max-w-md text-3xl font-black leading-[1.35] tracking-[-.035em]">사실을 아는 힘,<br />스스로 판단하는 힘,<br />함께 행동하는 힘.</p><p className="relative mt-7 max-w-md text-sm leading-7 text-white/62">편집과 기사 판단은 별도의 편집원칙에 따라 독립적으로 이루어집니다.</p></div>
        </div></div>
      </section>

      <section id="join" className="scroll-mt-32 bg-[#ef901f] py-20 sm:py-24">
        <div className="container-page"><div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div><p className="text-xs font-black tracking-[.2em] text-[#183b33]/60">JOIN KUMEPUME</p><h2 className="mt-5 text-4xl font-black leading-tight tracking-[-.045em] text-[#183b33] sm:text-5xl">당신이 가진 것이<br />공익의 힘이 됩니다</h2><p className="mt-5 max-w-xl text-base font-medium leading-8 text-[#183b33]/72">후원뿐 아니라 시간, 경험, 전문성과 연결의 힘으로 함께할 수 있습니다.</p></div><div className="grid gap-3 sm:grid-cols-2">{[
            [HeartHandshake, "후원하기", "정기·일시 후원으로 변화를 이어갑니다."],
            [Sparkles, "재능기부", "전문성과 경험을 필요한 현장에 연결합니다."],
            [Building2, "기업협력", "기업의 사회공헌을 지속가능한 사업으로 만듭니다."],
            [Users, "공익봉사", "시민이 직접 참여하는 행동을 함께 기획합니다."],
          ].map(([Icon, title, description], index) => { const JoinIcon = Icon as typeof HeartHandshake; const href = ["/join/donate", "/join/volunteer", "/join/corporate", "/join/member"][index]; return <Link to={href} key={title as string} className="group bg-white/92 p-6 transition hover:-translate-y-1 hover:bg-white"><JoinIcon size={24} className="text-[#e47716]"/><strong className="mt-5 block text-xl font-black text-[#183b33]">{title as string}</strong><span className="mt-2 block text-sm leading-6 text-charcoal/58">{description as string}</span><ArrowRight className="mt-5 text-[#183b33] transition group-hover:translate-x-1" size={18}/></Link>; })}</div></div></div>
      </section>

      <section id="transparency" className="scroll-mt-32 bg-white py-16 sm:py-20"><div className="container-page grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="kumepume-eyebrow">TRUST & TRANSPARENCY</p><h2 className="mt-4 text-3xl font-black tracking-[-.04em] text-[#183b33] sm:text-4xl">공익은 신뢰 위에서 자랍니다</h2><p className="mt-4 max-w-2xl text-base leading-8 text-charcoal/60">정관, 기부금 사용 내역, 결산서류와 사업성과를 누구나 쉽게 확인할 수 있도록 공개하겠습니다.</p></div><div className="flex flex-wrap gap-3"><Link to="/transparency" className="kumepume-button-secondary">투명경영 보기</Link><Link to="/transparency/reports" className="kumepume-button-primary">연차보고서</Link></div></div></section>
    </div>
  );
}
