import { ArrowRight, BookOpen, CheckCircle2, Globe2, HandHeart, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";

const base = import.meta.env.BASE_URL;

const programs = [
  {
    id: "care",
    number: "01",
    icon: HandHeart,
    title: "꿈을 보듬다",
    subtitle: "사람의 가능성을 발견하고 성장의 기회를 연결합니다",
    description: "사회적 배려가 필요한 청소년과 장애예술인, 도움이 필요한 이웃이 자신의 재능과 가능성을 펼칠 수 있도록 문화예술·교육·멘토링의 기회를 연결합니다.",
    points: ["사회적 약자 청소년 문화예술교육", "장애예술인 전시와 국내외 교류", "장학·진로·멘토링 연계"],
    image: `${base}images/kumepume/programs/disability-art-2024.webp`,
    alt: "2024년 꿈에품에 발달장애 미술작가 전시회 현장",
    caption: "2024 발달장애 미술작가 전시회",
  },
  {
    id: "citizens",
    number: "02",
    icon: Users,
    title: "시민을 키우다",
    subtitle: "스스로 판단하고 함께 살아갈 힘을 키웁니다",
    description: "서로 다른 배경을 지닌 청소년과 시민이 문화와 지식을 나누고, 사실을 이해하며, 공동체 문제에 주체적으로 참여할 수 있는 배움의 장을 만듭니다.",
    points: ["시민교육과 시민화 아카데미", "경제·미디어 문해력 교육", "다문화·고려인 청소년 성장 프로그램"],
    image: `${base}images/kumepume/programs/multicultural-kpop-2023.webp`,
    alt: "2023년 다문화청소년 K-POP 아카데미 교육 현장",
    caption: "2023 다문화청소년 K-POP 아카데미",
  },
  {
    id: "public-interest",
    number: "03",
    icon: ShieldCheck,
    title: "공익을 지키다",
    subtitle: "선한 의지가 신뢰받는 공익으로 이어지게 합니다",
    description: "노블하트 운동이 강조해 온 시민적 책임과 현장 봉사의 정신을 공익정보, 시민감시, 정책연구와 제도 개선으로 확장합니다.",
    points: ["독립 시민저널 씨앗의 소리", "공익정보와 시민감시", "정책연구와 제도 개선"],
    image: `${base}images/kumepume/programs/kumepume-volunteer.webp`,
    alt: "꿈품 볼런티어 단원들이 해외 봉사 현장에서 시설을 정비하는 모습",
    caption: "꿈품 볼런티어 현장 활동",
  },
  {
    id: "global",
    number: "04",
    icon: Globe2,
    title: "세계와 잇다",
    subtitle: "문화와 협력으로 국경을 넘어 가능성을 연결합니다",
    description: "중앙아시아와 동남아시아를 중심으로 재외동포·현지 주민과 교류하고, 문화예술과 생활 기반을 함께 키우는 지속 가능한 국제협력 사업을 추진합니다.",
    points: ["고려인·재외동포 문화교류", "청소년 K-POP·문화예술 교류", "지역 자립형 개발협력과 기업협력"],
    image: `${base}images/kumepume/programs/kyrgyzstan-exchange-2023.webp`,
    alt: "2023년 키르기스스탄 고려인 문화교류 참가자들이 현지에서 기념 촬영한 모습",
    caption: "2023 키르기스스탄 고려인 문화교류",
  },
];

const records = [
  { year: "2015", title: "라오스 농업용 소형보 지원", detail: "시앵쿠앙주 뺑사이마을의 농업용수 확보와 현지 봉사활동", category: "더나눔" },
  { year: "2016–17", title: "미얀마 농촌 자립 기반 구축", detail: "농업교육·시설재배·협동조합과 아동·청소년 문화예술교육", category: "국제협력" },
  { year: "2023", title: "다문화청소년 K-POP 아카데미", detail: "고려인·보육원 청소년을 위한 보컬·댄스·문화 체험", category: "청소년" },
  { year: "2023", title: "키르기스스탄 고려인 문화교류", detail: "고려인 단체와 함께한 ‘우리는 하나’ 문화교류 행사", category: "문화교류" },
  { year: "2023", title: "우즈베키스탄 펠릿 연료 지원", detail: "겨울철 연료 부족 지역 주민을 위한 펠릿 연료 20톤 전달", category: "생활지원" },
  { year: "2024", title: "발달장애 미술작가 전시", detail: "발달장애 미술작가 5인 전시와 시민 참여형 예술 프로그램", category: "장애예술" },
];

export default function Programs() {
  return (
    <div className="bg-[#fffdf8]">
      <section className="relative overflow-hidden bg-[#f1ece1]">
        <div className="container-page grid min-h-[590px] items-stretch lg:grid-cols-[.88fr_1.12fr]">
          <div className="flex flex-col justify-center py-16 pr-0 sm:py-20 lg:pr-16">
            <p className="kumepume-eyebrow">WHAT WE DO</p>
            <h1 className="mt-7 text-[clamp(2.8rem,5vw,4.6rem)] font-black leading-[1.07] tracking-[-.055em] text-[#183b33]">사람의 꿈에서<br />사회의 변화까지</h1>
            <p className="mt-7 max-w-xl text-lg font-medium leading-9 text-charcoal/68">꿈에품에는 사람을 돕는 일, 시민의 힘을 키우는 일, 공익을 지키는 일, 세계와 연결하는 일을 하나의 변화 과정으로 이어갑니다.</p>
            <div className="mt-10 flex flex-wrap gap-2">
              {programs.map((program) => <a key={program.id} href={`#${program.id}`} className="rounded-full border border-[#183b33]/18 bg-white/55 px-4 py-2 text-xs font-black text-[#183b33] transition hover:border-[#e47716] hover:text-[#e47716]">{program.number} {program.title}</a>)}
            </div>
          </div>
          <div className="relative min-h-[390px] overflow-hidden lg:min-h-full">
            <img src={`${base}images/kumepume/programs/laos-the-nanum-2015.webp`} alt="2015년 라오스 더나눔 프로젝트에서 현지 주민과 교류하는 참가자들" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#183b33]/70 via-transparent to-transparent" />
            <div className="absolute bottom-7 left-7 right-7 text-white sm:bottom-10 sm:left-10">
              <p className="text-xs font-black tracking-[.16em] text-[#ffc04c]">LEGACY PROJECT</p>
              <p className="mt-3 text-2xl font-black tracking-[-.03em]">2015 라오스 더나눔 프로젝트</p>
              <p className="mt-2 text-sm text-white/65">원본 홈페이지 활동 사진</p>
            </div>
          </div>
        </div>
      </section>

      <nav className="sticky top-[114px] z-30 hidden border-y border-[#183b33]/10 bg-white/95 backdrop-blur lg:block" aria-label="사업 바로가기">
        <div className="container-page grid grid-cols-4">
          {programs.map((program, index) => <a key={program.id} href={`#${program.id}`} className={`flex items-center gap-4 px-6 py-5 text-sm font-black text-[#183b33] transition hover:bg-[#f2f7ed] ${index ? "border-l border-[#183b33]/10" : ""}`}><span className="text-[#e47716]">{program.number}</span>{program.title}</a>)}
        </div>
      </nav>

      <section className="py-20 sm:py-28">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr] lg:items-end">
            <div><p className="kumepume-eyebrow">FOUR PATHS</p><h2 className="mt-5 text-4xl font-black leading-tight tracking-[-.045em] text-[#183b33] sm:text-5xl">네 가지 길이<br />하나의 변화로</h2></div>
            <p className="max-w-3xl text-base leading-8 text-charcoal/62">기존의 더나눔 프로젝트, 노블하트 운동, 꿈품 볼런티어와 국내외 문화교류 사업을 오늘의 과제에 맞게 재구성했습니다. 각 사업은 지원 대상과 방식은 다르지만 사람의 자립과 시민의 책임을 함께 키운다는 목표를 공유합니다.</p>
          </div>

          <div className="mt-16 grid gap-16 sm:gap-20">
            {programs.map(({ id, number, icon: Icon, title, subtitle, description, points, image, alt, caption }, index) => (
              <article id={id} key={id} className="scroll-mt-44 grid overflow-hidden bg-white shadow-[0_20px_65px_rgba(24,59,51,.08)] lg:grid-cols-2">
                <div className={`relative min-h-[360px] overflow-hidden ${index % 2 ? "lg:order-2" : ""}`}>
                  <img src={image} alt={alt} className="absolute inset-0 size-full object-cover transition duration-700 hover:scale-[1.025]" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-7 pb-6 pt-20 text-xs font-bold text-white/80">{caption} · 기존 홈페이지 원본</div>
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-11 lg:p-14">
                  <div className="flex items-center justify-between"><span className="text-xs font-black tracking-[.18em] text-[#e47716]">PROGRAM {number}</span><span className="grid size-12 place-items-center rounded-full bg-[#e7efd9] text-[#285748]"><Icon size={23}/></span></div>
                  <h3 className="mt-9 text-4xl font-black tracking-[-.045em] text-[#183b33]">{title}</h3>
                  <p className="mt-3 text-lg font-black leading-8 text-[#183b33]/68">{subtitle}</p>
                  <p className="mt-6 text-[15px] leading-7 text-charcoal/62">{description}</p>
                  <ul className="mt-7 grid gap-3">{points.map((point) => <li key={point} className="flex items-start gap-3 text-sm font-bold leading-6 text-charcoal/72"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#e47716]"/>{point}</li>)}</ul>
                  <Link to="/activities/archive" className="mt-8 inline-flex w-fit items-center gap-2 border-b-2 border-[#183b33] pb-1 text-sm font-black text-[#183b33]">관련 활동 기록 보기 <ArrowRight size={16}/></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#183b33] py-20 text-white sm:py-24">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end"><div><p className="text-xs font-black tracking-[.2em] text-[#ffc04c]">ACTIVITY RECORDS</p><h2 className="mt-5 text-4xl font-black tracking-[-.045em] sm:text-5xl">이어온 사업 기록</h2></div><p className="max-w-2xl text-sm leading-7 text-white/60">기존 홈페이지에서 확인한 주요 기록입니다. 사진과 세부 문서는 활동 아카이브로 순차 이전합니다.</p></div>
          <div className="mt-12 grid gap-px overflow-hidden bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
            {records.map((record) => <article key={`${record.year}-${record.title}`} className="bg-white/[.045] p-7 transition hover:bg-white/[.08] sm:p-8"><div className="flex items-center justify-between"><span className="text-2xl font-black text-[#ffc04c]">{record.year}</span><span className="rounded-full border border-white/15 px-3 py-1 text-[10px] font-black tracking-[.12em] text-white/55">{record.category}</span></div><h3 className="mt-7 text-xl font-black leading-8">{record.title}</h3><p className="mt-3 text-sm leading-7 text-white/58">{record.detail}</p></article>)}
          </div>
          <p className="mt-7 text-xs text-white/38">※ 연도·내용은 기존 꿈에품에 홈페이지의 사업 소개와 활동 기록을 기준으로 정리했습니다.</p>
        </div>
      </section>

      <section className="bg-[#f2f5ec] py-20 sm:py-24">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          <div className="bg-white p-8 sm:p-11"><BookOpen size={27} className="text-[#e47716]"/><p className="mt-7 text-xs font-black tracking-[.18em] text-[#e47716]">PUBLIC INTEREST MEDIA</p><h2 className="mt-4 text-3xl font-black tracking-[-.04em] text-[#183b33]">씨앗의 소리</h2><p className="mt-5 text-[15px] leading-7 text-charcoal/62">국가와 시민사회 권력을 감시하고 시민의 알 권리와 판단할 힘을 키우는 꿈에품에의 독립 공익사업입니다.</p><a href="https://seedvoice.kr" target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[#183b33]">독립 시민저널 바로가기 <ArrowRight size={16}/></a></div>
          <div className="bg-[#ef901f] p-8 sm:p-11"><Globe2 size={27} className="text-[#183b33]"/><p className="mt-7 text-xs font-black tracking-[.18em] text-[#183b33]/55">PARTNERSHIP</p><h2 className="mt-4 text-3xl font-black tracking-[-.04em] text-[#183b33]">함께 만드는 공익사업</h2><p className="mt-5 text-[15px] leading-7 text-[#183b33]/68">기업과 기관의 자원, 시민의 경험과 전문성을 현장에 필요한 장기 사업으로 연결합니다.</p><Link to="/join/corporate" className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[#183b33]">기업·기관 협력 안내 <ArrowRight size={16}/></Link></div>
        </div>
      </section>
    </div>
  );
}
