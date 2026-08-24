import { useState, useRef } from "react";
import {
  Star, Truck, Lock, Shield, Minus, Plus, ChevronRight, Play, ThumbsUp, CheckCircle2, ShoppingCart, ChevronLeft,
  FileText, Download, BookOpen, ChevronDown, User, Building2, Phone, Mail, Globe, ArrowDownToLine, AlertCircle,
} from "lucide-react";
import { PRODUCTS } from "../data/products";
import { useCart } from "../contexts/CartContext";
import { BulkPricingWidget } from "./BulkPricingWidget";

type TabKey = "description" | "specs" | "datasheet";

interface Props {
  slug: string;
  onBack: () => void;
  onProductClick: (slug: string) => void;
}

// ── Static mock data ─────────────────────────────────────────────────────────

const TUTORIALS = [
  {
    title: "Comment brancher son câble fibre sur une Livebox",
    duration: "4 min",
    thumbnail: "https://images.unsplash.com/photo-1612045194743-877419047a35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
  {
    title: "Passer un câble plat sous une porte – technique simple",
    duration: "3 min",
    thumbnail: "https://images.unsplash.com/photo-1750711158632-5273ec9b9b86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
  {
    title: "Choisir la bonne longueur de câble fibre pour son logement",
    duration: "2 min",
    thumbnail: "https://images.unsplash.com/photo-1594915854088-2128db6a8db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
];

const MOCK_REVIEWS = [
  {
    id: 1,
    author: "Thomas R.",
    location: "Paris 75",
    date: "12 mai 2025",
    rating: 5,
    title: "Parfait pour ma Freebox Ultra",
    body: "Câble reçu en 24h, impeccable. J'avais un câble trop court fourni par Free, celui-ci fait exactement ce qu'il faut. Installation en moins de 5 minutes, signal parfait.",
    helpful: 18,
    verified: true,
  },
  {
    id: 2,
    author: "Marie-Hélène B.",
    location: "Lyon 69",
    date: "3 avril 2025",
    rating: 5,
    title: "Discret et bien fini",
    body: "La gaine plate est vraiment très fine, j'ai pu la glisser sous la porte du salon sans problème. Qualité de fabrication sérieuse, connecteurs bien protégés à la livraison.",
    helpful: 11,
    verified: true,
  },
  {
    id: 3,
    author: "Julien M.",
    location: "Bordeaux 33",
    date: "19 mars 2025",
    rating: 4,
    title: "Bon produit, livraison rapide",
    body: "Tout correspond à la description. Je l'utilise sur une Livebox 6 et les débits sont identiques à ceux mesurés avec le câble d'origine. Je retire une étoile uniquement parce que je n'ai pas eu d'e-mail de suivi de colis.",
    helpful: 7,
    verified: true,
  },
  {
    id: 4,
    author: "Sophie L.",
    location: "Nantes 44",
    date: "2 mars 2025",
    rating: 5,
    title: "Recommandé par mon technicien SFR",
    body: "C'est exactement le câble que mon technicien m'a conseillé d'acheter pour rallonger l'installation. Qualité professionnelle à un prix très raisonnable.",
    helpful: 24,
    verified: true,
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function Stars({ rating, size = "md" }: { rating: number; size?: "sm" | "md" }) {
  const cls = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.min(1, Math.max(0, rating - (i - 1)));
        return (
          <span key={i} className={`relative inline-block ${cls}`}>
            <Star className={`${cls} text-gray-200`} fill="currentColor" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className={`${cls} text-[#DC580A]`} fill="currentColor" />
            </span>
          </span>
        );
      })}
    </div>
  );
}

function RatingBar({ label, count, total }: { label: string; count: number; total: number }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-2 text-xs text-gray-500">
      <span className="w-10 text-right shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-[#DC580A] rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-4 text-gray-400 shrink-0">{count}</span>
    </div>
  );
}

// ── Frequently Bought Together ───────────────────────────────────────────────

const PAIRINGS: Record<number, number[]> = {
  1: [6, 3, 5],   // cable → kit nettoyage, baie, outil
  2: [6, 3, 5],
  3: [6, 1, 5],
  4: [6, 1, 5],
  5: [1, 2, 6],   // module SFP → câbles, kit
  6: [1, 2, 5],   // kit nettoyage → câbles, outil
};

function FrequentlyBoughtTogether({
  currentId,
  onProductClick,
}: {
  currentId: number;
  onProductClick: (slug: string) => void;
}) {
  const ids = PAIRINGS[currentId] ?? PRODUCTS.filter((p) => p.id !== currentId).slice(0, 3).map((p) => p.id);
  const paired = ids.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean) as typeof PRODUCTS;
  const { addToCart } = useCart();

  const [added, setAdded] = useState<Record<number, boolean>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickAdd = (product: typeof PRODUCTS[0]) => {
    addToCart(product, product.variants[0], 1);
    setAdded((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAdded((prev) => ({ ...prev, [product.id]: false })), 1600);
  };

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  return (
    <div className="pt-4 border-t border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-[#374151] uppercase tracking-wider">
          Fréquemment achetés ensemble
        </p>
        <div className="flex gap-1">
          <button
            onClick={() => scroll("left")}
            className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#DC580A] hover:text-[#DC580A] transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#DC580A] hover:text-[#DC580A] transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Scrollable card strip */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-1"
      >
        {paired.map((p) => (
          <div
            key={p.id}
            className="flex-shrink-0 w-[calc(50%-6px)] sm:w-[calc(33.333%-8px)] bg-[#F8F9FA] rounded-xl border border-gray-100 overflow-hidden hover:border-[#DC580A] hover:shadow-md transition-all duration-200 group"
          >
            {/* Thumbnail – clickable to navigate */}
            <button
              onClick={() => { onProductClick(p.slug); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="w-full aspect-square bg-white overflow-hidden block"
            >
              <img
                src={p.thumbnails[0]?.url ?? p.imageUrl}
                alt={p.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
              />
            </button>

            {/* Info + quick-add */}
            <div className="px-2.5 py-2.5 space-y-2">
              <button
                onClick={() => { onProductClick(p.slug); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="text-left w-full"
              >
                <p className="text-[11px] font-medium text-[#353A3F] leading-snug line-clamp-2 group-hover:text-[#DC580A] transition-colors">
                  {p.name}
                </p>
                <p className="mt-1 text-sm font-bold text-[#DC580A]">
                  {p.variants[0].price.toFixed(2).replace(".", ",")} €
                  {p.variants[0].originalPrice && (
                    <span className="ml-1.5 text-[10px] font-normal text-gray-400 line-through">
                      {p.variants[0].originalPrice.toFixed(2).replace(".", ",")} €
                    </span>
                  )}
                </p>
              </button>

              {/* Quick-add button */}
              <button
                onClick={() => quickAdd(p)}
                className={`w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  added[p.id]
                    ? "bg-green-500 text-white"
                    : "bg-white border border-[#DC580A] text-[#DC580A] hover:bg-[#DC580A] hover:text-white active:scale-95"
                }`}
              >
                {added[p.id] ? (
                  "✓ Ajouté"
                ) : (
                  <>
                    <ShoppingCart className="w-3 h-3" />
                    Ajouter
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Guides & Conseils Section ────────────────────────────────────────────────

const GUIDE_EXTRA_CONTENT: Record<string, string> = {
  guide: "Sélectionnez la longueur en mesurant le trajet réel du câble (y compris les contournements de portes et plinthes) puis ajoutez 50 cm de marge. En cas de doute, optez pour la longueur supérieure — un câble trop long se gère, un câble trop court oblige à recommander.",
};

function ResourcePanel({ resource }: { resource: NonNullable<(typeof PRODUCTS)[0]["guide"]>["resources"][0] }) {
  if (resource.type === "video") {
    return (
      <div className="mt-2 rounded-lg overflow-hidden bg-gray-900 border border-gray-800">
        <div className="relative aspect-video flex items-center justify-center">
          {resource.thumbnail && (
            <img src={resource.thumbnail} alt={resource.title} className="absolute inset-0 w-full h-full object-cover opacity-40" />
          )}
          <div className="relative z-10 text-center space-y-3 px-4">
            <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/60 flex items-center justify-center mx-auto backdrop-blur-sm">
              <Play className="w-6 h-6 text-white ml-0.5" fill="currentColor" />
            </div>
            <p className="text-white text-sm font-medium">{resource.title}</p>
            {resource.duration && <p className="text-gray-300 text-xs">Durée : {resource.duration}</p>}
            <button className="mt-1 inline-flex items-center gap-1.5 bg-[#DC580A] hover:bg-[#B84808] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
              <Play className="w-3 h-3" fill="currentColor" />
              Lancer la vidéo
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (resource.type === "pdf") {
    return (
      <div className="mt-2 rounded-lg bg-[#F8F9FA] border border-gray-200 p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-12 bg-[#DC580A] rounded flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#353A3F]">{resource.title}</p>
            <p className="text-xs text-gray-400 mt-0.5">Document PDF · ~2 Mo</p>
          </div>
        </div>
        <button className="flex-shrink-0 inline-flex items-center gap-1.5 bg-[#DC580A] hover:bg-[#B84808] text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors">
          <Download className="w-3.5 h-3.5" />
          Télécharger
        </button>
      </div>
    );
  }

  return (
    <div className="mt-2 rounded-lg bg-[#F8F9FA] border border-gray-100 p-4">
      <p className="text-sm text-[#374151] leading-relaxed">
        {GUIDE_EXTRA_CONTENT.guide}
      </p>
    </div>
  );
}

function GuidesConseilsSection({ guide }: { guide: NonNullable<(typeof PRODUCTS)[0]["guide"]> }) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [expandedResource, setExpandedResource] = useState<number | null>(null);

  return (
    <div className="pt-8 border-t border-gray-100">
      {/* Section Header */}
      <div className="flex items-center gap-2.5 mb-6">
        <div className="w-1 h-6 bg-[#DC580A] rounded-full" />
        <h4 className="text-lg font-semibold text-[#353A3F]">Guides & Conseils</h4>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* Left Column: Installation Guide */}
        {guide.installationSteps && guide.installationSteps.length > 0 && (
          <div className="bg-[#F8F9FA] rounded-xl p-5 border border-gray-100">
            <h5 className="text-sm font-semibold text-[#353A3F] mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#DC580A]" />
              Guide d'installation rapide
            </h5>
            <div className="space-y-3">
              {guide.installationSteps.map((step, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#DC580A] text-white text-xs font-semibold flex items-center justify-center">
                    {idx + 1}
                  </div>
                  <p className="text-sm text-[#374151] leading-relaxed pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Right Column: Resources — expandable */}
        {guide.resources && guide.resources.length > 0 && (
          <div>
            <h5 className="text-sm font-semibold text-[#353A3F] mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#DC580A]" />
              Ressources utiles
            </h5>
            <div className="space-y-2">
              {guide.resources.map((resource, idx) => {
                const open = expandedResource === idx;
                return (
                  <div key={idx} className={`border rounded-lg overflow-hidden transition-colors duration-200 ${open ? "border-[#DC580A]" : "border-gray-200 hover:border-[#DC580A]"}`}>
                    <button
                      onClick={() => setExpandedResource(open ? null : idx)}
                      className={`w-full flex items-center gap-3 p-3 text-left transition-colors group ${open ? "bg-[#DC580A]/5" : "bg-white hover:bg-gray-50"}`}
                    >
                      {/* Thumbnail / icon */}
                      {resource.type === "video" && resource.thumbnail ? (
                        <div className="relative w-16 h-12 rounded overflow-hidden flex-shrink-0 bg-gray-100">
                          <img src={resource.thumbnail} alt={resource.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                            <Play className="w-4 h-4 text-white" fill="currentColor" />
                          </div>
                        </div>
                      ) : resource.type === "pdf" ? (
                        <div className="w-10 h-10 rounded-lg bg-[#DC580A]/10 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-[#DC580A]" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-[#353A3F]/10 flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-5 h-5 text-[#353A3F]" />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium transition-colors ${open ? "text-[#DC580A]" : "text-[#353A3F] group-hover:text-[#DC580A]"}`}>
                          {resource.title}
                        </p>
                        {resource.duration && (
                          <p className="text-xs text-gray-500 mt-0.5">{resource.duration}</p>
                        )}
                      </div>

                      <ChevronDown
                        className={`w-4 h-4 flex-shrink-0 transition-all duration-200 ${open ? "rotate-180 text-[#DC580A]" : "text-gray-400"}`}
                      />
                    </button>

                    {open && (
                      <div className="px-3 pb-3">
                        <ResourcePanel resource={resource} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* FAQ Accordion */}
      {guide.faq && guide.faq.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h5 className="text-sm font-semibold text-[#353A3F] mb-4">Questions fréquentes</h5>
          <div className="space-y-2">
            {guide.faq.map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-medium text-[#353A3F] pr-4">{item.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#DC580A] flex-shrink-0 transition-transform duration-200 ${expandedFaq === idx ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedFaq === idx && (
                  <div className="px-4 pb-4 pt-1">
                    <p className="text-sm text-[#374151] leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Data Sheet Tab ───────────────────────────────────────────────────────────

interface DataSheetFormState {
  firstName: string;
  lastName: string;
  company: string;
  country: string;
  phone: string;
  email: string;
}

const COUNTRIES = [
  "France", "Belgique", "Suisse", "Luxembourg", "Canada", "Maroc", "Tunisie", "Algérie",
  "Allemagne", "Espagne", "Italie", "Pays-Bas", "Portugal", "Royaume-Uni", "Autre",
];

function DataSheetTab({ productName }: { productName: string }) {
  const [form, setForm] = useState<DataSheetFormState>({
    firstName: "", lastName: "", company: "", country: "", phone: "", email: "",
  });
  const [errors, setErrors] = useState<Partial<DataSheetFormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const next: Partial<DataSheetFormState> = {};
    if (!form.firstName.trim()) next.firstName = "Requis";
    if (!form.lastName.trim()) next.lastName = "Requis";
    if (!form.company.trim()) next.company = "Requis";
    if (!form.country) next.country = "Requis";
    if (!form.phone.trim()) next.phone = "Requis";
    if (!form.email.trim()) {
      next.email = "Requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Adresse e-mail invalide";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  const field = (
    id: keyof DataSheetFormState,
    label: string,
    icon: React.ReactNode,
    type = "text",
    placeholder = ""
  ) => (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-semibold text-[#374151] uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          {icon}
        </span>
        <input
          id={id}
          type={type}
          autoComplete={type === "email" ? "email" : type === "tel" ? "tel" : "off"}
          placeholder={placeholder}
          value={form[id]}
          onChange={(e) => {
            setForm((f) => ({ ...f, [id]: e.target.value }));
            if (errors[id]) setErrors((er) => ({ ...er, [id]: undefined }));
          }}
          className={`w-full pl-9 pr-4 py-2.5 text-sm border rounded-lg bg-white text-[#353A3F] placeholder-gray-300 outline-none transition-all duration-150 ${
            errors[id]
              ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-gray-200 focus:border-[#DC580A] focus:ring-2 focus:ring-[#DC580A]/15"
          }`}
        />
      </div>
      {errors[id] && (
        <p className="text-[11px] text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {errors[id]}
        </p>
      )}
    </div>
  );

  if (submitted) {
    return (
      <div className="py-12 max-w-xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-[#353A3F] mb-2">Votre fiche technique est prête</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Merci {form.firstName}. Cliquez ci-dessous pour télécharger la fiche technique complète de ce produit.
          </p>
        </div>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="inline-flex items-center gap-2.5 bg-[#DC580A] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#B84808] hover:shadow-lg hover:shadow-[#DC580A]/25 active:scale-95 transition-all duration-200"
        >
          <ArrowDownToLine className="w-4 h-4" />
          Télécharger la fiche technique (PDF)
        </a>
        <p className="text-[11px] text-gray-400">
          Un e-mail de confirmation a également été envoyé à <span className="font-medium">{form.email}</span>.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ firstName: "", lastName: "", company: "", country: "", phone: "", email: "" }); }}
          className="text-xs text-gray-400 underline hover:text-[#DC580A] transition-colors"
        >
          Nouvelle demande
        </button>
      </div>
    );
  }

  return (
    <div className="py-10 grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-start">

      {/* Left: context */}
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#DC580A]/10 flex items-center justify-center flex-shrink-0">
            <FileText className="w-7 h-7 text-[#DC580A]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#353A3F]">Fiche Technique</h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              Accédez aux spécifications détaillées, schémas techniques et données de conformité de ce produit.
            </p>
          </div>
        </div>

        <div className="bg-[#F8F9FA] rounded-xl border border-gray-100 p-5 space-y-3">
          <p className="text-xs font-semibold text-[#353A3F] uppercase tracking-wide mb-3">Ce document contient</p>
          {[
            "Spécifications techniques complètes",
            "Courbes de performance et de perte d'insertion",
            "Schéma mécanique et dimensions",
            "Certifications et conformités (CE, RoHS)",
            "Conditions de stockage et de transport",
            "Références et codes produit EAN",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm text-[#374151]">
              <CheckCircle2 className="w-4 h-4 text-[#DC580A] flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <div className="flex items-start gap-2.5 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5">
          <Lock className="w-4 h-4 text-[#353A3F] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-[#353A3F] leading-relaxed">
            Vos informations sont utilisées uniquement pour vous envoyer la documentation technique demandée. Elles ne sont jamais partagées avec des tiers.
          </p>
        </div>
      </div>

      {/* Right: form */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <p className="text-sm font-semibold text-[#353A3F] mb-5">
          Remplissez le formulaire pour accéder au téléchargement
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {field("firstName", "Prénom", <User className="w-4 h-4" />, "text", "Jean")}
            {field("lastName", "Nom", <User className="w-4 h-4" />, "text", "Dupont")}
          </div>
          {field("company", "Entreprise", <Building2 className="w-4 h-4" />, "text", "Acme SAS")}

          {/* Country select */}
          <div className="space-y-1.5">
            <label htmlFor="country" className="block text-xs font-semibold text-[#374151] uppercase tracking-wide">
              Pays
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Globe className="w-4 h-4" />
              </span>
              <select
                id="country"
                value={form.country}
                onChange={(e) => {
                  setForm((f) => ({ ...f, country: e.target.value }));
                  if (errors.country) setErrors((er) => ({ ...er, country: undefined }));
                }}
                className={`w-full pl-9 pr-4 py-2.5 text-sm border rounded-lg bg-white text-[#353A3F] outline-none appearance-none transition-all duration-150 ${
                  errors.country
                    ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-gray-200 focus:border-[#DC580A] focus:ring-2 focus:ring-[#DC580A]/15"
                } ${!form.country ? "text-gray-300" : ""}`}
              >
                <option value="" disabled>Sélectionner un pays</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            {errors.country && (
              <p className="text-[11px] text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                {errors.country}
              </p>
            )}
          </div>

          {field("phone", "Téléphone", <Phone className="w-4 h-4" />, "tel", "+33 6 00 00 00 00")}
          {field("email", "Adresse e-mail professionnelle", <Mail className="w-4 h-4" />, "email", "jean.dupont@acme.fr")}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 flex items-center justify-center gap-2.5 bg-[#DC580A] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#B84808] hover:shadow-lg hover:shadow-[#DC580A]/25 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Validation en cours…
              </span>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Accéder à la fiche technique
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export function ProductDetailPage({ slug, onBack, onProductClick }: Props) {
  const product = PRODUCTS.find((p) => p.slug === slug);
  const { addToCart } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabKey>("description");
  const [addedToCart, setAddedToCart] = useState(false);
  const [helpfulVoted, setHelpfulVoted] = useState<Set<number>>(new Set());

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <p className="text-5xl">📦</p>
        <h2 className="text-2xl font-semibold text-[#353A3F]">Produit introuvable</h2>
        <p className="text-gray-500 text-sm">Ce produit n'existe pas ou a été retiré du catalogue.</p>
        <button
          onClick={onBack}
          className="mt-2 bg-[#DC580A] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#B84808] transition-colors"
        >
          Retour à la boutique
        </button>
      </div>
    );
  }

  const variant = product.variants[selectedVariant];

  // Calculate bulk pricing discount
  let bulkDiscount = 0;
  let effectivePrice = variant.price;
  if (product.bulkPricing) {
    const currentTier = [...product.bulkPricing]
      .sort((a, b) => b.minQuantity - a.minQuantity)
      .find((tier) => quantity >= tier.minQuantity);
    if (currentTier) {
      bulkDiscount = currentTier.discount;
      effectivePrice = variant.price * (1 - bulkDiscount / 100);
    }
  }

  const discountPct = variant.originalPrice
    ? Math.round((1 - variant.price / variant.originalPrice) * 100)
    : 0;
  const priceHT = +(effectivePrice / 1.2).toFixed(2);

  // Estimated delivery: next working day if before 14h, otherwise day after
  const today = new Date();
  const hour = today.getHours();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + (hour < 14 ? 1 : 2));
  // skip weekends
  if (deliveryDate.getDay() === 6) deliveryDate.setDate(deliveryDate.getDate() + 2);
  if (deliveryDate.getDay() === 0) deliveryDate.setDate(deliveryDate.getDate() + 1);
  const deliveryStr = deliveryDate.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

  const tabs: { key: TabKey; label: string }[] = [
    { key: "description", label: "Description" },
    { key: "specs", label: "Caractéristiques techniques" },
    { key: "datasheet", label: "Documentation PDF" },
  ];

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: MOCK_REVIEWS.filter((r) => r.rating === star).length,
  }));
  const totalReviews = MOCK_REVIEWS.length;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-10">

        {/* ── Breadcrumb – top-left, full width ────────────────── */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 flex-wrap mb-6">
          <button onClick={onBack} className="hover:text-[#DC580A] transition-colors">
            Boutique
          </button>
          {product.breadcrumb.slice(1).map((crumb, i, arr) => (
            <span key={crumb} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 flex-shrink-0" />
              {i < arr.length - 1 ? (
                <button onClick={onBack} className="hover:text-[#DC580A] transition-colors">
                  {crumb}
                </button>
              ) : (
                <span className="text-[#374151] font-medium line-clamp-1">{crumb}</span>
              )}
            </span>
          ))}
        </nav>

        {/* ── Two-column split ──────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* LEFT – Visual showcase */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-2xl border border-gray-100 shadow-[0_4px_32px_rgba(0,0,0,0.07)] overflow-hidden aspect-square flex items-center justify-center p-6">
              <img
                src={product.thumbnails[activeImage]?.url ?? product.imageUrl}
                alt={product.thumbnails[activeImage]?.alt ?? product.name}
                className="w-full h-full object-contain transition-opacity duration-200"
              />
              {discountPct > 0 && (
                <div className="absolute top-4 left-4 bg-[#DC580A] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  -{discountPct}%
                </div>
              )}
            </div>

            {product.thumbnails.length > 1 && (
              <div className="flex gap-3">
                {product.thumbnails.map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-16 h-16 rounded-xl border-2 overflow-hidden flex-shrink-0 transition-all duration-200 ${
                      activeImage === idx
                        ? "border-[#DC580A] shadow-md"
                        : "border-gray-100 hover:border-gray-300"
                    }`}
                  >
                    <img src={thumb.url} alt={thumb.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT – Conversion engine */}
          <div className="space-y-5">

            {/* Title + rating */}
            <div className="space-y-3">
              <h1 className="text-2xl lg:text-3xl font-semibold text-[#353A3F] leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-2">
                <Stars rating={product.rating} />
                <span className="text-sm font-semibold text-[#374151]">{product.rating}</span>
                <span className="text-sm text-gray-400 underline underline-offset-2 cursor-pointer">
                  {product.reviewCount} avis
                </span>
              </div>
            </div>

            {/* Benefits */}
            <ul className="space-y-2.5">
              {product.benefits.map((b, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-[#374151] leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#DC580A] flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>

            {/* Price */}
            <div className="flex items-baseline flex-wrap gap-x-3 gap-y-1 pt-1">
              <span className="text-3xl lg:text-4xl font-bold text-[#DC580A]">
                {effectivePrice.toFixed(2).replace(".", ",")} €
              </span>
              <span className="text-xs text-gray-400 uppercase tracking-wide">TTC</span>
              {(variant.originalPrice || bulkDiscount > 0) && (
                <span className="text-sm text-gray-400 line-through">
                  {variant.price.toFixed(2).replace(".", ",")} €
                </span>
              )}
              <span className="text-sm text-gray-400 font-normal w-full">
                Soit {priceHT.toFixed(2).replace(".", ",")} € HT
                {quantity > 1 && (
                  <span className="ml-2 text-gray-500">
                    • Total : {(effectivePrice * quantity).toFixed(2).replace(".", ",")} €
                  </span>
                )}
              </span>
            </div>

            {/* Variant selector */}
            {product.variants.length > 1 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-[#374151] tracking-wide uppercase">
                  Format —{" "}
                  <span className="text-[#DC580A] normal-case font-normal">
                    {product.variants[selectedVariant].label}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v, idx) => (
                    <button
                      key={v.label}
                      onClick={() => setSelectedVariant(idx)}
                      className={`px-4 py-1.5 rounded-full text-sm border transition-all duration-150 ${
                        selectedVariant === idx
                          ? "bg-[#DC580A] text-white border-[#DC580A] shadow-sm"
                          : "bg-white text-[#374151] border-gray-200 hover:border-[#DC580A] hover:text-[#DC580A]"
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Estimated delivery – above cart */}
            <div className="flex items-center gap-2.5 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
              <Truck className="w-4 h-4 text-green-600 flex-shrink-0" />
              <div className="text-xs">
                <span className="text-green-700 font-semibold">Livraison estimée le {deliveryStr}</span>
                <span className="text-green-600"> — commandez avant {hour < 14 ? "14h00" : "14h00 demain"}</span>
              </div>
            </div>

            {/* Qty + CTA */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-11 flex items-center justify-center text-[#374151] hover:bg-gray-50 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-semibold text-[#353A3F]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-11 flex items-center justify-center text-[#374151] hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => {
                  addToCart(product, variant, quantity);
                  setAddedToCart(true);
                  setTimeout(() => setAddedToCart(false), 1800);
                }}
                className={`flex-1 h-11 rounded-xl font-semibold text-sm text-white transition-all duration-200 ${
                  addedToCart
                    ? "bg-green-500 scale-[0.98]"
                    : "bg-[#DC580A] hover:bg-[#B84808] hover:shadow-lg hover:shadow-[#DC580A]/25 active:scale-[0.97]"
                }`}
              >
                {addedToCart ? "✓ Ajouté au panier" : "Ajouter au panier"}
              </button>
            </div>

            {/* Bulk Pricing Widget */}
            {product.bulkPricing && (
              <BulkPricingWidget
                basePrice={variant.price}
                quantity={quantity}
                bulkPricing={product.bulkPricing}
              />
            )}

            {/* Trust anchors */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100 flex-wrap gap-3">
              {[
                { icon: <Truck className="w-4 h-4" />, label: "Livraison 48h" },
                { icon: <Lock className="w-4 h-4" />, label: "Paiement sécurisé" },
                { icon: <Shield className="w-4 h-4" />, label: "Garantie premium" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="text-[#DC580A]">{icon}</span>
                  {label}
                </div>
              ))}
            </div>

            {/* ── Fréquemment achetés ensemble ── */}
            <FrequentlyBoughtTogether currentId={product.id} onProductClick={onProductClick} />
          </div>
        </div>

        {/* ── Deep-Dive Tabs ──────────────────────────────────────── */}
        <div className="mt-14 lg:mt-20">
          <div className="overflow-x-auto scrollbar-hide border-b border-gray-200">
            <div className="flex min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={(e) => { setActiveTab(tab.key); e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" }); }}
                  className={`px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 -mb-px ${
                    activeTab === tab.key
                      ? "text-[#DC580A] border-[#DC580A]"
                      : "text-gray-500 border-transparent hover:text-[#353A3F]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "description" && (
            <div className="py-10 space-y-12">
              {/* Main description section */}
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div className="rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)] aspect-[4/3]">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-5">
                  <h3 className="text-xl lg:text-2xl font-semibold text-[#353A3F]">
                    Une connexion fibre sans compromis
                  </h3>
                  <p className="text-[#374151] leading-relaxed text-sm lg:text-base">{product.description}</p>
                  {product.benefits.map((b, i) => (
                    <p key={i} className="text-[#374151] leading-relaxed text-sm lg:text-base">{b}</p>
                  ))}
                </div>
              </div>

              {/* Guides & Conseils Section */}
              {product.guide && (product.guide.installationSteps || product.guide.resources || product.guide.faq) && (
                <GuidesConseilsSection guide={product.guide} />
              )}
            </div>
          )}

          {activeTab === "datasheet" && (
            <DataSheetTab productName={product.name} />
          )}

          {activeTab === "specs" && (
            <div className="py-10 max-w-2xl">
              <table className="w-full text-sm">
                <tbody>
                  {product.specs.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="py-3 px-4 font-medium text-[#374151] w-1/2 rounded-l-lg">{row.label}</td>
                      <td className="py-3 px-4 text-[#353A3F] font-semibold rounded-r-lg">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

        {/* ── Reviews section ─────────────────────────────────────── */}
        <div className="mt-16 pt-12 border-t border-gray-100">
          <h3 className="text-xl font-semibold text-[#353A3F] mb-8">
            Avis clients
            <span className="ml-2 text-sm font-normal text-gray-400">({product.reviewCount} avis)</span>
          </h3>

          <div className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-16">

            {/* Rating summary */}
            <div className="space-y-5">
              <div className="flex items-end gap-3">
                <span className="text-5xl font-bold text-[#353A3F]">{product.rating}</span>
                <div className="pb-1 space-y-1">
                  <Stars rating={product.rating} />
                  <p className="text-xs text-gray-400">{product.reviewCount} avis vérifiés</p>
                </div>
              </div>
              <div className="space-y-2">
                {ratingCounts.map(({ star, count }) => (
                  <RatingBar
                    key={star}
                    label={`${star} ★`}
                    count={count}
                    total={totalReviews}
                  />
                ))}
              </div>
              <div className="pt-2">
                <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 rounded-lg px-3 py-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  100 % des avis sont issus d'achats vérifiés
                </div>
              </div>
            </div>

            {/* Review list */}
            <div className="space-y-5">
              {MOCK_REVIEWS.map((review) => (
                <div
                  key={review.id}
                  className="bg-[#F8F9FA] rounded-2xl p-5 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Stars rating={review.rating} size="sm" />
                        {review.verified && (
                          <span className="flex items-center gap-1 text-[10px] text-green-600 font-medium">
                            <CheckCircle2 className="w-3 h-3" />
                            Achat vérifié
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-[#353A3F]">{review.title}</p>
                    </div>
                    <span className="text-[11px] text-gray-400 shrink-0">{review.date}</span>
                  </div>

                  <p className="text-sm text-[#374151] leading-relaxed">{review.body}</p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-gray-500">
                      <span className="font-medium">{review.author}</span>
                      {" · "}{review.location}
                    </span>
                    <button
                      onClick={() =>
                        setHelpfulVoted((prev) => {
                          const next = new Set(prev);
                          next.has(review.id) ? next.delete(review.id) : next.add(review.id);
                          return next;
                        })
                      }
                      className={`flex items-center gap-1.5 text-xs transition-colors ${
                        helpfulVoted.has(review.id)
                          ? "text-[#DC580A]"
                          : "text-gray-400 hover:text-[#DC580A]"
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      Utile ({helpfulVoted.has(review.id) ? review.helpful + 1 : review.helpful})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Related products ─────────────────────────────────────── */}
        <div className="mt-16 pt-12 border-t border-gray-100">
          <h3 className="text-xl font-semibold text-[#353A3F] mb-6">Produits similaires</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PRODUCTS.filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((p) => (
                <button
                  key={p.id}
                  onClick={() => { onProductClick(p.slug); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="group bg-white rounded-xl border border-gray-100 hover:border-[#DC580A] hover:shadow-lg transition-all duration-300 overflow-hidden text-left"
                >
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-orange-50 overflow-hidden">
                    <img
                      src={p.thumbnails[0]?.url ?? p.imageUrl}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-medium text-[#353A3F] leading-snug line-clamp-2 group-hover:text-[#DC580A] transition-colors">
                      {p.name}
                    </p>
                    <p className="mt-1.5 text-sm font-bold text-[#DC580A]">
                      {p.variants[0].price.toFixed(2).replace(".", ",")} €
                    </p>
                  </div>
                </button>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}
