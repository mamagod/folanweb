import { useState, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Factory,
  Wrench,
  Package,
  Megaphone,
  Handshake,
  Lightbulb,
  Cpu,
} from "lucide-react";
import folanBuilding from "../../imports/image-11.png";
import mapEurope from "@/imports/image-16.png";
import mapEuropeNew from "@/imports/image-18.png";
import flagFR from "@/imports/folan-flag-pin-fr.svg";
import flagGB from "@/imports/folan-flag-pin-gb.svg";
import flagDE from "@/imports/folan-flag-pin-de.svg";
import flagCN from "@/imports/folan-flag-pin-cn.svg";

interface AboutPageProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
  onContactClick?: () => void;
}

const timeline = [
  { year: "1988", event: "Naissance d'ICTL à Vénissieux (69) spécialisée dans l'assemblage de connectique optique." },
  { year: "1991", event: "Création des premiers tiroirs optiques et obtention du prix Raymond Barre." },
  { year: "1994", event: "Obtention de la norme ISO 9001 et installation dans un atelier de 400 m²." },
  { year: "1998", event: "ICTL fête ses 10 ans avec 15 salariés et 1,7 million d'euros de chiffre d'affaires." },
  { year: "1999", event: "Installation dans de nouveaux locaux à Vaulx-en-Velin." },
  { year: "2000", event: "Mise en place des premiers partenariats de production en Asie." },
  { year: "2002", event: "Dépôt de la marque FOLAN et ouverture du service de location de matériel." },
  { year: "2003", event: "Création d'un laboratoire de maintenance, certification et validation." },
  { year: "2005", event: "Brevet des cassettes d'épissurage et du système de crabotage." },
  { year: "2006", event: "Création de la première PTO destinée aux réseaux FTTH." },
  { year: "2007", event: "Extension du site à 2 800 m² de locaux." },
  { year: "2008", event: "FOLAN fête ses 20 ans avec 50 salariés." },
  { year: "2010", event: "Création de la société FOLAN à Perpignan (66) et Barcelone." },
  { year: "2013", event: "ICTL et FOLAN se regroupent sous le nom FOLAN." },
  { year: "2017", event: "Acquisition d'ICS, InterConnect Systems." },
  { year: "2018", event: "FOLAN fête ses 30 ans et s'installe sur un nouveau site à Rillieux la pape (69)." },
  { year: "2019", event: "Lancement du tiroir plastique breveté." },
  { year: "2021", event: "Acquisition de Mainframe Communications Limited au Royaume-Uni." },
  { year: "2023", event: "Création de FOLAN GmbH en Allemagne." },
  { year: "2024", event: "Mainframe Communications devient FOLAN Technologies." },
  { year: "2026", event: "Acquisition de l'offre OptiliteDCS (Angleterre) et création de l'offre Data Center FolanDCS." },
];

const competences = [
  {
    id: "production",
    label: "Pôle production",
    icon: Factory,
    description: "Des capacités adaptées aux petites, moyennes et grandes séries.",
    bg: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
  {
    id: "technique",
    label: "Pôle technique",
    icon: Wrench,
    description: "Bureau d'études, laboratoire de tests et contrôle qualité.",
    bg: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
  {
    id: "logistique",
    label: "Pôle logistique",
    icon: Package,
    description: "Gestion des stocks, contrôle qualité, expédition et optimisation des livraisons.",
    bg: "https://images.unsplash.com/photo-1553413077-190dd305871c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
  {
    id: "marketing",
    label: "Pôle marketing",
    icon: Megaphone,
    description: "Étude des projets clients et développement de composants et solutions.",
    bg: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
  {
    id: "commercial",
    label: "Pôle commercial",
    icon: Handshake,
    description: "Suivi client, conseil technique, disponibilité et réactivité.",
    bg: "https://images.unsplash.com/photo-1556761175-4b46a572b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
];

export function AboutPage({ onBack, onNavigate, onContactClick }: AboutPageProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeYear, setActiveYear] = useState<string | null>(null);
  const [hoveredPole, setHoveredPole] = useState<string | null>(null);
  const [expandedPole, setExpandedPole] = useState<string | null>(null);


  const scrollTimeline = (dir: "left" | "right") => {
    if (!timelineRef.current) return;
    timelineRef.current.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  const handlePoleClick = (id: string) => {
    setExpandedPole((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-white min-h-screen">

      {/* ── 1. HERO ── */}
      <section className="relative overflow-hidden min-h-[520px] lg:min-h-[600px] flex">
        {/* Left: blue panel */}
        <div className="relative z-10 flex flex-col justify-center px-8 lg:px-16 py-16 bg-transparent lg:bg-[#353A3F] w-full lg:w-1/2 flex-shrink-0">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/70 hover:text-white mb-10 text-sm transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>

          <div className="inline-flex items-center gap-2 mb-5">
            <span className="w-8 h-px bg-[#C75B12]" />
            <span className="text-[#C75B12] text-xs font-semibold tracking-widest uppercase">
              La société — Depuis 1988
            </span>
          </div>

          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-6 max-w-lg">
            L'expertise française au cœur des réseaux fibre optique
          </h1>

          <p className="text-white/80 text-base lg:text-lg leading-relaxed mb-8 max-w-md">
            FOLAN conçoit et fabrique des solutions fibre optique destinées aux particuliers,
            aux professionnels et aux infrastructures réseau.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#histoire"
              onClick={(e) => { e.preventDefault(); document.getElementById("histoire")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#C75B12] text-white text-sm font-semibold rounded-lg hover:bg-[#a84c0f] transition-colors"
            >
              Découvrir notre histoire
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => onNavigate?.("home")}
              className="inline-flex items-center gap-2 px-5 py-3 border border-white/30 text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Voir nos produits
            </button>
          </div>
        </div>

        {/* Building photo — mobile: full-bleed background; desktop: right half only */}
        <div className="absolute inset-0 lg:left-1/2 lg:right-0 lg:top-0 lg:bottom-0">
          <img
            src={folanBuilding}
            alt="Bâtiment FOLAN"
            className="w-full h-full object-cover object-center"
            style={{ objectPosition: "50% 60%" }}
          />
          {/* Mobile: solid semi-transparent overlay for legibility */}
          {/* Desktop: lateral gradient that blends into the solid left panel */}
          <div className="absolute inset-0 bg-[#353A3F]/72 lg:bg-gradient-to-r lg:from-[#353A3F]/70 lg:via-transparent lg:to-transparent" />
        </div>
      </section>

      {/* ── 2. LA SOCIÉTÉ ── */}
      <section className="py-20 lg:py-24 bg-white" id="societe">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            {/* Left: body text */}
            <div>
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="w-8 h-px bg-[#C75B12]" />
                <span className="text-[#C75B12] text-xs font-semibold tracking-widest uppercase">La société</span>
              </div>
              <h2 className="text-3xl font-bold text-[#353A3F] mb-6 leading-tight">
                Spécialiste français des solutions fibre optique
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-[15px]">
                <p>
                  Depuis 1988, FOLAN est le spécialiste français des solutions à base de composants passifs
                  pour les réseaux fibre optique : cœurs de réseaux, déploiements FTTx, Data Centers,
                  Industries, etc.
                </p>
                <p>
                  La conception et la fabrication de solutions fibre optique, ainsi que la personnalisation
                  pour des besoins spécifiques, font de FOLAN un acteur majeur au cœur de l'industrie.
                </p>
                <p>
                  Nous répondons à tous types de marchés grâce à un bureau d'études qui conçoit des
                  produits à forte valeur ajoutée et à plusieurs unités de production.
                </p>
              </div>
            </div>

            {/* Right: ISO & RSE entry cards */}
            <div className="flex flex-col gap-4">

              {/* QUALITÉ — certifications QSE */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-[#C75B12]/40 hover:shadow-md transition-all">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0">
                    <svg viewBox="0 0 64 64" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 text-[#C75B12]" stroke="currentColor">
                      <path d="M32 7l21 7.5v17C53 44 43.5 54 32 57 20.5 54 11 44 11 31.5v-17L32 7z" />
                      <path d="M23 32l6 6 12-13" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold tracking-[0.2em] text-[#C75B12] uppercase mb-1">Qualité</div>
                    <h3 className="text-base font-bold text-[#353A3F] mb-3 leading-snug">Nos certifications QSE</h3>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {["ISO 9001", "ISO 14001", "ISO 45001"].map((tag) => (
                        <span key={tag} className="text-[11px] border border-gray-300 text-[#353A3F] rounded-full px-2.5 py-0.5 font-medium">{tag}</span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mb-3 leading-relaxed">Qualité, environnement, santé et sécurité au travail.</p>
                    <button onClick={() => onNavigate?.("qualite-iso")} className="inline-flex items-center gap-1 text-sm font-semibold text-[#C75B12] hover:gap-2 transition-all group">
                      Découvrir nos certifications
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

              {/* ENGAGEMENTS — démarche RSE */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-[#C75B12]/40 hover:shadow-md transition-all">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0">
                    <svg viewBox="0 0 64 64" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 text-[#C75B12]" stroke="currentColor">
                      <circle cx="32" cy="32" r="22" />
                      <path d="M32 44c-4-4-10-10-10-18 0-5 4-8 10-8s10 3 10 8c0 8-6 14-10 18z" />
                      <path d="M32 44V30" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold tracking-[0.2em] text-[#C75B12] uppercase mb-1">Engagements</div>
                    <h3 className="text-base font-bold text-[#353A3F] mb-3 leading-snug">Notre démarche RSE</h3>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {["Global Compact", "EcoVadis Gold"].map((tag) => (
                        <span key={tag} className="text-[11px] border border-gray-300 text-[#353A3F] rounded-full px-2.5 py-0.5 font-medium">{tag}</span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mb-3 leading-relaxed">Une démarche sociale et environnementale reconnue.</p>
                    <button onClick={() => onNavigate?.("rse")} className="inline-flex items-center gap-1 text-sm font-semibold text-[#C75B12] hover:gap-2 transition-all group">
                      Découvrir nos engagements
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 rounded-2xl overflow-hidden border border-gray-200">
            {[
              { value: "Depuis 1988", label: "Fondée à Lyon" },
              { value: "20 %", label: "du CA à l'international" },
              { value: "Bureau d'études", label: "intégré sur site" },
              { value: "Production", label: "sur mesure" },
            ].map(({ value, label }) => (
              <div key={label} className="bg-white px-6 py-6 text-center">
                <div className="text-xl font-bold text-[#353A3F] mb-1">{value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. IMPLANTATIONS EUROPÉENNES ── */}
      <section className="py-20 lg:py-24 bg-[#F5F7FB]">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-4 justify-center">
              <span className="w-8 h-px bg-[#C75B12]" />
              <span className="text-[#C75B12] text-xs font-bold tracking-[0.2em] uppercase">Notre présence</span>
              <span className="w-8 h-px bg-[#C75B12]" />
            </div>
            <h2 className="text-3xl font-bold text-[#353A3F] mb-3">Nos implantations et capacités de production</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-[15px]">
              Une organisation internationale au service de la proximité, de la flexibilité et de la production à toutes les échelles.
            </p>
          </div>

          {/* Map + overlapping cards wrapper */}
          <div className="relative">

            {/* Map image — natural 2:1 aspect ratio, no crop */}
            <div className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <img
                src={mapEuropeNew}
                alt="Carte des implantations FOLAN en Europe"
                className="w-full block"
              />

              {/* UK — SOUTHEND-ON-SEA */}
              <div className="absolute" style={{ left: "37.5%", top: "28%" }}>
                <div
                  className="bg-white rounded-lg border border-gray-100 shadow-lg px-2 py-1 sm:px-3 sm:py-1.5 -translate-y-full sm:-translate-y-1/2"
                >
                  <div className="text-[8px] sm:text-[10px] font-bold text-[#353A3F] uppercase tracking-widest whitespace-nowrap">SOUTHEND-ON-SEA</div>
                  <div className="text-[7px] sm:text-[9px] text-gray-500 whitespace-nowrap mt-0.5">Intégration de baies optiques & de puissance</div>
                </div>
              </div>

              {/* DE — FRANCFORT */}
              <div className="absolute" style={{ left: "57.5%", top: "40%" }}>
                <div
                  className="bg-white rounded-lg border border-gray-100 shadow-lg px-2 py-1 sm:px-3 sm:py-1.5"
                  style={{ transform: "translateY(-50%)" }}
                >
                  <div className="text-[8px] sm:text-[10px] font-bold text-[#353A3F] uppercase tracking-widest whitespace-nowrap">FRANCFORT</div>
                  <div className="text-[7px] sm:text-[9px] text-gray-500 whitespace-nowrap mt-0.5">Agence commerciale</div>
                </div>
              </div>

              {/* FR — LYON */}
              <div className="absolute" style={{ left: "45.5%", top: "63%" }}>
                <div
                  className="bg-white rounded-lg border border-gray-100 shadow-lg px-2 py-1 sm:px-3 sm:py-1.5"
                  style={{ transform: "translateY(-50%)" }}
                >
                  <div className="text-[8px] sm:text-[10px] font-bold text-[#353A3F] uppercase tracking-widest whitespace-nowrap">LYON</div>
                  <div className="text-[7px] sm:text-[9px] text-gray-500 whitespace-nowrap mt-0.5">Sur mesure & connectique MPO/MTP</div>
                </div>
              </div>
            </div>

            {/* Country cards — equal widths, centered, overlap bottom of map on desktop */}
            <div className="relative z-10 md:-mt-16 mt-4 flex flex-col md:flex-row md:justify-center gap-4 px-4">
              {[
                { code: "FR", country: "France", city: "Lyon (Rillieux-la-Pape)", desc: "Prototypage, solutions sur mesure, connectique MPO/MTP et petites séries." },
                { code: "GB", country: "Royaume-Uni", city: "Southend-on-Sea", desc: "Intégration de baies optiques et de puissance, petites et moyennes séries." },
                { code: "DE", country: "Allemagne", city: "Francfort", desc: "Agence commerciale." },
              ].map(({ code, country, city, desc }) => (
                <div
                  key={country}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:border-[#C75B12]/40 hover:shadow-md transition-all flex flex-col w-full md:w-[30%]"
                >
                  <div className="flex items-baseline gap-2 mb-1.5">
                    <span className="text-xs font-bold text-gray-400">{code}</span>
                    <span className="text-[10px] font-bold text-[#C75B12] uppercase tracking-widest">{country}</span>
                  </div>
                  <div className="font-bold text-[#353A3F] text-base mb-3 pb-3 border-b border-gray-100 leading-tight">{city}</div>
                  <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* China production banner */}
          <div
            className="mt-5 bg-white rounded-xl border border-gray-200 shadow-sm px-6 py-4 flex items-center gap-5"
            style={{ borderLeftWidth: 4, borderLeftColor: "#C75B12" }}
          >
            <img src={flagCN} alt="Chine" className="w-12 h-12 flex-shrink-0" />
            <div>
              <div className="text-[10px] font-bold tracking-[0.2em] text-[#C75B12] uppercase mb-0.5">Production internationale</div>
              <div className="font-bold text-[#353A3F] mb-0.5">Chine</div>
              <p className="text-sm text-gray-600">Atelier fibre optique, toutes connectiques, prototypage et grandes séries.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ── OLD MAP CONTENT REMOVED — replaced above ── */}
      <div style={{ display: "none" }}>
          <div style={{ height: 420 }}>

            {/* SVG map */}
            <svg viewBox="0 0 860 440" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <rect width="860" height="440" fill="#EAECF0" />
              {/* Iceland */}
              <polygon points="130,58 162,48 168,62 152,76 132,75" fill="#D1D5DC" stroke="white" strokeWidth="1" />
              {/* Ireland */}
              <polygon points="210,128 202,145 202,168 228,168 228,148 218,135" fill="#D1D5DC" stroke="white" strokeWidth="1" />
              {/* Great Britain */}
              <polygon points="252,78 268,82 270,115 285,145 295,160 290,175 278,182 240,192 240,158 242,142 235,120 234,102" fill="#D1D5DC" stroke="white" strokeWidth="1" />
              {/* Scandinavia */}
              <polygon points="330,42 380,28 440,30 470,50 468,80 448,100 430,98 410,80 390,90 372,78 355,60" fill="#D1D5DC" stroke="white" strokeWidth="1" />
              {/* Denmark */}
              <polygon points="362,112 378,105 382,120 372,128 360,122" fill="#D1D5DC" stroke="white" strokeWidth="1" />
              {/* Benelux */}
              <polygon points="300,160 320,148 340,152 342,165 322,168 300,162" fill="#D1D5DC" stroke="white" strokeWidth="1" />
              {/* France */}
              <polygon points="298,182 340,215 338,278 305,293 262,280 262,226 244,210 290,201" fill="#D1D5DC" stroke="white" strokeWidth="1" />
              {/* Spain + Portugal */}
              <polygon points="262,280 305,293 308,330 282,363 258,388 200,388 200,310 213,280" fill="#D1D5DC" stroke="white" strokeWidth="1" />
              {/* Italy */}
              <polygon points="342,230 368,222 393,268 398,300 380,320 358,295 352,265 340,248" fill="#D1D5DC" stroke="white" strokeWidth="1" />
              {/* Germany + Austria */}
              <polygon points="342,165 365,155 405,150 430,158 435,175 425,200 412,215 388,215 372,210 352,195 342,178" fill="#D1D5DC" stroke="white" strokeWidth="1" />
              {/* Switzerland */}
              <polygon points="342,215 368,210 370,225 348,232 325,228" fill="#D1D5DC" stroke="white" strokeWidth="1" />
              {/* Czech + Slovakia */}
              <polygon points="405,150 445,145 465,158 462,178 440,182 405,170" fill="#D1D5DC" stroke="white" strokeWidth="1" />
              {/* Poland */}
              <polygon points="405,150 445,145 495,138 515,152 510,175 490,182 462,178 445,158" fill="#D1D5DC" stroke="white" strokeWidth="1" />
              {/* Baltic states */}
              <polygon points="418,112 462,105 482,118 478,138 455,142 418,132" fill="#D1D5DC" stroke="white" strokeWidth="1" />
              {/* Belarus */}
              <polygon points="462,158 510,148 535,158 538,178 525,182 495,180 462,175" fill="#D1D5DC" stroke="white" strokeWidth="1" />
              {/* Hungary */}
              <polygon points="412,215 440,218 475,210 495,225 486,240 462,248 430,232" fill="#D1D5DC" stroke="white" strokeWidth="1" />
              {/* Romania */}
              <polygon points="490,182 530,175 558,188 562,212 548,232 520,240 495,235 486,235 490,200" fill="#D1D5DC" stroke="white" strokeWidth="1" />
              {/* Ukraine */}
              <polygon points="490,182 562,170 618,178 622,205 608,222 580,232 548,232 530,228 520,240 495,230" fill="#D1D5DC" stroke="white" strokeWidth="1" />
              {/* Balkans */}
              <polygon points="388,215 412,215 430,232 435,250 418,270 402,275 388,262 378,248" fill="#D1D5DC" stroke="white" strokeWidth="1" />
              {/* Greece */}
              <polygon points="410,272 440,268 456,280 452,296 432,305 412,295 408,282" fill="#D1D5DC" stroke="white" strokeWidth="1" />
              {/* Turkey */}
              <polygon points="470,255 545,248 610,252 652,265 655,285 625,290 572,288 520,280 475,270" fill="#D1D5DC" stroke="white" strokeWidth="1" />
              {/* Russia western */}
              <polygon points="515,152 700,95 810,118 820,155 790,180 745,182 700,175 652,168 620,168 562,165 538,155 510,165 490,165" fill="#D1D5DC" stroke="white" strokeWidth="1" />
              {/* North Africa */}
              <polygon points="155,360 230,345 320,338 430,340 540,345 650,352 760,362 860,378 860,440 0,440 0,385" fill="#D1D5DC" stroke="white" strokeWidth="1" />
              {/* Corsica */}
              <polygon points="325,272 335,265 342,278 334,290 322,282" fill="#D1D5DC" stroke="white" strokeWidth="0.5" />
              {/* Sardinia */}
              <polygon points="322,295 332,288 340,302 332,318 320,310" fill="#D1D5DC" stroke="white" strokeWidth="0.5" />
              {/* Sicily */}
              <polygon points="355,335 380,330 388,342 372,352 350,345" fill="#D1D5DC" stroke="white" strokeWidth="0.5" />
              {/* Anchor dots for city markers */}
              <circle cx="284" cy="175" r="3.5" fill="#C75B12" />
              <circle cx="312" cy="258" r="3.5" fill="#C75B12" />
              <circle cx="362" cy="204" r="3.5" fill="#C75B12" />
            </svg>

            {/* Southend-on-Sea */}
            <div className="absolute hidden sm:flex items-start gap-2" style={{ left: "33%", top: "40%", transform: "translate(-22px, -50%)" }}>
              <div className="w-11 h-11 rounded-full border-2 border-[#C75B12] bg-white shadow-md flex items-center justify-center text-xl flex-shrink-0">🇬🇧</div>
              <div className="bg-white rounded-lg border border-gray-200 shadow-md px-3 py-2">
                <div className="text-[11px] font-bold text-[#353A3F] uppercase tracking-wide whitespace-nowrap">Southend-on-Sea</div>
                <div className="text-[11px] text-gray-500 mt-0.5 leading-tight">Intégration de baies & petites<br />et moyennes séries</div>
              </div>
            </div>

            {/* Francfort */}
            <div className="absolute hidden sm:flex items-start gap-2" style={{ left: "42%", top: "46%", transform: "translate(-22px, -50%)" }}>
              <div className="w-11 h-11 rounded-full border-2 border-[#C75B12] bg-white shadow-md flex items-center justify-center text-xl flex-shrink-0">🇩🇪</div>
              <div className="bg-white rounded-lg border border-gray-200 shadow-md px-3 py-2">
                <div className="text-[11px] font-bold text-[#353A3F] uppercase tracking-wide whitespace-nowrap">Francfort</div>
                <div className="text-[11px] text-gray-500 mt-0.5 leading-tight">Direction & commerce</div>
              </div>
            </div>

            {/* Lyon */}
            <div className="absolute hidden sm:flex items-start gap-2" style={{ left: "36%", top: "59%", transform: "translate(-22px, -50%)" }}>
              <div className="w-11 h-11 rounded-full border-2 border-[#C75B12] bg-white shadow-md flex items-center justify-center text-xl flex-shrink-0">🇫🇷</div>
              <div className="bg-white rounded-lg border border-gray-200 shadow-md px-3 py-2">
                <div className="text-[11px] font-bold text-[#353A3F] uppercase tracking-wide whitespace-nowrap">Lyon</div>
                <div className="text-[11px] text-gray-500 mt-0.5 leading-tight">Sur mesure, MPO/MTP<br />& petites séries</div>
              </div>
            </div>
          </div>

          {/* Detail cards */}
          <div className="grid md:grid-cols-3 gap-5 mb-6">
            {[
              {
                code: "FR",
                country: "France",
                city: "Lyon (Rillieux-la-Pape)",
                desc: "Prototypage, solutions sur mesure, connectique MPO/MTP et petites séries.",
              },
              {
                code: "GB",
                country: "Royaume-Uni",
                city: "Southend-on-Sea",
                desc: "Intégration de baies optiques et de puissance, petites et moyennes séries.",
              },
              {
                code: "DE",
                country: "Allemagne",
                city: "Francfort",
                desc: "Agence commerciale.",
              },
            ].map(({ code, country, city, desc }) => (
              <div
                key={country}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:border-[#C75B12]/40 hover:shadow-md transition-all"
              >
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-sm font-bold text-gray-400">{code}</span>
                  <span className="text-[10px] font-bold text-[#C75B12] uppercase tracking-widest">{country}</span>
                </div>
                <div className="font-bold text-[#353A3F] text-xl mb-4 pb-4 border-b border-gray-100 leading-tight">{city}</div>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* China production banner */}
          <div
            className="bg-white rounded-xl border border-gray-200 px-6 py-5 flex items-center gap-5"
            style={{ borderLeftWidth: 4, borderLeftColor: "#C75B12" }}
          >
            <span />
          </div>
      </div>

      {/* ── 4. TIMELINE ── */}
      <section className="py-20 lg:py-24 bg-white overflow-hidden" id="histoire">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-px bg-[#C75B12]" />
                <span className="text-[#C75B12] text-xs font-semibold tracking-widest uppercase">Histoire</span>
              </div>
              <h2 className="text-3xl font-bold text-[#353A3F]">Notre parcours depuis 1988</h2>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => scrollTimeline("left")}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#C75B12] hover:text-[#C75B12] transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollTimeline("right")}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#C75B12] hover:text-[#C75B12] transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable track */}
        <div
          ref={timelineRef}
          className="overflow-x-auto scrollbar-hide pb-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex gap-0 px-4 lg:px-8" style={{ minWidth: "max-content", marginLeft: "calc((100vw - min(1200px, 100vw)) / 2)" }}>
            {/* Line */}
            <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-200 pointer-events-none" />

            {timeline.map((item, idx) => (
              <div
                key={item.year}
                className="relative flex flex-col items-center cursor-pointer group"
                style={{ width: 220, flexShrink: 0 }}
                onClick={() => setActiveYear(activeYear === item.year ? null : item.year)}
              >
                {/* Connector line */}
                <div className="w-full h-px bg-gray-200 absolute top-8 left-0" />

                {/* Year bubble */}
                <div
                  className={`relative z-10 w-16 h-16 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-200 flex-shrink-0 ${
                    activeYear === item.year
                      ? "bg-[#C75B12] border-[#C75B12] text-white shadow-lg scale-110"
                      : "bg-white border-gray-200 text-[#353A3F] group-hover:border-[#C75B12] group-hover:text-[#C75B12]"
                  }`}
                >
                  {item.year}
                </div>

                {/* Card */}
                <div
                  className={`mt-4 bg-white border rounded-xl p-4 text-center transition-all duration-200 ${
                    activeYear === item.year
                      ? "border-[#C75B12] shadow-lg"
                      : "border-gray-100 group-hover:border-gray-300"
                  }`}
                  style={{ width: 200 }}
                >
                  <p className="text-xs text-gray-600 leading-relaxed">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. NOS COMPÉTENCES ── */}
      <section className="py-20 lg:py-24 bg-[#F5F7FB]">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 justify-center">
              <span className="w-8 h-px bg-[#C75B12]" />
              <span className="text-[#C75B12] text-xs font-semibold tracking-widest uppercase">Compétences</span>
              <span className="w-8 h-px bg-[#C75B12]" />
            </div>
            <h2 className="text-3xl font-bold text-[#353A3F]">Nos compétences</h2>
          </div>

          {/* Mobile: horizontal swipe carousel */}
          <div className="flex lg:hidden overflow-x-auto snap-x snap-mandatory gap-4 -mx-4 px-4 pb-3 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
            {competences.map(({ id, label, icon: Icon, description, bg }) => {
              const isActive = expandedPole === id;
              return (
                <div
                  key={id}
                  className="relative rounded-2xl overflow-hidden cursor-pointer aspect-[3/4] flex-none w-[78vw] sm:w-[44vw] snap-center"
                  onClick={() => handlePoleClick(id)}
                >
                  <img
                    src={bg}
                    alt={label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
                    style={{ transform: isActive ? "scale(1.06)" : "scale(1)" }}
                  />
                  <div
                    className="absolute inset-0 transition-all duration-300"
                    style={{
                      background: isActive
                        ? "rgba(23, 59, 143, 0.82)"
                        : "linear-gradient(to top, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.1) 100%)",
                    }}
                  />
                  <div className="relative z-10 h-full flex flex-col justify-end p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-5 h-5 text-white flex-shrink-0" />
                      <span className="font-semibold text-white text-sm">{label}</span>
                    </div>
                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{ maxHeight: isActive ? 80 : 0, opacity: isActive ? 1 : 0 }}
                    >
                      <p className="text-white/90 text-xs leading-relaxed">{description}</p>
                    </div>
                    <div className={`text-white/50 text-xs mt-2 transition-opacity duration-200 ${isActive ? "opacity-0" : "opacity-100"}`}>
                      Appuyer pour en savoir plus
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop: 5-column grid */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-4">
            {competences.map(({ id, label, icon: Icon, description, bg }) => {
              const isActive = hoveredPole === id || expandedPole === id;
              return (
                <div
                  key={id}
                  className="relative rounded-2xl overflow-hidden cursor-pointer lg:aspect-auto lg:min-h-[320px]"
                  onMouseEnter={() => setHoveredPole(id)}
                  onMouseLeave={() => setHoveredPole(null)}
                  onClick={() => handlePoleClick(id)}
                >
                  <img
                    src={bg}
                    alt={label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
                    style={{ transform: isActive ? "scale(1.06)" : "scale(1)" }}
                  />
                  <div
                    className="absolute inset-0 transition-all duration-300"
                    style={{
                      background: isActive
                        ? "rgba(23, 59, 143, 0.82)"
                        : "linear-gradient(to top, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.1) 100%)",
                    }}
                  />
                  <div className="relative z-10 h-full flex flex-col justify-end p-5">
                    <div className={`flex items-center gap-2 mb-2 transition-all duration-300 ${isActive ? "mb-3" : ""}`}>
                      <Icon className="w-5 h-5 text-white flex-shrink-0" />
                      <span className="font-semibold text-white text-sm">{label}</span>
                    </div>
                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{ maxHeight: isActive ? 80 : 0, opacity: isActive ? 1 : 0 }}
                    >
                      <p className="text-white/90 text-xs leading-relaxed">{description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. INNOVATION & PRODUCTION FRANÇAISE ── */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 flex flex-col gap-20">

          {/* Block A: Innovation — text right, icon left */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex items-center justify-center">
              <div className="w-48 h-48 rounded-3xl bg-[#EFF3FB] flex items-center justify-center">
                <Lightbulb className="w-20 h-20 text-[#353A3F]" />
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="w-8 h-px bg-[#C75B12]" />
                <span className="text-[#C75B12] text-xs font-semibold tracking-widest uppercase">Innovation</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#353A3F] mb-5 leading-tight">
                L'innovation au cœur de nos préoccupations
              </h2>
              <p className="text-gray-700 leading-relaxed text-[15px]">Grâce à son bureau d'études et son laboratoire intégrés dans ses locaux en région lyonnaise, FOLAN développe et conçoit ses propres produits. Nos ingénieurs qualifient tous les produits et équipements et développent des solutions sur mesure adaptées à chaque besoin. Nos ingénieurs en Chines sont équipés de leur propre bureau d’études et laboratoire avec les mêmes équipements que la France pour garantir une qualité irréprochable.</p>
            </div>
          </div>

          {/* Block B: Production française — text left, icon right */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="w-8 h-px bg-[#C75B12]" />
                <span className="text-[#C75B12] text-xs font-semibold tracking-widest uppercase">Made in France</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#353A3F] mb-5 leading-tight">
                La volonté d'une production française
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-[15px]">
                <p>Depuis toujours, FOLAN a fabriqué en France et maintient une unité de production française dans ses locaux afin de répondre aux projets sur mesure avec réactivité et flexibilité.</p>
                <p>Connectorisation de cordons, montage de câbles préconnectorisés, assemblage de tiroirs optiques, baies et coffrets : FOLAN propose des solutions adaptées à chaque besoin.</p>
                <p>Les cordons abonnés compatibles avec les principales box fibre des opérateurs français sont fabriqués à Rillieux-la-Pape.</p>
              </div>
            </div>
            <div className="flex items-center justify-center order-1 lg:order-2">
              <div className="w-48 h-48 rounded-3xl bg-[#FFF4EE] flex items-center justify-center">
                <Cpu className="w-20 h-20 text-[#C75B12]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. DES SOLUTIONS POUR CHAQUE BESOIN ── */}
      <section className="py-20 lg:py-24 bg-[#F5F7FB]">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 justify-center">
              <span className="w-8 h-px bg-[#C75B12]" />
              <span className="text-[#C75B12] text-xs font-semibold tracking-widest uppercase">Nos offres</span>
              <span className="w-8 h-px bg-[#C75B12]" />
            </div>
            <h2 className="text-3xl font-bold text-[#353A3F]">Des solutions pour chaque besoin</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🏠",
                title: "Particuliers",
                desc: "Des câbles compatibles avec les principales box fibre du marché français.",
                cta: "Voir les câbles box",
                page: "category",
              },
              {
                icon: "🔧",
                title: "Professionnels & installateurs",
                desc: "Des équipements fiables pour les installations et les chantiers réseau.",
                cta: "Espace professionnel",
                page: "pro",
              },
              {
                icon: "📐",
                title: "Projets sur mesure",
                desc: "L'accompagnement du bureau d'études et des équipes FOLAN.",
                cta: "Nous contacter",
                page: "contact",
              },
            ].map(({ icon, title, desc, cta, page }) => (
              <div
                key={title}
                className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col gap-5 hover:border-[#353A3F]/30 hover:shadow-lg transition-all group"
              >
                <div className="text-4xl">{icon}</div>
                <div>
                  <h3 className="font-bold text-[#353A3F] text-lg mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </div>
                <button
                  onClick={() => page === "contact" ? onContactClick?.() : onNavigate?.(page)}
                  className="mt-auto flex items-center gap-2 text-sm font-semibold text-[#C75B12] hover:gap-3 transition-all"
                >
                  {cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. CTA FINAL ── */}
      <section className="py-12 lg:py-14 bg-[#353A3F]">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-[#C75B12] text-[11px] font-bold tracking-[0.18em] uppercase mb-1.5">Étape suivante</p>
            <h2 className="text-xl lg:text-2xl font-bold text-white mb-2">
              Un besoin en fibre optique ?
            </h2>
            <p className="text-white/65 text-sm leading-relaxed max-w-md">
              Découvrez nos produits ou échangez avec notre équipe pour la solution adaptée.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button
              onClick={() => onNavigate?.("home")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C75B12] text-white text-sm font-semibold rounded-xl hover:bg-[#a84c0f] transition-colors"
            >
              Découvrir nos produits
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onContactClick}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/30 text-white text-sm font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              Nous écrire
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
