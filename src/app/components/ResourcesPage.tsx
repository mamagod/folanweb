import { ArrowLeft, ArrowRight, BookOpen, Building2, FileText, HelpCircle, ChevronRight } from "lucide-react";

interface ResourcesPageProps {
  onBack: () => void;
  onNavigate: (slug: string) => void;
  onContactClick?: () => void;
}

const RESOURCE_CARDS = [
  {
    icon: BookOpen,
    title: "Guides & Tutoriels",
    description:
      "Conseils d'installation, bonnes pratiques, dépannage et astuces pour optimiser vos installations fibre optique.",
    cta: "Découvrir les guides",
    slug: "guides",
    image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=600&q=80",
    imageAlt: "Installation fibre optique",
  },
  {
    icon: Building2,
    title: "Cas clients",
    description:
      "Découvrez nos réalisations et la façon dont nous accompagnons nos clients dans leurs projets.",
    cta: "Voir les cas clients",
    slug: "cas-clients",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    imageAlt: "Infrastructure réseau datacenter",
  },
  {
    icon: FileText,
    title: "Catalogues & brochures",
    description:
      "Téléchargez nos catalogues produits, fiches techniques et documentations commerciales.",
    cta: "Voir les documents",
    slug: "catalogues",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
    imageAlt: "Documents et catalogues",
  },
  {
    icon: HelpCircle,
    title: "Centre d'aide & FAQ",
    description:
      "Trouvez rapidement les réponses aux questions les plus fréquentes sur nos produits et services.",
    cta: "Consulter la FAQ",
    slug: "faq",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80",
    imageAlt: "Support et assistance",
  },
];

export function ResourcesPage({ onBack, onNavigate, onContactClick }: ResourcesPageProps) {
  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero ── */}
      <div className="bg-[#F7F5F2] border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-5">
            <button
              onClick={onBack}
              className="hover:text-[#C75B12] transition-colors font-medium"
            >
              Accueil
            </button>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span className="text-[#26313D] font-semibold">Ressources</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              {/* Orange accent + kicker */}
              <div className="flex items-center gap-3 mb-3">
                <span className="block w-5 h-0.5 bg-[#C75B12] rounded-full flex-shrink-0" />
                <p className="text-[#C75B12] text-[11px] font-bold tracking-[0.22em] uppercase">
                  Ressources
                </p>
              </div>
              <h1 className="text-3xl lg:text-[2.4rem] font-bold text-[#26313D] leading-tight mb-3">
                Ressources
              </h1>
              <p className="text-[#697586] text-base lg:text-lg leading-relaxed">
                Guides, cas clients, catalogues et FAQ : retrouvez ici toutes les ressources pour vous
                accompagner dans vos projets fibre optique.
              </p>
            </div>

            {/* Back button — desktop only, aligned to bottom-right of hero */}
            
          </div>
        </div>
      </div>

      {/* ── Cards section ── */}
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-10 lg:py-14">
        <h2 className="text-xl lg:text-2xl font-bold text-[#26313D] mb-6 lg:mb-8">
          Explorez nos ressources
        </h2>

        <div className="grid md:grid-cols-2 gap-4 lg:gap-5">
          {RESOURCE_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.slug}
                onClick={() => onNavigate(card.slug)}
                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#C75B12]/40 hover:shadow-lg transition-all duration-300 text-left flex min-h-[148px] md:min-h-[164px]"
              >
                {/* Text content */}
                <div className="flex-1 p-4 sm:p-5 lg:p-6 flex flex-col min-w-0">
                  {/* Icon */}
                  <div className="w-9 h-9 rounded-xl bg-[#FEF0E6] flex items-center justify-center mb-3.5 flex-shrink-0">
                    <Icon className="w-[18px] h-[18px] text-[#C75B12]" strokeWidth={1.75} />
                  </div>

                  <h3 className="text-[15px] lg:text-base font-bold text-[#26313D] group-hover:text-[#C75B12] transition-colors mb-1.5 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#697586] leading-relaxed flex-1 line-clamp-3 mb-3">
                    {card.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-[#C75B12] text-sm font-semibold mt-auto">
                    <span className="leading-none">{card.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Thumbnail */}
                <div className="w-24 sm:w-32 lg:w-40 flex-shrink-0 overflow-hidden self-stretch relative">
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Left fade for clean text-image transition */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(to right, rgba(255,255,255,0.12) 0%, transparent 40%)" }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Contact CTA ── */}
      <div className="max-w-6xl mx-auto px-4 lg:px-8 pb-12 lg:pb-16">
        <div className="rounded-2xl bg-[#353A3F] p-7 lg:p-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <p className="text-[#C75B12] text-[11px] font-bold tracking-[0.18em] uppercase mb-1.5">
              Besoin d'aide
            </p>
            <h3 className="text-lg font-bold text-white mb-1">
              Un projet ou une question spécifique ?
            </h3>
            <p className="text-white/65 text-sm max-w-md leading-relaxed">
              Notre équipe technique est là pour vous aider à trouver la solution adaptée à votre
              installation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-shrink-0">
            <button
              onClick={onContactClick}
              className="flex items-center gap-2 px-6 py-3 bg-[#C75B12] hover:bg-[#a34a0e] text-white font-semibold rounded-xl transition-colors text-sm whitespace-nowrap"
            >
              Nous contacter
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate("pro")}
              className="text-sm text-white/60 hover:text-white transition-colors whitespace-nowrap underline underline-offset-2"
            >
              Voir l'espace professionnel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
