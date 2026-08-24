import { useState } from "react";
import {
  ArrowLeft,
  BookMarked,
  Download,
  RefreshCw,
  Users,
  FileText,
  Send,
  MessageSquare,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { CATALOGUES } from "../data/catalogues";
import bannerCatalogs from "@/imports/image-20.png";
import coverGeneral from "@/imports/image-21.png";

interface CataloguesPageProps {
  onBack: () => void;
  onContactClick?: () => void;
}

const COUNTRIES = [
  "France", "Royaume-Uni", "Allemagne", "Belgique", "Suisse", "Luxembourg",
  "Espagne", "Italie", "Pays-Bas", "Autre",
];
const DOC_TYPES = [
  "Catalogue produit", "Brochure commerciale", "Fiche technique",
  "Guide d'installation", "Autre",
];
const UNIVERS = [
  "Fibre optique", "Câbles réseau", "Matériel réseau", "Outils & accessoires",
  "Nouvelle énergie", "Solutions professionnelles",
];

// Background tint per catalogue cover (medium neutral grays matching reference)
const COVER_BG: Record<string, string> = {
  "1": "#C9CDD3",
  "2": "#C8CDD0",
  "3": "#CAC9D2",
  "4": "#CCCAC5",
  "5": "#C8CEC9",
  "6": "#CBCAD2",
};

export function CataloguesPage({ onBack, onContactClick }: CataloguesPageProps) {
  const [formData, setFormData] = useState({
    nom: "", email: "", pays: "", typeDoc: "", univers: "", demande: "",
  });
  const [formSent, setFormSent] = useState(false);

  const featured = CATALOGUES.find((c) => c.featured)!;
  const grid = CATALOGUES.filter((c) => !c.featured);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="bg-white min-h-screen">

      {/* ── BANNER — full-bleed, image as background ── */}
      <div className="relative h-[260px] lg:h-[310px] bg-[#353A3F] overflow-hidden">
        {/* Catalog stack floats on the right, transparent PNG over gray bg */}
        <img
          src={bannerCatalogs}
          alt=""
          aria-hidden="true"
          className="absolute right-0 bottom-0 h-[120%] w-auto object-contain object-right-bottom pointer-events-none"
        />
        {/* Left-to-right gradient so text stays legible */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to right, #353A3F 40%, rgba(53,58,63,0.88) 58%, rgba(53,58,63,0.4) 78%, transparent 100%)" }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center max-w-6xl mx-auto px-4 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/75 hover:text-white mb-6 transition-colors text-sm w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </button>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-11 h-11 bg-[#C75B12] rounded-xl flex items-center justify-center flex-shrink-0">
              <BookMarked className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[#C75B12] text-[10px] font-bold tracking-[0.2em] uppercase mb-0.5">Ressources</p>
              <h1 className="text-2xl lg:text-3xl font-bold text-white leading-tight">Catalogues & brochures</h1>
            </div>
          </div>

          <p className="text-white/75 text-[15px] max-w-md leading-relaxed">
            Consultez et téléchargez nos catalogues, brochures et documentations produits.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 lg:py-16 space-y-12">

        {/* ── CATALOGUE À LA UNE ── */}
        <section>
          <h2 className="text-xl font-bold text-[#353A3F] mb-6">Catalogue à la une</h2>

          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col sm:flex-row">
            {/* Cover */}
            <div className="sm:w-64 lg:w-72 bg-gray-50 flex items-center justify-center p-6 flex-shrink-0 min-h-[240px]">
              <img
                src={coverGeneral}
                alt="Catalogue général FOLAN"
                className="h-56 lg:h-64 w-auto object-contain drop-shadow-xl"
              />
            </div>
            {/* Details */}
            <div className="flex flex-col justify-between p-6 lg:p-8 flex-1">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold tracking-[0.15em] text-[#C75B12] uppercase">Catalogue Général</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span className="text-[10px] font-bold tracking-[0.15em] text-[#C75B12] uppercase">À la une</span>
                </div>
                <h3 className="text-2xl font-bold text-[#353A3F] mb-2">Catalogue général FOLAN</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  Retrouvez l'ensemble de nos solutions fibre optique, réseau, outils et accessoires.
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> PDF</span>
                  <span className="w-px h-3 bg-gray-200" />
                  <span>256 Mo</span>
                  <span className="w-px h-3 bg-gray-200" />
                  <span>Édition 2026</span>
                  <span className="w-px h-3 bg-gray-200" />
                  <span>FR</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                <button className="px-5 py-2.5 border border-gray-300 text-[#353A3F] text-sm font-semibold rounded-lg hover:border-[#C75B12] hover:text-[#C75B12] transition-colors">
                  Consulter
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-[#C75B12] hover:bg-[#a34a0e] text-white text-sm font-semibold rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  Télécharger le PDF
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST STRIP — below featured catalogue ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 border-y border-gray-100">
          {[
            { icon: Download,  title: "Téléchargement gratuit",             sub: "Accès libre à tous nos documents" },
            { icon: RefreshCw, title: "Documents régulièrement mis à jour", sub: "Contenus actualisés en continu" },
            { icon: Users,     title: "Conseils de nos experts",            sub: "Notre équipe à votre écoute" },
          ].map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-[#C75B12]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#353A3F]">{title}</div>
                <div className="text-xs text-gray-500">{sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── NOS CATALOGUES ET BROCHURES — display shelf layout ── */}
        <section>
          <h2 className="text-xl font-bold text-[#353A3F] mb-8">Nos catalogues et brochures</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {grid.map((cat) => (
              <div key={cat.id} className="group cursor-pointer">
                {/* Display shelf — warm gray 4:3 background, no border */}
                <div className="aspect-[4/3] bg-[#F7F5F2] rounded-lg flex items-center justify-center mb-4">
                  {/* Portrait catalogue cover — ~48% width, contained with paper shadow */}
                  <div
                    className="relative w-[48%] aspect-[3/4] flex flex-col overflow-hidden bg-white group-hover:-translate-y-0.5 transition-transform duration-300"
                    style={{
                      boxShadow: "0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",
                    }}
                  >
                    {/* FOLAN header inside cover */}
                    <div className="px-2 pt-2 pb-0.5 flex-shrink-0">
                      <span className="text-[#C75B12] text-[7px] font-black tracking-[0.28em] uppercase leading-none">
                        FOLAN
                      </span>
                    </div>

                    {/* Short title line inside cover */}
                    <div className="px-2 pb-1 flex-shrink-0">
                      <p className="text-[6px] font-bold text-[#353A3F] uppercase tracking-wide leading-tight">
                        {cat.title.replace("Catalogue ", "").replace("Brochure ", "")}
                      </p>
                    </div>

                    {/* Product photo — fills remaining cover space, object-cover inside the cover itself */}
                    <div className="flex-1 overflow-hidden">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Title — 16px below shelf */}
                <h3 className="text-sm font-semibold text-[#353A3F] leading-snug mb-2 group-hover:text-[#C75B12] transition-colors">
                  {cat.title}
                </h3>

                {/* Download link — 8px below title */}
                <button className="flex items-center gap-1 text-xs font-semibold text-[#C75B12] hover:text-[#a34a0e] transition-colors">
                  Consulter et télécharger
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── REQUEST FORM ── */}
        <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 lg:p-10">
          <div className="mb-7">
            <h2 className="text-xl font-bold text-[#353A3F] mb-1">Vous ne trouvez pas le document recherché ?</h2>
            <p className="text-gray-500 text-sm">
              Indiquez-nous la documentation souhaitée, notre équipe vous répondra sous 24 à 48 h ouvrées.
            </p>
          </div>

          {formSent ? (
            <div className="flex flex-col items-center py-10 gap-4 text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                <Send className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-[#353A3F]">Demande envoyée !</h3>
              <p className="text-sm text-gray-500 max-w-sm">
                Notre équipe reviendra vers vous dans les 24 à 48 h ouvrées.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Nom complet <span className="text-[#C75B12]">*</span>
                </label>
                <input
                  required type="text" placeholder="Votre nom"
                  value={formData.nom}
                  onChange={(e) => setFormData((p) => ({ ...p, nom: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#C75B12]/30 focus:border-[#C75B12] outline-none bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Type de document <span className="text-[#C75B12]">*</span>
                </label>
                <div className="relative">
                  <select
                    required value={formData.typeDoc}
                    onChange={(e) => setFormData((p) => ({ ...p, typeDoc: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-[#C75B12]/30 focus:border-[#C75B12] outline-none bg-white"
                  >
                    <option value="">Sélectionnez le type</option>
                    {DOC_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  E-mail professionnel <span className="text-[#C75B12]">*</span>
                </label>
                <input
                  required type="email" placeholder="exemple@entreprise.fr"
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#C75B12]/30 focus:border-[#C75B12] outline-none bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Univers produit</label>
                <div className="relative">
                  <select
                    value={formData.univers}
                    onChange={(e) => setFormData((p) => ({ ...p, univers: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-[#C75B12]/30 focus:border-[#C75B12] outline-none bg-white"
                  >
                    <option value="">Sélectionnez un univers</option>
                    {UNIVERS.map((u) => <option key={u}>{u}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Pays <span className="text-[#C75B12]">*</span>
                </label>
                <div className="relative">
                  <select
                    required value={formData.pays}
                    onChange={(e) => setFormData((p) => ({ ...p, pays: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-[#C75B12]/30 focus:border-[#C75B12] outline-none bg-white"
                  >
                    <option value="">Sélectionnez votre pays</option>
                    {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Votre demande <span className="text-[#C75B12]">*</span>
                </label>
                <textarea
                  required rows={4} placeholder="Décrivez le document recherché…"
                  value={formData.demande}
                  onChange={(e) => setFormData((p) => ({ ...p, demande: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#C75B12]/30 focus:border-[#C75B12] outline-none bg-white resize-none"
                />
              </div>

              <div className="md:col-span-2 flex justify-center">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-8 py-3 bg-[#C75B12] hover:bg-[#a34a0e] text-white font-semibold rounded-xl transition-colors text-sm"
                >
                  <Send className="w-4 h-4" />
                  Envoyer ma demande
                </button>
              </div>
            </form>
          )}
        </section>

        {/* ── CONTACT CTA ── */}
        

      </div>
    </div>
  );
}
