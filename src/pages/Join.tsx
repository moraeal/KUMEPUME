import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  FileCheck2,
  HandHeart,
  HeartHandshake,
  MailQuestion,
  Sparkles,
  Users,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const base = import.meta.env.BASE_URL;

const subnav = [
  ["함께하기", "/join", "ways"],
  ["후원", "/join/donate", "donate"],
  ["회원", "/join/member", "member"],
  ["자원봉사·재능기부", "/join/volunteer", "volunteer"],
  ["기업·기관 협력", "/join/corporate", "corporate"],
  ["문의", "/contact", "contact"],
] as const;

const ways = [
  { icon: HeartHandshake, title: "정기·일시 후원", body: "사람의 꿈과 지역의 변화를 오래 이어갈 수 있도록 재정으로 함께합니다.", href: "/join/donate", status: "신청창구 검증 중" },
  { icon: Users, title: "회원으로 함께하기", body: "꿈에품에의 가치와 활동 소식을 나누고 행사와 공익활동에 참여합니다.", href: "/join/member", status: "가입절차 정비 중" },
  { icon: HandHeart, title: "자원봉사", body: "현장에 필요한 시간과 손길을 보태고 시민이 직접 변화를 만듭니다.", href: "/join/volunteer", status: "일정 확인 중" },
  { icon: Sparkles, title: "재능기부", body: "문화예술, 교육, 기획, 홍보, 법률·회계 등 경험과 전문성을 연결합니다.", href: "/join/volunteer", status: "참여분야 정비 중" },
  { icon: Building2, title: "기업·기관 협력", body: "일회성 지원을 넘어 임직원 참여와 현장 실행, 결과 공개까지 함께 설계합니다.", href: "/join/corporate", status: "협력문의 준비 중" },
];

export default function Join() {
  const location = useLocation();

  useEffect(() => {
    const route = subnav.find(([, href]) => href === location.pathname);
    if (!route || route[2] === "ways") return;
    const frame = window.requestAnimationFrame(() => document.getElementById(route[2])?.scrollIntoView({ behavior: "smooth" }));
    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname]);

  return (
    <div className="bg-[#fffdf8]">
      <section className="relative overflow-hidden bg-[#ef901f]">
        <div className="container-page grid min-h-[610px] lg:grid-cols-[.9fr_1.1fr]">
          <div className="flex flex-col justify-center py-16 pr-0 sm:py-20 lg:pr-16">
            <p className="text-xs font-black tracking-[.2em] text-[#183b33]/58">JOIN KUMEPUME</p>
            <h1 className="mt-7 text-[clamp(2.8rem,5vw,4.7rem)] font-black leading-[1.05] tracking-[-.058em] text-[#183b33]">당신이 가진 것이<br />공익의 힘이 됩니다</h1>
            <p className="mt-7 max-w-xl text-lg font-medium leading-9 text-[#183b33]/72">후원뿐 아니라 시간, 경험, 전문성과 연결의 힘으로 함께할 수 있습니다. 참여가 실제 변화로 이어지고 그 결과가 다시 시민에게 공개되도록 하겠습니다.</p>
            <div className="mt-9 flex flex-wrap gap-3"><a href="#ways" className="kumepume-button-secondary">참여 방법 보기 <ArrowRight size={17}/></a><Link to="/transparency/donations" className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#183b33]/25 px-6 text-sm font-black text-[#183b33] transition hover:bg-white/35">기부금 공개자료</Link></div>
          </div>
          <div className="relative min-h-[390px] overflow-hidden lg:min-h-full">
            <img src={`${base}images/kumepume/programs/kumepume-volunteer.webp`} alt="꿈품 볼런티어 단원들이 해외 봉사 현장에서 시설을 정비하는 모습" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#183b33]/72 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white sm:bottom-11 sm:left-11"><p className="text-xs font-black tracking-[.16em] text-[#ffc04c]">KUMEPUME VOLUNTEER</p><p className="mt-3 text-2xl font-black tracking-[-.035em]">꿈품 볼런티어 현장 활동</p><p className="mt-2 text-xs font-bold text-white/62">기존 홈페이지 원본 사진</p></div>
          </div>
        </div>
      </section>

      <nav className="border-b border-[#183b33]/10 bg-white" aria-label="함께하기 하위 메뉴">
        <div className="container-page flex gap-7 overflow-x-auto py-5 text-sm font-extrabold text-charcoal/55">
          {subnav.map(([label, href]) => <Link key={href} to={href} className={`whitespace-nowrap transition hover:text-[#183b33] ${location.pathname === href ? "text-[#e47716]" : ""}`}>{label}</Link>)}
        </div>
      </nav>

      <section id="ways" className="scroll-mt-36 py-20 sm:py-24">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><div><p className="kumepume-eyebrow">WAYS TO JOIN</p><h2 className="mt-5 text-4xl font-black leading-tight tracking-[-.045em] text-[#183b33] sm:text-5xl">함께 만드는<br />다섯 가지 방법</h2></div><p className="max-w-2xl text-base leading-8 text-charcoal/62">기존 후원회원 가입과 볼런티어 활동을 오늘의 참여 방식에 맞게 확장했습니다. 미리보기 단계에서는 잘못된 신청이나 송금을 막기 위해 검증되지 않은 계좌·연락처·신청서를 공개하지 않습니다.</p></div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {ways.map(({ icon: Icon, title, body, href, status }) => <Link to={href} key={title} className="group flex min-h-[295px] flex-col bg-white p-7 shadow-[0_14px_42px_rgba(24,59,51,.065)] transition hover:-translate-y-1 hover:shadow-[0_22px_58px_rgba(24,59,51,.12)]"><span className="grid size-12 place-items-center rounded-full bg-[#eef3e7] text-[#e47716]"><Icon size={23}/></span><h3 className="mt-7 text-xl font-black leading-8 tracking-[-.03em] text-[#183b33]">{title}</h3><p className="mt-3 flex-1 text-sm leading-7 text-charcoal/58">{body}</p><span className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-black text-[#8b5c25]"><Clock3 size={13}/>{status}</span></Link>)}
          </div>
        </div>
      </section>

      <section id="donate" className="scroll-mt-36 bg-[#183b33] py-20 text-white sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <div><p className="text-xs font-black tracking-[.2em] text-[#ffc04c]">DONATION</p><h2 className="mt-5 text-4xl font-black leading-tight tracking-[-.045em] sm:text-5xl">후원이 변화로<br />이어지는 과정</h2><p className="mt-6 text-[15px] leading-8 text-white/62">모금보다 중요한 것은 모금 이후입니다. 필요한 현장을 찾고, 사업을 실행하고, 사용 내역과 결과를 공개하는 전 과정을 책임 있게 연결합니다.</p></div>
          <div className="grid gap-px bg-white/15 sm:grid-cols-2">
            {[
              ["01", "필요 확인", "현장과 당사자의 필요를 먼저 확인합니다."],
              ["02", "사업 설계", "후원의 목적과 실행 방법, 공개 기준을 세웁니다."],
              ["03", "현장 실행", "파트너와 시민이 함께 사업을 실행합니다."],
              ["04", "결과 공개", "기부금 사용과 사업 결과를 투명하게 공개합니다."],
            ].map(([number, title, body]) => <article key={number} className="bg-white/[.045] p-8"><span className="text-sm font-black text-[#ffc04c]">{number}</span><h3 className="mt-5 text-2xl font-black">{title}</h3><p className="mt-3 text-sm leading-7 text-white/55">{body}</p></article>)}
          </div>
        </div>
        <div className="container-page mt-10"><div className="flex flex-col justify-between gap-5 border-t border-white/15 pt-7 sm:flex-row sm:items-center"><p className="text-sm leading-7 text-white/50">정기·일시후원 계좌와 CMS 신청은 최신 정보 확인 후 개방합니다.</p><Link to="/transparency/donations" className="inline-flex items-center gap-2 text-sm font-black text-[#ffc04c]">2017–2024 기부금 공개자료 <ArrowRight size={16}/></Link></div></div>
      </section>

      <section id="member" className="scroll-mt-36 py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[.88fr_1.12fr] lg:items-center lg:gap-20">
          <div className="relative overflow-hidden"><img src={`${base}images/kumepume/legacy/2009-heart-balloon-campaign.jpg`} alt="2009년 꿈에품에 하트 풍선 캠페인 참가자들" className="aspect-[4/3] size-full object-cover"/><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-7 pb-6 pt-20 text-xs font-bold text-white/75">2009 꿈에품에 하트 풍선 캠페인 · 기존 홈페이지 원본</div></div>
          <div><p className="kumepume-eyebrow">MEMBERSHIP</p><h2 className="mt-5 text-4xl font-black tracking-[-.045em] text-[#183b33] sm:text-5xl">회원으로 이어지는 참여</h2><p className="mt-6 text-[15px] leading-8 text-charcoal/62">기존 홈페이지는 회원에게 행사와 활동 소식을 보내고 꿈에품에 활동에 초대한다고 안내했습니다. 새 회원 체계는 단순한 소식 수신을 넘어 활동 제안과 봉사, 캠페인 참여로 이어지도록 정비합니다.</p><ul className="mt-7 grid gap-3">{["활동·행사 소식과 참여 안내", "시민 캠페인과 현장 봉사 참여", "전문성·경험을 활용한 공익 프로젝트 제안"].map((item) => <li key={item} className="flex items-start gap-3 text-sm font-bold leading-7 text-charcoal/68"><CheckCircle2 className="mt-1 shrink-0 text-[#e47716]" size={18}/>{item}</li>)}</ul><p className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#f3eee4] px-4 py-2 text-xs font-black text-[#8b5c25]"><Clock3 size={14}/>회원가입 절차·개인정보 동의문 정비 중</p></div>
        </div>
      </section>

      <section id="volunteer" className="scroll-mt-36 bg-[#f2f5ec] py-20 sm:py-24">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end"><div><p className="kumepume-eyebrow">VOLUNTEER &amp; TALENT</p><h2 className="mt-5 text-4xl font-black tracking-[-.045em] text-[#183b33] sm:text-5xl">시간과 재능으로 함께하기</h2></div><p className="max-w-2xl text-sm leading-7 text-charcoal/58">기존 꿈품 볼런티어의 생활지원·현장봉사 경험을 보존하고, 문화예술·교육·전문자문까지 참여 영역을 넓힙니다.</p></div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {["현장 봉사와 생활지원", "청소년 문화예술·교육", "행사·캠페인 운영", "기획·홍보·법률·회계 자문"].map((item, index) => <article key={item} className="bg-white p-7"><span className="text-xs font-black tracking-[.14em] text-[#e47716]">0{index + 1}</span><h3 className="mt-6 text-xl font-black leading-8 text-[#183b33]">{item}</h3></article>)}
          </div>
          <div className="mt-8 border-l-4 border-[#e47716] bg-white p-5 text-sm leading-7 text-charcoal/62"><strong className="mr-2 text-[#183b33]">기존 기록</strong>과거 홈페이지에는 꿈품 회원으로 구성된 ‘꿈품 볼런티어’가 월 1회 독거노인 도시락 배달, 연탄 나눔, 노숙인 급식 등 정기 봉사를 했다고 기록돼 있습니다. 현재 운영 일정은 확인 후 별도로 안내합니다.</div>
        </div>
      </section>

      <section id="corporate" className="scroll-mt-36 py-20 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <div><p className="kumepume-eyebrow">PARTNERSHIP</p><h2 className="mt-5 text-4xl font-black leading-tight tracking-[-.045em] text-[#183b33] sm:text-5xl">기업·기관과 만드는<br />지속 가능한 변화</h2><p className="mt-6 text-[15px] leading-8 text-charcoal/62">기업과 기관의 자원, 임직원의 경험, 꿈에품에의 현장 네트워크를 연결해 실행 가능한 공익사업을 설계합니다.</p></div>
          <div className="grid gap-5 sm:grid-cols-3">
            {[{icon:Building2,title:"공익사업 공동기획",body:"지역과 대상의 필요에 맞는 장기 사업을 함께 설계합니다."},{icon:Users,title:"임직원 참여",body:"기부와 봉사, 전문성을 하나의 참여 프로그램으로 연결합니다."},{icon:FileCheck2,title:"성과·결과 공개",body:"실행 과정과 지원 결과를 기록하고 투명하게 공유합니다."}].map(({icon:Icon,title,body}) => <article key={title} className="bg-white p-7 shadow-[0_14px_42px_rgba(24,59,51,.065)]"><Icon size={25} className="text-[#e47716]"/><h3 className="mt-7 text-xl font-black leading-8 text-[#183b33]">{title}</h3><p className="mt-3 text-sm leading-7 text-charcoal/58">{body}</p></article>)}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-36 bg-[#ef901f] py-16 sm:py-20">
        <div className="container-page grid gap-9 lg:grid-cols-[1fr_auto] lg:items-center"><div className="flex items-start gap-4"><MailQuestion className="mt-1 shrink-0 text-[#183b33]" size={27}/><div><p className="text-xs font-black tracking-[.18em] text-[#183b33]/55">CONTACT</p><h2 className="mt-3 text-3xl font-black tracking-[-.04em] text-[#183b33] sm:text-4xl">참여·협력 문의 창구를 정비하고 있습니다</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-[#183b33]/68">기존 홈페이지의 서로 다른 주소·전화·이메일은 현재 정보로 사용하지 않습니다. 공식 연락처와 개인정보처리방침을 확인한 뒤 문의와 신청 기능을 개방합니다.</p></div></div><span className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#183b33]/25 bg-white/45 px-6 text-sm font-black text-[#183b33]"><Clock3 size={16}/>최신 연락처 검증 중</span></div>
      </section>
    </div>
  );
}
