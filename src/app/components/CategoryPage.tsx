import { useState, useMemo } from "react";
import {
  ChevronRight, Star, ShoppingCart, SlidersHorizontal, X, ChevronDown, LayoutGrid, List,
} from "lucide-react";
import { CATEGORIES, CATEGORY_PRODUCTS, getExtraProducts, type MockProduct } from "../data/categories";
import { PRODUCTS } from "../data/products";
import accessoiresBoxImg from "@/imports/image-9.png";

const LOCAL_BANNER_OVERRIDES: Record<string, string> = {
  "accessoires-box-installation": accessoiresBoxImg,
};

interface Props {
  slug: string;
  onBack: () => void;
  onProductClick: (slug: string) => void;
}

type SortKey = "popular" | "price-asc" | "price-desc" | "rating";

const SORT_LABELS: Record<SortKey, string> = {
  popular: "Les plus populaires",
  "price-asc": "Prix croissant",
  "price-desc": "Prix décroissant",
  rating: "Meilleures notes",
};

const BADGE_STYLES = {
  bestseller: "bg-amber-400 text-white",
  promo: "bg-[#DC580A] text-white",
  nouveau: "bg-[#353A3F] text-white",
  pro: "bg-slate-700 text-white",
};

const BADGE_LABELS = {
  bestseller: "Best-seller",
  promo: "Promo",
  nouveau: "Nouveau",
  pro: "Pro",
};

// Normalise real products into the same shape as MockProduct
function realToMock(p: (typeof PRODUCTS)[0]): MockProduct {
  return {
    id: String(p.id),
    name: p.name,
    category: p.category,
    price: p.variants[0].price,
    originalPrice: p.variants[0].originalPrice,
    inStock: p.inStock,
    badge: p.badge,
    rating: p.rating,
    reviewCount: p.reviewCount,
    image: p.thumbnails[0]?.url ?? p.imageUrl,
  };
}

function StarsSmall({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className="w-3 h-3"
          fill={i <= Math.round(rating) ? "#DC580A" : "#e5e7eb"}
          stroke="none"
        />
      ))}
    </div>
  );
}

interface CardProps {
  product: MockProduct;
  realSlug?: string;
  onProductClick: (slug: string) => void;
  view: "grid" | "list";
}

function ProductCard({ product, realSlug, onProductClick, view }: CardProps) {
  const [added, setAdded] = useState(false);
  const discountPct = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleClick = () => {
    if (realSlug) onProductClick(realSlug);
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  if (view === "list") {
    return (
      <div
        onClick={handleClick}
        className={`group flex gap-4 bg-white rounded-xl border border-gray-100 hover:border-[#DC580A] hover:shadow-lg transition-all duration-300 p-4 ${realSlug ? "cursor-pointer" : ""}`}
      >
        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          {product.badge && (
            <div className={`absolute top-1 left-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full ${BADGE_STYLES[product.badge]}`}>
              {BADGE_LABELS[product.badge]}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">{product.category}</p>
            <h3 className="text-sm font-semibold text-[#353A3F] leading-snug group-hover:text-[#DC580A] transition-colors line-clamp-2">
              {product.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <StarsSmall rating={product.rating} />
              <span className="text-[11px] text-gray-400">({product.reviewCount})</span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold text-[#DC580A]">{product.price.toFixed(2).replace(".", ",")} €</span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-400 line-through">{product.originalPrice.toFixed(2).replace(".", ",")} €</span>
                )}
              </div>
              <p className="text-[10px] text-gray-400">Prix TTC</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${product.inStock ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                {product.inStock ? "En stock" : "Épuisé"}
              </span>
              <button
                onClick={handleAdd}
                disabled={!product.inStock}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  !product.inStock ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                  : added ? "bg-green-500 text-white"
                  : "bg-[#DC580A] text-white hover:bg-[#B84808]"
                }`}
              >
                <ShoppingCart className="w-3 h-3" />
                {added ? "✓" : "Ajouter"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className={`group bg-white rounded-2xl border border-gray-100 hover:border-[#DC580A] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col ${realSlug ? "cursor-pointer" : ""}`}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <div className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm ${BADGE_STYLES[product.badge]}`}>
            {BADGE_LABELS[product.badge]}
          </div>
        )}
        {discountPct > 0 && !product.badge && (
          <div className="absolute top-3 left-3 bg-[#DC580A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            -{discountPct}%
          </div>
        )}
        <div className={`absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium bg-white/90 shadow-sm ${product.inStock ? "text-green-600" : "text-gray-400"}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? "bg-green-500" : "bg-gray-400"}`} />
          {product.inStock ? "En stock" : "Épuisé"}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">
        <div className="flex-1">
          <p className="text-[9px] font-semibold uppercase tracking-widest text-gray-400 mb-1">{product.category}</p>
          <h3 className="text-sm font-semibold text-[#353A3F] leading-snug line-clamp-2 group-hover:text-[#DC580A] transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1.5">
            <StarsSmall rating={product.rating} />
            <span className="text-[11px] text-gray-400">({product.reviewCount})</span>
          </div>
        </div>
        <div className="flex items-end justify-between gap-2 pt-1 border-t border-gray-100">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-[#DC580A]">{product.price.toFixed(2).replace(".", ",")} €</span>
              <span className="text-[10px] text-gray-400">TTC</span>
            </div>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">{product.originalPrice.toFixed(2).replace(".", ",")} €</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
              !product.inStock ? "bg-gray-100 text-gray-300 cursor-not-allowed"
              : added ? "bg-green-500 text-white scale-95"
              : "bg-[#DC580A] text-white hover:bg-[#B84808] hover:shadow-lg hover:shadow-[#DC580A]/30 active:scale-95"
            }`}
          >
            <ShoppingCart className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export function CategoryPage({ slug, onBack, onProductClick }: Props) {
  const category = CATEGORIES.find((c) => c.slug === slug);

  const [sort, setSort] = useState<SortKey>("popular");
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [maxPrice, setMaxPrice] = useState(200);
  const [selectedBadges, setSelectedBadges] = useState<Set<string>>(new Set());

  if (!category) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <p className="text-4xl">🗂️</p>
        <h2 className="text-2xl font-semibold text-[#353A3F]">Catégorie introuvable</h2>
        <button onClick={onBack} className="bg-[#DC580A] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#B84808] transition-colors">
          Retour à la boutique
        </button>
      </div>
    );
  }

  // Build combined product list
  const realSlugs = CATEGORY_PRODUCTS[slug] ?? [];
  const realProducts = realSlugs
    .map((s) => PRODUCTS.find((p) => p.slug === s))
    .filter(Boolean) as typeof PRODUCTS;
  const mockExtras = getExtraProducts(slug);

  const allProducts: { data: MockProduct; realSlug?: string }[] = [
    ...realProducts.map((p) => ({ data: realToMock(p), realSlug: p.slug })),
    ...mockExtras.map((p) => ({ data: p })),
  ];

  const filtered = useMemo(() => {
    let result = allProducts.filter((item) => {
      if (onlyInStock && !item.data.inStock) return false;
      if (item.data.price > maxPrice) return false;
      if (selectedBadges.size > 0 && !selectedBadges.has(item.data.badge ?? "")) return false;
      return true;
    });
    result.sort((a, b) => {
      if (sort === "price-asc") return a.data.price - b.data.price;
      if (sort === "price-desc") return b.data.price - a.data.price;
      if (sort === "rating") return b.data.rating - a.data.rating;
      return b.data.reviewCount - a.data.reviewCount; // popular
    });
    return result;
  }, [allProducts, sort, onlyInStock, maxPrice, selectedBadges]);

  const toggleBadge = (b: string) => {
    setSelectedBadges((prev) => {
      const next = new Set(prev);
      next.has(b) ? next.delete(b) : next.add(b);
      return next;
    });
  };

  const activeFilterCount = (onlyInStock ? 1 : 0) + (maxPrice < 200 ? 1 : 0) + selectedBadges.size;

  return (
    <div className="bg-white min-h-screen">

      {/* ── Category hero ──────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-[#353A3F] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${LOCAL_BANNER_OVERRIDES[slug] ?? category.image})` }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(53,58,63,0.92) 0%, rgba(53,58,63,0.75) 40%, rgba(53,58,63,0.35) 70%, rgba(53,58,63,0.10) 100%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 py-10 lg:py-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/60 mb-4 flex-wrap">
            <button onClick={onBack} className="hover:text-white transition-colors">Boutique</button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/90 font-medium">{category.name}</span>
          </nav>
          <h1 className="text-2xl lg:text-4xl font-semibold leading-tight mb-2">{category.name}</h1>
          <p className="text-sm lg:text-base text-white/70 max-w-2xl">{category.description}</p>
          <p className="mt-3 text-xs text-white/50">{category.productCount} références disponibles</p>
        </div>
      </div>

      {/* ── Toolbar ────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
          {/* Left: filter button + count */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
                filterOpen || activeFilterCount > 0
                  ? "border-[#DC580A] text-[#DC580A] bg-orange-50"
                  : "border-gray-200 text-[#374151] hover:border-[#DC580A] hover:text-[#DC580A]"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtres
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#DC580A] text-white text-[10px] flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <span className="text-xs text-gray-400 hidden sm:block">
              {filtered.length} produit{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Right: sort + view toggle */}
          <div className="flex items-center gap-2">
            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-[#374151] hover:border-[#DC580A] transition-colors"
              >
                {SORT_LABELS[sort]}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50 min-w-[180px]">
                  {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => { setSort(key); setSortOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        sort === key ? "text-[#DC580A] bg-orange-50 font-medium" : "text-[#374151] hover:bg-gray-50"
                      }`}
                    >
                      {SORT_LABELS[key]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* View toggle */}
            <div className="hidden sm:flex border border-gray-200 rounded-lg overflow-hidden">
              {(["grid", "list"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`p-2 transition-colors ${view === v ? "bg-[#DC580A] text-white" : "text-gray-400 hover:text-[#DC580A]"}`}
                >
                  {v === "grid" ? <LayoutGrid className="w-4 h-4" /> : <List className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Filter panel (slide-down) ───────────────────────────────── */}
      {filterOpen && (
        <div className="border-b border-gray-200 bg-[#F8F9FA]">
          <div className="max-w-7xl mx-auto px-4 py-5 grid sm:grid-cols-3 gap-6">
            {/* In stock */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-3">Disponibilité</p>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div
                  onClick={() => setOnlyInStock(!onlyInStock)}
                  className={`w-9 h-5 rounded-full relative transition-colors duration-200 ${onlyInStock ? "bg-[#DC580A]" : "bg-gray-300"}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${onlyInStock ? "translate-x-4" : "translate-x-0.5"}`} />
                </div>
                <span className="text-sm text-[#374151]">En stock uniquement</span>
              </label>
            </div>

            {/* Price */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-3">
                Prix max — <span className="text-[#DC580A] normal-case font-normal">{maxPrice} €</span>
              </p>
              <input
                type="range"
                min={5}
                max={200}
                step={5}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#DC580A]"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>5 €</span><span>200 €</span>
              </div>
            </div>

            {/* Badges */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-3">Labels</p>
              <div className="flex flex-wrap gap-2">
                {(["bestseller", "promo", "nouveau", "pro"] as const).map((b) => (
                  <button
                    key={b}
                    onClick={() => toggleBadge(b)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-150 ${
                      selectedBadges.has(b)
                        ? `${BADGE_STYLES[b]} border-transparent`
                        : "border-gray-200 text-gray-600 hover:border-[#DC580A] hover:text-[#DC580A]"
                    }`}
                  >
                    {BADGE_LABELS[b]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Clear filters */}
          {activeFilterCount > 0 && (
            <div className="max-w-7xl mx-auto px-4 pb-4">
              <button
                onClick={() => { setOnlyInStock(false); setMaxPrice(200); setSelectedBadges(new Set()); }}
                className="flex items-center gap-1.5 text-xs text-[#DC580A] hover:underline"
              >
                <X className="w-3.5 h-3.5" />
                Effacer tous les filtres
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Product grid / list ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-20 space-y-3">
            <p className="text-4xl">🔍</p>
            <p className="text-lg font-semibold text-[#353A3F]">Aucun produit trouvé</p>
            <p className="text-sm text-gray-500">Essayez d'élargir vos filtres.</p>
            <button
              onClick={() => { setOnlyInStock(false); setMaxPrice(200); setSelectedBadges(new Set()); }}
              className="mt-2 text-sm text-[#DC580A] underline underline-offset-2"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {filtered.map((item) => (
              <ProductCard
                key={item.data.id}
                product={item.data}
                realSlug={item.realSlug}
                onProductClick={onProductClick}
                view="grid"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((item) => (
              <ProductCard
                key={item.data.id}
                product={item.data}
                realSlug={item.realSlug}
                onProductClick={onProductClick}
                view="list"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
