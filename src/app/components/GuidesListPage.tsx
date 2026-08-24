import { BookOpen, Clock, ArrowLeft, Search } from "lucide-react";
import { useState, useRef } from "react";
import { GUIDES } from "../data/guides";

interface GuidesListPageProps {
  onBack: () => void;
  onGuideClick: (slug: string) => void;
  onContactClick?: () => void;
}

export function GuidesListPage({ onBack, onGuideClick, onContactClick }: GuidesListPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(GUIDES.map((g) => g.category)));

  const filterRowRef = useRef<HTMLDivElement>(null);
  const filterBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectCategory = (category: string | null, btnIndex: number) => {
    setSelectedCategory(category);
    const container = filterRowRef.current;
    const btn = filterBtnRefs.current[btnIndex];
    if (container && btn) {
      const target = Math.max(0, btn.offsetLeft - 16);
      container.scrollTo({ left: target, behavior: "smooth" });
    }
  };

  const filteredGuides = GUIDES.filter((guide) => {
    const matchesSearch =
      searchQuery === "" ||
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === null || guide.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const difficultyColors = {
    Débutant: "bg-green-100 text-green-700 border-green-200",
    Intermédiaire: "bg-orange-100 text-orange-700 border-orange-200",
    Avancé: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Header */}
      <div className="relative bg-[#353A3F] text-white py-14 lg:py-20 overflow-hidden">
        {/* Right-side image — fades in from the right */}
        <div className="absolute right-0 top-0 w-[55%] h-full hidden lg:block pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1400&q=80"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, #353A3F 0%, #353A3F 5%, rgba(53,58,63,0.85) 35%, rgba(53,58,63,0.2) 70%, transparent 100%)" }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </button>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-[#C75B12] rounded-xl flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-[#C75B12] text-xs font-bold tracking-[0.2em] uppercase mb-0.5">Ressources</p>
              <h1 className="text-3xl lg:text-4xl font-bold">Guides & Tutoriels</h1>
            </div>
          </div>
          <p className="text-white/80 text-lg max-w-xl leading-relaxed">
            Apprenez à installer, optimiser et dépanner votre installation fibre optique avec nos guides détaillés.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un guide..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#DC580A] focus:border-transparent outline-none"
            />
          </div>

          {/* Category Filters */}
          <div
            ref={filterRowRef}
            className="flex gap-2 overflow-x-auto pb-0.5 sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: "none" }}
          >
            <button
              ref={(el) => { filterBtnRefs.current[0] = el; }}
              onClick={() => selectCategory(null, 0)}
              className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                selectedCategory === null
                  ? "bg-[#DC580A] text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-[#DC580A]"
              }`}
            >
              Tous les guides
            </button>
            {categories.map((category, i) => (
              <button
                key={category}
                ref={(el) => { filterBtnRefs.current[i + 1] = el; }}
                onClick={() => selectCategory(category, i + 1)}
                className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  selectedCategory === category
                    ? "bg-[#DC580A] text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-[#DC580A]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-sm text-gray-600">
          {filteredGuides.length} guide{filteredGuides.length > 1 ? "s" : ""} trouvé{filteredGuides.length > 1 ? "s" : ""}
        </div>

        {/* Guides Grid */}
        {filteredGuides.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun guide trouvé</h3>
            <p className="text-gray-600 mb-4">Essayez avec d'autres mots-clés ou catégories</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
              className="text-[#DC580A] hover:text-[#B84808] font-medium"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredGuides.map((guide) => (
              <button
                key={guide.id}
                onClick={() => onGuideClick(guide.slug)}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#DC580A] hover:shadow-xl transition-all duration-300 text-left"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-3 py-1 bg-[#DC580A] text-white text-xs font-semibold rounded-full">
                      {guide.category}
                    </span>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${difficultyColors[guide.difficulty]}`}>
                      {guide.difficulty}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{guide.readTime}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-[#353A3F] group-hover:text-[#DC580A] transition-colors mb-2 line-clamp-2">
                    {guide.title}
                  </h3>

                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {guide.description}
                  </p>

                  <div className="mt-4 flex items-center text-[#DC580A] text-sm font-medium">
                    Lire le guide
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-[#F7F5F2] border border-gray-200 rounded-xl p-6 flex flex-col sm:flex-row items-start gap-5">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-[#697586]" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[#26313D] mb-1">Vous ne trouvez pas ce que vous cherchez ?</h3>
            <p className="text-sm text-[#697586] mb-4 leading-relaxed">
              Notre équipe peut vous orienter vers le contenu adapté à votre besoin ou répondre à vos questions.
            </p>
            <button
              onClick={onContactClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C75B12] hover:bg-[#a34a0e] text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Nous contacter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
