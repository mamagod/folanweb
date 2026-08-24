import { Search } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";

const slides = [
  {
    id: 0,
    label: "POUR LES PARTICULIERS",
    title: "Trouvez le câble fibre compatible avec votre Box internet.",
    description:
      "Et plein d'autres équipements et produits de communication pour la maison…",
    placeholder: "Tous les produits pour les particuliers !",
    cta: "Trouver mon câble",
    perks: [
      "Compatible tous opérateurs",
      "Livraison rapide depuis la France",
      "Installation facile",
    ],
    image:
      "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxmaWJlciUyMG9wdGljJTIwY2FibGUlMjBob21lJTIwaW50ZXJuZXQlMjByb3V0ZXIlMjBzZXR1cHxlbnwxfHx8fDE3ODUzNDYyMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    imageAlt: "Box internet et routeur à domicile",
  },
  {
    id: 1,
    label: "POUR LES PROFESSIONNELS",
    title: "Retrouvez tous vos produits et équipements Fibres optiques, et plus encore !",
    description:
      "Câbles fibres optiques, Cat 6, 6A, 7, 8, cordons et connectique, baies, coffrets, tiroirs, boîtiers divers…",
    placeholder: "Retrouvez tous les produits et équipements Télécoms, Data Center, LAN…",
    cta: "Découvrir nos produits pro",
    perks: [
      "Commandes en volume",
      "Support technique dédié",
      "Solutions adaptées aux projets",
    ],
    image:
      "https://images.unsplash.com/photo-1683322499436-f4383dd59f5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwc2VydmVyJTIwcmFjayUyMGRhdGElMjBjZW50ZXIlMjBjYWJsZXMlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzg1MzQ2MjMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    imageAlt: "Infrastructure réseau professionnelle fibre optique",
  },
];

const AUTOPLAY_DELAY = 5000;

/* ── SVG background: horizontal blue gradient + restrained fiber lines ── */
function HeroBg() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* Horizontal gradient: light left → mid blue → deeper right */}
        <linearGradient id="hBgGrad" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#F6F6F7" />
          <stop offset="50%"  stopColor="#E4E5E7" />
          <stop offset="100%" stopColor="#C8C9CC" />
        </linearGradient>

        {/* Primary white fiber lines — fade in/out along path */}
        <linearGradient id="fw1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0" />
          <stop offset="25%"  stopColor="#ffffff" stopOpacity="0.65" />
          <stop offset="60%"  stopColor="#ffffff" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fw2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0" />
          <stop offset="30%"  stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="70%"  stopColor="#ffffff" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fw3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0" />
          <stop offset="40%"  stopColor="#ffffff" stopOpacity="0.58" />
          <stop offset="80%"  stopColor="#ffffff" stopOpacity="0.50" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        {/* Extra glow beam — wide soft white for halo effect */}
        <linearGradient id="fw4" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0" />
          <stop offset="20%"  stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="55%"  stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fw5" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0" />
          <stop offset="35%"  stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="65%"  stopColor="#ffffff" stopOpacity="0.40" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        {/* Blur filter for glow halo */}
        <filter id="beamBlur" x="-20%" y="-200%" width="140%" height="500%">
          <feGaussianBlur stdDeviation="3" />
        </filter>

        {/* Auxiliary blue fiber lines */}
        <linearGradient id="fb1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#A0A3A7" stopOpacity="0" />
          <stop offset="35%"  stopColor="#A0A3A7" stopOpacity="0.15" />
          <stop offset="65%"  stopColor="#A0A3A7" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#A0A3A7" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fb2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#A0A3A7" stopOpacity="0" />
          <stop offset="40%"  stopColor="#A0A3A7" stopOpacity="0.13" />
          <stop offset="75%"  stopColor="#8C8F93" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#8C8F93" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fb3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#B0B3B7" stopOpacity="0" />
          <stop offset="50%"  stopColor="#B0B3B7" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#B0B3B7" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fb4" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#A0A3A7" stopOpacity="0" />
          <stop offset="45%"  stopColor="#A0A3A7" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#A0A3A7" stopOpacity="0" />
        </linearGradient>

        {/* Soft glow for orange nodes */}
        <radialGradient id="oglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#C75B12" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#C75B12" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Base fill */}
      <rect width="100%" height="100%" fill="url(#hBgGrad)" />

      {/* Dot grid — 26px pitch, opacity 6–8% */}
      {Array.from({ length: 26 }, (_, r) =>
        Array.from({ length: 58 }, (_, c) => (
          <circle
            key={`${r}-${c}`}
            cx={c * 26 + 13}
            cy={r * 26 + 13}
            r="1.1"
            fill="#8C8F93"
            fillOpacity="0.07"
          />
        ))
      )}

      {/* ── Primary white fiber lines ── */}
      {/* Line 1 glow halo */}
      <path
        d="M -40 480 Q 300 340 620 400 Q 880 450 1140 310 Q 1320 220 1520 260"
        stroke="url(#fw4)" strokeWidth="10" fill="none" filter="url(#beamBlur)"
      />
      {/* Line 1 — main sweeping arc */}
      <path
        d="M -40 480 Q 300 340 620 400 Q 880 450 1140 310 Q 1320 220 1520 260"
        stroke="url(#fw1)" strokeWidth="2.5" fill="none"
      />
      {/* Line 2 glow halo */}
      <path
        d="M -40 540 Q 280 400 600 455 Q 860 505 1120 370 Q 1300 285 1520 320"
        stroke="url(#fw4)" strokeWidth="8" fill="none" filter="url(#beamBlur)"
      />
      {/* Line 2 — slightly lower, parallel */}
      <path
        d="M -40 540 Q 280 400 600 455 Q 860 505 1120 370 Q 1300 285 1520 320"
        stroke="url(#fw2)" strokeWidth="2" fill="none"
      />
      {/* Line 3 glow halo */}
      <path
        d="M 100 420 Q 400 300 700 355 Q 950 400 1180 275 Q 1350 195 1520 225"
        stroke="url(#fw4)" strokeWidth="7" fill="none" filter="url(#beamBlur)"
      />
      {/* Line 3 — tighter, upper sweep */}
      <path
        d="M 100 420 Q 400 300 700 355 Q 950 400 1180 275 Q 1350 195 1520 225"
        stroke="url(#fw3)" strokeWidth="1.8" fill="none"
      />
      {/* Line 4 — extra beam, mid-lower */}
      <path
        d="M -40 590 Q 350 470 660 510 Q 920 545 1160 420 Q 1340 340 1520 368"
        stroke="url(#fw5)" strokeWidth="1.5" fill="none"
      />

      {/* ── Auxiliary blue fiber lines (3–5 lines, strokeWidth 1px) ── */}
      <path
        d="M -40 600 Q 320 475 640 525 Q 900 568 1150 440 Q 1330 358 1520 390"
        stroke="url(#fb1)" strokeWidth="1" fill="none"
      />
      <path
        d="M 60 370 Q 380 255 680 310 Q 940 358 1200 230 Q 1370 155 1520 180"
        stroke="url(#fb2)" strokeWidth="1" fill="none"
      />
      <path
        d="M -40 650 Q 360 530 680 578 Q 940 620 1180 500 Q 1350 420 1520 448"
        stroke="url(#fb3)" strokeWidth="1" fill="none"
      />
      <path
        d="M 200 340 Q 500 230 780 285 Q 1020 332 1260 215 Q 1400 148 1520 168"
        stroke="url(#fb4)" strokeWidth="1" fill="none"
      />
      <path
        d="M -40 700 Q 400 590 720 634 Q 980 672 1220 558 Q 1390 480 1520 504"
        stroke="url(#fb3)" strokeWidth="1" fill="none" opacity="0.75"
      />

      {/* ── Orange brand nodes — sparse, pulsing ── */}
      {/* Node on line 1 */}
      <circle cx="620" cy="400" r="7" fill="url(#oglow)">
        <animate attributeName="r" values="5;9;5" dur="3.2s" repeatCount="indefinite" />
        <animate attributeName="fill-opacity" values="1;0.4;1" dur="3.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="620" cy="400" r="2" fill="#C75B12" fillOpacity="0.9" />

      {/* Node on line 2 */}
      <circle cx="1120" cy="370" r="7" fill="url(#oglow)">
        <animate attributeName="r" values="5;8;5" dur="4.1s" repeatCount="indefinite" />
        <animate attributeName="fill-opacity" values="1;0.3;1" dur="4.1s" repeatCount="indefinite" />
      </circle>
      <circle cx="1120" cy="370" r="2" fill="#C75B12" fillOpacity="0.9" />

      {/* Node on aux line */}
      <circle cx="880" cy="450" r="6" fill="url(#oglow)">
        <animate attributeName="r" values="4;7;4" dur="2.8s" repeatCount="indefinite" />
        <animate attributeName="fill-opacity" values="0.9;0.25;0.9" dur="2.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="880" cy="450" r="1.8" fill="#C75B12" fillOpacity="0.85" />
    </svg>
  );
}

/* ── Avis Vérifiés badge ── */
function AvisVerifiesBadge() {
  return (
    <div
      className="overflow-hidden rounded-xl flex flex-col"
      style={{
        width: "172px",
        boxShadow: "0 6px 24px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.1)",
      }}
    >
      {/* Top: dark section with logo */}
      <div className="bg-[#1a1a1a] flex flex-col items-center justify-center px-3 py-2.5 gap-0.5">
        <div className="flex items-baseline gap-1 leading-none">
          <span
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "15px",
              color: "#E8820C",
              letterSpacing: "-0.3px",
            }}
          >
            Avis
          </span>
          <span
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "15px",
              color: "#ffffff",
              letterSpacing: "-0.3px",
            }}
          >
            Vérifiés
          </span>
          <sup style={{ fontSize: "7px", color: "#aaa", fontStyle: "normal", fontWeight: 400, verticalAlign: "super" }}>™</sup>
        </div>
        <span style={{ fontSize: "7px", color: "#999", letterSpacing: "0.3px" }}>by Net Reviews</span>
      </div>
      {/* Bottom: orange section */}
      <div className="bg-[#E8820C] flex flex-col items-center justify-center px-3 py-2 gap-1">
        <span style={{ fontSize: "8px", fontWeight: 800, color: "#fff", letterSpacing: "0.8px", textTransform: "uppercase" }}>
          Avis de nos clients
        </span>
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg key={s} className="w-3 h-3" fill="white" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span style={{ fontSize: "14px", fontWeight: 800, color: "#fff", lineHeight: 1 }}>4.8/5</span>
        </div>
      </div>
    </div>
  );
}

export function HeroSection({ onSearch }: { onSearch?: (q: string) => void } = {}) {
  const [current, setCurrent] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [paused, setPaused] = useState(false);
  const [mobileFocused, setMobileFocused] = useState(false);
  const pausedRef = useRef(false);

  const setPausedBoth = (val: boolean) => {
    pausedRef.current = val;
    setPaused(val);
  };

  const goTo = useCallback(
    (index: number, dir: "next" | "prev" = "next") => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setSearchQuery("");
        setAnimating(false);
      }, 380);
    },
    [animating]
  );

  const next = useCallback(() => {
    if (pausedRef.current) return;
    goTo((current + 1) % slides.length, "next");
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, "prev");
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  const contentStyle: React.CSSProperties = {
    opacity: animating ? 0 : 1,
    transform: animating
      ? `translateX(${direction === "next" ? "-20px" : "20px"})`
      : "translateX(0)",
    transition: "opacity 0.38s ease, transform 0.38s ease",
  };

  const imageStyle: React.CSSProperties = {
    opacity: animating ? 0 : 1,
    transform: animating
      ? `translateX(${direction === "next" ? "20px" : "-20px"})`
      : "translateX(0)",
    transition: "opacity 0.38s ease, transform 0.38s ease",
  };

  return (
    <section className="relative overflow-hidden" style={{ background: "#F5FAFF" }}>
      <HeroBg />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 lg:py-16">

        {/* ── DESKTOP layout ── */}
        <div className="hidden lg:flex lg:items-center lg:gap-12">

          {/* Left content */}
          <div className="flex-1 min-w-0 space-y-6 pr-4" style={contentStyle}>
            {/* Label pill */}
            <span className="inline-block text-[11px] font-bold tracking-widest text-[#DC580A] uppercase border border-[#DC580A]/40 rounded-full px-4 py-1.5">
              {slide.label}
            </span>

            {/* Title */}
            <h1 className="text-[2.6rem] xl:text-[2.9rem] font-extrabold tracking-tight text-[#353A3F] leading-[1.15]">
              {slide.title}
            </h1>

            {/* Description */}
            <p className="text-base text-gray-600 leading-relaxed whitespace-pre-line max-w-md">
              {slide.description}
            </p>

            {/* Search */}
            <form
              className="relative w-full"
              onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) onSearch?.(searchQuery.trim()); }}
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={slide.placeholder}
                value={searchQuery}
                onChange={(e) => { setPausedBoth(true); setSearchQuery(e.target.value); }}
                onFocus={() => setPausedBoth(true)}
                onBlur={() => { if (!searchQuery) setPausedBoth(false); }}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#DC580A] focus:outline-none transition-colors bg-white shadow-sm text-sm placeholder:text-xs"
              />
            </form>

            {/* CTA */}
            <button
              onClick={() => { if (searchQuery.trim()) onSearch?.(searchQuery.trim()); }}
              className="inline-flex items-center gap-2 bg-[#DC580A] text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-[#c24e09] transition-all duration-200 shadow-md hover:shadow-lg"
              onMouseEnter={() => setPausedBoth(true)}
              onMouseLeave={() => setPausedBoth(false)}
            >
              {slide.cta}
            </button>

            {/* Perks */}
            <ul className="space-y-2 pt-1">
              {slide.perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2.5 text-sm text-gray-700">
                  <svg className="w-4 h-4 text-[#DC580A] flex-shrink-0" fill="none" viewBox="0 0 20 20">
                    <path d="M5 10l4 4 6-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {perk}
                </li>
              ))}
            </ul>

            {/* Carousel dots */}
            <div className="flex gap-2 items-center pt-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goTo(i, i > current ? "next" : "prev")}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-[#DC580A]" : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right: landscape image + Avis badge */}
          <div className="relative flex-shrink-0 w-[52%] xl:w-[54%] pt-5 pr-5" style={imageStyle}>
            {/* Badge floats above the image, partially overlapping top-right corner */}
            <div className="absolute top-0 right-0 z-20">
              <AvisVerifiesBadge />
            </div>
            <div
              className="w-full overflow-hidden rounded-2xl shadow-2xl"
              style={{ aspectRatio: "16 / 10" }}
            >
              <img
                src={slide.image}
                alt={slide.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* ── MOBILE layout ── */}
        <div className="flex flex-col gap-5 lg:hidden" style={contentStyle}>
          <span className="self-start text-[10px] font-bold tracking-widest text-[#DC580A] uppercase border border-[#DC580A]/40 rounded-full px-3 py-1">
            {slide.label}
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#353A3F] leading-tight">
            {slide.title}
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line -mt-1">
            {slide.description}
          </p>

          {/* Mobile image */}
          <div className="relative w-full overflow-hidden rounded-xl shadow-lg" style={{ aspectRatio: "16 / 10", ...imageStyle }}>
            <img src={slide.image} alt={slide.imageAlt} className="w-full h-full object-cover" />
            {/* Avis badge mobile — overlaid top-right */}
            <div className="absolute top-2.5 right-2.5">
              <div className="bg-white/95 rounded-lg border border-gray-100 px-2.5 py-2 flex flex-col items-center gap-0.5 shadow">
                <span className="text-[8px] font-extrabold text-gray-800 uppercase tracking-wider leading-none">Avis Vérifiés</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className="w-2.5 h-2.5 text-[#DC580A]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[9px] font-bold text-gray-800">4,8 / 5</span>
              </div>
            </div>
          </div>

          <form
            className="relative"
            onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) onSearch?.(searchQuery.trim()); }}
          >
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder=""
              value={searchQuery}
              onChange={(e) => { setPausedBoth(true); setSearchQuery(e.target.value); }}
              onFocus={() => { setPausedBoth(true); setMobileFocused(true); }}
              onBlur={() => { setMobileFocused(false); if (!searchQuery) setPausedBoth(false); }}
              className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 focus:border-[#DC580A] focus:outline-none transition-colors text-sm bg-white shadow-sm"
              style={{ minHeight: "48px" }}
            />
            {!searchQuery && !mobileFocused && (
              <span className="pointer-events-none absolute left-10 top-3 text-xs text-gray-400 leading-snug pr-2">
                {slide.placeholder}
              </span>
            )}
          </form>
          <button
            onClick={() => { if (searchQuery.trim()) onSearch?.(searchQuery.trim()); }}
            className="w-full bg-[#DC580A] text-white py-3.5 rounded-xl font-bold text-sm shadow-md active:scale-95 transition-all"
            onMouseEnter={() => setPausedBoth(true)}
            onMouseLeave={() => setPausedBoth(false)}
          >
            {slide.cta}
          </button>
          <ul className="space-y-1.5">
            {slide.perks.map((perk) => (
              <li key={perk} className="flex items-center gap-2 text-xs text-gray-700">
                <svg className="w-3.5 h-3.5 text-[#DC580A] flex-shrink-0" fill="none" viewBox="0 0 20 20">
                  <path d="M5 10l4 4 6-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {perk}
              </li>
            ))}
          </ul>
          <div className="flex justify-center gap-2">
            {slides.map((s, i) => (
              <button key={s.id} onClick={() => goTo(i, i > current ? "next" : "prev")}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-7 bg-[#DC580A]" : "w-1.5 bg-gray-300"}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-100/50 z-10">
        <div
          key={current}
          className="h-full bg-[#DC580A]"
          style={{
            animation: `heroProgress ${AUTOPLAY_DELAY}ms linear forwards`,
            animationPlayState: paused ? "paused" : "running",
          }}
        />
      </div>

      <style>{`
        @keyframes heroProgress {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </section>
  );
}
