import { ArrowRight, CalendarDays } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { legacyStories } from "../data/kumepume/legacyStories";

function asset(path: string) { return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`; }

export default function LegacyArchive() {
  const [category, setCategory] = useState("전체");
  const stories = useMemo(() => category === "전체" ? legacyStories : legacyStories.filter((item) => item.category === category), [category]);
  return <div className="bg-[#fffdf8]">
    <section className="bg-[#183b33] py-20 text-white sm:py-24"><div className="container-page grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-end"><div><p className="text-xs font-black tracking-[.2em] text-[#ffc04c]">LEGACY ARCHIVE</p><h1 className="mt-6 text-[clamp(2.8rem,5vw,4.6rem)] font-black leading-[1.05] tracking-[-.055em]">꿈에품에가<br/>걸어온 기록</h1></div><div><p className="max-w-2xl text-lg leading-9 text-white/68">기존 홈페이지에 실렸던 노블하트 원문, 나눔을 실천한 사람들의 이야기, 기업과 함께한 국제협력 기록을 원문과 사진 그대로 보존합니다.</p><p className="mt-6 text-sm font-black text-[#ffc04c]">이번 이전 기록 {legacyStories.length}건 · 원본 이미지 별도 보존</p></div></div></section>
    <nav className="border-b border-[#183b33]/10 bg-white" aria-label="과거 기록 분류"><div className="container-page flex gap-3 overflow-x-auto py-5">{["전체", "노블하트", "인물 기록", "기업협력"].map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-black ${category === item ? "bg-[#183b33] text-white" : "bg-[#f2f5ec] text-[#183b33]"}`}>{item}</button>)}</div></nav>
    <section className="py-20 sm:py-24"><div className="container-page"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="kumepume-eyebrow">HISTORICAL RECORDS</p><h2 className="mt-4 text-4xl font-black tracking-[-.045em] text-[#183b33]">과거 기록 아카이브</h2></div><p className="text-sm font-bold text-charcoal/45">선택한 기록 {stories.length}건</p></div><div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{stories.map((item) => <Link key={item.id} to={`/stories/archive/${item.id}`} className="group flex h-full flex-col overflow-hidden bg-white shadow-[0_14px_45px_rgba(24,59,51,.07)] transition hover:-translate-y-1"><div className="relative aspect-[16/10] overflow-hidden bg-[#e8eee1]"><img src={asset(item.image)} alt={item.imageAlt} className="size-full object-cover transition duration-700 group-hover:scale-[1.035]"/><span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1.5 text-[10px] font-black tracking-[.1em] text-[#183b33]">{item.category}</span></div><div className="flex flex-1 flex-col p-6"><p className="inline-flex items-center gap-1.5 text-xs font-black text-[#e47716]"><CalendarDays size={13}/>{item.dateLabel}</p><h3 className="mt-3 text-xl font-black leading-8 tracking-[-.03em] text-[#183b33]">{item.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-charcoal/58">{item.summary}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#183b33]">기록 읽기 <ArrowRight size={15}/></span></div></Link>)}</div></div></section>
  </div>;
}

