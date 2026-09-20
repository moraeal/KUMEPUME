import { ChevronDown, ExternalLink, Heart, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSiteLanguage } from "./SiteLanguage";

type NavigationItem = { label: string; href: string; external?: boolean; children?: Array<readonly [string, string]> };

const navigation = (english: boolean): NavigationItem[] => english ? [
  { label: "KUMEPUME", href: "/about", children: [["About us", "/about"], ["Message", "/about/message"], ["History", "/about/history"], ["Our team", "/about/organization"], ["Identity & vision", "/about/identity"], ["Partners", "/about/partners"], ["Contact", "/about/contact"]] },
  { label: "Programs", href: "/programs", children: [["Nurture dreams", "/programs/care"], ["Grow citizens", "/programs/citizens"], ["Protect the public good", "/programs/public-interest"], ["Connect with the world", "/programs/global"]] },
  { label: "Activities & impact", href: "/activities", children: [["Recent activities", "/activities"], ["Stories of change", "/activities/stories"], ["Events", "/activities/events"], ["By year", "/activities/archive"], ["Archive", "/stories/archive"], ["Videos", "/stories/videos"]] },
  { label: "SEED VOICE", href: "https://seedvoice.kr", external: true },
  { label: "Transparency", href: "/transparency", children: [["Organization", "/transparency/corporate"], ["Governance", "/transparency/governance"], ["Plans", "/transparency/plans"], ["Donations", "/transparency/donations"], ["Financial disclosure", "/transparency/financials"], ["Reports", "/transparency/reports"]] },
] : [
  { label: "꿈에품에", href: "/about", children: [["단체 소개", "/about"], ["인사말", "/about/message"], ["연혁", "/about/history"], ["조직·사람", "/about/organization"], ["CI·비전", "/about/identity"], ["협력기관", "/about/partners"], ["오시는 길", "/about/contact"]] },
  { label: "사업", href: "/programs", children: [["꿈을 보듬다", "/programs/care"], ["시민을 키우다", "/programs/citizens"], ["공익을 지키다", "/programs/public-interest"], ["세계와 잇다", "/programs/global"]] },
  { label: "활동과 성과", href: "/activities", children: [["최근 활동", "/activities"], ["변화 이야기", "/activities/stories"], ["행사", "/activities/events"], ["연도별 활동", "/activities/archive"], ["과거 기록", "/stories/archive"], ["영상 기록", "/stories/videos"]] },
  { label: "씨앗의 소리", href: "https://seedvoice.kr", external: true },
  { label: "투명경영", href: "/transparency", children: [["단체현황", "/transparency/corporate"], ["거버넌스", "/transparency/governance"], ["사업계획", "/transparency/plans"], ["기부금", "/transparency/donations"], ["결산·공시", "/transparency/financials"], ["보고서", "/transparency/reports"]] },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isPreview = import.meta.env.VITE_SITE_STAGE !== "production";
  const { language, setLanguage } = useSiteLanguage();
  const english = language === "en";
  const items = navigation(english);
  const switchLanguage = () => setLanguage(english ? "ko" : "en");

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header id="top" className="sticky top-0 z-50 border-b border-[#183b33]/10 bg-[#fffdf8]/95 backdrop-blur-xl">
      {isPreview && <div className="bg-[#183b33] px-5 py-2 text-center text-[11px] font-bold tracking-[-.01em] text-white/80">{english ? "KUMEPUME website preview · Support and contact features are coming soon" : "KUMEPUME 홈페이지 개편 미리보기 · 후원과 문의 기능은 준비 중입니다"}</div>}
      <div className="container-page flex min-h-[78px] items-center gap-5 py-2 lg:min-h-[86px]">
        <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="KUMEPUME home">
          <img src={`${import.meta.env.BASE_URL}images/kumepume/legacy/kumepume-heart-ring.png`} alt="" className="h-11 w-auto" aria-hidden="true" />
          <span><strong className="block text-[1.4rem] font-black leading-none tracking-[-.055em] text-[#183b33] sm:text-[1.65rem]">KUMEPUME</strong><small className="mt-1 block text-[9px] font-black tracking-[.15em] text-charcoal/45">{english ? "CIVIC ORGANIZATION" : "사단법인 꿈에품에"}</small></span>
        </Link>
        <nav className="ml-auto hidden items-center gap-7 xl:flex" aria-label={english ? "Main navigation" : "주요 메뉴"}>
          {items.map((item) => <div key={item.label} className="group relative py-7">
            {item.external ? <a href={item.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[14px] font-extrabold text-charcoal/72 transition hover:text-[#e47716]">{item.label}<ExternalLink size={13} /></a> : <NavLink to={item.href} className={({ isActive }) => `inline-flex items-center gap-1 text-[14px] font-extrabold transition ${isActive ? "text-[#e47716]" : "text-charcoal/72 hover:text-[#e47716]"}`}>{item.label}{item.children && <ChevronDown size={14} />}</NavLink>}
            {item.children && <div className="invisible absolute left-1/2 top-[72px] min-w-44 -translate-x-1/2 translate-y-2 border border-[#183b33]/10 bg-white p-2 opacity-0 shadow-[0_18px_45px_rgba(24,59,51,.14)] transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">{item.children.map(([label, href]) => <Link key={href} to={href} className="block whitespace-nowrap px-4 py-2.5 text-[13px] font-bold text-charcoal/65 transition hover:bg-[#f2f7ed] hover:text-[#183b33]">{label}</Link>)}</div>}
          </div>)}
        </nav>
        <div className="hidden items-center gap-2 xl:flex">
          <button type="button" onClick={switchLanguage} className="inline-flex min-h-11 items-center rounded-full border border-[#183b33]/20 px-4 text-xs font-black text-[#183b33] transition hover:border-[#e47716] hover:text-[#e47716]" aria-label={english ? "Switch to Korean" : "Switch to English"}>{english ? "한국어" : "EN"}</button>
          <Link to="/join" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#ef901f] px-5 text-sm font-black text-[#183b33] transition hover:bg-[#ffc04c]"><Heart size={16} fill="currentColor" /> {english ? "Get involved" : "함께하기"}</Link>
        </div>
        <button type="button" onClick={() => setOpen((value) => !value)} className="ml-auto grid size-11 place-items-center rounded-full border border-[#183b33]/15 text-[#183b33] xl:hidden" aria-label={open ? (english ? "Close menu" : "메뉴 닫기") : (english ? "Open menu" : "메뉴 열기")} aria-expanded={open}>{open ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
      {open && <div className="max-h-[calc(100vh-86px)] overflow-y-auto border-t border-[#183b33]/10 bg-[#fffdf8] px-5 pb-6 pt-3 shadow-xl xl:hidden"><nav className="container-page grid">{items.map((item) => <div key={item.label} className="border-b border-[#183b33]/10 py-3">{item.external ? <a href={item.href} target="_blank" rel="noreferrer" className="flex items-center justify-between py-2 text-base font-black text-[#183b33]">{item.label}<ExternalLink size={16}/></a> : <><Link to={item.href} className="flex items-center justify-between py-2 text-base font-black text-[#183b33]">{item.label}<ChevronDown size={16}/></Link>{item.children && <div className="grid grid-cols-2 gap-x-4 pb-2">{item.children.map(([label, href]) => <Link key={href} to={href} className="py-2 text-sm font-bold text-charcoal/55">{label}</Link>)}</div>}</>}</div>)}</nav><div className="container-page mt-5 grid gap-3"><button type="button" onClick={switchLanguage} className="kumepume-button-secondary w-full">{english ? "한국어로 보기" : "View in English"}</button><Link to="/join" className="kumepume-button-primary w-full">{english ? "Get involved" : "함께하기"} <Heart size={17} fill="currentColor" /></Link></div></div>}
    </header>
  );
}
