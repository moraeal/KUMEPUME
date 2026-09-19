import { ArrowLeft, ExternalLink, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";

const videos = [
  { title: "노블레스 오블리주의 유래 (Origin of Noblesse Oblige)", source: "EBS Culture · 지식채널e · 2012.01.16", url: "https://www.youtube.com/playlist?list=PLdlo9KjfiS_31w3B7ZFPmMioohvYyKjeV", note: "기존 홈페이지가 모아 둔 묶음 재생목록에서 확인" },
  { title: "유일한 그는 누구인가", source: "기존 홈페이지 영상 기록", url: "https://www.youtube.com/watch?v=5Nh4VcIhkuo", note: "외부 제공 영상으로 재생 가능 여부는 제공처 상태에 따름" },
  { title: "이회영과 노블레스 오블리주", source: "KBS 영상 기록", url: "https://www.youtube.com/playlist?list=PLdlo9KjfiS_31w3B7ZFPmMioohvYyKjeV", note: "기존 홈페이지가 모아 둔 묶음 재생목록에서 확인" },
  { title: "우리나라의 진정한 노블레스 오블리주", source: "국세청 NTS스페셜", url: "https://www.youtube.com/watch?v=YXI3aGNGgMM", note: "국세청 공개 영상으로 연결" },
];

export default function LegacyVideos() {
  return <div className="bg-[#fffdf8]">
    <section className="bg-[#183b33] py-20 text-white sm:py-24"><div className="container-page"><Link to="/stories/archive" className="inline-flex items-center gap-2 text-sm font-black text-white/65 hover:text-white"><ArrowLeft size={16}/>과거 기록</Link><p className="mt-10 text-xs font-black tracking-[.2em] text-[#ffc04c]">LEGACY VIDEO RECORDS</p><h1 className="mt-5 text-[clamp(2.8rem,5vw,4.6rem)] font-black leading-[1.05] tracking-[-.055em]">노블레스<br/>영상 기록</h1><p className="mt-7 max-w-2xl text-lg leading-9 text-white/68">기존 홈페이지가 소개했던 노블레스 오블리주 관련 영상 제목과 외부 연결 정보를 보존합니다.</p></div></section>
    <section className="py-20 sm:py-24"><div className="container-page"><div className="max-w-3xl border-l-4 border-[#ef901f] bg-[#fff4df] px-6 py-5 text-sm font-bold leading-7 text-[#183b33]">영상 파일은 꿈에품에 소유 자료가 아니므로 복제하거나 새 사이트에 다시 올리지 않습니다. 확인된 공식·기존 외부 주소만 연결하며, 삭제·비공개 전환 등 재생 상태는 제공처 정책에 따릅니다.</div><div className="mt-10 grid gap-5 lg:grid-cols-2">{videos.map((video, index) => <a key={video.title} href={video.url} target="_blank" rel="noreferrer" className="group flex min-h-64 flex-col justify-between bg-white p-7 shadow-[0_14px_45px_rgba(24,59,51,.07)] transition hover:-translate-y-1"><div><div className="flex items-center justify-between"><span className="grid size-12 place-items-center rounded-full bg-[#183b33] text-white"><PlayCircle size={23}/></span><span className="text-xs font-black text-[#e47716]">영상 {String(index + 1).padStart(2, "0")}</span></div><h2 className="mt-7 text-2xl font-black leading-9 tracking-[-.035em] text-[#183b33]">{video.title}</h2><p className="mt-3 text-sm font-bold text-charcoal/50">{video.source}</p><p className="mt-4 text-sm leading-6 text-charcoal/58">{video.note}</p></div><span className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[#183b33]">외부 영상 확인 <ExternalLink size={15}/></span></a>)}</div><div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#183b33]/12 pt-7 text-xs text-charcoal/45"><p>기존 페이지 주소와 영상 제목은 원본 기록에 보존되어 있습니다.</p><a href="https://kumepume.wixsite.com/main/blank-20" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-black text-[#183b33]">기존 페이지 보기 <ExternalLink size={14}/></a></div></div></section>
  </div>;
}
