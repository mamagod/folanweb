import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Phone, Mail, Building2, Wrench, Store, Package, Plus, X, Paperclip, Search } from "lucide-react";
import { PRODUCTS } from "../data/products";

const IMG_HERO =
  "https://images.unsplash.com/photo-1597502310092-31cdaa35b46d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxmaWJlciUyMG9wdGljJTIwdGVjaG5pY2lhbiUyMHRlbGVjb20lMjBpbnN0YWxsYXRpb24lMjB3b3JrfGVufDF8fHx8MTc4NTM1NDUzM3ww&ixlib=rb-4.1.0&q=80&w=1200";

const PROFILES = [
  {
    icon: Wrench,
    title: "Installateurs télécom",
    desc: "Câbles, cordons et accessoires pour vos chantiers fibre sur mesure.",
    tags: ["SC/APC", "SC/UPC", "Kits installation"],
  },
  {
    icon: Building2,
    title: "Entreprises & intégrateurs",
    desc: "Équipements fibre pour infrastructures réseau d'entreprise.",
    tags: ["Fibre entreprise", "Patch panels", "Connecteurs"],
  },
  {
    icon: Store,
    title: "Distributeurs & revendeurs",
    desc: "Conditions tarifaires adaptées aux volumes et partenariats commerciaux.",
    tags: ["Tarifs volume", "OEM", "Stock dédié"],
  },
];

const ADVANTAGES = [
  "Tarifs dégressifs selon les volumes",
  "Devis personnalisé sous 24 h",
  "Support technique dédié en français",
  "Livraison rapide depuis la France",
  "Produits compatibles tous opérateurs",
  "Catalogue OEM sur demande",
];

interface Props {
  onBack?: () => void;
}

export function ProfessionalSpacePage({ onBack }: Props) {
  const [selectedProducts, setSelectedProducts] = useState<{ id: string; name: string }[]>([]);
  const [productSearch, setProductSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(true);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const allCategories = Array.from(new Set(PRODUCTS.map((p) => p.category)));

  const filteredProducts = PRODUCTS.filter((p) => {
    const q = productSearch.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const hay = `${p.name} ${p.category}`.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const matchQ = !q || hay.includes(q);
    const matchCat = !activeCategory || p.category === activeCategory;
    return matchQ && matchCat;
  }).slice(0, 7);

  const confirmProduct = (id: string, name: string) => {
    if (!selectedProducts.find((p) => p.id === id))
      setSelectedProducts((prev) => [...prev, { id, name }]);
    setProductSearch("");
    setDropdownOpen(false);
    setShowSearch(false);
  };

  const addCustom = () => {
    const name = productSearch.trim();
    if (!name) return;
    setSelectedProducts((prev) => [...prev, { id: `custom-${Date.now()}`, name }]);
    setProductSearch("");
    setDropdownOpen(false);
    setShowSearch(false);
  };

  const removeSelectedProduct = (id: string) =>
    setSelectedProducts((prev) => prev.filter((p) => p.id !== id));

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="relative bg-[#1E2124] overflow-hidden">
        <img
          src={IMG_HERO}
          alt="Espace professionnel FOLAN"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 lg:py-24">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>

          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#f4a96a] uppercase border border-[#C75B12]/40 bg-[#C75B12]/15 rounded-full px-4 py-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C75B12]" />
              ESPACE PROFESSIONNEL
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight tracking-tight mb-4">
              Des solutions fibre pour les professionnels
            </h1>
            <p className="text-gray-300/70 text-base lg:text-lg leading-relaxed mb-8">
              FOLAN accompagne installateurs, entreprises et distributeurs avec
              des produits fiables et des conditions adaptées aux besoins
              professionnels.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2.5 bg-[#C75B12] hover:bg-[#a34910] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all duration-150 shadow-md shadow-[#C75B12]/25">
                <Mail className="w-4 h-4" />
                Demander un devis
              </button>
              <button className="inline-flex items-center gap-2.5 border border-white/25 text-white hover:bg-white/10 font-semibold text-sm px-6 py-3.5 rounded-xl transition-all duration-150">
                <Phone className="w-4 h-4" />
                Nous appeler
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profiles */}
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#353A3F] tracking-tight mb-3">
            Vous êtes…
          </h2>
          <p className="text-gray-500 text-sm lg:text-base max-w-xl mx-auto">
            Trouvez les produits et conditions adaptés à votre activité.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
          {PROFILES.map(({ icon: Icon, title, desc, tags }) => (
            <div
              key={title}
              className="group flex flex-col gap-4 bg-[#F4F4F5] hover:bg-white border border-gray-100/60 hover:border-[#C75B12]/25 hover:shadow-md rounded-2xl p-6 transition-all duration-300 cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-[#353A3F]/10 border border-[#353A3F]/15 flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#353A3F]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#353A3F] mb-1.5 leading-snug">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold text-[#353A3F] bg-gray-50 border border-gray-100 rounded-full px-2.5 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C75B12] group-hover:gap-2.5 transition-all">
                Voir les produits
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Advantages + Contact form */}
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 items-start">

          {/* Advantages */}
          <div className="bg-[#F4F4F5] border border-gray-100/60 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-6 bg-[#C75B12]" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#C75B12] uppercase">
                Avantages FOLAN Pro
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#353A3F] mb-6 leading-snug">
              Pourquoi choisir FOLAN pour vos projets professionnels ?
            </h3>
            <ul className="space-y-3">
              {ADVANTAGES.map((adv) => (
                <li key={adv} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C75B12] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#353A3F]/80 font-medium">{adv}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-gray-100/60 grid grid-cols-3 gap-4 text-center">
              {[
                { value: "+500", label: "clients pro" },
                { value: "24 h", label: "délai de réponse" },
                { value: "100%", label: "made in France" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-xl font-bold text-[#C75B12]">{s.value}</p>
                  <p className="text-[10px] text-gray-400 font-medium mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Inquiry form */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <h3 className="text-lg font-bold text-[#353A3F] mb-1.5">Demander un devis</h3>
            <p className="text-sm text-gray-400 mb-6">Réponse sous 24 h · Support en français</p>

            <div className="flex flex-col gap-4">
              {/* Row 1 — Nom & Société */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#353A3F]">Nom et prénom <span className="text-[#C75B12]">*</span></label>
                  <input
                    type="text"
                    placeholder="Jean Dupont"
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#353A3F]/40 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#353A3F]">Société <span className="text-[#C75B12]">*</span></label>
                  <input
                    type="text"
                    placeholder="ACME Telecom"
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#353A3F]/40 transition-colors"
                  />
                </div>
              </div>

              {/* Row 2 — Email & Téléphone */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#353A3F]">E-mail professionnel <span className="text-[#C75B12]">*</span></label>
                  <input
                    type="email"
                    placeholder="contact@societe.fr"
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#353A3F]/40 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#353A3F]">Téléphone</label>
                  <input
                    type="tel"
                    placeholder="+33 6 00 00 00 00"
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#353A3F]/40 transition-colors"
                  />
                </div>
              </div>

              {/* Type de demande */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#353A3F]">Pays <span className="text-[#C75B12]">*</span></label>
                <select defaultValue="FR" className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#353A3F]/40 transition-colors bg-white">
                  <option value="FR">🇫🇷 France</option>
                  <option value="BE">🇧🇪 Belgique</option>
                  <option value="CH">🇨🇭 Suisse</option>
                  <option value="LU">🇱🇺 Luxembourg</option>
                  <option value="MC">🇲🇨 Monaco</option>
                  <option value="DE">🇩🇪 Allemagne</option>
                  <option value="ES">🇪🇸 Espagne</option>
                  <option value="IT">🇮🇹 Italie</option>
                  <option value="NL">🇳🇱 Pays-Bas</option>
                  <option value="PT">🇵🇹 Portugal</option>
                  <option value="GB">🇬🇧 Royaume-Uni</option>
                  <option value="PL">🇵🇱 Pologne</option>
                  <option value="SE">🇸🇪 Suède</option>
                  <option value="DK">🇩🇰 Danemark</option>
                  <option value="NO">🇳🇴 Norvège</option>
                  <option value="FI">🇫🇮 Finlande</option>
                  <option value="AT">🇦🇹 Autriche</option>
                  <option value="CZ">🇨🇿 Tchéquie</option>
                  <option value="RO">🇷🇴 Roumanie</option>
                  <option value="MA">🇲🇦 Maroc</option>
                  <option value="DZ">🇩🇿 Algérie</option>
                  <option value="TN">🇹🇳 Tunisie</option>
                  <option value="SN">🇸🇳 Sénégal</option>
                  <option value="CI">🇨🇮 Côte d'Ivoire</option>
                  <option value="CM">🇨🇲 Cameroun</option>
                  <option value="OTHER">🌍 Autre pays</option>
                </select>
              </div>

              {/* Produits demandés */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-[#353A3F]">Produits demandés</label>

                {/* Selected product chips */}
                {selectedProducts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between bg-[#EFF7FF] border border-gray-100 rounded-xl px-4 py-2.5">
                    <span className="text-sm font-medium text-[#353A3F] truncate">{p.name}</span>
                    <button
                      type="button"
                      onClick={() => removeSelectedProduct(p.id)}
                      className="flex-shrink-0 ml-3 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                {/* Search input + dropdown */}
                {(showSearch || selectedProducts.length === 0) && (
                  <div ref={dropdownRef} className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      value={productSearch}
                      onChange={(e) => { setProductSearch(e.target.value); setDropdownOpen(true); }}
                      onFocus={() => setDropdownOpen(true)}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); filteredProducts.length === 1 ? confirmProduct(filteredProducts[0].slug, filteredProducts[0].name) : addCustom(); } }}
                      placeholder="Rechercher un produit ou une référence…"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#353A3F]/40 transition-colors"
                    />

                    {dropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-100 rounded-2xl shadow-2xl shadow-black/8 z-50 overflow-hidden">
                        {/* Category pills */}
                        <div className="flex gap-1.5 px-3 pt-3 pb-2 overflow-x-auto scrollbar-hide border-b border-gray-50">
                          <button
                            type="button"
                            onClick={() => setActiveCategory(null)}
                            className={`flex-shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full transition-colors ${!activeCategory ? "bg-[#353A3F] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                          >
                            Tous
                          </button>
                          {allCategories.map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                              className={`flex-shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full transition-colors ${activeCategory === cat ? "bg-[#353A3F] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>

                        {/* Product list */}
                        <div className="max-h-48 overflow-y-auto">
                          {filteredProducts.length > 0 ? filteredProducts.map((p) => (
                            <button
                              key={p.slug}
                              type="button"
                              onClick={() => confirmProduct(p.slug, p.name)}
                              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#EFF7FF] transition-colors text-left group"
                            >
                              <img src={p.imageUrl} alt={p.name} className="w-9 h-9 rounded-lg object-cover flex-shrink-0 border border-gray-100" />
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-800 truncate group-hover:text-[#353A3F]">{p.name}</p>
                                <p className="text-[10px] text-gray-400">{p.category} · à partir de {p.variants[0].price.toFixed(2).replace(".", ",")} €</p>
                              </div>
                            </button>
                          )) : (
                            <p className="text-sm text-gray-400 text-center py-5">Aucun produit trouvé dans le catalogue</p>
                          )}
                        </div>

                        {/* Custom product option */}
                        {productSearch.trim() && (
                          <div className="border-t border-gray-50 p-2">
                            <button
                              type="button"
                              onClick={addCustom}
                              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[#353A3F] font-medium hover:bg-[#EFF7FF] transition-colors text-left"
                            >
                              <Plus className="w-4 h-4 flex-shrink-0" />
                              Ajouter « {productSearch.trim()} » comme produit personnalisé
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* "+ Ajouter un produit" — only visible after ≥1 product selected */}
                {selectedProducts.length > 0 && !showSearch && (
                  <button
                    type="button"
                    onClick={() => { setShowSearch(true); setDropdownOpen(true); }}
                    className="self-start flex items-center gap-1.5 text-xs font-semibold text-[#353A3F] hover:text-[#C75B12] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Ajouter un produit
                  </button>
                )}
              </div>

              {/* Votre besoin */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#353A3F]">Votre besoin <span className="text-[#C75B12]">*</span></label>
                <textarea
                  rows={4}
                  placeholder="Décrivez votre projet, les quantités souhaitées, vos contraintes techniques…"
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#353A3F]/40 transition-colors resize-none"
                />
              </div>

              {/* Joindre un fichier */}
              <div>
                <input
                  ref={fileRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-[#353A3F] border border-dashed border-gray-300 hover:border-[#353A3F]/40 rounded-xl px-4 py-2.5 w-full transition-colors"
                >
                  <Paperclip className="w-3.5 h-3.5 flex-shrink-0" />
                  {fileName ? (
                    <span className="text-[#353A3F] truncate">{fileName}</span>
                  ) : (
                    <span>Joindre un fichier <span className="text-gray-400 font-normal">(PDF, XLSX, PNG — 10 Mo max)</span></span>
                  )}
                </button>
              </div>

              {/* Submit */}
              <button className="w-full flex items-center justify-center gap-2.5 bg-[#C75B12] hover:bg-[#a34910] active:scale-[0.98] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all duration-150 shadow-md shadow-[#C75B12]/20 mt-1">
                <Mail className="w-4 h-4" />
                Envoyer ma demande
              </button>
              <p className="text-center text-[10px] text-gray-400">
                Vos données sont protégées · Réponse garantie sous 24 h
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
