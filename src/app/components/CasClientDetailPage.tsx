import { ArrowLeft, MapPin, Calendar, CheckCircle, Quote, Tag, ChevronRight } from "lucide-react";
import { CASE_STUDIES } from "../data/caseStudies";

interface CasClientDetailPageProps {
  slug: string;
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

export function CasClientDetailPage({ slug, onBack, onCaseClick, onContactClick }: CasClientDetailPageProps) {
  const cs = CASE_STUDIES.find((c) => c.slug === slug);

  if (!cs) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <p className="text-5xl">📁</p>
        <h2 className="text-2xl font-semibold text-[#353A3F]">Cas client introuvable</h2>
        <p className="text-gray-500 text-sm">Ce cas client n'existe pas ou a été retiré.</p>
        <button
          onClick={onBack}
          className="mt-2 bg-[#C75B12] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#a34a0e] transition-colors"
        >
          Retour aux cas clients
        </button>
      </div>
    );
  }

  const sectorCls = SECTOR_COLORS[cs.sector] ?? "bg-gray-100 text-gray-700 border-gray-200";
  const related = (cs.relatedSlugs ?? [])
    .map((s) => CASE_STUDIES.find((c) => c.slug === s))
    .filter(Boolean) as typeof CASE_STUDIES;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[300px] lg:h-[440px] overflow-hidden">
        <img
          src={cs.image}
          alt={cs.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1d20]/90 via-[#1a1d20]/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-5xl mx-auto px-4 lg:px-8 pb-8 lg:pb-14 w-full">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white/80 hover:text-white mb-5 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Tous les cas clients
            </button>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-full border ${sectorCls}`}>
                {cs.sector}
              </span>
              <span className="flex items-center gap-1.5 text-white/70 text-xs">
                <MapPin className="w-3.5 h-3.5" />
                {cs.location}
              </span>
              <span className="flex items-center gap-1.5 text-white/70 text-xs">
                <Calendar className="w-3.5 h-3.5" />
                {cs.year}
              </span>
            </div>
            <h1 className="text-2xl lg:text-4xl font-bold text-white leading-snug mb-2">{cs.title}</h1>
            <p className="text-white/75 text-base lg:text-lg">{cs.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Key results bar */}
      <div className="bg-[#353A3F]">
        <div className="max-w-5xl mx-auto px-4 lg:px-8 py-6 grid grid-cols-3 divide-x divide-white/20">
          {cs.results.map((r) => (
            <div key={r.label} className="px-4 lg:px-8 first:pl-0 last:pr-0 text-center">
              <div className="text-2xl lg:text-3xl font-bold text-[#C75B12]">
                {r.value}
                {r.unit && <span className="text-base lg:text-lg ml-1 font-semibold">{r.unit}</span>}
              </div>
              <div className="text-white/60 text-xs mt-1 leading-tight">{r.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-12 lg:py-16">

        {/* Context strip */}
        <div className="flex flex-wrap gap-4 mb-10 p-4 bg-gray-50 rounded-xl border border-gray-100">
          {[
            { label: "Client", value: cs.client },
            { label: "Secteur", value: cs.sector },
            { label: "Lieu", value: cs.location },
            { label: "Année", value: String(cs.year) },
          ].map(({ label, value }) => (
            <div key={label} className="flex-1 min-w-[140px]">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{label}</div>
              <div className="text-sm font-semibold text-[#353A3F]">{value}</div>
            </div>
          ))}
        </div>

        {/* Challenge + Solution */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-14">
          <div>
            <h2 className="text-lg font-bold text-[#353A3F] mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-gray-400 rounded-full flex-shrink-0" />
              Le défi
            </h2>
            <p className="text-gray-600 leading-relaxed text-[15px]">{cs.challenge}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#353A3F] mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#C75B12] rounded-full flex-shrink-0" />
              La solution FOLAN
            </h2>
            <p className="text-gray-600 leading-relaxed text-[15px] mb-5">{cs.solution}</p>
            <div className="space-y-2.5">
              {cs.solutionDetails.map((d, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#C75B12] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm leading-relaxed">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products used */}
        <div className="mb-14">
          <h2 className="text-lg font-bold text-[#353A3F] mb-4 flex items-center gap-2">
            <Tag className="w-5 h-5 text-[#C75B12]" />
            Produits & solutions utilisés
          </h2>
          <div className="flex flex-wrap gap-2">
            {cs.productsUsed.map((p) => (
              <span
                key={p}
                className="px-3.5 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg border border-gray-200 font-medium"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Quote */}
        {cs.quote && (
          <div className="mb-14 bg-gradient-to-br from-[#F5F7FB] to-white border border-gray-200 rounded-2xl p-8 lg:p-10 relative overflow-hidden">
            <Quote className="absolute top-6 right-6 w-10 h-10 text-gray-200" />
            <blockquote className="text-[#353A3F] text-lg font-medium leading-relaxed mb-5 relative z-10">
              "{cs.quote.text}"
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#C75B12] flex items-center justify-center text-white text-xs font-bold">
                {cs.quote.author.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-semibold text-[#353A3F]">{cs.quote.author}</div>
                <div className="text-xs text-gray-500">{cs.quote.role}</div>
              </div>
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="mb-14">
          <div className="flex flex-wrap gap-2">
            {cs.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-[#353A3F]/10 text-[#353A3F] text-xs font-medium rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related cases */}
        {related.length > 0 && (
          <div className="mb-14 pt-10 border-t border-gray-100">
            <h2 className="text-xl font-bold text-[#353A3F] mb-6">Cas clients similaires</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((rc) => (
                <button
                  key={rc.slug}
                  onClick={() => onCaseClick(rc.slug)}
                  className="group text-left border border-gray-200 rounded-xl overflow-hidden hover:border-[#C75B12]/50 hover:shadow-md transition-all flex"
                >
                  <div className="w-24 h-full flex-shrink-0 overflow-hidden">
                    <img
                      src={rc.image}
                      alt={rc.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <span className="text-[10px] font-bold text-[#C75B12] uppercase tracking-widest">{rc.sector}</span>
                      <h3 className="text-sm font-semibold text-[#353A3F] group-hover:text-[#C75B12] transition-colors mt-1 line-clamp-2 leading-snug">
                        {rc.title}
                      </h3>
                    </div>
                    <div className="flex items-center text-[#C75B12] text-xs font-semibold mt-2 gap-0.5">
                      Voir <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="rounded-2xl bg-[#353A3F] p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[#C75B12] text-[11px] font-bold tracking-[0.18em] uppercase mb-2">Votre projet</p>
            <h3 className="text-xl font-bold text-white mb-1.5">Vous avez un projet similaire ?</h3>
            <p className="text-white/65 text-sm max-w-md leading-relaxed">
              Parlons de votre contexte. Nos experts vous proposent une analyse gratuite et une première recommandation sous 48h.
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
