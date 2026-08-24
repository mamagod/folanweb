import { Award, Leaf, ShieldCheck, Download, ChevronRight, CheckCircle, Settings, TrendingUp, Smile } from "lucide-react";

const certs = [
  {
    code: "ISO 9001:2015",
    label: "QUALITÉ",
    Icon: Award,
    desc: "Cette certification atteste de notre système de management de la qualité et de notre capacité à fournir des produits et services conformes aux exigences de nos clients et aux réglementations applicables.",
  },
  {
    code: "ISO 14001:2015",
    label: "ENVIRONNEMENT",
    Icon: Leaf,
    desc: "Notre système de management environnemental vise à réduire l'impact de nos activités, maîtriser nos consommations et promouvoir des pratiques responsables et durables.",
  },
  {
    code: "ISO 45001:2018",
    label: "SANTÉ & SÉCURITÉ",
    Icon: ShieldCheck,
    desc: "Cette certification démontre notre engagement à prévenir les risques professionnels et à garantir des conditions de travail sûres et saines pour l'ensemble de nos collaborateurs.",
  },
];

const steps = [
  {
    num: "01",
    title: "Conception &\nqualification",
    desc: "Concevoir des solutions performantes, fiables et conformes aux exigences applicables.",
    Icon: CheckCircle,
  },
  {
    num: "02",
    title: "Production &\ncontrôle",
    desc: "Maîtriser nos procédés de fabrication et garantir des contrôles qualité rigoureux.",
    Icon: Settings,
  },
  {
    num: "03",
    title: "Amélioration\ncontinue",
    desc: "Analyser nos résultats, identifier les axes de progrès et renforcer nos performances.",
    Icon: TrendingUp,
  },
  {
    num: "04",
    title: "Satisfaction\nclient",
    desc: "Être à l'écoute de nos clients et partenaires pour répondre à leurs attentes et bâtir des relations durables.",
    Icon: Smile,
  },
];

interface ISOPageProps {
  onBack?: () => void;
  onContactClick?: () => void;
  onRSEClick?: () => void;
}

export function ISOPage({ onBack, onContactClick, onRSEClick }: ISOPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Banner ── */}
      <section className="bg-[#F5F0E8] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20 flex flex-col lg:flex-row items-center gap-12">
          {/* Left text */}
          <div className="flex-1 lg:max-w-[480px]">
            <p className="text-[#C75B12] text-xs font-bold tracking-[0.2em] uppercase mb-4">
              — Qualité &amp; Engagements
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-[#353A3F] leading-tight mb-5">
              Nos certifications ISO
            </h1>
            <p className="text-[#6B7280] text-base leading-relaxed">
              Certifiée ISO 9001 depuis 1999, FOLAN a étendu son système de management à
              l'environnement et à la santé-sécurité au travail à partir de 2014.
            </p>
          </div>

          {/* Right: 3 booklets — flex row with arc lift on center card */}
          <div className="w-full lg:w-auto flex-shrink-0 flex justify-center items-end pb-6">
            <div className="flex gap-4 sm:gap-5 items-end">
              {certs.map((cert, i) => (
                <div
                  key={cert.code}
                  className={`bg-white rounded-2xl flex flex-col items-center text-center py-7 px-4 sm:px-6 w-32 sm:w-40 transition-transform ${
                    i === 1 ? "-translate-y-5" : "translate-y-0"
                  }`}
                  style={{
                    boxShadow:
                      i === 1
                        ? "0 20px 50px rgba(0,0,0,0.13), 0 4px 12px rgba(0,0,0,0.07)"
                        : "0 8px 28px rgba(0,0,0,0.09), 0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <cert.Icon
                    className="w-10 h-10 sm:w-12 sm:h-12 text-[#C75B12] mb-4"
                    strokeWidth={1.5}
                  />
                  <p className="text-[12px] sm:text-[13px] font-bold text-[#353A3F] leading-snug mb-2">
                    {cert.code}
                  </p>
                  <div className="w-7 h-0.5 bg-[#C75B12] mb-2" />
                  <p className="text-[9px] sm:text-[10px] font-black text-[#353A3F] tracking-[0.15em]">
                    {cert.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Certification cards ── */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-5 md:px-6">

          {/* ── Mobile: compact icon-text rows ── */}
          <div className="md:hidden divide-y divide-gray-100">
            {certs.map((cert) => (
              <div key={cert.code} className="flex items-start gap-4 py-5">
                {/* Icon */}
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-[#F5F0E8] flex items-center justify-center mt-0.5">
                  <cert.Icon className="w-5 h-5 text-[#C75B12]" strokeWidth={1.5} />
                </div>

                {/* Text block */}
                <div className="flex-1 min-w-0">
                  {/* ISO number + inline download */}
                  <div className="flex items-baseline justify-between gap-3 mb-0.5">
                    <p className="text-[15px] font-bold text-[#353A3F] leading-tight">{cert.code}</p>
                    <button className="flex-shrink-0 flex items-center gap-1 text-[11px] font-semibold text-[#C75B12] hover:text-[#a34a0e] transition-colors whitespace-nowrap">
                      <Download className="w-3 h-3" />
                      Certificat
                    </button>
                  </div>
                  {/* Category label */}
                  <p className="text-[10px] font-black tracking-[0.18em] text-[#C75B12] mb-2">{cert.label}</p>
                  {/* Description */}
                  <p className="text-xs text-[#6B7280] leading-relaxed">{cert.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Desktop: original 3-column bordered cards ── */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {certs.map((cert) => (
              <div
                key={cert.code}
                className="border border-gray-200 rounded-2xl p-7 flex flex-col items-center text-center"
              >
                <cert.Icon className="w-12 h-12 text-[#C75B12] mb-4" strokeWidth={1.5} />
                <p className="text-lg font-bold text-[#353A3F] mb-1">{cert.code}</p>
                <div className="w-7 h-0.5 bg-[#C75B12] mb-2" />
                <p className="text-[10px] font-black tracking-[0.15em] text-[#353A3F] mb-5">{cert.label}</p>
                <p className="text-sm text-[#6B7280] leading-relaxed mb-7 flex-1">{cert.desc}</p>
                <button className="flex items-center gap-2 border border-[#C75B12] text-[#C75B12] text-sm font-semibold rounded-xl px-5 py-2.5 hover:bg-orange-50 transition-colors">
                  Télécharger le certificat
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Une démarche intégrée ── */}
      <section className="py-10 md:py-16 bg-[#F9F8F6]">
        <div className="max-w-5xl mx-auto px-5 md:px-6 md:text-center">
          <h2 className="text-2xl font-black text-[#353A3F] mb-2 text-left md:text-center">
            Une démarche intégrée
          </h2>
          <div className="w-10 h-0.5 bg-[#C75B12] mb-3 md:mx-auto" />
          <p className="text-[#6B7280] mb-8 md:mb-12 max-w-xl md:mx-auto text-sm leading-relaxed text-left md:text-center">
            Nos certifications s'appuient sur une approche globale et cohérente,
            intégrée à toutes les étapes de notre chaîne de valeur.
          </p>

          {/* ── Mobile: numbered icon-text rows ── */}
          <div className="md:hidden divide-y divide-gray-200">
            {steps.map((step) => (
              <div key={step.num} className="flex items-start gap-4 py-5">
                {/* Step badge: icon + number */}
                <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
                  <div className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                    <step.Icon className="w-5 h-5 text-[#C75B12]" strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] font-black text-[#C75B12] leading-none tracking-wider">{step.num}</span>
                </div>

                {/* Title + description */}
                <div className="flex-1 pt-1">
                  <p className="text-sm font-bold text-[#353A3F] mb-1.5 leading-snug">
                    {step.title.replace("\n", " ")}
                  </p>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Desktop: original horizontal flow ── */}
          <div className="hidden md:flex md:flex-row items-start justify-center gap-4 md:gap-0">
            {steps.map((step, i) => (
              <div key={step.num} className="flex md:flex-row items-start flex-1">
                <div className="flex flex-col items-center text-center px-3 flex-1">
                  <div className="w-16 h-16 rounded-full bg-white border border-gray-100 flex items-center justify-center mb-4 shadow-sm">
                    <step.Icon className="w-7 h-7 text-[#C75B12]" strokeWidth={1.5} />
                  </div>
                  <p className="text-[#C75B12] font-black text-lg mb-1">{step.num}</p>
                  <p className="font-bold text-[#353A3F] text-sm mb-2 whitespace-pre-line">{step.title}</p>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block w-6 h-px bg-gray-300 mt-8 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-10 md:py-16 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="w-12 h-12 rounded-full bg-[#F5F0E8] flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-6 h-6 text-[#C75B12]" />
          </div>
          <h2 className="text-2xl font-black text-[#353A3F] mb-6 leading-snug">
            Qualité, environnement et sécurité :<br className="hidden sm:block" /> un
            engagement quotidien.
          </h2>
          <button
            onClick={onRSEClick}
            className="inline-flex items-center gap-2 bg-[#C75B12] text-white text-sm font-semibold rounded-xl px-7 py-3.5 hover:bg-[#a34a0e] transition-colors"
          >
            Découvrir notre démarche RSE
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
