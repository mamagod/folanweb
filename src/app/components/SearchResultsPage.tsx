import { useState, useMemo } from "react";
import { Search, ArrowLeft, Star, ShoppingCart, SlidersHorizontal, X } from "lucide-react";
import { PRODUCTS } from "../data/products";

interface Props {
  query: string;
  onBack: () => void;
  onProductClick: (slug: string) => void;
  onSearch: (q: string) => void;
}

const BADGE_LABELS: Record<string, string> = {
  nouveau: "Nouveau",
  promo: "Promo",
  bestseller: "Best-seller",
  pro: "Pro",
};
const BADGE_COLORS: Record<string, string> = {
  nouveau: "bg-gray-100 text-[#353A3F]",
  promo: "bg-red-100 text-red-600",
  bestseller: "bg-amber-100 text-amber-700",
  pro: "bg-[#353A3F]/10 text-[#353A3F]",
};

const SORT_OPTIONS = [
  { value: "relevance", label: "Pertinence" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "rating", label: "Mieux notés" },
];

function starFill(rating: number, i: number) {
  if (rating >= i + 1) return "text-amber-400";
  if (rating >= i + 0.5) return "text-amber-300";
  return "text-gray-200";
}

export function SearchResultsPage({ query, onBack, onProductClick, onSearch }: Props) {
  const [input, setInput] = useState(query);
  const [sort, setSort] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const normalise = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

  const results = useMemo(() => {
    const q = normalise(query);
    if (!q.trim()) return PRODUCTS;
    return PRODUCTS.filter((p) => {
      const haystack = normalise(`${p.name} ${p.category} ${p.description} ${p.benefits.join(" ")}`);
      return q.split(/\s+/).every((word) => haystack.includes(word));
    });
  }, [query]);

  const categories = useMemo(
    () => Array.from(new Set(results.map((p) => p.category))),
    [results]
  );

  const filtered = useMemo(() => {
    let list = selectedCategory ? results.filter((p) => p.category === selectedCategory) : results;
    if (sort === "price-asc") list = [...list].sort((a, b) => a.variants[0].price - b.variants[0].price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.variants[0].price - a.variants[0].price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [results, sort, selectedCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) onSearch(input.trim());
  };

  return (
    <div className="min-h-screen bg-[#F8FAFE]">
      {/* Search header bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label="Retour"
          >
            <ArrowLeft className="w-5 h-5 text-gray-500" />
          </button>
          <form onSubmit={handleSubmit} className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 focus:border-[#353A3F] focus:outline-none text-sm bg-gray-50 focus:bg-white transition-colors"
              placeholder="Rechercher un produit..."
              autoFocus
            />
            {input && (
              <button
                type="button"
                onClick={() => setInput("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>
          <button
            onClick={handleSubmit as any}
            className="hidden sm:flex items-center gap-2 bg-[#353A3F] text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#2A2E32] transition-colors flex-shrink-0"
          >
            Rechercher
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Result count + sort */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <p className="text-sm text-gray-500">
              {filtered.length === 0
                ? "Aucun résultat pour"
                : `${filtered.length} résultat${filtered.length > 1 ? "s" : ""} pour`}{" "}
              <span className="font-semibold text-[#353A3F]">« {query} »</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border transition-colors sm:hidden ${
                showFilters ? "bg-[#353A3F] text-white border-[#353A3F]" : "border-gray-200 text-gray-600 bg-white"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filtres
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:border-[#353A3F] cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar filters — desktop always visible, mobile toggle */}
          <aside className={`flex-shrink-0 w-52 ${showFilters ? "block" : "hidden"} sm:block`}>
            <div className="bg-white rounded-2xl border border-gray-100 p-4 sticky top-24">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Catégories</h3>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left text-sm px-2.5 py-1.5 rounded-lg transition-colors ${
                      selectedCategory === null
                        ? "bg-[#353A3F]/8 text-[#353A3F] font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Tous ({results.length})
                  </button>
                </li>
                {categories.map((cat) => {
                  const count = results.filter((p) => p.category === cat).length;
                  return (
                    <li key={cat}>
                      <button
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left text-sm px-2.5 py-1.5 rounded-lg transition-colors ${
                          selectedCategory === cat
                            ? "bg-[#353A3F]/8 text-[#353A3F] font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {cat} ({count})
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Results grid */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-7 h-7 text-gray-300" />
                </div>
                <p className="text-gray-500 text-sm mb-1">Aucun produit trouvé pour cette recherche.</p>
                <p className="text-gray-400 text-xs">Essayez d'autres mots-clés ou parcourez nos catégories.</p>
                <button
                  onClick={onBack}
                  className="mt-5 inline-flex items-center gap-2 text-sm text-[#C75B12] font-medium hover:underline underline-offset-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((product) => {
                  const price = product.variants[0].price;
                  const originalPrice = product.variants[0].originalPrice;
                  return (
                    <button
                      key={product.id}
                      onClick={() => onProductClick(product.slug)}
                      className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-200 text-left group"
                    >
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.badge && (
                          <span className={`absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${BADGE_COLORS[product.badge]}`}>
                            {BADGE_LABELS[product.badge]}
                          </span>
                        )}
                      </div>
                      {/* Info */}
                      <div className="p-4">
                        <p className="text-[10px] text-gray-400 mb-1">{product.category}</p>
                        <h3 className="text-sm font-semibold text-[#353A3F] leading-snug mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        {/* Stars */}
                        <div className="flex items-center gap-1 mb-3">
                          <div className="flex">
                            {[0, 1, 2, 3, 4].map((i) => (
                              <Star key={i} className={`w-3 h-3 fill-current ${starFill(product.rating, i)}`} />
                            ))}
                          </div>
                          <span className="text-[10px] text-gray-400">({product.reviewCount})</span>
                        </div>
                        {/* Price + CTA */}
                        <div className="flex items-end justify-between">
                          <div>
                            <span className="text-base font-bold text-[#353A3F]">
                              {price.toFixed(2).replace(".", ",")} €
                            </span>
                            {originalPrice && (
                              <span className="ml-1.5 text-xs text-gray-400 line-through">
                                {originalPrice.toFixed(2).replace(".", ",")} €
                              </span>
                            )}
                          </div>
                          <div className="w-8 h-8 rounded-lg bg-[#C75B12] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ShoppingCart className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
