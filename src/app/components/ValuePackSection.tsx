import { Check, ShoppingCart, ArrowRight } from "lucide-react";

const IMG_CABLE =
  "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwY2FibGVzJTIwY29ubmVjdG9ycyUyMGV0aGVybmV0JTIwcGF0Y2glMjBwYW5lbCUyMG9yZ2FuaXplZHxlbnwxfHx8fDE3ODUzNTMzNzh8MA&ixlib=rb-4.1.0&q=80&w=600";

const IMG_BUNDLE =
  "https://images.unsplash.com/photo-1517373116369-9bdb8cdc9f62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxuZXR3b3JrJTIwY2FibGVzJTIwY29ubmVjdG9ycyUyMGV0aGVybmV0JTIwcGF0Y2glMjBwYW5lbCUyMG9yZ2FuaXplZHxlbnwxfHx8fDE3ODUzNTMzNzh8MA&ixlib=rb-4.1.0&q=80&w=600";

const IMG_HERO =
  "https://images.unsplash.com/photo-1606814540563-5c02d62fd409?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxmaWJlciUyMG9wdGljJTIwYnVuZGxlJTIwY2FibGUlMjBzZXQlMjB0ZWNobm9sb2d5JTIwYmx1ZSUyMGxpZ2h0fGVufDF8fHx8MTc4NTM1MzM3OXww&ixlib=rb-4.1.0&q=80&w=1200";

const IMG_SERVER =
  "https://images.unsplash.com/photo-1683322499436-f4383dd59f5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxmaWJlciUyMG9wdGljJTIwY2FibGUlMjBpbnN0YWxsYXRpb24lMjBuZXR3b3JrfGVufDF8fHx8MTc4NTM1NjA0NHww&ixlib=rb-4.1.0&q=80&w=600";

const PACK_ITEMS = [
  "1× Câble optique (longueur au choix)",
  "1× Kit de fixation murale",
  "1× Stylo de nettoyage optique",
];

export function ValuePackSection() {
  return (
    <section className="pt-6 pb-12 lg:pt-10 lg:pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden bg-[#F4F4F5] border border-gray-100/60 shadow-sm grid lg:grid-cols-[1.1fr_1fr] min-h-[420px]">

          {/* ── LEFT: Product bundle visual ── */}
          <div className="relative overflow-hidden">

            {/* Main hero image */}
            <img
              src={IMG_HERO}
              alt="Pack Éco fibre optique"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay gradient to blend into card */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#353A3F]/10 to-[#F4F4F5]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F4F4F5]/60 via-transparent to-transparent" />

            {/* Composed product cards floating over image */}
            <div className="relative z-10 flex flex-col justify-center gap-3 px-8 py-10 lg:px-12 h-full">

              {/* Large main product card */}
              <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md rounded-2xl px-4 py-3.5 shadow-md border border-white/70 w-fit">
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm">
                  <img src={IMG_CABLE} alt="Câble fibre" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#353A3F] leading-none mb-1">Câble fibre optique</p>
                  <p className="text-[10px] text-gray-400 font-medium">SC/APC — longueur au choix</p>
                  <span className="inline-block mt-1 text-[9px] font-bold text-[#C75B12] bg-[#C75B12]/8 border border-[#C75B12]/20 rounded-full px-2 py-0.5">
                    Inclus
                  </span>
                </div>
              </div>

              {/* Second product card — offset */}
              <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md rounded-2xl px-4 py-3.5 shadow-md border border-white/70 w-fit ml-6">
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm">
                  <img src={IMG_BUNDLE} alt="Kit fixation" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#353A3F] leading-none mb-1">Kit de fixation murale</p>
                  <p className="text-[10px] text-gray-400 font-medium">Colliers · goulottes · chevilles</p>
                  <span className="inline-block mt-1 text-[9px] font-bold text-[#C75B12] bg-[#C75B12]/8 border border-[#C75B12]/20 rounded-full px-2 py-0.5">
                    Inclus
                  </span>
                </div>
              </div>

              {/* Third product card — offset further */}
              <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md rounded-2xl px-4 py-3.5 shadow-md border border-white/70 w-fit ml-12">
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm">
                  <img src={IMG_SERVER} alt="Stylo nettoyage" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#353A3F] leading-none mb-1">Stylo de nettoyage optique</p>
                  <p className="text-[10px] text-gray-400 font-medium">Nettoyage connecteur garanti</p>
                  <span className="inline-block mt-1 text-[9px] font-bold text-[#C75B12] bg-[#C75B12]/8 border border-[#C75B12]/20 rounded-full px-2 py-0.5">
                    Inclus
                  </span>
                </div>
              </div>

              {/* Pack badge */}
              <div className="mt-1 self-start ml-4 bg-[#353A3F] text-white rounded-2xl px-5 py-3 shadow-lg">
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Pack complet</p>
                <p className="text-sm font-bold leading-none">3 produits · Prêt à installer</p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Info + CTA ── */}
          <div className="flex flex-col justify-center gap-6 px-8 py-10 lg:px-12 lg:py-14">

            {/* Label */}
            <span className="self-start inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.18em] text-[#C75B12] uppercase border border-[#C75B12]/25 bg-[#C75B12]/6 rounded-full px-3.5 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C75B12]" />
              PACK ÉCO
            </span>

            {/* Headline */}
            <div className="space-y-3 max-w-sm">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#353A3F] leading-tight tracking-tight">
                Pack Éco : Tout-en-un pour votre connexion
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Ne manquez de rien. Le kit complet pour installer votre fibre
                simplement et rapidement.
              </p>
            </div>

            {/* Pack contents */}
            <ul className="space-y-2.5">
              {PACK_ITEMS.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-[#353A3F] font-medium">
                  <div className="w-4 h-4 rounded-full bg-[#C75B12]/15 border border-[#C75B12]/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-[#C75B12]" strokeWidth={3} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            {/* Price */}
            <div className="pt-1 border-t border-gray-100/60">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[11px] text-gray-400 font-medium">À partir de</span>
                <span className="text-3xl font-bold text-[#353A3F] tracking-tight">19,90 €</span>
                <span className="text-xs text-gray-400">TTC</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-2">
              <button className="w-full inline-flex items-center justify-center gap-2.5 bg-[#C75B12] hover:bg-[#a04a0f] active:scale-[0.98] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all duration-150 shadow-md shadow-[#C75B12]/20">
                <ShoppingCart className="w-4 h-4" />
                Ajouter le Pack au panier
              </button>
              <p className="text-center text-[10px] text-gray-400">
                Livraison rapide · Retours 30 jours · France
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
