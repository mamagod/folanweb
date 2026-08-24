import { useState, useRef } from "react";
import { ArrowLeft, ArrowRight, MapPin, Building2, Calendar, Search } from "lucide-react";
import { CASE_STUDIES } from "../data/caseStudies";

interface CasClientsPageProps {
  onBack: () => void;
  onCaseClick: (slug: string) => void;
  onContactClick?: () => void;
}

const SECTOR_COLORS: Record<string, string> = {
  "Finance & Datacenter": "bg-blue-100 text-blue-700 border-blue-200",
  "Santé": "bg-green-100 text-green-700 border-green-200",
  "Télécom": "bg-purple-100 text-purple-700 border-purple-200",
  "Enseignement supérieur": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Industrie & Logistique": "bg-orange-100 text-orange-700 border-orange-200",
  "Sports & Événementiel": "bg-red-100 text-red-700 border-red-200",
};

function SectorBadge({ sector }: { sector: string }) {
  const cls = SECTOR_COLORS[sector] ?? "bg-gray-100 text-gray-700 border-gray-200";
  return (
    <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-full border ${cls} whitespace-nowrap`}>
      {sector}
    </span>
  );
}

export function CasClientsPage({ onBack, onCaseClick, onContactClick }: CasClientsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const sectors = Array.from(new Set(CASE_STUDIES.map((c) => c.sector)));

  // Refs for auto-scroll-to-selected filter on mobile
  const filterRowRef = useRef<HTMLDivElement>(null);
  const filterBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectSector = (sector: string | null, btnIndex: number) => {
    setSelectedSector(sector);
    const container = filterRowRef.current;
    const btn = filterBtnRefs.current[btnIndex];
    if (container && btn) {
      const target = Math.max(0, btn.offsetLeft - 16);
      container.scrollTo({ left: target, behavior: "smooth" });
    }
  };

  const filtered = CASE_STUDIES.filter((c) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      q === "" ||
      c.title.toLowerCase().includes(q) ||
      c.subtitle.toLowerCase().includes(q) ||
      c.location.toLowerCase().includes(q) ||
      c.tags.some((t) => t.toLowerCase().includes(q));
    const matchesSector = selectedSector === null || c.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const featured = filtered.filter((c) => c.featured);
  const rest = filtered.filter((c) => !c.featured);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero */}
      <div className="relative bg-[#353A3F] text-white py-14 lg:py-20 overflow-hidden">
        <div className="absolute right-0 top-0 w-[55%] h-full hidden lg:block pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=80"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, #353A3F 0%, #353A3F 5%, rgba(53,58,63,0.85) 35%, rgba(53,58,63,0.2) 70%, transparent 100%)" }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </button>

          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 bg-[#C75B12] rounded-xl flex items-center justify-center flex-shrink-0">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-[#C75B12] text-xs font-bold tracking-[0.2em] uppercase mb-0.5">Ressources</p>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">Cas clients</h1>
            </div>
          </div>

          <p className="text-white/80 text-lg max-w-xl leading-relaxed">
            Découvrez comment FOLAN accompagne ses clients dans leurs projets fibre optique les plus exigeants — datacenters, hôpitaux, opérateurs, campus et infrastructures industrielles.
          </p>

          {/* grid keeps all three equal-width with no overflow at any screen size */}
          <div className="grid grid-cols-3 divide-x divide-white/20 mt-10 pt-8 border-t border-white/20">
            {[
              { value: "6+",  label: "Secteurs d'activité" },
              { value: "3",   label: "Pays d'intervention" },
              { value: "30+", label: "Projets documentés" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center px-2 sm:px-6">
                <div className="text-2xl font-bold text-[#C75B12]">{value}</div>
                <div className="text-white/60 text-[11px] sm:text-xs mt-0.5 leading-snug">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters + content */}
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-7 lg:py-10">

        {/* ── Search + sector filters ── */}
        <div className="mb-5 space-y-2.5">
          {/* Search — slightly less tall */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un cas client…"
              className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C75B12] focus:border-transparent outline-none text-sm"
            />
          </div>

          {/* Sector filters — draggable/scrollable row on mobile, wraps on sm+ */}
          <div
            ref={filterRowRef}
            className="flex gap-2 overflow-x-auto pb-0.5 sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: "none" }}
          >
            <button
              ref={(el) => { filterBtnRefs.current[0] = el; }}
              onClick={() => selectSector(null, 0)}
              className={`flex-shrink-0 px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                selectedSector === null
                  ? "bg-[#353A3F] text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#353A3F]"
              }`}
            >
              Tous les secteurs
            </button>
            {sectors.map((s, i) => (
              <button
                key={s}
                ref={(el) => { filterBtnRefs.current[i + 1] = el; }}
                onClick={() => selectSector(s, i + 1)}
                className={`flex-shrink-0 px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  selectedSector === s
                    ? "bg-[#353A3F] text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#353A3F]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7 text-gray-400" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Aucun résultat</h3>
            <p className="text-gray-500 text-sm mb-4">Essayez d'autres mots-clés ou secteurs</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedSector(null); }}
              className="text-[#C75B12] hover:text-[#a34a0e] font-medium text-sm"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <>
            {/* ── Featured cards — compact full-width ── */}
            {featured.length > 0 && (
              <div className="mb-5 space-y-4">
                {featured.map((cs) => (
                  <button
                    key={cs.id}
                    onClick={() => onCaseClick(cs.slug)}
                    className="group w-full bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#C75B12]/50 hover:shadow-lg transition-all duration-300 text-left flex flex-col md:flex-row"
                  >
                    {/* Image — reduced mobile height */}
                    <div className="relative md:w-[40%] h-36 md:h-auto overflow-hidden flex-shrink-0">
                      <img
                        src={cs.image}
                        alt={cs.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/20" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.5 bg-[#C75B12] text-white text-[10px] font-bold rounded-full uppercase tracking-wide">
                          Cas à la une
                        </span>
                      </div>
                    </div>

                    {/* Content — tighter padding */}
                    <div className="flex flex-col justify-between p-4 md:p-6 flex-1">
                      <div>
                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <SectorBadge sector={cs.sector} />
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <MapPin className="w-3 h-3" />{cs.location}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />{cs.year}
                          </span>
                        </div>

                        <h2 className="text-base lg:text-xl font-bold text-[#1B2A4A] group-hover:text-[#C75B12] transition-colors mb-1.5 leading-snug">
                          {cs.title}
                        </h2>
                        <p className="text-gray-500 text-sm mb-3 leading-relaxed line-clamp-2">{cs.subtitle}</p>

                        {/* Key results — single row */}
                        <div className="flex flex-wrap gap-4">
                          {cs.results.map((r) => (
                            <div key={r.label}>
                              <div className="text-lg font-bold text-[#C75B12]">
                                {r.value}<span className="text-xs ml-0.5">{r.unit}</span>
                              </div>
                              <div className="text-xs text-gray-500">{r.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3 flex items-center text-[#C75B12] text-sm font-semibold gap-1.5">
                        Lire le cas client
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* ── Regular cases — horizontal on mobile, grid on sm+ ── */}
            {rest.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {rest.map((cs) => (
                  <button
                    key={cs.id}
                    onClick={() => onCaseClick(cs.slug)}
                    className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#C75B12]/50 hover:shadow-md transition-all duration-300 text-left flex flex-row sm:flex-col"
                  >
                    {/* Image */}
                    <div className="relative w-[100px] flex-shrink-0 self-stretch sm:w-full sm:h-36 overflow-hidden">
                      <img
                        src={cs.image}
                        alt={cs.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Overlay badges — desktop only (bottom overlay) */}
                      <div className="hidden sm:flex absolute bottom-2.5 left-2.5 right-2.5 items-end justify-between">
                        <SectorBadge sector={cs.sector} />
                        <span className="text-white/80 text-xs">{cs.year}</span>
                      </div>
                      {/* Mobile gradient for thumbnail depth */}
                      <div className="sm:hidden absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
                    </div>

                    {/* Content */}
                    <div className="p-3 sm:p-4 flex flex-col flex-1 min-w-0">
                      {/* Mobile: sector + year inline since image has no overlay */}
                      <div className="flex sm:hidden items-center gap-1.5 mb-1.5 flex-wrap">
                        <SectorBadge sector={cs.sector} />
                        <span className="text-[11px] text-gray-400">{cs.year}</span>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{cs.location}</span>
                      </div>

                      <h3 className="text-sm font-bold text-[#1B2A4A] group-hover:text-[#C75B12] transition-colors leading-snug line-clamp-2 flex-1 mb-2">
                        {cs.title}
                      </h3>

                      {/* Key figure */}
                      <div className="border-t border-gray-100 pt-2 mt-auto">
                        <span className="text-base font-bold text-[#C75B12]">
                          {cs.results[0].value}
                          <span className="text-xs ml-0.5">{cs.results[0].unit}</span>
                        </span>
                        <span className="text-xs text-gray-500 ml-1.5">{cs.results[0].label}</span>
                      </div>

                      <div className="flex items-center text-[#C75B12] text-xs font-semibold gap-1 mt-2">
                        Lire le cas client
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {/* CTA */}
        <div className="mt-10 rounded-2xl bg-[#353A3F] p-7 lg:p-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <p className="text-[#C75B12] text-[11px] font-bold tracking-[0.18em] uppercase mb-1.5">Votre projet</p>
            <h3 className="text-lg font-bold text-white mb-1">Vous avez un projet similaire ?</h3>
            <p className="text-white/65 text-sm max-w-md leading-relaxed">
              Nos équipes en France, au Royaume-Uni et en Allemagne sont prêtes à analyser votre besoin et à vous proposer une solution sur mesure.
            </p>
          </div>
          <button
            onClick={onContactClick}
            className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-[#C75B12] hover:bg-[#a34a0e] text-white font-semibold rounded-xl transition-colors text-sm whitespace-nowrap"
          >
            Parler à un expert
          </button>
        </div>
      </div>
    </div>
  );
}
