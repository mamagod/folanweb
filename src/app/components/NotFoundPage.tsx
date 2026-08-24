import { useEffect, useRef } from "react";
import { Home, ArrowLeft, Search, Package } from "lucide-react";

interface NotFoundPageProps {
  onHomeClick?: () => void;
  onBackClick?: () => void;
  onSearchClick?: () => void;
  onCatalogClick?: () => void;
}

export function NotFoundPage({
  onHomeClick,
  onBackClick,
  onSearchClick,
  onCatalogClick,
}: NotFoundPageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      r: number; alpha: number; color: string;
    }> = [];

    const colors = ["#DC580A", "#353A3F", "#f97316", "#C75B12"];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 38; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 3 + 1,
        alpha: Math.random() * 0.35 + 0.08,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const links = [
    { icon: Home, label: "Page d'accueil", sub: "Retour à l'essentiel", onClick: onHomeClick },
    { icon: Search, label: "Rechercher", sub: "Trouver un produit", onClick: onSearchClick },
    { icon: Package, label: "Catalogue", sub: "Parcourir nos gammes", onClick: onCatalogClick },
  ];

  return (
    <div
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ fontFamily: "'Outfit', sans-serif", background: "#f8f7f4" }}
    >
      {/* Ambient canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(53,58,63,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(53,58,63,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          zIndex: 1,
        }}
      />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-2">
          <span
            className="text-2xl font-black tracking-tight"
            style={{ color: "#DC580A", letterSpacing: "-0.04em" }}
          >
            FOLAN
          </span>
          <span
            className="text-xs font-semibold uppercase tracking-widest mt-1"
            style={{ color: "#353A3F" }}
          >
            Pro
          </span>
        </div>
        {onBackClick && (
          <button
            onClick={onBackClick}
            className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border transition-all duration-200 hover:border-[#DC580A] hover:text-[#DC580A] group"
            style={{ borderColor: "rgba(0,0,0,0.12)", color: "#374151" }}
          >
            <ArrowLeft size={15} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
            Retour
          </button>
        )}
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">

        {/* 404 giant type */}
        <div className="relative select-none mb-2">
          <span
            className="block font-black text-center leading-none"
            style={{
              fontSize: "clamp(120px, 26vw, 280px)",
              color: "transparent",
              WebkitTextStroke: "2px rgba(220,88,10,0.15)",
              letterSpacing: "-0.06em",
            }}
          >
            404
          </span>
          <span
            className="absolute inset-0 flex items-center justify-center font-black text-center leading-none"
            style={{
              fontSize: "clamp(120px, 26vw, 280px)",
              background: "linear-gradient(135deg, #DC580A 0%, #f97316 45%, #353A3F 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.06em",
            }}
          >
            404
          </span>
        </div>

        {/* Status chip */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-8"
          style={{ background: "rgba(220,88,10,0.08)", color: "#DC580A" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#DC580A] animate-pulse" />
          Page introuvable
        </div>

        {/* Headline & copy */}
        <h1
          className="text-3xl md:text-5xl font-bold text-center mb-4 leading-tight"
          style={{ color: "#353A3F", letterSpacing: "-0.03em", maxWidth: 560 }}
        >
          Cette page s&apos;est perdue<br />
          <span style={{ color: "#DC580A" }}>en route.</span>
        </h1>
        <p
          className="text-base md:text-lg text-center mb-12"
          style={{ color: "#6b7280", maxWidth: 400, lineHeight: 1.7 }}
        >
          Le lien que vous avez suivi est peut-être expiré, déplacé ou tout simplement
          inventé. Pas de panique — voici où aller à la place.
        </p>

        {/* Navigation cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mb-12">
          {links.map(({ icon: Icon, label, sub, onClick }) => (
            <button
              key={label}
              onClick={onClick}
              disabled={!onClick}
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl border bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ borderColor: "rgba(0,0,0,0.08)" }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-200 group-hover:bg-[#DC580A]"
                style={{ background: "rgba(220,88,10,0.08)" }}
              >
                <Icon
                  size={20}
                  className="transition-colors duration-200 group-hover:text-white"
                  style={{ color: "#DC580A" }}
                />
              </div>
              <div className="text-center">
                <div className="text-sm font-bold" style={{ color: "#353A3F" }}>{label}</div>
                <div className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>{sub}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Home CTA */}
        <button
          onClick={onHomeClick}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-100"
          style={{
            background: "linear-gradient(135deg, #DC580A, #b84507)",
            boxShadow: "0 4px 20px rgba(220,88,10,0.35)",
          }}
        >
          <Home size={16} />
          Retour à l&apos;accueil
        </button>
      </main>

      {/* Footer line */}
      <footer
        className="relative z-10 text-center py-6 text-xs"
        style={{ color: "#9ca3af" }}
      >
        © {new Date().getFullYear()} Folan — Tous droits réservés
      </footer>
    </div>
  );
}
