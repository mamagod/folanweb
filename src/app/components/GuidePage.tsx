import { ArrowLeft, Clock, BookOpen, CheckCircle, Lightbulb, AlertCircle } from "lucide-react";
import { GUIDES } from "../data/guides";

interface GuidePageProps {
  slug: string;
  onBack: () => void;
  onContactClick?: () => void;
}

export function GuidePage({ slug, onBack, onContactClick }: GuidePageProps) {
  const guide = GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <p className="text-5xl">📚</p>
        <h2 className="text-2xl font-semibold text-[#353A3F]">Guide introuvable</h2>
        <p className="text-gray-500 text-sm">Ce guide n'existe pas ou a été retiré.</p>
        <button
          onClick={onBack}
          className="mt-2 bg-[#DC580A] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#B84808] transition-colors"
        >
          Retour aux guides
        </button>
      </div>
    );
  }

  const difficultyColors = {
    Débutant: "bg-green-100 text-green-700 border-green-200",
    Intermédiaire: "bg-orange-100 text-orange-700 border-orange-200",
    Avancé: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[300px] lg:h-[400px] overflow-hidden">
        <img
          src={guide.image}
          alt={guide.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 pb-8 lg:pb-12 w-full">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Retour aux guides
            </button>
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="px-3 py-1 bg-[#DC580A] text-white text-xs font-semibold rounded-full">
                {guide.category}
              </span>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${difficultyColors[guide.difficulty]}`}>
                {guide.difficulty}
              </span>
              <span className="flex items-center gap-1.5 text-white/90 text-sm">
                <Clock className="w-4 h-4" />
                {guide.readTime}
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
              {guide.title}
            </h1>
            <p className="text-lg text-white/90 max-w-2xl">
              {guide.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl mb-8">
            <BookOpen className="w-5 h-5 text-[#353A3F] flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-base font-semibold text-[#2A2E32] mb-1 mt-0">Introduction</h3>
              <p className="text-sm text-[#353A3F] m-0">{guide.content.introduction}</p>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {guide.content.sections.map((section, index) => (
            <div key={index} className="scroll-mt-24" id={`section-${index}`}>
              <h2 className="text-2xl font-semibold text-[#353A3F] mb-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-[#DC580A] text-white rounded-full text-sm font-bold flex-shrink-0">
                  {index + 1}
                </span>
                {section.title}
              </h2>

              <p className="text-gray-700 mb-4 leading-relaxed">{section.content}</p>

              {section.image && (
                <div className="my-6 rounded-xl overflow-hidden shadow-md">
                  <img src={section.image} alt={section.title} className="w-full" />
                </div>
              )}

              {section.steps && section.steps.length > 0 && (
                <div className="space-y-3 mb-4">
                  {section.steps.map((step, stepIndex) => {
                    // Handle Q&A format
                    if (step.startsWith("Q :") || step.startsWith("R :")) {
                      const isQuestion = step.startsWith("Q :");
                      if (step.trim() === "") return null;
                      return (
                        <div
                          key={stepIndex}
                          className={`${
                            isQuestion
                              ? "font-semibold text-[#353A3F] text-base mt-4"
                              : "text-gray-700 pl-6 text-sm"
                          }`}
                        >
                          {step}
                        </div>
                      );
                    }

                    // Regular steps
                    return (
                      <div key={stepIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 flex-1">{step}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {section.tips && section.tips.length > 0 && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-orange-600" />
                    <h3 className="font-semibold text-orange-900">Conseils pratiques</h3>
                  </div>
                  <ul className="space-y-2">
                    {section.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-2 text-sm text-orange-800">
                        <span className="text-orange-600 flex-shrink-0">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Related Guides */}
        {guide.relatedGuides && guide.relatedGuides.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-[#353A3F] mb-6">Guides associés</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {guide.relatedGuides.map((relatedSlug) => {
                const relatedGuide = GUIDES.find((g) => g.slug === relatedSlug);
                if (!relatedGuide) return null;

                return (
                  <button
                    key={relatedSlug}
                    onClick={() => window.location.hash = relatedSlug}
                    className="text-left p-4 border border-gray-200 rounded-xl hover:border-[#DC580A] hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                        {relatedGuide.category}
                      </span>
                      <span className="text-xs text-gray-500">{relatedGuide.readTime}</span>
                    </div>
                    <h3 className="font-semibold text-[#353A3F] group-hover:text-[#DC580A] transition-colors mb-2">
                      {relatedGuide.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {relatedGuide.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-[#F7F5F2] border border-gray-200 rounded-xl p-6 flex flex-col sm:flex-row items-start gap-5">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-[#697586]" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[#26313D] mb-1">Besoin d'aide supplémentaire ?</h3>
            <p className="text-sm text-[#697586] mb-4 leading-relaxed">
              Si vous rencontrez des difficultés ou avez des questions, notre équipe support est là pour vous aider.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={onContactClick}
                className="px-5 py-2.5 bg-[#C75B12] hover:bg-[#a34a0e] text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Contacter le support
              </button>
              <button
                onClick={onBack}
                className="px-5 py-2.5 border border-[#26313D]/30 text-[#26313D] text-sm font-semibold rounded-lg hover:border-[#26313D]/60 hover:bg-white transition-colors"
              >
                Voir tous les guides
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
