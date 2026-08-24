import { Leaf, Users, ShieldCheck, ShoppingBag, Download, ChevronRight, Award, TrendingUp, Package, Flame, Car, Recycle, ExternalLink } from "lucide-react";
import rseBookBanner from "@/imports/image.png";
import rseReportCover from "@/imports/image-1.png";

const pillars = [
  {
    Icon: Leaf,
    label: "Environnement",
    desc: "Réduire notre empreinte environnementale et préserver les ressources naturelles.",
  },
  {
    Icon: Users,
    label: "Social & sécurité",
    desc: "Garantir la santé, la sécurité et le bien-être de nos collaborateurs.",
  },
  {
    Icon: ShieldCheck,
    label: "Éthique",
    desc: "Agir avec intégrité, transparence et respecter les droits humains et les normes sociales.",
  },
  {
    Icon: ShoppingBag,
    label: "Achats responsables",
    desc: "Privilégier des fournisseurs engagés et des achats responsables et durables.",
  },
];

const actions = [
  {
    Icon: Package,
    label: "Packaging mono-matériau",
    desc: "Réduire les matériaux composites pour faciliter le recyclage.",
  },
  {
    Icon: Flame,
    label: "Pompes à chaleur",
    desc: "Optimiser notre consommation énergétique grâce à des solutions performantes.",
  },
  {
    Icon: Car,
    label: "Mobilité",
    desc: "Encourager les déplacements plus responsables et réduire nos émissions.",
  },
  {
    Icon: Recycle,
    label: "Tri, sécurité et bien-être",
    desc: "Améliorer en continu le tri des déchets, la sécurité et le bien-être au travail.",
  },
];

interface RSEPageProps {
  onBack?: () => void;
  onContactClick?: () => void;
  onISOClick?: () => void;
}

export function RSEPage({ onBack, onContactClick, onISOClick }: RSEPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Banner ── */}
      {/*
        Desktop: cream section, image anchored bottom-right as scenic backdrop.
        Mobile: image strip cropped to the book area, then text below.
      */}

      {/* Mobile-only image strip — book cropped from right side */}
      <div className="lg:hidden relative overflow-hidden bg-[#F5F0E8]" style={{ height: 210 }}>
        <img
          src={rseBookBanner}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "80% center" }}
        />
        {/* bottom fade into text section */}
        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#F5F0E8] to-transparent" />
      </div>

      <section className="bg-[#F5F0E8] relative overflow-hidden">
        {/* Desktop-only backdrop image — bottom-anchored, right-weighted */}
        <img
          src={rseBookBanner}
          alt=""
          aria-hidden
          className="hidden lg:block absolute bottom-0 right-0 w-[62%] pointer-events-none select-none"
          style={{ objectFit: "contain", objectPosition: "right bottom" }}
        />
        {/* Left gradient — keeps text readable on cream bg */}
        <div
          className="hidden lg:block absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #F5F0E8 45%, #F5F0E8e6 58%, #F5F0E880 68%, transparent 82%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-10 lg:py-0 lg:flex lg:items-center lg:min-h-[420px]">
          <div className="lg:max-w-[500px]">
            <p className="text-[#C75B12] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
              — Responsabilité Sociétale
            </p>
            <h1 className="text-[30px] lg:text-[40px] font-black text-[#353A3F] leading-[1.15] mb-5">
              Notre démarche RSE
            </h1>
            <p className="text-[#6B7280] text-[15px] lg:text-[16px] leading-relaxed mb-7 lg:max-w-[430px]">
              Découvrez nos engagements et nos actions en matière d'environnement, de santé
              et de bien-être au travail, d'éthique et d'achats responsables.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex items-center justify-center gap-2 bg-[#C75B12] text-white text-sm font-semibold rounded-xl px-6 h-12 hover:bg-[#a34a0e] transition-colors w-full sm:w-auto">
                Découvrir nos engagements
                <ChevronRight className="w-4 h-4 flex-shrink-0" />
              </button>
              
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust strip ── */}
      {(() => {
        const stats = [
          { Icon: Award,       main: "Médaille d'Or EcoVadis",   sub: "8e année consécutive" },
          { Icon: TrendingUp,  main: "Top 4 %",                  sub: "des entreprises évaluées" },
          { Icon: ShieldCheck, main: "ISO 9001 · 14001 · 45001", sub: "Certifiés depuis 2014" },
        ] as const;
        return (
          <section className="bg-white border-y border-gray-100">
            {/* Desktop: 3 equal columns with pipe dividers */}
            <div className="hidden lg:flex max-w-5xl mx-auto divide-x divide-gray-100" style={{ height: 88 }}>
              {stats.map((s, i) => (
                <div key={i} className="flex-1 flex items-center justify-center gap-3 px-8">
                  <s.Icon className="text-[#C75B12] flex-shrink-0" style={{ width: 22, height: 22 }} strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-semibold text-[#353A3F] whitespace-nowrap">{s.main}</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile: clean stacked rows, dividers between, icons column-aligned */}
            <div className="lg:hidden divide-y divide-gray-100 px-5">
              {stats.map((s, i) => (
                <div key={i} className="flex items-center gap-3 py-4">
                  {/* fixed-width icon cell so all text starts at the same x */}
                  <div className="flex-shrink-0 flex items-center justify-center" style={{ width: 32 }}>
                    <s.Icon className="text-[#C75B12]" style={{ width: 22, height: 22 }} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#353A3F] whitespace-nowrap">{s.main}</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })()}

      {/* ── Rapport RSE 2024 preview ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Report interior preview */}
            <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
              <div
                className="w-64 sm:w-72 lg:w-80 rounded-xl overflow-hidden"
                style={{
                  boxShadow: "0 20px 60px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08)",
                }}
              >
                <img
                  src={rseReportCover}
                  alt="Rapport RSE 2024 — Nos engagements"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Right text */}
            <div className="flex-1">
              <p className="text-[10px] font-black tracking-[0.25em] text-[#6B7280] uppercase mb-2">
                RAPPORT RSE 2024
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-[#353A3F] leading-tight mb-1">RAPPORT RSE 2024</h2>
              <p className="text-[#C75B12] text-xl font-bold mb-5">Découvrez notre rapport RSE</p>
              <p className="text-[#6B7280] leading-relaxed mb-8 max-w-md">
                Découvrez nos actions, nos objectifs et nos résultats en matière de
                responsabilité sociétale, environnementale et sociale.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="inline-flex items-center justify-center gap-2 bg-[#C75B12] text-white text-sm font-semibold rounded-xl px-6 py-3 hover:bg-[#a34a0e] transition-colors">
                  Consulter le rapport en ligne
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button className="inline-flex items-center justify-center gap-2 border border-gray-300 text-[#353A3F] text-sm font-semibold rounded-xl px-6 py-3 hover:bg-gray-50 transition-colors">
                  Télécharger le PDF
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Nos engagements — 4 pillars ── */}
      <section className="py-10 sm:py-16 bg-[#F9F8F6]">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 sm:text-center">
          <h2 className="text-2xl font-black text-[#353A3F] text-left sm:text-center mb-5 sm:mb-10">
            Nos engagements
          </h2>

          {/* Mobile: horizontal icon-text list with dividers */}
          <div className="sm:hidden divide-y divide-gray-200">
            {pillars.map((p) => (
              <div key={p.label} className="flex items-center gap-3 py-3.5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                  <p.Icon className="w-5 h-5 text-[#C75B12]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#353A3F]">{p.label}</p>
                  <p className="text-xs text-[#6B7280] leading-relaxed mt-0.5">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop/tablet: original grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p) => (
              <div key={p.label} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-white border border-gray-100 flex items-center justify-center mb-4 shadow-sm">
                  <p.Icon className="w-6 h-6 text-[#C75B12]" strokeWidth={1.5} />
                </div>
                <p className="font-bold text-[#353A3F] mb-2">{p.label}</p>
                <p className="text-xs text-[#6B7280] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Objectifs d'émissions carbone ── */}
      <section className="bg-[#353A3F] py-8 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-white/60 text-xs font-semibold tracking-[0.2em] uppercase mb-5 sm:mb-6">
            Objectifs d'émissions carbone
          </p>
          {/* Always side-by-side — mobile and desktop */}
          <div className="flex items-center justify-center gap-0">
            <div className="flex-1 text-center px-4 sm:px-10">
              <p className="text-4xl sm:text-5xl font-black text-white mb-1">−25 %</p>
              <p className="text-white/60 text-sm">d'ici 2026</p>
            </div>
            <div className="w-px h-12 sm:h-16 bg-white/20 flex-shrink-0" />
            <div className="flex-1 text-center px-4 sm:px-10">
              <p className="text-4xl sm:text-5xl font-black text-white mb-1">−50 %</p>
              <p className="text-white/60 text-sm">d'ici 2030</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Nos engagements en action ── */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 sm:text-center">
          <h2 className="text-2xl font-black text-[#353A3F] text-left sm:text-center mb-5 sm:mb-10">
            Nos engagements en action
          </h2>

          {/* Mobile: horizontal icon-text list with dividers */}
          <div className="sm:hidden divide-y divide-gray-100">
            {actions.map((a) => (
              <div key={a.label} className="flex items-center gap-3 py-3.5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F5F0E8] flex items-center justify-center">
                  <a.Icon className="w-5 h-5 text-[#C75B12]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#353A3F]">{a.label}</p>
                  <p className="text-xs text-[#6B7280] leading-relaxed mt-0.5">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop/tablet: original grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {actions.map((a) => (
              <div key={a.label} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#F5F0E8] flex items-center justify-center mb-4">
                  <a.Icon className="w-6 h-6 text-[#C75B12]" strokeWidth={1.5} />
                </div>
                <p className="font-bold text-[#353A3F] text-sm mb-2">{a.label}</p>
                <p className="text-xs text-[#6B7280] leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="py-14 bg-[#F9F8F6] text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-xl font-black text-[#353A3F] mb-7">
            Ensemble, construisons un avenir{" "}
            <span className="italic font-black">plus responsable.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="inline-flex items-center justify-center gap-2 bg-[#C75B12] text-white text-sm font-semibold rounded-xl px-6 py-3 hover:bg-[#a34a0e] transition-colors">
              Télécharger le rapport RSE
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onContactClick}
              className="inline-flex items-center justify-center gap-2 border border-[#353A3F] text-[#353A3F] text-sm font-semibold rounded-xl px-6 py-3 hover:bg-[#353A3F]/5 transition-colors"
            >
              Nous écrire
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
