import { useState, useMemo } from "react";
import {
  ChevronRight,
  ChevronDown,
  Star,
  ShoppingCart,
  ArrowRight,
  SlidersHorizontal,
  X,
  MessageSquare,
} from "lucide-react";
import { PRODUCTS } from "../data/products";
import { useCart } from "../contexts/CartContext";

// ── SVG icon set — line-art style, brand blue ─────────────────────────────────

function CatIcon({ k }: { k: string }) {
  const s = {
    stroke: "#353A3F",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };
  const icons: Record<string, React.ReactNode> = {
    "box-cable": (
      <svg viewBox="0 0 48 48" {...s} className="w-11 h-11">
        <path d="M8 21L24 9L40 21V40H8V21Z" />
        <rect x="18" y="28" width="12" height="12" />
        <path d="M20 22c1.5-2.5 6.5-2.5 8 0" />
        <circle cx="24" cy="24.5" r="1.3" fill="#353A3F" stroke="none" />
      </svg>
    ),
    boitier: (
      <svg viewBox="0 0 48 48" {...s} className="w-11 h-11">
        <rect x="5" y="11" width="38" height="28" rx="3" />
        <path d="M5 20h38" />
        <circle cx="14" cy="15.5" r="2" fill="#353A3F" stroke="none" />
        <circle cx="24" cy="15.5" r="2" fill="#353A3F" stroke="none" />
        <circle cx="34" cy="15.5" r="2" fill="#353A3F" stroke="none" />
        <rect x="11" y="24" width="8" height="9" rx="1" />
        <rect x="29" y="24" width="8" height="9" rx="1" />
      </svg>
    ),
    "cable-fo": (
      <svg viewBox="0 0 48 48" {...s} className="w-11 h-11">
        <path d="M4 20c4-6 12-8 20-8s16 2 20 8" />
        <path d="M4 26c4-6 12-8 20-8s16 2 20 8" />
        <path d="M4 32c4-6 12-8 20-8s16 2 20 8" />
        <circle cx="44" cy="20" r="3.5" fill="white" stroke="#353A3F" strokeWidth="1.6" />
        <circle cx="4" cy="32" r="3.5" fill="white" stroke="#353A3F" strokeWidth="1.6" />
      </svg>
    ),
    cordon: (
      <svg viewBox="0 0 48 48" {...s} className="w-11 h-11">
        <path d="M8 24c0-8.8 7.2-16 16-16s16 7.2 16 16-7.2 16-16 16" />
        <path d="M3 28l5-4M45 28l-5-4" />
        <circle cx="3" cy="28" r="3" fill="white" stroke="#353A3F" strokeWidth="1.6" />
        <circle cx="45" cy="28" r="3" fill="white" stroke="#353A3F" strokeWidth="1.6" />
      </svg>
    ),
    composant: (
      <svg viewBox="0 0 48 48" {...s} className="w-11 h-11">
        <rect x="15" y="13" width="18" height="22" rx="2" />
        <path d="M7 17h8M7 24h8M7 31h8M33 17h8M33 24h8M33 31h8" />
        <path d="M21 9v4M27 9v4M21 35v4M27 35v4" />
      </svg>
    ),
    armement: (
      <svg viewBox="0 0 48 48" {...s} className="w-11 h-11">
        <circle cx="24" cy="24" r="16" />
        <circle cx="24" cy="24" r="9" />
        <path d="M24 8v7M24 33v7M8 24h7M33 24h7" />
      </svg>
    ),
    ancrage: (
      <svg viewBox="0 0 48 48" {...s} className="w-11 h-11">
        <circle cx="24" cy="12" r="4" />
        <path d="M24 16v24" />
        <path d="M13 18h22" />
        <path d="M11 32c0 6 5.4 10 13 10s13-4 13-10" />
      </svg>
    ),
    mesure: (
      <svg viewBox="0 0 48 48" {...s} className="w-11 h-11">
        <rect x="13" y="7" width="22" height="36" rx="3" />
        <rect x="17" y="12" width="14" height="10" rx="1" />
        <circle cx="24" cy="32" r="4" />
        <path d="M17 26h14" strokeWidth="1.2" />
        <path d="M20 7V4h8v3" />
      </svg>
    ),
    soudeuse: (
      <svg viewBox="0 0 48 48" {...s} className="w-11 h-11">
        <rect x="5" y="13" width="38" height="26" rx="3" />
        <path d="M5 22h38" />
        <rect x="11" y="26" width="10" height="7" rx="1" />
        <rect x="27" y="26" width="10" height="7" rx="1" />
        <path d="M18 13V9M30 13V9" />
        <circle cx="10" cy="17.5" r="2" fill="#353A3F" stroke="none" />
      </svg>
    ),
    armoire: (
      <svg viewBox="0 0 48 48" {...s} className="w-11 h-11">
        <rect x="8" y="7" width="32" height="37" rx="2" />
        <path d="M8 15h32M8 23h32M8 31h32" />
        <rect x="11" y="9" width="8" height="4" rx="0.5" />
        <rect x="11" y="17" width="8" height="4" rx="0.5" />
        <rect x="11" y="25" width="8" height="4" rx="0.5" />
        <circle cx="34" cy="11" r="1.5" fill="#353A3F" stroke="none" />
        <circle cx="34" cy="19" r="1.5" fill="#353A3F" stroke="none" />
        <circle cx="34" cy="27" r="1.5" fill="#353A3F" stroke="none" />
      </svg>
    ),
    "cable-cuivre": (
      <svg viewBox="0 0 48 48" {...s} className="w-11 h-11">
        <path d="M4 19c3-5 7-6 12-1s9 6 16 1 9-6 12 0" />
        <path d="M4 27c3-5 7-6 12-1s9 6 16 1 9-6 12 0" />
        <circle cx="4" cy="19" r="3" fill="white" />
        <circle cx="44" cy="27" r="3" fill="white" />
      </svg>
    ),
    switch: (
      <svg viewBox="0 0 48 48" {...s} className="w-11 h-11">
        <rect x="5" y="15" width="38" height="20" rx="3" />
        <circle cx="13" cy="25" r="3" />
        <circle cx="22" cy="25" r="3" />
        <circle cx="31" cy="25" r="3" />
        <circle cx="39" cy="25" r="2" fill="#C75B12" stroke="none" />
        <path d="M13 28v5M22 28v5M31 28v5" />
      </svg>
    ),
    baie: (
      <svg viewBox="0 0 48 48" {...s} className="w-11 h-11">
        <rect x="10" y="5" width="28" height="40" rx="2" />
        <path d="M10 13h28M10 21h28M10 29h28M10 37h28" />
        <rect x="14" y="7" width="16" height="4" rx="0.5" />
        <rect x="14" y="15" width="16" height="4" rx="0.5" />
        <rect x="14" y="23" width="16" height="4" rx="0.5" />
        <rect x="14" y="31" width="16" height="4" rx="0.5" />
      </svg>
    ),
    prise: (
      <svg viewBox="0 0 48 48" {...s} className="w-11 h-11">
        <rect x="11" y="13" width="26" height="20" rx="3" />
        <rect x="18" y="7" width="12" height="6" rx="1" />
        <path d="M18 27h12" />
        <path d="M22 31h4" />
        <path d="M15 20h18" />
        <path d="M24 33v5" />
      </svg>
    ),
    odf: (
      <svg viewBox="0 0 48 48" {...s} className="w-11 h-11">
        <rect x="5" y="9" width="38" height="32" rx="2" />
        <path d="M5 17h38M5 25h38" />
        <circle cx="13" cy="13" r="2" fill="#353A3F" stroke="none" />
        <circle cx="21" cy="13" r="2" fill="#353A3F" stroke="none" />
        <circle cx="29" cy="13" r="2" fill="#353A3F" stroke="none" />
        <circle cx="37" cy="13" r="2" fill="#353A3F" stroke="none" />
        <circle cx="13" cy="21" r="2" fill="#353A3F" stroke="none" />
        <circle cx="21" cy="21" r="2" fill="#353A3F" stroke="none" />
        <circle cx="29" cy="21" r="2" fill="#353A3F" stroke="none" />
        <circle cx="37" cy="21" r="2" fill="#353A3F" stroke="none" />
        <path d="M9 29h30" />
      </svg>
    ),
    module: (
      <svg viewBox="0 0 48 48" {...s} className="w-11 h-11">
        <rect x="7" y="17" width="28" height="14" rx="2" />
        <path d="M35 21h8v8h-8" />
        <path d="M7 21h-4v8h4" />
        <rect x="11" y="21" width="20" height="6" rx="1" />
        <path d="M17 31v5M27 31v5" />
      </svg>
    ),
    "tool-install": (
      <svg viewBox="0 0 48 48" {...s} className="w-11 h-11">
        <path d="M27 7l9 9-17 17s-2.5 6-6.5 6-4.5-3.5-4.5-3.5 0-3.5 6.5-3.5L27 7z" />
        <path d="M31 11l5-4 5 4-5 5" />
        <path d="M15 30l2 2" />
      </svg>
    ),
    clean: (
      <svg viewBox="0 0 48 48" {...s} className="w-11 h-11">
        <path d="M19 7l9 9-13 17H8V26L19 7z" />
        <path d="M8 33v6h6v-6" />
        <path d="M23 11l9 9" />
        <path d="M29 23c4 4 8 8 8 12-4 4-8 4-12 0" />
      </svg>
    ),
    adapter: (
      <svg viewBox="0 0 48 48" {...s} className="w-11 h-11">
        <rect x="15" y="15" width="18" height="18" rx="2" />
        <path d="M4 24h11M33 24h11" />
        <rect x="4" y="20" width="6" height="8" rx="1" />
        <rect x="38" y="20" width="6" height="8" rx="1" />
      </svg>
    ),
    cleaver: (
      <svg viewBox="0 0 48 48" {...s} className="w-11 h-11">
        <rect x="9" y="9" width="30" height="32" rx="2" />
        <path d="M15 24h18" />
        <path d="M15 19h18M15 29h18" />
        <rect x="21" y="9" width="6" height="7" />
        <path d="M24 9V5" />
      </svg>
    ),
    detector: (
      <svg viewBox="0 0 48 48" {...s} className="w-11 h-11">
        <path d="M20 7l4-4 4 4v32l-4 4-4-4V7z" />
        <path d="M28 11c4 2 6 6 6 11s-2 9-6 11" />
        <path d="M28 16c2 2 3 4 3 6s-1 4-3 6" />
        <circle cx="24" cy="22" r="2" fill="#C75B12" stroke="none" />
      </svg>
    ),
    pince: (
      <svg viewBox="0 0 48 48" {...s} className="w-11 h-11">
        <path d="M10 10L24 29" />
        <path d="M14 6L30 29" />
        <path d="M10 10L14 6" />
        <path d="M24 29h6L39 38c2 2 2 4 0 6s-4 2-6 0L24 35v-6z" />
      </svg>
    ),
    storage: (
      <svg viewBox="0 0 48 48" {...s} className="w-11 h-11">
        <rect x="7" y="11" width="34" height="30" rx="2" />
        <path d="M7 21h34M7 31h34" />
        <path d="M7 7h34v4H7z" />
        <circle cx="15" cy="16" r="2" fill="#353A3F" stroke="none" />
        <circle cx="15" cy="26" r="2" fill="#353A3F" stroke="none" />
        <circle cx="15" cy="36" r="2" fill="#353A3F" stroke="none" />
      </svg>
    ),
    mtp: (
      <svg viewBox="0 0 48 48" {...s} className="w-11 h-11">
        <rect x="14" y="17" width="20" height="14" rx="2" />
        <path d="M20 17v-5h8v5" />
        <path d="M20 31v5h8v-5" />
        <path d="M5 22h9M34 22h9M5 28h9M34 28h9" />
        <rect x="18" y="21" width="12" height="6" rx="1" />
      </svg>
    ),
  };

  return (
    <div className="flex items-center justify-center h-14 w-14 mx-auto">
      {icons[k] ?? (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="#353A3F"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-11 h-11"
        >
          <rect x="8" y="8" width="32" height="32" rx="4" />
          <path d="M16 24h16M24 16v16" />
        </svg>
      )}
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

interface Subcategory {
  label: string;
  slug: string;
  iconKey: string;
}

interface FilterGroup {
  label: string;
  count: number;
}

interface L1Data {
  tag: string;
  title: string;
  description: string;
  heroImage: string;
  subcategories: Subcategory[];
  stockCount: number;
  filterLabel1: string;
  filterLabel2: string;
  filterGroup1: FilterGroup[];
  filterGroup2: FilterGroup[];
  productSlugs: string[];
}

const L1_DATA: Record<string, L1Data> = {
  "cables-fibre-optique": {
    tag: "UNIVERS PRODUIT",
    title: "Connectivité optique",
    description:
      "Câbles, boîtiers, composants et équipements pour le raccordement, l'installation et la maintenance des réseaux fibre optique.",
    heroImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
    subcategories: [
      { label: "Câbles pour\nBox Fibre", slug: "cables-fibre-box", iconKey: "box-cable" },
      { label: "Boîtiers fibre\noptique", slug: "baies-racks-coffrets", iconKey: "boitier" },
      { label: "Câbles fibre\noptique", slug: "cables-fibre-pro", iconKey: "cable-fo" },
      { label: "Cordons FO\n& Cuivre", slug: "reseau-cuivre-connectiques", iconKey: "cordon" },
      { label: "Composants\npassifs FO", slug: "cables-fibre-pro", iconKey: "composant" },
      { label: "Armement\n& fixation", slug: "outillage-protection", iconKey: "armement" },
      { label: "Ancrage &\nsuspension", slug: "outillage-protection", iconKey: "ancrage" },
      { label: "Mesure fibre\noptique", slug: "outillage-protection", iconKey: "mesure" },
      { label: "Soudeuses &\noutillage", slug: "outillage-protection", iconKey: "soudeuse" },
      { label: "Armoires & tiroirs\noptiques", slug: "baies-racks-coffrets", iconKey: "armoire" },
    ],
    stockCount: 126,
    filterLabel1: "TYPE DE FIBRE",
    filterLabel2: "CONNECTEUR",
    filterGroup1: [
      { label: "Monomode OS2", count: 109 },
      { label: "Multimode OM3/OM4", count: 45 },
    ],
    filterGroup2: [
      { label: "SC/APC", count: 74 },
      { label: "SC/UPC", count: 66 },
      { label: "LC/APC", count: 58 },
      { label: "LC/UPC", count: 52 },
    ],
    productSlugs: [
      "cable-fibre-sc-apc-sc-upc-1m",
      "cable-fibre-sc-apc-3m",
      "cable-fibre-sc-apc-5m",
      "cable-fibre-sc-apc-10m",
      "cable-fibre-pro-lc-lc-om4",
    ],
  },
  "materiel-reseau": {
    tag: "UNIVERS PRODUIT",
    title: "Matériel & équipements réseau",
    description:
      "Switchs, câbles cuivre, baies et équipements pour vos infrastructures réseau locales et longue distance.",
    heroImage:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
    subcategories: [
      { label: "Câbles Cuivre\nRJ45", slug: "reseau-cuivre-connectiques", iconKey: "cable-cuivre" },
      { label: "Switches &\nModules SFP", slug: "cables-fibre-pro", iconKey: "switch" },
      { label: "Baies, Racks\n& Coffrets", slug: "baies-racks-coffrets", iconKey: "baie" },
      { label: "Prises &\nConnectiques", slug: "accessoires-box-installation", iconKey: "prise" },
      { label: "Jarretières\noptiques", slug: "cables-fibre-pro", iconKey: "cordon" },
      { label: "ODF & Panneaux\nde brassage", slug: "baies-racks-coffrets", iconKey: "odf" },
      { label: "Câbles fibre\nextérieur", slug: "cables-fibre-pro", iconKey: "cable-fo" },
      { label: "Câbles MTP\n/ MPO", slug: "cables-fibre-pro", iconKey: "mtp" },
      { label: "Modules &\nConvertisseurs", slug: "cables-fibre-pro", iconKey: "module" },
      { label: "Armoires &\ntiroirs optiques", slug: "baies-racks-coffrets", iconKey: "armoire" },
    ],
    stockCount: 84,
    filterLabel1: "TYPE DE CÂBLE",
    filterLabel2: "CONNECTEUR",
    filterGroup1: [
      { label: "Cat 6", count: 52 },
      { label: "Cat 6A", count: 32 },
    ],
    filterGroup2: [
      { label: "RJ45", count: 68 },
      { label: "LC", count: 44 },
      { label: "SC", count: 38 },
      { label: "ST", count: 24 },
    ],
    productSlugs: [
      "cable-cat6-rj45-1m",
      "cable-cat7-rj45-5m",
      "baie-reseau-murale-6u",
      "prise-rj45-double-cat6",
      "patch-panel-24-ports",
    ],
  },
  "outils-accessoires": {
    tag: "UNIVERS PRODUIT",
    title: "Outils & accessoires",
    description:
      "Outillage professionnel, kits de nettoyage et accessoires pour l'installation et la maintenance des réseaux fibre optique.",
    heroImage:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
    subcategories: [
      { label: "Outils\nd'installation fibre", slug: "outillage-protection", iconKey: "tool-install" },
      { label: "Kits de nettoyage\nfibre", slug: "outillage-protection", iconKey: "clean" },
      { label: "Adaptateurs &\nAccessoires", slug: "accessoires-box-installation", iconKey: "adapter" },
      { label: "Cliveuses\nfibre", slug: "outillage-protection", iconKey: "cleaver" },
      { label: "Détecteurs\nde fibre", slug: "outillage-protection", iconKey: "detector" },
      { label: "Soudeuses\nfibre", slug: "outillage-protection", iconKey: "soudeuse" },
      { label: "Testeurs\n& OTDR", slug: "outillage-protection", iconKey: "mesure" },
      { label: "Pince &\nDénudeurs", slug: "outillage-protection", iconKey: "pince" },
      { label: "Protection &\nRangement", slug: "accessoires-box-installation", iconKey: "storage" },
      { label: "Câbles &\nConnectique", slug: "cables-fibre-pro", iconKey: "cable-fo" },
    ],
    stockCount: 67,
    filterLabel1: "TYPE D'OUTIL",
    filterLabel2: "COMPATIBILITÉ",
    filterGroup1: [
      { label: "Manuel", count: 41 },
      { label: "Électrique", count: 26 },
    ],
    filterGroup2: [
      { label: "Universel", count: 52 },
      { label: "SC/APC", count: 31 },
      { label: "LC/UPC", count: 28 },
    ],
    productSlugs: [
      "kit-nettoyage-fibre-optique",
      "cliveur-fibre-precision",
      "denudeur-fibre-triple",
      "testeur-fibre-optique",
      "protection-epissure-60mm",
    ],
  },
};

// Friendly display names for each top-level slug
const L1_LABELS: Record<string, string> = {
  "cables-fibre-optique": "Câbles fibre optique",
  "materiel-reseau": "Matériel & équipements réseau",
  "outils-accessoires": "Outils & accessoires",
};

// Supplementary mock products so pages always have enough to display
const MOCK_PRODUCTS = [
  {
    slug: "boitier-terminaison-4p",
    name: "Boîtier de terminaison optique 4 ports",
    category: "BOÎTIERS FIBRE OPTIQUE",
    price: 18.9,
    rating: 4.6,
    reviewCount: 87,
    inStock: true,
    badge: null,
    imageUrl:
      "https://images.unsplash.com/photo-1612257911111-074bd8388f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
  {
    slug: "tiroir-optique-1u",
    name: "Tiroir optique coulissant 1U 12 ports SC",
    category: "ARMOIRES & TIROIRS OPTIQUES",
    price: 79.0,
    rating: 4.7,
    reviewCount: 53,
    inStock: true,
    badge: "pro",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
  {
    slug: "adaptateur-sc-apc-duplex",
    name: "Adaptateur SC/APC duplex céramique",
    category: "COMPOSANTS PASSIFS FO",
    price: 4.5,
    rating: 4.5,
    reviewCount: 124,
    inStock: true,
    badge: null,
    imageUrl:
      "https://images.unsplash.com/photo-1624965439943-09e0238644e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
  {
    slug: "coupleur-optique-1x2",
    name: "Coupleur optique 1×2 monomode 50/50",
    category: "COMPOSANTS PASSIFS FO",
    price: 12.9,
    rating: 4.4,
    reviewCount: 38,
    inStock: true,
    badge: null,
    imageUrl:
      "https://images.unsplash.com/photo-1594915854088-2128db6a8db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
  {
    slug: "cable-cat6-rj45-1m",
    name: "Câble réseau Cat 6 RJ45 S/FTP blindé 1m",
    category: "CÂBLES CUIVRE RJ45",
    price: 5.9,
    rating: 4.7,
    reviewCount: 211,
    inStock: true,
    badge: "bestseller",
    imageUrl:
      "https://images.unsplash.com/photo-1574405345169-f45c7d66480e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
  {
    slug: "cable-cat7-rj45-5m",
    name: "Câble réseau Cat 7 RJ45 S/FTP blindé 5m",
    category: "CÂBLES CUIVRE RJ45",
    price: 9.9,
    rating: 4.8,
    reviewCount: 165,
    inStock: true,
    badge: null,
    imageUrl:
      "https://images.unsplash.com/photo-1574405345169-f45c7d66480e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
  {
    slug: "baie-reseau-murale-6u",
    name: "Baie réseau murale 6U 19\" avec porte vitrée",
    category: "BAIES, RACKS & COFFRETS",
    price: 129.0,
    rating: 4.6,
    reviewCount: 74,
    inStock: true,
    badge: null,
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
  {
    slug: "prise-rj45-double-cat6",
    name: "Prise RJ45 double Cat 6 UTP à encastrer",
    category: "PRISES & CONNECTIQUES",
    price: 8.5,
    rating: 4.5,
    reviewCount: 93,
    inStock: true,
    badge: null,
    imageUrl:
      "https://images.unsplash.com/photo-1612257911111-074bd8388f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
  {
    slug: "patch-panel-24-ports",
    name: "Patch panel 24 ports Cat 6 non blindé 1U",
    category: "ODF & PANNEAUX DE BRASSAGE",
    price: 34.9,
    rating: 4.7,
    reviewCount: 56,
    inStock: true,
    badge: "pro",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
  {
    slug: "kit-nettoyage-fibre-optique",
    name: "Kit de nettoyage fibre optique 10 pièces",
    category: "KITS DE NETTOYAGE FIBRE",
    price: 24.9,
    rating: 4.6,
    reviewCount: 109,
    inStock: true,
    badge: null,
    imageUrl:
      "https://images.unsplash.com/photo-1729549223893-b340db51e577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
  {
    slug: "cliveur-fibre-precision",
    name: "Cliveur fibre optique de précision FC-6S",
    category: "CLIVEUSES FIBRE",
    price: 89.0,
    rating: 4.8,
    reviewCount: 47,
    inStock: true,
    badge: "pro",
    imageUrl:
      "https://images.unsplash.com/photo-1729549223893-b340db51e577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
  {
    slug: "denudeur-fibre-triple",
    name: "Dénudeur fibre optique triple 3 fentes",
    category: "PINCE & DÉNUDEURS",
    price: 34.5,
    rating: 4.7,
    reviewCount: 82,
    inStock: true,
    badge: null,
    imageUrl:
      "https://images.unsplash.com/photo-1729549223893-b340db51e577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
  {
    slug: "testeur-fibre-optique",
    name: "Testeur de fibre optique VFL 650nm stylo",
    category: "DÉTECTEURS DE FIBRE",
    price: 18.9,
    rating: 4.5,
    reviewCount: 134,
    inStock: true,
    badge: "nouveau",
    imageUrl:
      "https://images.unsplash.com/photo-1729549223893-b340db51e577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
  {
    slug: "protection-epissure-60mm",
    name: "Protections épissures thermo-rétractables 60mm ×100",
    category: "PROTECTION & RANGEMENT",
    price: 12.5,
    rating: 4.4,
    reviewCount: 61,
    inStock: true,
    badge: null,
    imageUrl:
      "https://images.unsplash.com/photo-1729549223893-b340db51e577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
        />
      ))}
    </span>
  );
}

interface MiniProduct {
  slug: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  badge: string | null;
  imageUrl: string;
}

function ProductCard({
  product,
  onProductClick,
}: {
  product: MiniProduct;
  onProductClick: (slug: string) => void;
}) {
  const cart = useCart();
  const badgeColors: Record<string, string> = {
    bestseller: "bg-[#353A3F] text-white",
    nouveau: "bg-emerald-500 text-white",
    pro: "bg-purple-600 text-white",
    promo: "bg-red-500 text-white",
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group flex flex-col"
      onClick={() => onProductClick(product.slug)}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-gray-50">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <span
            className={`absolute top-2 left-2 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${badgeColors[product.badge] ?? "bg-gray-500 text-white"}`}
          >
            {product.badge}
          </span>
        )}
      </div>
      {/* Content */}
      <div className="p-3.5 flex flex-col flex-1">
        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">{product.category}</p>
        <h3 className="text-sm font-semibold text-[#353A3F] leading-snug line-clamp-2 mb-2 group-hover:text-[#C75B12] transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          <span
            className={`w-1.5 h-1.5 rounded-full ${product.inStock ? "bg-emerald-500" : "bg-red-400"} flex-shrink-0`}
          />
          <span className="text-[11px] text-gray-500">{product.inStock ? "En stock" : "Sur commande"}</span>
        </div>
        <div className="flex items-center gap-1.5 mb-3">
          <Stars rating={product.rating} />
          <span className="text-[11px] text-gray-400">({product.reviewCount})</span>
        </div>
        <div className="mt-auto">
          <p className="text-lg font-bold text-[#C75B12] mb-2">
            {product.price.toFixed(2).replace(".", ",")} <span className="text-sm font-semibold">€ HT</span>
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              cart.addItem({
                id: product.slug,
                name: product.name,
                price: product.price * 1.2,
                image: product.imageUrl,
                category: product.category,
              });
            }}
            className="w-full flex items-center justify-center gap-1.5 bg-[#C75B12] hover:bg-[#b04e0f] text-white text-xs font-semibold py-2 rounded-lg transition-colors"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterSection({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3 text-xs font-bold text-gray-700 uppercase tracking-wider hover:text-[#353A3F] transition-colors"
      >
        {label}
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="pb-3 space-y-1.5">{children}</div>}
    </div>
  );
}

function FilterCheckbox({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <div
        onClick={onChange}
        className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
          checked ? "bg-[#353A3F] border-[#353A3F]" : "border-gray-300 bg-white group-hover:border-[#353A3F]"
        }`}
      >
        {checked && (
          <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5">
            <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span className="text-sm text-gray-600 group-hover:text-gray-800 flex-1">{label}</span>
      <span className="text-xs text-gray-400">({count})</span>
    </label>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface Props {
  slug: string;
  onBack: () => void;
  onCategoryClick: (slug: string) => void;
  onProductClick: (slug: string) => void;
  onContactClick: () => void;
}

export function L1CategoryPage({ slug, onBack, onCategoryClick, onProductClick, onContactClick }: Props) {
  const data = L1_DATA[slug] ?? L1_DATA["cables-fibre-optique"];
  const categoryLabel = L1_LABELS[slug] ?? "Catalogue";

  // Filter UI state
  const [filterSections, setFilterSections] = useState({
    souscategorie: false,
    dispo: true,
    type: true,
    connecteur: true,
    longueur: false,
    prix: false,
  });
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedConnecteurs, setSelectedConnecteurs] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("pertinence");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleSection = (key: keyof typeof filterSections) =>
    setFilterSections((p) => ({ ...p, [key]: !p[key] }));

  const toggleType = (label: string) =>
    setSelectedTypes((p) => (p.includes(label) ? p.filter((x) => x !== label) : [...p, label]));

  const toggleConnecteur = (label: string) =>
    setSelectedConnecteurs((p) => (p.includes(label) ? p.filter((x) => x !== label) : [...p, label]));

  const resetFilters = () => {
    setInStockOnly(false);
    setSelectedTypes([]);
    setSelectedConnecteurs([]);
  };

  const activeFilterCount = (inStockOnly ? 1 : 0) + selectedTypes.length + selectedConnecteurs.length;

  // Build product list: merge real products + mock products
  const products: MiniProduct[] = useMemo(() => {
    const real = PRODUCTS.filter((p) => data.productSlugs.includes(p.slug)).map((p) => ({
      slug: p.slug,
      name: p.name,
      category: p.category.toUpperCase(),
      price: p.variants[0]?.price ?? 0,
      rating: p.rating,
      reviewCount: p.reviewCount,
      inStock: p.inStock,
      badge: p.badge,
      imageUrl: p.imageUrl,
    }));

    const mockFilled = MOCK_PRODUCTS.filter((m) => !real.some((r) => r.slug === m.slug));

    return [...real, ...mockFilled].slice(0, 9);
  }, [data.productSlugs]);

  const FilterPanel = () => (
    <div className="text-sm">
      {/* SOUS-CATÉGORIE */}
      <FilterSection
        label="SOUS-CATÉGORIE"
        open={filterSections.souscategorie}
        onToggle={() => toggleSection("souscategorie")}
      >
        <div className="space-y-1">
          {data.subcategories.slice(0, 5).map((sc) => (
            <button
              key={sc.slug}
              onClick={() => onCategoryClick(sc.slug)}
              className="w-full text-left text-sm text-gray-500 hover:text-[#C75B12] py-0.5 flex items-center gap-1.5 group"
            >
              <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-[#C75B12]" />
              {sc.label.replace("\n", " ")}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* DISPONIBILITÉ */}
      <FilterSection
        label="DISPONIBILITÉ"
        open={filterSections.dispo}
        onToggle={() => toggleSection("dispo")}
      >
        <FilterCheckbox
          label="En stock"
          count={data.stockCount}
          checked={inStockOnly}
          onChange={() => setInStockOnly((p) => !p)}
        />
      </FilterSection>

      {/* TYPE */}
      <FilterSection
        label={data.filterLabel1}
        open={filterSections.type}
        onToggle={() => toggleSection("type")}
      >
        {data.filterGroup1.map((fg) => (
          <FilterCheckbox
            key={fg.label}
            label={fg.label}
            count={fg.count}
            checked={selectedTypes.includes(fg.label)}
            onChange={() => toggleType(fg.label)}
          />
        ))}
      </FilterSection>

      {/* CONNECTEUR */}
      <FilterSection
        label={data.filterLabel2}
        open={filterSections.connecteur}
        onToggle={() => toggleSection("connecteur")}
      >
        {data.filterGroup2.map((fg) => (
          <FilterCheckbox
            key={fg.label}
            label={fg.label}
            count={fg.count}
            checked={selectedConnecteurs.includes(fg.label)}
            onChange={() => toggleConnecteur(fg.label)}
          />
        ))}
      </FilterSection>

      {/* LONGUEUR */}
      <FilterSection
        label="LONGUEUR"
        open={filterSections.longueur}
        onToggle={() => toggleSection("longueur")}
      >
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            className="w-full border border-gray-200 rounded px-2 py-1 text-xs"
          />
          <input
            type="number"
            placeholder="Max"
            className="w-full border border-gray-200 rounded px-2 py-1 text-xs"
          />
        </div>
      </FilterSection>

      {/* PRIX */}
      <FilterSection
        label="PRIX (€ HT)"
        open={filterSections.prix}
        onToggle={() => toggleSection("prix")}
      >
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            className="w-full border border-gray-200 rounded px-2 py-1 text-xs"
          />
          <input
            type="number"
            placeholder="Max"
            className="w-full border border-gray-200 rounded px-2 py-1 text-xs"
          />
        </div>
      </FilterSection>

      {/* Reset */}
      {activeFilterCount > 0 && (
        <button
          onClick={resetFilters}
          className="mt-2 text-xs text-[#C75B12] hover:underline font-medium"
        >
          Réinitialiser ({activeFilterCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* ── Breadcrumb ────────────────────────────────────────────────── */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
          <button onClick={onBack} className="hover:text-[#C75B12] transition-colors">
            Accueil
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-700 font-medium">{categoryLabel}</span>
        </nav>

        {/* ── Hero banner ───────────────────────────────────────────────── */}
        <div className="rounded-2xl overflow-hidden grid lg:grid-cols-2 mb-8 shadow-sm border border-gray-100">
          {/* Left: gradient + fiber SVG art + text */}
          <div
            className="relative px-8 py-10 lg:py-12 flex flex-col justify-center overflow-hidden"
            style={{ background: "linear-gradient(135deg, #ffffff 0%, #F0F0F2 55%, #E0E0E3 100%)" }}
          >
            {/* Fiber optic line decoration */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 520 300"
              preserveAspectRatio="xMidYMid slice"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M-40 230 C 60 200, 150 130, 290 110 C 380 96, 450 130, 560 90"
                stroke="white" strokeWidth="2.5" strokeOpacity="0.85"
              />
              <path
                d="M-40 255 C 80 220, 170 150, 310 128 C 400 112, 470 148, 570 110"
                stroke="white" strokeWidth="1.8" strokeOpacity="0.65"
              />
              <path
                d="M-40 278 C 100 242, 190 175, 330 150 C 420 132, 490 165, 580 132"
                stroke="white" strokeWidth="1.2" strokeOpacity="0.45"
              />
              {/* glow dots where fibers converge */}
              <circle cx="290" cy="110" r="3.5" fill="white" fillOpacity="0.7" />
              <circle cx="310" cy="128" r="2.5" fill="white" fillOpacity="0.55" />
              <circle cx="330" cy="150" r="2" fill="white" fillOpacity="0.4" />
              <circle cx="290" cy="110" r="7" fill="white" fillOpacity="0.15" />
            </svg>

            {/* Content */}
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#C75B12] mb-4">
                <span className="w-4 h-px bg-[#C75B12]" />
                {data.tag}
              </span>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-[#353A3F] leading-tight mb-4">
                {data.title}
              </h1>
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm">{data.description}</p>
            </div>
          </div>

          {/* Right: photo */}
          <div className="hidden lg:block relative h-64 lg:h-auto min-h-56">
            <img
              src={data.heroImage}
              alt={data.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* ── Sub-category grid 5 × 2 ──────────────────────────────────── */}
        <h2 className="text-xl font-bold text-[#353A3F] mb-4">Nos catégories</h2>
        <div className="mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {data.subcategories.map((sc) => (
              <button
                key={sc.slug + sc.label}
                onClick={() => onCategoryClick(sc.slug)}
                className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center hover:border-[#353A3F] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group relative"
              >
                <CatIcon k={sc.iconKey} />
                <p className="text-xs font-semibold text-[#353A3F] leading-snug mt-2 mb-5 whitespace-pre-line">
                  {sc.label}
                </p>
                <span className="absolute bottom-3 right-3">
                  <ChevronRight
                    className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#C75B12] transition-colors"
                    strokeWidth={2.5}
                  />
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Products section ─────────────────────────────────────────── */}
        <div>
          {/* Header — title on line 1, controls on line 2 */}
          <div className="mb-5">
            <h2 className="text-xl font-bold text-[#353A3F] whitespace-nowrap mb-2">
              Produits de la catégorie
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400 flex-shrink-0">
                {products.length}+ références
              </span>
              {/* Mobile filter toggle */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:border-[#353A3F] hover:text-[#353A3F] transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filtres
                {activeFilterCount > 0 && (
                  <span className="bg-[#C75B12] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
              {/* Sort */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-gray-500 hidden sm:inline">Trier par :</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-[#353A3F] bg-white"
                >
                  <option value="pertinence">Pertinence</option>
                  <option value="prix-asc">Prix croissant</option>
                  <option value="prix-desc">Prix décroissant</option>
                  <option value="nouveautes">Nouveautés</option>
                  <option value="avis">Mieux notés</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sidebar + grid */}
          <div className="flex gap-6 items-start">
            {/* Filter sidebar – desktop */}
            <aside className="hidden lg:block w-56 flex-shrink-0 bg-white border border-gray-100 rounded-xl p-4 sticky top-24">
              <FilterPanel />
            </aside>

            {/* Product grid */}
            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.slug}
                    product={product}
                    onProductClick={onProductClick}
                  />
                ))}
              </div>

              {/* Load more */}
              <div className="mt-8 text-center">
                <button className="inline-flex items-center gap-2 border border-gray-200 hover:border-[#353A3F] text-gray-600 hover:text-[#353A3F] text-sm font-semibold px-6 py-3 rounded-xl transition-colors">
                  Afficher plus de produits
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile filter drawer ─────────────────────────────────────── */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 w-80 max-w-full bg-white shadow-2xl flex flex-col">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h3 className="font-bold text-[#353A3F]">Filtres</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-4">
                <FilterPanel />
              </div>
              <div className="p-4 border-t border-gray-100">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full bg-[#353A3F] text-white font-semibold py-3 rounded-xl text-sm"
                >
                  Voir les résultats
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Bottom CTA ───────────────────────────────────────────────── */}
        <div className="mt-16 bg-[#F7F5F2] rounded-2xl px-6 lg:px-10 py-8 flex flex-col lg:flex-row items-center gap-6">
          <div className="w-14 h-14 bg-[#353A3F] rounded-xl flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-7 h-7 text-white" />
          </div>
          <div className="text-center lg:text-left flex-1">
            <h3 className="text-lg font-bold text-[#353A3F] mb-1">Un projet ou un besoin spécifique ?</h3>
            <p className="text-gray-500 text-sm">
              Notre équipe technique vous accompagne dans le choix de la solution adaptée à votre installation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button
              onClick={onContactClick}
              className="flex items-center gap-2 bg-[#C75B12] hover:bg-[#b04e0f] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
            >
              Demander un devis
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onCategoryClick("pro")}
              className="text-sm font-semibold text-[#353A3F] hover:text-[#C75B12] transition-colors whitespace-nowrap underline underline-offset-2"
            >
              Voir l'espace professionnel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
