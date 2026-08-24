import { useState } from "react";
import { Star, ShoppingCart, ArrowRight, ChevronRight } from "lucide-react";
import { PRODUCTS } from "../data/products";

/* ── Static extras to pad out categories ── */
const STATIC_EXTRAS = [
  {
    id: 101,
    slug: null as string | null,
    name: "Adaptateur SC/APC duplex",
    shortDesc: "Adaptateur fibre optique compatible tous réseaux FTTH",
    category: "Connectique fibre",
    categoryTab: "connectique",
    badge: "nouveau" as const,
    price: 4.9,
    originalPrice: null as number | null,
    rating: 4.6,
    reviewCount: 142,
    inStock: true,
    imageUrl:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
  {
    id: 102,
    slug: null as string | null,
    name: "Boîtier de raccordement fibre",
    shortDesc: "Protection et organisation des connexions fibre en façade",
    category: "Réseau & accessoires",
    categoryTab: "reseau",
    badge: null as "pro" | "nouveau" | "bestseller" | "promo" | null,
    price: 12.9,
    originalPrice: null as number | null,
    rating: 4.5,
    reviewCount: 87,
    inStock: true,
    imageUrl:
      "https://images.unsplash.com/photo-1683322499436-f4383dd59f5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
  {
    id: 103,
    slug: null as string | null,
    name: "Stylo de nettoyage optique",
    shortDesc: "Nettoyage rapide des connecteurs SC, LC et FC",
    category: "Réseau & accessoires",
    categoryTab: "reseau",
    badge: "bestseller" as const,
    price: 7.5,
    originalPrice: 9.9,
    rating: 4.8,
    reviewCount: 315,
    inStock: true,
    imageUrl:
      "https://images.unsplash.com/photo-1517373116369-9bdb8cdc9f62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
];

const BADGE_STYLES: Record<string, { bg: string; label: string }> = {
  bestseller: { bg: "bg-amber-400 text-white", label: "Best-seller" },
  promo:      { bg: "bg-[#C75B12] text-white",  label: "Promo" },
  nouveau:    { bg: "bg-[#353A3F] text-white",  label: "Nouveau" },
  pro:        { bg: "bg-slate-700 text-white",   label: "Pro" },
};

const TABS = [
  { id: "tous",        label: "Tous" },
  { id: "cables",      label: "Câbles fibre" },
  { id: "connectique", label: "Connectique fibre" },
  { id: "reseau",      label: "Réseau & accessoires" },
];

/* map DB category strings → tab ids */
function categoryToTab(category: string): string {
  const c = category.toLowerCase();
  if (c.includes("câble") || c.includes("cordon") || c.includes("fibre box") || c.includes("jarretière"))
    return "cables";
  if (c.includes("connect") || c.includes("adapt") || c.includes("épissure"))
    return "connectique";
  return "reseau";
}

interface Props {
  onProductClick?: (slug: string) => void;
  onCategoryClick?: (slug: string) => void;
}

export function BestSellersSection({ onProductClick, onCategoryClick }: Props) {
  const [activeTab, setActiveTab] = useState("tous");

  /* normalise DB products */
  const realItems = PRODUCTS.slice(0, 8).map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    shortDesc: p.description.slice(0, 90).replace(/\.$/, "") + "…",
    category: p.category,
    categoryTab: categoryToTab(p.category),
    badge: p.badge,
    price: p.variants[0]?.price ?? null,
    originalPrice: p.variants[0]?.originalPrice ?? null,
    rating: p.rating,
    reviewCount: p.reviewCount,
    inStock: p.inStock,
    imageUrl: p.thumbnails[0]?.url ?? p.imageUrl,
  }));

  const allItems = [...realItems, ...STATIC_EXTRAS];

  const filtered =
    activeTab === "tous"
      ? allItems
      : allItems.filter((i) => i.categoryTab === activeTab);

  return (
    <section className="bg-white py-14 lg:py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-6 bg-[#C75B12]" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#C75B12] uppercase">
                Best-sellers
              </span>
            </div>
            <h2 className="text-2xl lg:text-[1.9rem] font-bold text-[#353A3F] tracking-tight mb-2">
              Les produits les plus demandés
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed max-w-lg">
              Découvrez les références essentielles pour vos installations fibre et réseau.
            </p>
          </div>
          <button
            onClick={() => onCategoryClick?.("cables-fibre-box")}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#C75B12] hover:text-[#a04a0f] transition-colors flex-shrink-0"
          >
            Voir tous les produits
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* ── Category tabs — single scrollable row ── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 mb-8 scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 text-sm font-semibold px-4 py-2 rounded-full border transition-all duration-150 ${
                activeTab === tab.id
                  ? "bg-[#353A3F] text-white border-[#353A3F] shadow-sm"
                  : "bg-white text-gray-500 border-gray-200 hover:border-[#353A3F]/30 hover:text-[#353A3F]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Desktop: 2-col horizontal cards ── */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-4">
          {filtered.slice(0, 6).map((item) => (
            <HorizontalCard
              key={item.id}
              item={item}
              onClick={() => { if (item.slug) onProductClick?.(item.slug); }}
            />
          ))}
        </div>

        {/* ── Mobile: 2-col vertical cards ── */}
        <div className="grid grid-cols-2 gap-3 lg:hidden">
          {filtered.slice(0, 6).map((item) => (
            <VerticalCard
              key={item.id}
              item={item}
              onClick={() => { if (item.slug) onProductClick?.(item.slug); }}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => onCategoryClick?.("cables-fibre-box")}
            className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-[#C75B12]/40 text-[#353A3F] font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-150 hover:shadow-sm"
          >
            Voir tous les produits
            <ArrowRight className="w-4 h-4 text-[#C75B12]" />
          </button>
        </div>

      </div>
    </section>
  );
}

/* ── Shared card item type ── */
type CardItem = {
  name: string;
  shortDesc: string;
  category: string;
  badge: "pro" | "nouveau" | "bestseller" | "promo" | null;
  price: number | null;
  originalPrice: number | null;
  rating: number | null;
  reviewCount: number | null;
  inStock: boolean;
  imageUrl: string;
};

/* ── Vertical card (mobile 2-col) ── */
function VerticalCard({ item, onClick }: { item: CardItem; onClick: () => void }) {
  const badgeInfo = item.badge ? BADGE_STYLES[item.badge] : null;

  return (
    <div
      onClick={onClick}
      className="group flex flex-col h-full bg-white border border-gray-100 hover:border-[#C75B12]/25 hover:shadow-md rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
    >
      {/* Image — fixed ratio */}
      <div className="relative h-28 overflow-hidden bg-gray-50 flex-shrink-0">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
        />
        {badgeInfo && (
          <span className={`absolute top-2 left-2 text-[9px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full ${badgeInfo.bg}`}>
            {badgeInfo.label}
          </span>
        )}
        {item.inStock && (
          <span className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 rounded-full px-1.5 py-0.5 text-[8px] font-semibold text-emerald-600">
            <span className="w-1 h-1 rounded-full bg-emerald-500" />
            Stock
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-3 gap-2">
        <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 truncate">
          {item.category}
        </p>
        <h3 className="text-xs font-bold text-[#353A3F] leading-snug line-clamp-2 group-hover:text-[#C75B12] transition-colors flex-1">
          {item.name}
        </h3>
        {item.rating !== null && (
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-2.5 h-2.5 ${i < Math.floor(item.rating!) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                />
              ))}
            </div>
            <span className="text-[9px] text-gray-400">({item.reviewCount})</span>
          </div>
        )}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-1">
          {item.price !== null ? (
            <>
              <span className="text-sm font-bold text-[#353A3F]">
                {item.price.toFixed(2).replace(".", ",")} €
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); onClick(); }}
                className="flex items-center gap-1 bg-[#C75B12] hover:bg-[#a04a0f] text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition-all"
              >
                <ShoppingCart className="w-3 h-3" />
                Ajouter
              </button>
            </>
          ) : (
            <button
              onClick={(e) => { e.stopPropagation(); onClick(); }}
              className="w-full text-[10px] font-semibold text-[#353A3F] border border-[#353A3F]/25 py-1.5 rounded-lg hover:bg-[#353A3F] hover:text-white transition-all"
            >
              Voir →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Horizontal card (desktop) ── */
function HorizontalCard({ item, onClick }: { item: CardItem; onClick: () => void }) {
  const badgeInfo = item.badge ? BADGE_STYLES[item.badge] : null;

  return (
    <div
      onClick={onClick}
      className="group flex items-stretch bg-white border border-gray-100 hover:border-[#C75B12]/25 hover:shadow-md rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
    >
      {/* Image — fixed square */}
      <div className="relative flex-shrink-0 w-36 self-stretch overflow-hidden bg-gray-50">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
        />
        {badgeInfo && (
          <span
            className={`absolute top-2.5 left-2.5 text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full ${badgeInfo.bg}`}
          >
            {badgeInfo.label}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 gap-4 px-5 py-4">
        <div className="flex flex-col flex-1 gap-1.5 min-w-0">

          {/* Category + stock */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 truncate">
              {item.category}
            </span>
            {item.inStock && (
              <span className="flex-shrink-0 flex items-center gap-1 text-[9px] font-semibold text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                En stock
              </span>
            )}
          </div>

          {/* Name */}
          <h3 className="text-sm font-bold text-[#353A3F] leading-snug group-hover:text-[#C75B12] transition-colors">
            {item.name}
          </h3>

          {/* Rating */}
          {item.rating !== null && item.reviewCount !== null && (
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(item.rating!)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-gray-400 font-medium">
                {item.rating} ({item.reviewCount} avis)
              </span>
            </div>
          )}

          {/* Desc */}
          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mt-0.5">
            {item.shortDesc}
          </p>
        </div>

        {/* Price + CTA */}
        <div className="flex-shrink-0 flex flex-col items-end justify-between gap-2 py-0.5">
          {item.price !== null ? (
            <>
              <div className="text-right">
                <div className="flex items-baseline gap-1 justify-end">
                  <span className="text-xl font-bold text-[#353A3F]">
                    {item.price.toFixed(2).replace(".", ",")} €
                  </span>
                  <span className="text-[10px] text-gray-400">TTC</span>
                </div>
                {item.originalPrice && (
                  <span className="text-[10px] text-gray-400 line-through">
                    {item.originalPrice.toFixed(2).replace(".", ",")} €
                  </span>
                )}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onClick(); }}
                className="inline-flex items-center gap-1.5 bg-[#C75B12] hover:bg-[#a04a0f] active:scale-95 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-150 shadow-sm shadow-[#C75B12]/20 whitespace-nowrap"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                Ajouter
              </button>
            </>
          ) : (
            <button
              onClick={(e) => { e.stopPropagation(); onClick(); }}
              className="inline-flex items-center gap-1.5 border border-[#353A3F]/30 text-[#353A3F] hover:bg-[#353A3F] hover:text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all duration-150 whitespace-nowrap"
            >
              Voir le produit
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
