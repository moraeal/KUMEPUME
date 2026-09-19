import { ArrowRight, HeartHandshake, Link2, RefreshCcw, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const base = import.meta.env.BASE_URL;

const values = [
  {
    icon: HeartHandshake,
    title: "사람의 가능성을 보듬습니다",
    description: "도움이 필요한 이웃이 자신의 꿈을 포기하지 않고 삶의 주인공으로 설 수 있도록 곁을 지킵니다.",
  },
  {
    icon: Link2,
    title: "나눔의 연결을 만듭니다",
    description: "시민과 기업이 가진 시간, 경험, 전문성과 자원을 필요한 사람과 현장에 바르게 연결합니다.",
  },
  {
    icon: RefreshCcw,
    title: "선의를 지속 가능한 변화로 만듭니다",
    description: "한 번의 지원에 머물지 않고 나눔과 봉사가 이어지는 순환 구조와 사회적 기반을 만듭니다.",
  },
];

const visions = [
  "우리 사회에 책임 있는 나눔과 봉사의 문화를 넓힙니다.",
  "나눔과 봉사의 순환고리를 만들어 함께 행복한 공동체를 지향합니다.",
  "복지 사각지대를 살피고 현장에 필요한 실질적인 해법을 찾습니다.",
  "시민과 기업의 참여를 사람의 성장과 사회적 변화로 연결합니다.",
];

export default function KumepumeAbout() {
  return (
    <div className="bg-[#fffdf8]">
      <section className="relative overflow-hidden bg-[#183b33] text-white">
        <div className="absolute inset-y-0 right-0 hidden w-[46%] lg:block">
          <img
            src={`${base}images/kumepume/legacy/2009-heart-balloon-campaign.jpg`}
            alt="2009년 꿈에품에 출범 당시 하트 풍선 나눔 캠페인에 참여한 시민들"
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#183b33] via-[#183b33]/28 to-transparent" />
        </div>
        <div className="container-page relative grid min-h-[520px] items-center py-20 lg:grid-cols-[.62fr_.38fr]">
          <div className="max-w-3xl">
            <p className="text-xs font-black tracking-[.2em] text-[#ffc04c]">ABOUT KUMEPUME</p>
            <h1 className="mt-7 text-[clamp(2.8rem,5vw,4.7rem)] font-black leading-[1.06] tracking-[-.055em]">모든 이의 소중한 꿈을<br />우리 사회의 넉넉한 품으로</h1>
            <p className="mt-7 max-w-2xl text-lg font-medium leading-9 text-white/72">꿈에품에는 나눔과 공익봉사를 통해 사람의 가능성을 키우고, 시민과 기업의 책임 있는 참여를 지속 가능한 변화로 연결하는 공익법인입니다.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/programs" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#ef901f] px-6 text-sm font-black text-[#183b33] transition hover:bg-[#ffc04c]">주요 사업 보기 <ArrowRight size={17} /></Link>
              <Link to="/join" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/30 px-6 text-sm font-black text-white transition hover:bg-white/10">함께하기</Link>
            </div>
          </div>
        </div>
      </section>

      <nav className="border-b border-[#183b33]/10 bg-white" aria-label="꿈에품에 소개 하위 메뉴">
        <div className="container-page flex gap-7 overflow-x-auto py-5 text-sm font-extrabold text-charcoal/55">
          <Link to="/about" className="whitespace-nowrap text-[#e47716]">단체 소개</Link>
          <Link to="/about/message" className="whitespace-nowrap hover:text-[#183b33]">인사말</Link>
          <Link to="/about/history" className="whitespace-nowrap hover:text-[#183b33]">연혁</Link>
          <Link to="/about/organization" className="whitespace-nowrap hover:text-[#183b33]">조직·사람</Link>
          <Link to="/about/identity" className="whitespace-nowrap hover:text-[#183b33]">CI·비전</Link>
          <Link to="/about/partners" className="whitespace-nowrap hover:text-[#183b33]">협력기관</Link>
          <Link to="/about/contact" className="whitespace-nowrap hover:text-[#183b33]">오시는 길</Link>
        </div>
      </nav>

      <section className="py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="kumepume-eyebrow">SINCE 2009</p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-.045em] text-[#183b33] sm:text-5xl">따뜻한 품으로<br />꿈을 가꿉니다</h2>
          </div>
          <div className="text-[17px] leading-9 text-charcoal/70 sm:text-lg">
            <p>사단법인 꿈에품에는 한국형 노블레스 오블리주 문화를 꿈꾸며 2009년 9월 출범했습니다. 기업과 단체뿐 아니라 평범한 시민도 자신이 가진 것을 나누며 사회적 책임을 실천할 수 있어야 한다는 믿음에서 시작했습니다.</p>
            <p className="mt-6">우리는 어려움을 겪는 이웃의 현실을 살피고, 그들의 꿈을 우리 사회의 따뜻한 품으로 보듬고자 합니다. 머리로만 말하는 나눔이 아니라 현장에 다가가는 봉사, 베푸는 사람도 함께 기쁨을 누리는 나눔의 마당을 만들어갑니다.</p>
            <blockquote className="mt-10 border-l-4 border-[#ef901f] bg-[#f5f1e8] px-7 py-6 text-xl font-black leading-9 tracking-[-.025em] text-[#183b33]">“베푸는 이들의 따뜻한 품으로 꿈꾸는 이들을 가꾸어, 모두가 인생의 주인공이 될 수 있도록 돕겠습니다.”</blockquote>
          </div>
        </div>
      </section>

      <section className="bg-[#f2f5ec] py-20 sm:py-24">
        <div className="container-page">
          <p className="kumepume-eyebrow">OUR WAY</p>
          <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-[-.045em] text-[#183b33] sm:text-5xl">꿈에품에가 일하는 세 가지 방식</h2>
          <div className="mt-12 grid gap-px overflow-hidden bg-[#183b33]/12 lg:grid-cols-3">
            {values.map(({ icon: Icon, title, description }, index) => (
              <article key={title} className="bg-white p-8 sm:p-10">
                <div className="flex items-center justify-between"><span className="text-xs font-black tracking-[.16em] text-charcoal/30">0{index + 1}</span><span className="grid size-12 place-items-center rounded-full bg-[#e7efd9] text-[#285748]"><Icon size={23} /></span></div>
                <h3 className="mt-10 text-2xl font-black leading-8 tracking-[-.035em] text-[#183b33]">{title}</h3>
                <p className="mt-4 text-[15px] leading-7 text-charcoal/62">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-20">
          <div className="flex min-h-[390px] items-center justify-center bg-[#fffaf0] p-8 sm:p-12">
            <div className="text-center">
              <img src={`${base}images/kumepume/legacy/kumepume-heart-ring.png`} alt="꿈에품에 하트링 심볼" className="mx-auto w-36 sm:w-44" />
              <p className="mt-8 text-sm font-black tracking-[.2em] text-[#183b33]/55">KUMEPUME HEART RING</p>
            </div>
          </div>
          <div>
            <p className="kumepume-eyebrow">NAME &amp; IDENTITY</p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-.045em] text-[#183b33] sm:text-5xl">가꿈과 베품,<br />사랑이 이어지는 고리</h2>
            <p className="mt-7 text-base leading-8 text-charcoal/65">‘꿈에품에’는 가꿈과 베품의 뜻을 담아, 어려움에 놓인 이웃의 꿈을 우리 사회의 품으로 보듬겠다는 의지를 표현한 이름입니다.</p>
            <p className="mt-5 text-base leading-8 text-charcoal/65">창립 때부터 사용한 하트링 심볼은 두 개의 고리가 연결되고 순환해 사랑의 하트로 변화하는 모습을 형상화했습니다. 나눔이 일회성에 그치지 않고 지속적으로 이어지기를 바라는 뜻을 담고 있습니다.</p>
            <Link to="/about/identity" className="mt-8 inline-flex items-center gap-2 border-b-2 border-[#183b33] pb-1 text-sm font-black text-[#183b33]">CI와 비전 자세히 보기 <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>

      <section className="bg-[#ef901f] py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
          <div><p className="text-xs font-black tracking-[.2em] text-[#183b33]/55">OUR VISION</p><h2 className="mt-5 text-4xl font-black leading-tight tracking-[-.045em] text-[#183b33] sm:text-5xl">나눔을 넘어<br />함께 성장하는 사회로</h2></div>
          <div className="grid gap-px overflow-hidden bg-[#183b33]/15 sm:grid-cols-2">
            {visions.map((vision, index) => <div key={vision} className="bg-[#f6a83e] p-7 sm:p-8"><Sparkles size={21} className="text-[#183b33]"/><strong className="mt-5 block text-lg font-black leading-8 tracking-[-.025em] text-[#183b33]">{vision}</strong><span className="mt-5 block text-xs font-black tracking-[.15em] text-[#183b33]/40">0{index + 1}</span></div>)}
          </div>
        </div>
      </section>
    </div>
  );
}
