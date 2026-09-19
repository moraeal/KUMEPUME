import {
  ArrowDownToLine,
  Building2,
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileText,
  Landmark,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const disclosures = [
  { year: "2024", title: "연간 기부금 모금액 및 활용실적 명세서", file: "2024-donation-use-report.pdf", pages: 2, size: "66KB", published: "2025.04.25" },
  { year: "2023", title: "기부금품의 수입 및 지출 명세서", file: "2023-donation-income-expense-report.pdf", pages: 2, size: "95KB", published: "기존 홈페이지 공개본" },
  { year: "2022", title: "연간 기부금 모금액 및 활용실적 명세서", file: "2022-donation-use-report.pdf", pages: 2, size: "44KB", published: "2023.04.25" },
  { year: "2021", title: "연간 기부금 모금액 및 활용실적 명세서", file: "2021-donation-use-report.pdf", pages: 2, size: "43KB", published: "2022.04.28" },
  { year: "2020", title: "연간 기부금 모금액 및 활용실적 명세서", file: "2020-donation-use-report.pdf", pages: 2, size: "44KB", published: "2021.10.28" },
  { year: "2019", title: "연간 기부금 모금액 및 활용실적 명세서", file: "2019-donation-use-report.pdf", pages: 1, size: "79KB", published: "2020.09.29" },
  { year: "2018", title: "연간 기부금 모금액 및 활용실적 명세서", file: "2018-donation-use-report.pdf", pages: 1, size: "80KB", published: "2020.09.29" },
  { year: "2017", title: "연간 기부금 모금액 및 활용실적 명세서", file: "2017-donation-use-report.pdf", pages: 1, size: "79KB", published: "2019.06.23" },
];

const subnav = [
  ["단체현황", "/transparency/corporate"],
  ["임원·거버넌스", "/transparency/governance"],
  ["사업계획·보고", "/transparency/plans"],
  ["기부금 활용", "/transparency/donations"],
  ["결산·공시", "/transparency/financials"],
  ["보고서·자료", "/transparency/reports"],
] as const;

const base = import.meta.env.BASE_URL;

export default function Transparency() {
  const location = useLocation();

  return (
    <div className="bg-[#fffdf8]">
      <section className="relative overflow-hidden bg-[#183b33] py-20 text-white sm:py-24">
        <div className="absolute -right-24 -top-24 size-80 rounded-full border border-white/10" />
        <div className="absolute -bottom-44 right-[18%] size-[430px] rounded-full border border-white/5" />
        <div className="container-page relative grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
          <div>
            <p className="text-xs font-black tracking-[.2em] text-[#ffc04c]">TRUST &amp; TRANSPARENCY</p>
            <h1 className="mt-6 text-[clamp(2.8rem,5vw,4.6rem)] font-black leading-[1.05] tracking-[-.055em]">공익은 신뢰 위에서<br />자랍니다</h1>
          </div>
          <div>
            <p className="max-w-2xl text-lg leading-9 text-white/68">꿈에품에가 어떤 기준으로 운영되고, 시민의 참여와 기부가 어떻게 쓰였는지 누구나 확인할 수 있도록 공개합니다.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="rounded-full border border-[#ffc04c]/45 bg-[#ffc04c]/10 px-4 py-2 text-xs font-black text-[#ffc04c]">2017–2024 기부금 문서 8건</span>
              <span className="rounded-full border border-white/15 px-4 py-2 text-xs font-black text-white/62">PDF 원본 보존</span>
              <span className="rounded-full border border-white/15 px-4 py-2 text-xs font-black text-white/62">최신 정보 검증 중</span>
            </div>
          </div>
        </div>
      </section>

      <nav className="border-b border-[#183b33]/10 bg-white" aria-label="투명경영 하위 메뉴">
        <div className="container-page flex gap-7 overflow-x-auto py-5 text-sm font-extrabold text-charcoal/55">
          {subnav.map(([label, href]) => (
            <Link key={href} to={href} className={`whitespace-nowrap transition hover:text-[#183b33] ${location.pathname === href ? "text-[#e47716]" : ""}`}>{label}</Link>
          ))}
        </div>
      </nav>

      <section id="corporate" className="scroll-mt-36 py-20 sm:py-24">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="kumepume-eyebrow">ORGANIZATION</p>
              <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-.045em] text-[#183b33] sm:text-5xl">단체현황</h2>
              <p className="mt-6 text-[15px] leading-8 text-charcoal/62">기존 홈페이지에 공개된 단체정보를 보존해 옮겼습니다. 등록 상태와 연락처는 최신 증빙 확인 후 현재 정보로 확정합니다.</p>
            </div>
            <div className="grid gap-px overflow-hidden border border-[#183b33]/10 bg-[#183b33]/10 sm:grid-cols-2">
              {[
                ["출범", "2009년 9월", "기존 소개문 기준"],
                ["단체명", "사단법인 꿈에품에", "기존 공개 정보"],
                ["고유번호", "110-82-14374", "기존 공개 정보"],
                ["등록 정보", "민간단체 제274호 · 비영리법인 제2009-43호", "최신 상태 확인 중"],
              ].map(([label, value, note]) => (
                <article key={label} className="bg-white p-7 sm:p-8">
                  <p className="text-xs font-black tracking-[.14em] text-[#e47716]">{label}</p>
                  <p className="mt-3 text-xl font-black leading-8 tracking-[-.025em] text-[#183b33]">{value}</p>
                  <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-charcoal/42"><Clock3 size={13}/>{note}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-8 flex gap-3 border-l-4 border-[#e47716] bg-[#f3eee4] p-5 text-sm leading-7 text-charcoal/65"><ShieldCheck className="mt-0.5 shrink-0 text-[#e47716]" size={20}/><p>기존 홈페이지의 주소·전화·이메일은 시점에 따라 서로 달라 현재 연락처로 표시하지 않았습니다. 최신 증빙 확인 전까지 과거 정보는 원본 기록에만 보존합니다.</p></div>
        </div>
      </section>

      <section id="governance" className="scroll-mt-36 bg-[#f2f5ec] py-20 sm:py-24">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end"><div><p className="kumepume-eyebrow">GOVERNANCE</p><h2 className="mt-5 text-4xl font-black tracking-[-.045em] text-[#183b33] sm:text-5xl">거버넌스와 공개 원칙</h2></div><p className="max-w-xl text-sm leading-7 text-charcoal/58">오래된 임원명단을 현재 명단처럼 옮기지 않고, 최신 확인이 끝난 정보부터 공개합니다.</p></div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { icon: Building2, title: "임원·조직", body: "기존 임원명단과 조직도 원본은 보존했습니다. 최신 재직 여부와 직책 확인 후 공개합니다.", status: "검증 대기" },
              { icon: Scale, title: "정관·운영규정", body: "최신 정관 원본과 개정 이력을 확보한 뒤 다운로드 가능한 문서로 공개합니다.", status: "자료 확보 중" },
              { icon: FileCheck2, title: "사업계획·사업보고", body: "사업계획과 결과, 기준연도와 자료 출처를 함께 표시하는 공개 체계를 준비합니다.", status: "공개 체계 준비" },
            ].map(({ icon: Icon, title, body, status }) => (
              <article key={title} className="bg-white p-8 shadow-[0_14px_45px_rgba(24,59,51,.055)]">
                <Icon className="text-[#e47716]" size={27}/><h3 className="mt-7 text-2xl font-black tracking-[-.035em] text-[#183b33]">{title}</h3><p className="mt-4 text-sm leading-7 text-charcoal/60">{body}</p><span className="mt-7 inline-flex rounded-full bg-[#f3eee4] px-3 py-1.5 text-[11px] font-black text-[#8b5c25]">{status}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="donations" className="scroll-mt-36 py-20 sm:py-24">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[.68fr_1.32fr] lg:gap-20">
            <div>
              <p className="kumepume-eyebrow">DONATION DISCLOSURE</p>
              <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-.045em] text-[#183b33] sm:text-5xl">기부금 모금·활용실적</h2>
              <p className="mt-6 text-[15px] leading-8 text-charcoal/62">기존 홈페이지에 첨부된 PDF 가운데 사업연도가 확인되는 기부금 공개문서만 선별했습니다. 파일은 수정하지 않은 원본입니다.</p>
              <div className="mt-8 border-t border-[#183b33]/15 pt-6 text-xs leading-6 text-charcoal/48"><p>공개 범위: 2017–2024 사업연도</p><p>중복 파일 1건과 비공시 문서 1건은 공개 목록에서 제외하고 원본 보관소에 유지했습니다.</p></div>
            </div>
            <div className="border-t-2 border-[#183b33]">
              {disclosures.map((item) => (
                <a key={item.year} href={`${base}documents/transparency/${item.file}`} target="_blank" rel="noreferrer" className="group grid gap-3 border-b border-[#183b33]/12 py-6 transition hover:bg-white sm:grid-cols-[90px_1fr_auto] sm:items-center sm:px-4">
                  <strong className="text-2xl font-black text-[#e47716]">{item.year}</strong>
                  <div><h3 className="font-black text-[#183b33]">{item.title}</h3><p className="mt-1.5 text-xs text-charcoal/45">{item.year} 사업연도 · PDF {item.pages}쪽 · {item.size} · 문서 표기 {item.published}</p></div>
                  <span className="inline-flex items-center gap-2 text-sm font-black text-[#183b33]">원문 보기 <ArrowDownToLine size={16} className="transition group-hover:translate-y-0.5"/></span>
                </a>
              ))}
              <div className="border-b border-[#183b33]/12 bg-[#f3eee4] px-5 py-6 text-sm leading-7 text-charcoal/62"><strong className="mr-2 text-[#183b33]">2015년 기록</strong>기존 페이지에서 ‘2015년도 기부금 수입 및 사용내역 결산서’ 공고문을 확인했으나 첨부 원본은 확인되지 않았습니다. 공고문은 원본 아카이브에 보존하고 문서 확보 후 추가합니다.</div>
            </div>
          </div>
        </div>
      </section>

      <section id="reports" className="scroll-mt-36 bg-[#183b33] py-20 text-white sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-20">
          <div><p className="text-xs font-black tracking-[.2em] text-[#ffc04c]">REPORTS &amp; ARCHIVE</p><h2 className="mt-5 text-4xl font-black tracking-[-.045em] sm:text-5xl">보고서·자료실</h2><p className="mt-6 text-[15px] leading-8 text-white/62">기존 ‘보고서’와 ‘자료’ 페이지는 제목만 남아 있고 첨부문서는 확인되지 않았습니다. 원본 파일이 확보되는 대로 연도·발행일·출처를 검증해 추가합니다.</p></div>
          <div className="grid gap-px bg-white/15 sm:grid-cols-2">
            <div className="bg-white/[.045] p-8"><FileText className="text-[#ffc04c]"/><h3 className="mt-6 text-xl font-black">연차보고서</h3><p className="mt-3 text-sm leading-7 text-white/55">기존 공개 파일 미확인</p><span className="mt-6 inline-flex items-center gap-2 text-xs font-black text-[#ffc04c]"><Clock3 size={14}/>원본 확인 중</span></div>
            <div className="bg-white/[.045] p-8"><Landmark className="text-[#ffc04c]"/><h3 className="mt-6 text-xl font-black">결산·공익법인 공시</h3><p className="mt-3 text-sm leading-7 text-white/55">최신 결산서류와 외부 공시 링크 확인 중</p><span className="mt-6 inline-flex items-center gap-2 text-xs font-black text-[#ffc04c]"><Clock3 size={14}/>검증 후 공개</span></div>
          </div>
        </div>
      </section>

      <section className="bg-[#ef901f] py-14">
        <div className="container-page flex flex-col justify-between gap-7 lg:flex-row lg:items-center"><div className="flex items-start gap-4"><CheckCircle2 className="mt-1 shrink-0 text-[#183b33]"/><div><h2 className="text-2xl font-black tracking-[-.035em] text-[#183b33]">확인된 사실과 검증 중인 정보를 구분합니다</h2><p className="mt-2 text-sm leading-7 text-[#183b33]/68">과거 공개자료는 그대로 보존하되, 최신 여부가 확인되지 않은 정보에는 상태를 명확히 표시합니다.</p></div></div><Link to="/activities" className="kumepume-button-secondary shrink-0">활동 기록 보기</Link></div>
      </section>
    </div>
  );
}
