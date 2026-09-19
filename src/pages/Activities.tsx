import { ArrowRight, CalendarDays, Filter, ImageIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import activityData from "../data/kumepume/activities.json";

type Activity = (typeof activityData.activities)[number];

const categories = ["전체", "문화예술", "국제협력", "장애예술", "공익협력", "돌봄·나눔"];
const years = ["전체", ...Array.from(new Set(activityData.activities.map((item) => String(item.year)))).sort((a, b) => b.localeCompare(a))];

function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

export default function Activities() {
  const location = useLocation();
  const routeKind = location.pathname.endsWith("/events") ? "event" : location.pathname.endsWith("/stories") ? "post" : "all";
  const [category, setCategory] = useState("전체");
  const [year, setYear] = useState("전체");
  const [visible, setVisible] = useState(12);

  const filtered = useMemo(() => activityData.activities.filter((item) => {
    const kindMatch = routeKind === "all" || item.kind === routeKind;
    return kindMatch && (category === "전체" || item.category === category) && (year === "전체" || String(item.year) === year);
  }), [category, year, routeKind]);

  const featured = activityData.activities.filter((item) => ["kpop-finalists-2025-ru", "kpop-contest-2025", "disability-art-exhibition-2024"].includes(item.id));
  const title = routeKind === "event" ? "행사 기록" : routeKind === "post" ? "현장 이야기" : "활동과 성과";

  return (
    <div className="bg-[#fffdf8]">
      <section className="bg-[#183b33] py-20 text-white sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
          <div><p className="text-xs font-black tracking-[.2em] text-[#ffc04c]">ACTIVITIES &amp; IMPACT</p><h1 className="mt-6 text-[clamp(2.8rem,5vw,4.6rem)] font-black leading-[1.05] tracking-[-.055em]">현장에서 시작된<br />변화의 기록</h1></div>
          <div><p className="max-w-2xl text-lg leading-9 text-white/68">2009년부터 이어온 나눔과 봉사, 문화예술, 국제협력의 현장을 기록합니다. 기존 홈페이지의 글과 사진을 새 구조에 맞춰 빠짐없이 옮기고 있습니다.</p><div className="mt-7 flex flex-wrap gap-5 text-sm font-black"><span className="text-[#ffc04c]">활동 기사 21건</span><span className="text-white/55">행사 기록 3건</span><span className="text-white/55">공개 사진 24장</span></div></div>
        </div>
      </section>

      <nav className="border-b border-[#183b33]/10 bg-white" aria-label="활동과 성과 하위 메뉴">
        <div className="container-page flex gap-7 overflow-x-auto py-5 text-sm font-extrabold text-charcoal/55">
          <Link to="/activities" className={!location.pathname.includes("/activities/") ? "whitespace-nowrap text-[#e47716]" : "whitespace-nowrap hover:text-[#183b33]"}>전체 활동</Link>
          <Link to="/activities/stories" className={routeKind === "post" ? "whitespace-nowrap text-[#e47716]" : "whitespace-nowrap hover:text-[#183b33]"}>현장 이야기</Link>
          <Link to="/activities/events" className={routeKind === "event" ? "whitespace-nowrap text-[#e47716]" : "whitespace-nowrap hover:text-[#183b33]"}>행사</Link>
          <Link to="/activities/archive" className="whitespace-nowrap hover:text-[#183b33]">연도별 아카이브</Link>
          <Link to="/stories/archive" className="whitespace-nowrap hover:text-[#183b33]">과거 기록</Link>
        </div>
      </nav>

      {routeKind === "all" && (
        <section className="py-20 sm:py-24">
          <div className="container-page">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><p className="kumepume-eyebrow">RECENT RECORDS</p><h2 className="mt-5 text-4xl font-black tracking-[-.045em] text-[#183b33] sm:text-5xl">최근 활동 기록</h2></div><p className="max-w-xl text-sm leading-7 text-charcoal/55">과거 홈페이지에 남아 있던 가장 최근 기록부터 순서대로 옮겼습니다.</p></div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {featured.map((item) => <ActivityCard key={item.id} item={item} featured />)}
            </div>
          </div>
        </section>
      )}

      <section className={`${routeKind === "all" ? "bg-[#f2f5ec]" : "bg-[#fffdf8]"} py-20 sm:py-24`}>
        <div className="container-page">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div><p className="kumepume-eyebrow">ACTIVITY ARCHIVE</p><h2 className="mt-5 text-4xl font-black tracking-[-.045em] text-[#183b33] sm:text-5xl">{title}</h2></div>
            <div className="flex flex-wrap gap-3">
              <label className="flex min-h-11 items-center gap-2 border border-[#183b33]/15 bg-white px-4 text-sm font-bold text-[#183b33]"><Filter size={15}/><span className="sr-only">분야</span><select value={category} onChange={(event) => { setCategory(event.target.value); setVisible(12); }} className="bg-transparent outline-none">{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
              <label className="flex min-h-11 items-center gap-2 border border-[#183b33]/15 bg-white px-4 text-sm font-bold text-[#183b33]"><CalendarDays size={15}/><span className="sr-only">연도</span><select value={year} onChange={(event) => { setYear(event.target.value); setVisible(12); }} className="bg-transparent outline-none">{years.map((item) => <option key={item}>{item}</option>)}</select></label>
            </div>
          </div>

          <p className="mt-7 text-sm font-bold text-charcoal/48">선택한 기록 {filtered.length}건</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.slice(0, visible).map((item) => <ActivityCard key={item.id} item={item} />)}
          </div>
          {visible < filtered.length && <div className="mt-12 text-center"><button type="button" onClick={() => setVisible((value) => value + 12)} className="kumepume-button-secondary">활동 기록 더 보기 <ArrowRight size={16}/></button></div>}
        </div>
      </section>
    </div>
  );
}

function ActivityCard({ item, featured = false }: { item: Activity; featured?: boolean }) {
  return (
    <Link to={`/activities/${item.id}`} className="group flex h-full flex-col overflow-hidden bg-white shadow-[0_14px_45px_rgba(24,59,51,.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(24,59,51,.13)]">
      <div className={`${featured ? "aspect-[4/3]" : "aspect-[16/10]"} relative overflow-hidden bg-[#e8eee1]`}>
        {item.image ? <img src={asset(item.image)} alt={item.imageAlt} className="size-full object-cover transition duration-700 group-hover:scale-[1.035]" /> : <div className="grid size-full place-items-center text-[#183b33]/25"><ImageIcon size={46}/></div>}
        <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1.5 text-[10px] font-black tracking-[.1em] text-[#183b33] backdrop-blur">{item.category}</span>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-xs font-black tracking-[.12em] text-[#e47716]">{item.date.replace(/-/g, ".")} · {item.kind === "event" ? "행사" : item.program}</p>
        <h3 className="mt-3 text-xl font-black leading-8 tracking-[-.03em] text-[#183b33]">{item.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-charcoal/58">{item.summary}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#183b33]">기록 읽기 <ArrowRight size={15} className="transition group-hover:translate-x-1"/></span>
      </div>
    </Link>
  );
}
