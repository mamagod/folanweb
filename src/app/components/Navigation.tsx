import { Search, User, ShoppingCart, Menu, X, ChevronDown, ChevronRight, LogOut } from "lucide-react";
import { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import folanLogo from "@/imports/image-3.png";

// slug = null means "no category page yet" (Guides/Tutos items)
const megaMenuItems = [
  {
    label: "CÂBLES FIBRE OPTIQUE",
    slug: "l1:cables-fibre-optique",
    children: [
      { label: "Câbles pour Box Fibre",     slug: "cables-fibre-box" },
      { label: "Cordons & Pigtails Fibre",  slug: "cables-fibre-pro" },
      { label: "Câbles Fibre Extérieur",    slug: "cables-fibre-pro" },
      { label: "Câbles MTP / MPO",          slug: "cables-fibre-pro" },
    ],
  },
  {
    label: "MATÉRIEL & ÉQUIPEMENTS RÉSEAU",
    slug: "l1:materiel-reseau",
    children: [
      { label: "Câbles Cuivre RJ45",        slug: "reseau-cuivre-connectiques" },
      { label: "Switches & Modules SFP",    slug: "cables-fibre-pro" },
      { label: "Baies, Racks & Coffrets",   slug: "baies-racks-coffrets" },
      { label: "Prises & Connectiques",     slug: "accessoires-box-installation" },
    ],
  },
  {
    label: "OUTILS & ACCESSOIRES",
    slug: "l1:outils-accessoires",
    children: [
      { label: "Outils d'installation fibre",        slug: "outillage-protection" },
      { label: "Kits de nettoyage fibre",            slug: "outillage-protection" },
      { label: "Adaptateurs & Accessoires fibre",    slug: "accessoires-box-installation" },
    ],
  },
  {
    label: "RESSOURCES",
    slug: "ressources",
    children: [
      { label: "FAQ",                      slug: "faq" },
      { label: "Guides & tutoriels",       slug: "guides" },
      { label: "Cas clients",              slug: "cas-clients" },
      { label: "Catalogues & brochures",   slug: "catalogues" },
    ],
  },
  {
    label: "DÉCOUVRIR FOLAN",
    slug: "about",
    children: [
      { label: "La société",               slug: "about" },
      { label: "Qualité & certifications", slug: "qualite-iso" },
      { label: "RSE",                      slug: "rse" },
    ],
  },
];

interface NavProps {
  onLogoClick?: () => void;
  onNavigate?: (slug: string) => void;
  onSearch?: (q: string) => void;
  onAuthClick?: () => void;
  onCartClick?: () => void;
  cartCount?: number;
}

function MegaMenuItem({
  item,
  onNavigate,
}: {
  item: (typeof megaMenuItems)[0];
  onNavigate?: (slug: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpen(true);
  };
  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => setOpen(false), 120);
  };

  const handleParentClick = () => {
    if (item.slug) onNavigate?.(item.slug);
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        onClick={handleParentClick}
        className={`flex items-center gap-1 text-xs font-semibold tracking-wide transition-colors duration-150 py-1 border-b-2 ${
          open
            ? "text-[#DC580A] border-[#DC580A]"
            : "text-[#374151] border-transparent hover:text-[#DC580A]"
        }`}
      >
        {item.label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          strokeWidth={2.5}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 pt-3 z-50">
          <div className="bg-white border border-gray-200 rounded-xl shadow-2xl shadow-black/10 min-w-[220px] py-2 overflow-hidden">
            {item.children.map((child) => (
              <button
                key={child.label}
                onClick={() => {
                  setOpen(false);
                  if (child.slug) onNavigate?.(child.slug);
                }}
                className={`w-full flex items-center justify-between px-5 py-2.5 text-sm text-left transition-colors group ${
                  child.slug
                    ? "text-[#374151] hover:text-[#DC580A] hover:bg-orange-50"
                    : "text-gray-400 cursor-default"
                }`}
              >
                <span>{child.label}</span>
                {child.slug && (
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#DC580A]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Navigation({ onLogoClick, onNavigate, onSearch, onAuthClick, onCartClick, cartCount = 0 }: NavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { isLoggedIn, login, logout } = useAuth();

  const closeMobile = () => setIsMobileMenuOpen(false);

  const submitSearch = () => {
    const q = searchValue.trim();
    if (q) { onSearch?.(q); setSearchOpen(false); setSearchValue(""); }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-[68px]">

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen
              ? <X className="w-6 h-6 text-[#374151]" />
              : <Menu className="w-6 h-6 text-[#374151]" />}
          </button>

          {/* Logo */}
          <div className="flex-1 lg:flex-none flex justify-center lg:justify-start">
            <button onClick={onLogoClick} className="flex items-center group">
              <ImageWithFallback
                src={folanLogo}
                alt="FOLAN - Telecom Greentech Security"
                className="h-13 w-auto object-contain group-hover:opacity-85 transition-opacity duration-200"
              />
            </button>
          </div>

          {/* Desktop mega menu */}
          <div className="hidden lg:flex items-center gap-7">
            {megaMenuItems.map((item) => (
              <MegaMenuItem key={item.label} item={item} onNavigate={onNavigate} />
            ))}
          </div>

          {/* Right tools */}
          <div className="flex items-center gap-1 lg:gap-2">
            {/* Inline search — expands on icon click */}
            <div className="flex items-center">
              {searchOpen ? (
                <form
                  onSubmit={(e) => { e.preventDefault(); submitSearch(); }}
                  className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 transition-all"
                >
                  <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <input
                    autoFocus
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Rechercher..."
                    className="w-40 lg:w-56 text-sm bg-transparent focus:outline-none text-gray-700 placeholder:text-gray-400"
                    onKeyDown={(e) => e.key === "Escape" && (setSearchOpen(false), setSearchValue(""))}
                  />
                  <button type="button" onClick={() => { setSearchOpen(false); setSearchValue(""); }} className="text-gray-400 hover:text-gray-600 ml-1">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                  aria-label="Rechercher"
                >
                  <Search className="w-5 h-5 text-[#374151] group-hover:text-[#DC580A] transition-colors" />
                </button>
              )}
            </div>
{isLoggedIn ? (
              <button
                onClick={logout}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors group"
              >
                <LogOut className="w-5 h-5 text-[#374151] group-hover:text-[#DC580A] transition-colors" />
                <span className="hidden lg:block text-sm text-[#374151] group-hover:text-[#DC580A] transition-colors">
                  Déconnexion
                </span>
              </button>
            ) : (
              <button
                onClick={onAuthClick}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors group"
              >
                <User className="w-5 h-5 text-[#374151] group-hover:text-[#DC580A] transition-colors" />
                <span className="hidden lg:block text-sm text-[#374151] group-hover:text-[#DC580A] transition-colors">
                  Connexion
                </span>
              </button>
            )}
            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors group"
            >
              <ShoppingCart className="w-5 h-5 text-[#374151] group-hover:text-[#DC580A] transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#DC580A] text-white text-[10px] rounded-full flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-2">
            {megaMenuItems.map((item) => (
              <div key={item.label} className="border-b border-gray-100 last:border-b-0">
                <button
                  onClick={() => setExpandedMobile((p) => (p === item.label ? null : item.label))}
                  className="w-full flex items-center justify-between px-4 py-3 text-xs font-semibold tracking-wide text-[#374151] hover:text-[#DC580A] transition-colors"
                >
                  {item.label}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      expandedMobile === item.label ? "rotate-180 text-[#DC580A]" : ""
                    }`}
                  />
                </button>

                {expandedMobile === item.label && (
                  <div className="px-4 pb-3">
                    {/* "Voir toute la catégorie" — product L1 categories + RESSOURCES hub */}
                    {(item.slug?.startsWith("l1:") || item.slug === "ressources") && (
                      <button
                        onClick={() => { closeMobile(); onNavigate?.(item.slug!); }}
                        className="flex items-center gap-0.5 text-xs font-semibold text-[#DC580A] hover:text-[#b84808] transition-colors mb-3"
                      >
                        {item.slug === "ressources" ? "Toutes les ressources" : "Voir toute la catégorie"}
                        <span className="ml-0.5">→</span>
                      </button>
                    )}

                    {/* Subcategory links — no bullets */}
                    {item.children.map((child) => (
                      <button
                        key={child.label}
                        onClick={() => { closeMobile(); if (child.slug) onNavigate?.(child.slug); }}
                        className={`w-full text-left px-0 py-2 text-sm transition-colors ${
                          child.slug
                            ? "text-gray-500 hover:text-[#DC580A]"
                            : "text-gray-300 cursor-default"
                        }`}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
<div className="sm:hidden border-t border-gray-100 mt-2 pt-2">
              {isLoggedIn ? (
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-[#374151] hover:text-[#DC580A] hover:bg-gray-50 rounded-lg font-medium transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Déconnexion
                </button>
              ) : (
                <button
                  onClick={onAuthClick}
                  className="w-full flex items-center gap-3 px-4 py-3 text-[#374151] hover:text-[#DC580A] hover:bg-gray-50 rounded-lg font-medium transition-colors"
                >
                  <User className="w-5 h-5" />
                  Connexion
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
