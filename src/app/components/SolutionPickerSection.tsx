import { ArrowRight, Wifi, Package, Building2 } from "lucide-react";

const CARD_IMG_HOME =
  "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxmaWJlciUyMG9wdGljJTIwY2FibGUlMjBob21lJTIwaW50ZXJuZXQlMjByb3V0ZXIlMjBzZXR1cHxlbnwxfHx8fDE3ODUzNDYyMjZ8MA&ixlib=rb-4.1.0&q=80&w=800";

const CARD_IMG_KIT =
  "https://images.unsplash.com/photo-1732811797512-da79593cce1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWJlciUyMG9wdGljJTIwY2FibGUlMjBjb25uZWN0b3IlMjBjbG9zZXVwJTIwbWFjcm98ZW58MXx8fHwxNzg1MzQ5MDg0fDA&ixlib=rb-4.1.0&q=80&w=800";

const CARD_IMG_PRO =
  "https://images.unsplash.com/photo-1683322499436-f4383dd59f5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwc2VydmVyJTIwcmFjayUyMGRhdGElMjBjZW50ZXIlMjBjYWJsZXMlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzg1MzQ2MjMzfDA&ixlib=rb-4.1.0&q=80&w=800";

interface Props {
  onCategoryClick?: (slug: string) => void;
  onProClick?: () => void;
}

export function SolutionPickerSection({ onCategoryClick, onProClick }: Props) {
  return (
    <section className="bg-white pt-16 pb-8 lg:pt-24 lg:pb-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12 lg:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-[2.15rem] font-bold text-[#353A3F] tracking-tight mb-3">
            Découvrez nos solutions fibre
          </h2>
          <p className="text-gray-500 text-sm lg:text-base max-w-xl mx-auto leading-relaxed">
            Des solutions adaptées aux particuliers, installateurs et entreprises.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">

          {/* ── Card 1 : Fibre Box ── */}
          <div
            className="group flex flex-col rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
            onClick={() => onCategoryClick?.("cables-fibre-box")}
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={CARD_IMG_HOME}
                alt="Câble fibre Box internet"
                className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {/* Icon badge */}
              <span className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                <Wifi className="w-4 h-4 text-[#353A3F]" />
              </span>
            </div>

            <div className="flex flex-col flex-1 p-5 lg:p-6 gap-3">
              <div>
                <h3 className="text-base font-bold text-[#353A3F] mb-1.5 leading-snug">
                  Fibre pour votre Box internet
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Trouvez le câble adapté à votre installation fibre Orange, Free,
                  SFR ou Bouygues.
                </p>
              </div>

              {/* Operator dots */}
              <div className="flex items-center gap-2 flex-wrap">
                {[
                  { label: "Orange", color: "#FF6600" },
                  { label: "Free", color: "#CD1426" },
                  { label: "SFR", color: "#E2001A" },
                  { label: "Bouygues", color: "#0082C3" },
                ].map((op) => (
                  <span
                    key={op.label}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-600 bg-gray-50 border border-gray-200 rounded-full px-2.5 py-0.5"
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: op.color }}
                    />
                    {op.label}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-[#C75B12] group-hover:gap-2.5 transition-all">
                Voir les câbles compatibles
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* ── Card 2 : Accessoires ── */}
          <div
            className="group flex flex-col rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
            onClick={() => onCategoryClick?.("accessoires-box-installation")}
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={CARD_IMG_KIT}
                alt="Accessoires et kits fibre optique"
                className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <span className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                <Package className="w-4 h-4 text-[#353A3F]" />
              </span>
            </div>

            <div className="flex flex-col flex-1 p-5 lg:p-6 gap-3">
              <div>
                <h3 className="text-base font-bold text-[#353A3F] mb-1.5 leading-snug">
                  Accessoires & kits fibre
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Découvrez nos accessoires pour installer, connecter et optimiser
                  votre réseau fibre.
                </p>
              </div>

              {/* Category tags */}
              <div className="flex flex-wrap gap-2">
                {["Kits installation", "Rallonges fibre", "Accessoires réseau"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-semibold text-[#353A3F] bg-gray-50 border border-gray-100 rounded-full px-3 py-0.5"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>

              <div className="mt-auto pt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-[#C75B12] group-hover:gap-2.5 transition-all">
                Voir les accessoires
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* ── Card 3 : Pro ── */}
          <div
            className="group flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 sm:col-span-2 lg:col-span-1 cursor-pointer"
            onClick={onProClick}
          >
            {/* Image */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={CARD_IMG_PRO}
                alt="Professionnels & installateurs fibre"
                className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#1E2124]/65" />
              <span className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Building2 className="w-4 h-4 text-white" />
              </span>
              <span className="absolute bottom-3 left-3 text-[10px] font-bold tracking-widest text-[#C75B12] uppercase">
                PROFESSIONNELS
              </span>
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 bg-[#353A3F] p-5 lg:p-6 gap-4">
              <div>
                <h3 className="text-base font-bold text-white mb-1.5 leading-snug">
                  Professionnels & installateurs
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Retrouvez les produits adaptés à vos chantiers fibre et
                  installations réseau.
                </p>
              </div>

              <ul className="space-y-2">
                {[
                  "Produits pour installations réseau",
                  "Commandes professionnelles",
                  "Support technique",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-gray-200">
                    <span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#C75B12]/25 flex items-center justify-center">
                      <svg
                        className="w-2.5 h-2.5 text-[#C75B12]"
                        fill="none"
                        viewBox="0 0 12 12"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <button className="mt-auto inline-flex items-center justify-center gap-2 bg-[#C75B12] hover:bg-[#a04a0f] active:scale-95 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-150 shadow w-full">
                Voir l'espace professionnel
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
