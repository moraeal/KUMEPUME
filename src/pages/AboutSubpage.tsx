import {
  Building2,
  CheckCircle2,
  Clock3,
  FileArchive,
  HeartHandshake,
  History,
  MapPin,
  Network,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const base = import.meta.env.BASE_URL;

const navigation = [
  ["단체 소개", "/about"],
  ["인사말", "/about/message"],
  ["연혁", "/about/history"],
  ["조직·사람", "/about/organization"],
  ["CI·비전", "/about/identity"],
  ["협력기관", "/about/partners"],
  ["오시는 길", "/about/contact"],
] as const;

const timeline = [
  { year: "2009", title: "꿈에품에 출범", body: "한국형 노블레스 오블리주와 시민의 사회적 책임을 넓히기 위한 활동을 시작했습니다.", note: "기존 소개문 기준" },
  { year: "2013", title: "나눔·문화·국제교류 기록", body: "송년음악회, 라오스 시앵쿠앙주 교류, 지역 복지기관 후원활동 등의 기록이 남아 있습니다.", note: "기존 활동 기록" },
  { year: "2015", title: "라오스 더나눔 프로젝트", body: "시앵쿠앙주 농촌지역의 생활·농업 기반을 지원하고 현장 봉사활동을 진행했습니다.", note: "사진·기사 보존" },
  { year: "2016", title: "미얀마 농촌 자립과 노블하트 협력", body: "미얀마 농업 협력과 유엔해비타트 모금 캠페인 협약 기록이 확인됩니다.", note: "기존 협약·활동 기록" },
  { year: "2017", title: "재난구호와 기부금 공개", body: "타지키스탄 재난구호 물품을 지원하고 2017 사업연도부터 기부금 활용 문서가 보존돼 있습니다.", note: "PDF 원본 보존" },
  { year: "2023", title: "청소년 문화교류 확대", body: "다문화청소년 K-POP 아카데미, 키르기스스탄 고려인 문화교류, 우즈베키스탄 생활지원 사업을 진행했습니다.", note: "기사·사진 보존" },
  { year: "2024–25", title: "문화예술과 국제 청소년 교류", body: "발달장애 미술작가 전시와 국내외 K-POP 경연·문화교류 활동을 이어갔습니다.", note: "최근 활동 기록" },
];

const partnerRecords = [
  { year: "2013", title: "은행골가족 복지재단", body: "보호가 필요한 청소년을 돕는 후원활동 기록" },
  { year: "2016", title: "유엔해비타트", body: "노블하트 모금 캠페인 협력 기록" },
  { year: "2023", title: "한국예술학교", body: "문화예술 인재 양성을 위한 업무협약 기록" },
  { year: "2023–25", title: "중앙아시아 현지 파트너", body: "고려인·청소년 문화교류와 생활지원 협력 기록" },
];

function AboutFrame({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: React.ReactNode }) {
  const location = useLocation();
  return (
    <div className="bg-[#fffdf8]">
      <section className="bg-[#183b33] py-16 text-white sm:py-20">
        <div className="container-page grid gap-9 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><div><p className="text-xs font-black tracking-[.2em] text-[#ffc04c]">{eyebrow}</p><h1 className="mt-5 text-[clamp(2.7rem,5vw,4.5rem)] font-black leading-[1.07] tracking-[-.055em]">{title}</h1></div><p className="max-w-2xl text-lg leading-9 text-white/65">{description}</p></div>
      </section>
      <nav className="border-b border-[#183b33]/10 bg-white" aria-label="꿈에품에 소개 하위 메뉴"><div className="container-page flex gap-7 overflow-x-auto py-5 text-sm font-extrabold text-charcoal/55">{navigation.map(([label, href]) => <Link key={href} to={href} className={`whitespace-nowrap transition hover:text-[#183b33] ${location.pathname === href ? "text-[#e47716]" : ""}`}>{label}</Link>)}</div></nav>
      {children}
    </div>
  );
}

export default function AboutSubpage() {
  const { pathname } = useLocation();
  if (pathname.endsWith("/message")) return <Message />;
  if (pathname.endsWith("/history")) return <HistoryPage />;
  if (pathname.endsWith("/organization")) return <Organization />;
  if (pathname.endsWith("/identity")) return <Identity />;
  if (pathname.endsWith("/partners")) return <Partners />;
  if (pathname.endsWith("/contact")) return <Contact />;
  return <HistoryPage />;
}

function Message() {
  return <AboutFrame eyebrow="MESSAGE" title="함께 나누며 살아가는 사회" description="기존 홈페이지에 남아 있는 대표 인사말을 기록으로 보존합니다. 직함과 약력은 작성 당시 정보이며 현재 정보로 확정하지 않습니다.">
    <section className="py-20 sm:py-24"><div className="container-page grid gap-12 lg:grid-cols-[.62fr_1.38fr] lg:gap-20"><aside><div className="bg-[#f3eee4] p-8"><FileArchive className="text-[#e47716]"/><p className="mt-6 text-xs font-black tracking-[.16em] text-[#e47716]">LEGACY MESSAGE</p><h2 className="mt-3 text-2xl font-black leading-9 text-[#183b33]">기존 홈페이지<br />대표 인사말 기록</h2><p className="mt-5 text-sm leading-7 text-charcoal/55">서명: 꿈에품에 2대 이사장 박경석<br />작성·게시 시점: 기존 페이지에 표기 없음</p><span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-black text-[#8b5c25]"><Clock3 size={13}/>현행 직함·약력 확인 중</span></div></aside><article className="text-[17px] leading-9 text-charcoal/72"><p>오늘날 한국사회는 급격한 경제성장 이후 큰 병을 앓고 있습니다. 바로 감사할 줄 모르고, 남 탓만 하는 병입니다.</p><p className="mt-6">살아가는 일이 쉬운 일은 아니지만 모든 것을 남 탓, 주어진 조건 탓으로만 돌리는 것은 분명 잘못된 일입니다. 이제는 나누며 살아야 합니다. 국가와 사회 속에서 많은 도움을 받아 지금의 내가 있을 수 있었기에, 받은 것을 함께 나누고 도움이 필요한 이들에게 다시 돌려주는 것은 자연스럽고 당연한 일입니다.</p><p className="mt-6">기업은 사회적 책임을 다하기 위해 노력하고 있습니다. 정부나 기업을 넘어 사회의 구성원인 개인의 사회적 책임과 의무도 중요한 시대입니다.</p><p className="mt-6">꿈에품에는 사회적으로 도움이 필요한 분들에게 다가가 꿈을 키워주고 품에 안아주는 일을 하려 합니다. 우리가 함께 살아가는 세상이 좀 더 따뜻하고 살만한 곳이 될 수 있도록 만들고 싶습니다.</p><blockquote className="mt-9 border-l-4 border-[#ef901f] bg-[#f5f1e8] px-7 py-6 text-xl font-black leading-9 tracking-[-.02em] text-[#183b33]">“비난하고 깎아내리기보다 칭찬하고 격려하고 도와주는 좋은 세상이 되었으면 좋겠습니다.”</blockquote><p className="mt-8 font-black text-[#183b33]">꿈에품에 활동에 함께 동참하여 주십시오.</p></article></div></section>
  </AboutFrame>;
}

function HistoryPage() {
  return <AboutFrame eyebrow="HISTORY" title="현장에서 이어온 변화의 기록" description="법인 연혁과 사업의 역사를 섞지 않고, 현재 확인할 수 있는 기존 기사·사진·공개문서를 기준으로 주요 활동을 정리했습니다.">
    <section className="py-20 sm:py-24"><div className="container-page"><div className="mx-auto max-w-5xl border-t-2 border-[#183b33]">{timeline.map((item) => <article key={item.year} className="grid gap-4 border-b border-[#183b33]/12 py-8 sm:grid-cols-[150px_1fr_auto] sm:items-start"><strong className="text-3xl font-black tracking-[-.04em] text-[#e47716]">{item.year}</strong><div><h2 className="text-xl font-black text-[#183b33]">{item.title}</h2><p className="mt-3 text-sm leading-7 text-charcoal/60">{item.body}</p></div><span className="w-fit rounded-full bg-[#f3eee4] px-3 py-1.5 text-[10px] font-black text-[#8b5c25]">{item.note}</span></article>)}</div><p className="mx-auto mt-7 max-w-5xl text-xs leading-6 text-charcoal/43">※ 2008년 설립, 2009년 허가·출범 등 자료별 표현이 달라 법적 설립연혁은 공식 등기·정관 확인 후 별도로 확정합니다.</p></div></section>
  </AboutFrame>;
}

function Organization() {
  return <AboutFrame eyebrow="ORGANIZATION" title="사람보다 역할이 먼저 보이는 조직" description="기존 조직도와 임원명단은 원본 아카이브에 보존하고, 공개 조직도는 최신 재직 여부와 의사결정 구조가 확인된 뒤 확정합니다.">
    <section className="py-20 sm:py-24"><div className="container-page"><div className="grid gap-px overflow-hidden bg-[#183b33]/12 lg:grid-cols-3">{[
      { icon: ShieldCheck, title: "이사회·거버넌스", body: "법인의 주요 정책과 예산, 책임 있는 운영 기준을 결정합니다.", status: "현행 구성 확인 중" },
      { icon: Network, title: "사무국·사업운영", body: "사업을 기획하고 현장 파트너와 시민·기업의 참여를 연결합니다.", status: "운영체계 정비 중" },
      { icon: Users, title: "현장·전문가 네트워크", body: "문화예술, 교육, 국제협력, 공익 분야의 경험을 사업에 연결합니다.", status: "참여자 동의 확인 중" },
    ].map(({icon:Icon,title,body,status}) => <article key={title} className="bg-white p-8 sm:p-10"><Icon size={28} className="text-[#e47716]"/><h2 className="mt-8 text-2xl font-black tracking-[-.03em] text-[#183b33]">{title}</h2><p className="mt-4 text-sm leading-7 text-charcoal/60">{body}</p><span className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-[#f3eee4] px-3 py-1.5 text-[11px] font-black text-[#8b5c25]"><Clock3 size={13}/>{status}</span></article>)}</div><div className="mt-10 flex gap-4 border-l-4 border-[#e47716] bg-[#f3eee4] p-6"><FileArchive className="mt-1 shrink-0 text-[#e47716]"/><p className="text-sm leading-7 text-charcoal/63">기존 조직도 이미지와 임원 18명의 직책·약력은 원본 상태로 보존했습니다. 오래된 명단을 현재 임원으로 오인하지 않도록 공개 명단에서는 제외했으며, 최신 등기와 재직 동의를 확인한 뒤 갱신합니다.</p></div></div></section>
  </AboutFrame>;
}

function Identity() {
  const visions = ["책임 있는 나눔과 봉사의 문화 확산", "나눔과 봉사가 이어지는 순환 구조", "복지 사각지대의 발견과 실질적 해법", "시민·기업의 참여를 사람의 성장과 연결", "지속 가능한 사회적 기금과 협력 기반"];
  return <AboutFrame eyebrow="CI & VISION" title="가꿈과 베품을 잇는 하트링" description="창립 때부터 사용한 이름과 심볼의 뜻, 기존 홈페이지에 공개된 사명과 비전을 보존해 오늘의 언어로 정리했습니다.">
    <section className="py-20 sm:py-24"><div className="container-page grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-20"><div className="grid min-h-[430px] place-items-center bg-[#fff7e8] p-10"><div className="text-center"><img src={`${base}images/kumepume/legacy/kumepume-heart-ring.png`} alt="꿈에품에 하트링 심볼" className="mx-auto w-44 sm:w-56"/><img src={`${base}images/kumepume/legacy/kumepume-ci-wordmark.png`} alt="사단법인 꿈에품에 워드마크" className="mx-auto mt-10 max-h-16 max-w-[280px] object-contain"/><p className="mt-8 text-xs font-black tracking-[.18em] text-[#183b33]/45">ORIGINAL CI ASSETS</p></div></div><div><p className="kumepume-eyebrow">NAME &amp; SYMBOL</p><h2 className="mt-5 text-4xl font-black tracking-[-.045em] text-[#183b33] sm:text-5xl">꿈을 가꾸고<br />따뜻한 품으로 보듬다</h2><p className="mt-7 text-base leading-8 text-charcoal/65">‘꿈에품에’는 가꿈과 베품의 뜻을 담아, 어려움에 놓인 이웃의 꿈을 우리 사회의 품으로 보듬겠다는 의지를 표현한 이름입니다.</p><p className="mt-5 text-base leading-8 text-charcoal/65">하트링은 결연과 순환을 뜻하는 두 고리가 연결돼 사랑의 하트로 변화하는 모습입니다. 오렌지와 노란색은 따뜻하고 지속적인 나눔을 상징합니다.</p></div></div></section><section className="bg-[#ef901f] py-20 sm:py-24"><div className="container-page grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><div><p className="text-xs font-black tracking-[.18em] text-[#183b33]/55">MISSION &amp; VISION</p><h2 className="mt-5 text-4xl font-black leading-tight tracking-[-.045em] text-[#183b33]">공동체의 성장과<br />사회통합에 기여합니다</h2></div><div className="grid gap-px bg-[#183b33]/14 sm:grid-cols-2">{visions.map((item,index)=><div key={item} className="bg-[#f6a83e] p-7"><Sparkles size={20} className="text-[#183b33]"/><strong className="mt-5 block text-lg font-black leading-8 text-[#183b33]">{item}</strong><span className="mt-5 block text-xs font-black text-[#183b33]/40">0{index+1}</span></div>)}</div></div></section>
  </AboutFrame>;
}

function Partners() {
  return <AboutFrame eyebrow="PARTNERS" title="함께 만든 변화의 기록" description="과거 참여자 명단을 현재 파트너로 오인하지 않도록 개인명단은 원본에 보존하고, 기사와 협약에서 확인되는 협력 기록을 중심으로 공개합니다.">
    <section className="py-20 sm:py-24"><div className="container-page"><div className="grid gap-5 md:grid-cols-2">{partnerRecords.map((item)=><article key={`${item.year}-${item.title}`} className="bg-white p-8 shadow-[0_14px_42px_rgba(24,59,51,.065)]"><span className="text-sm font-black text-[#e47716]">{item.year}</span><h2 className="mt-4 text-2xl font-black text-[#183b33]">{item.title}</h2><p className="mt-3 text-sm leading-7 text-charcoal/58">{item.body}</p></article>)}</div><div className="mt-10 grid gap-5 bg-[#f2f5ec] p-7 sm:grid-cols-[auto_1fr] sm:p-9"><FileArchive className="text-[#e47716]" size={28}/><div><h2 className="text-xl font-black text-[#183b33]">기존 ‘함께하는 분들’ 3개 페이지 보존</h2><p className="mt-3 text-sm leading-7 text-charcoal/60">학계·의료계·기업·전문직·문화예술계 인사가 포함된 과거 참여자 명단은 원본 아카이브에 모두 보존했습니다. 현재 협력 관계와 공개 동의를 확인하지 않은 개인 이름은 개편 사이트에 그대로 게시하지 않습니다.</p></div></div></div></section>
  </AboutFrame>;
}

function Contact() {
  return <AboutFrame eyebrow="CONTACT" title="공식 소재지 확인 후 안내합니다" description="기존 홈페이지와 최근 공개문서의 주소·전화번호가 서로 달라, 최신 법인 증빙 확인 전에는 방문 주소나 연락처로 안내하지 않습니다.">
    <section className="py-20 sm:py-24"><div className="container-page grid gap-8 lg:grid-cols-[.8fr_1.2fr]"><div className="bg-[#f3eee4] p-8 sm:p-10"><MapPin size={30} className="text-[#e47716]"/><h2 className="mt-7 text-3xl font-black tracking-[-.04em] text-[#183b33]">오시는 길 준비 중</h2><p className="mt-5 text-sm leading-7 text-charcoal/62">공식 소재지, 대표전화, 이메일과 방문 가능 시간을 확인한 뒤 지도와 교통편을 함께 제공합니다.</p><span className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#8b5c25]"><Clock3 size={14}/>최신 법인정보 검증 중</span></div><div className="border-t-2 border-[#183b33]"><div className="grid gap-3 border-b border-[#183b33]/12 py-7 sm:grid-cols-[130px_1fr]"><strong className="text-sm font-black text-[#183b33]">과거 공개 주소</strong><p className="text-sm leading-7 text-charcoal/55">영등포구 신길역 인근 사무실 안내가 기존 페이지에 남아 있으며, 현재 방문 주소로 사용할 수 없습니다.</p></div><div className="grid gap-3 border-b border-[#183b33]/12 py-7 sm:grid-cols-[130px_1fr]"><strong className="text-sm font-black text-[#183b33]">문서 내 주소</strong><p className="text-sm leading-7 text-charcoal/55">기부금 공개문서에는 강남구 주소가 함께 확인돼 자료 간 불일치가 있습니다.</p></div><div className="grid gap-3 border-b border-[#183b33]/12 py-7 sm:grid-cols-[130px_1fr]"><strong className="text-sm font-black text-[#183b33]">공개 기준</strong><p className="text-sm leading-7 text-charcoal/55">법인 등기·사업자 정보와 실제 운영지를 대조한 뒤 하나의 공식 연락처만 공개합니다.</p></div></div></div></section>
  </AboutFrame>;
}
