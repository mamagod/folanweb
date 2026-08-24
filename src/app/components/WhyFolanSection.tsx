import { ArrowRight } from "lucide-react";

/* ── Stat data ── */
const STATS = [
  { value: "35+",   label: "ans d'expertise fibre",  accent: true  },
  { value: "ISO",   label: "Qualité certifiée",       accent: false },
  { value: "48h",   label: "Livraison rapide",        accent: false },
  { value: "4.8/5", label: "Avis clients vérifiés",  accent: true  },
];

/* ── 3 advantage cards ── */
const CARDS = [
  {
    title: "Choix & compatibilité",
    desc:  "Des références adaptées aux principales Box et installations réseau.",
    Icon: () => (
      /* Fiber connector with checkmark */
      <svg viewBox="0 0 40 40" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-[#C75B12]" stroke="currentColor">
        {/* connector body */}
        <rect x="4" y="16" width="18" height="8" rx="2" />
        <line x1="22" y1="18" x2="28" y2="18" />
        <line x1="22" y1="22" x2="28" y2="22" />
        <rect x="28" y="15" width="5" height="10" rx="1.5" />
        {/* checkmark badge */}
        <circle cx="32" cy="11" r="5.5" />
        <path d="M29.5 11l2 2 3-3" />
      </svg>
    ),
  },
  {
    title: "Qualité contrôlée",
    desc:  "Des produits sélectionnés et testés par les équipes FOLAN.",
    Icon: () => (
      /* Shield with checkmark */
      <svg viewBox="0 0 40 40" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-[#C75B12]" stroke="currentColor">
        <path d="M20 5l13 4.5v10C33 27 27.5 33.5 20 36 12.5 33.5 7 27 7 19.5v-10L20 5z" />
        <path d="M15 20l3.5 3.5 6.5-7" />
      </svg>
    ),
  },
  {
    title: "Support technique & projets",
    desc:  "Des conseils pour les particuliers, installateurs et entreprises.",
    Icon: () => (
      /* Headset */
      <svg viewBox="0 0 40 40" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-[#C75B12]" stroke="currentColor">
        <path d="M8 22v-4a12 12 0 0124 0v4" />
        <rect x="6" y="22" width="5" height="8" rx="2.5" />
        <rect x="29" y="22" width="5" height="8" rx="2.5" />
        <path d="M34 30v1a4 4 0 01-4 4h-4" />
        <circle cx="26" cy="35" r="1.5" />
      </svg>
    ),
  },
];

/* ── Dot-grid background ── */
function DotGrid() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      {Array.from({ length: 22 }, (_, r) =>
        Array.from({ length: 60 }, (_, c) => (
          <circle key={`${r}-${c}`} cx={c * 28 + 14} cy={r * 28 + 14} r="1.2" fill="#A0A3A7" fillOpacity="0.28" />
        ))
      )}
    </svg>
  );
}

export function WhyFolanSection({ onContactClick }: { onContactClick?: () => void }) {
  return (
    <section className="relative overflow-hidden bg-[#F4F4F5] py-12 lg:py-16 border-t border-[#E3E8EF]">
      <DotGrid />

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6 space-y-8 lg:space-y-10">

        {/* ── Row 1: title left + stats right ── */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">

          {/* Left: heading block */}
          <div className="flex-shrink-0 lg:w-[38%] space-y-4">
            <p className="text-[11px] font-bold tracking-[0.22em] text-[#C75B12] uppercase">
              Expertise · Qualité · Service
            </p>
            <h2 className="text-3xl lg:text-[2.4rem] font-extrabold text-[#353A3F] tracking-tight leading-tight">Pourquoi choisir FOLAN ?</h2>
            <p className="text-sm lg:text-base text-[#6B7280] leading-relaxed max-w-sm">
              Une expertise fibre reconnue pour accompagner les particuliers, installateurs et entreprises.
            </p>
          </div>

          {/* Right: stats card */}
          <div className="flex-1 bg-white rounded-2xl border border-[#E3E8EF] shadow-sm overflow-hidden">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#E3E8EF]">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col items-center justify-center text-center px-6 py-6 lg:py-8">
                  <span className={`text-3xl lg:text-4xl font-extrabold tracking-tight leading-none ${s.accent ? "text-[#C75B12]" : "text-[#353A3F]"}`}>
                    {s.value}
                  </span>
                  <span className="mt-2 text-xs text-[#6B7280] font-medium leading-tight max-w-[90px]">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Row 2: 3 white advantage cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CARDS.map((card) => {
            const { Icon } = card;
            return (
              <div
                key={card.title}
                className="bg-white rounded-2xl border border-[#E3E8EF] p-6 flex items-start gap-4 shadow-sm hover:shadow-md hover:border-[#C75B12]/25 transition-all duration-200"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: "#FEF0E6" }}>
                  <Icon />
                </div>
                <div className="min-w-0 pt-0.5">
                  <h3 className="text-sm font-bold text-[#2A2E32] leading-snug mb-1.5">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CTA Strip — primary commercial inquiry CTA ── */}
        

      </div>
    </section>
  );
}
