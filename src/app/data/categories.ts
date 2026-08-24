export interface CategoryMeta {
  id: number;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  productCount: number;
  breadcrumb: string[];
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 1,
    slug: "cables-fibre-box",
    name: "Câbles Fibre pour Box",
    subtitle: "Freebox, Livebox, SFR Box, Bbox…",
    description: "Tous nos câbles de raccordement fibre optique compatibles avec les box des opérateurs français. Format plat, gaine discrète et connecteurs SC/APC – SC/UPC prêts à l'emploi.",
    image: "https://images.unsplash.com/photo-1606814540563-5c02d62fd409?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
    productCount: 24,
    breadcrumb: ["Boutique", "Câbles Fibre pour Box"],
  },
  {
    id: 2,
    slug: "cables-fibre-pro",
    name: "Câbles Fibre Professionnels",
    subtitle: "Câbles d'infrastructure & enrouleurs industriels",
    description: "Câbles fibre optique pour installations professionnelles et réseaux d'entreprise. Grandes longueurs, gaines armées, formats MTP/MPO et LC disponibles.",
    image: "https://images.unsplash.com/photo-1682559736721-c2e77ff4c650?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
    productCount: 18,
    breadcrumb: ["Boutique", "Câbles Fibre Professionnels"],
  },
  {
    id: 3,
    slug: "accessoires-box-installation",
    name: "Accessoires Box & Installation",
    subtitle: "Prises murales, boîtiers, fixations & supports",
    description: "Tout le petit matériel nécessaire pour soigner votre installation fibre : prises optiques murales, boîtiers de raccordement, goulottes et systèmes de fixation discrets.",
    image: "https://images.unsplash.com/photo-1612257911111-074bd8388f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
    productCount: 31,
    breadcrumb: ["Boutique", "Accessoires Box & Installation"],
  },
  {
    id: 4,
    slug: "reseau-cuivre-connectiques",
    name: "Réseau Cuivre & Connectiques",
    subtitle: "RJ45, HDMI, câbles cuivre Cat6/Cat7",
    description: "Câbles Ethernet RJ45 blindés, cordons HDMI haut débit, connecteurs et adaptateurs cuivre pour compléter votre réseau domestique ou professionnel.",
    image: "https://images.unsplash.com/photo-1574405345169-f45c7d66480e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
    productCount: 27,
    breadcrumb: ["Boutique", "Réseau Cuivre & Connectiques"],
  },
  {
    id: 5,
    slug: "baies-racks-coffrets",
    name: "Baies, Racks & Coffrets",
    subtitle: "Armoires réseau murales & coffrets de distribution",
    description: "Baies réseau murales 6U à 19U, coffrets de brassage et armoires techniques pour organiser et sécuriser vos équipements réseau à domicile ou en entreprise.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
    productCount: 14,
    breadcrumb: ["Boutique", "Baies, Racks & Coffrets"],
  },
  {
    id: 6,
    slug: "outillage-protection",
    name: "Outillage & Protection",
    subtitle: "Dénudeurs, pinces de sertissage, testeurs",
    description: "Outils professionnels pour l'installation et la maintenance fibre optique : dénudeurs de précision, cliveurs, kits de nettoyage, testeurs de signal et protections de câbles.",
    image: "https://images.unsplash.com/photo-1729549223893-b340db51e577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
    productCount: 22,
    breadcrumb: ["Boutique", "Outillage & Protection"],
  },
];

export const CATEGORY_PRODUCTS: Record<string, string[]> = {
  "cables-fibre-box": [
    "cable-fibre-sc-apc-sc-upc-1m",
    "cable-fibre-sc-apc-3m",
    "cable-fibre-sc-apc-5m",
    "cable-fibre-sc-apc-10m",
  ],
  "cables-fibre-pro": ["cable-fibre-sc-apc-10m", "module-sfp-10g"],
  "accessoires-box-installation": ["kit-nettoyage-pro", "cable-fibre-sc-apc-sc-upc-1m"],
  "reseau-cuivre-connectiques": ["cable-fibre-sc-apc-sc-upc-1m", "cable-fibre-sc-apc-3m"],
  "baies-racks-coffrets": ["module-sfp-10g", "cable-fibre-sc-apc-10m"],
  "outillage-protection": ["kit-nettoyage-pro", "module-sfp-10g"],
};

export interface MockProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  badge: "nouveau" | "promo" | "bestseller" | "pro" | null;
  rating: number;
  reviewCount: number;
  image: string;
}

const EXTRA: Record<string, MockProduct[]> = {
  "cables-fibre-box": [
    { id: "m1", name: "Câble Fibre SC/APC – LC/UPC 2 m", category: "Câbles Fibre pour Box", price: 8.5, inStock: true, badge: null, rating: 4.6, reviewCount: 73, image: "https://images.unsplash.com/photo-1624965439943-09e0238644e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80" },
    { id: "m2", name: "Câble Fibre Blindé SC/APC 5 m", category: "Câbles Fibre pour Box", price: 14.9, originalPrice: 18.9, inStock: true, badge: "promo", rating: 4.8, reviewCount: 41, image: "https://images.unsplash.com/photo-1594915854088-2128db6a8db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80" },
    { id: "m3", name: "Câble Fibre Plat Blanc SC/APC 3 m", category: "Câbles Fibre pour Box", price: 9.9, inStock: false, badge: null, rating: 4.5, reviewCount: 29, image: "https://images.unsplash.com/photo-1594915440248-1e419eba6611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80" },
    { id: "m4", name: "Câble Fibre Monomode LC/UPC – LC/UPC 1 m", category: "Câbles Fibre pour Box", price: 6.9, inStock: true, badge: "nouveau", rating: 4.7, reviewCount: 15, image: "https://images.unsplash.com/photo-1578016980868-197203ff4b02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80" },
  ],
  "cables-fibre-pro": [
    { id: "m5", name: "Câble Fibre MTP/MPO 12 fibres – 3 m", category: "Câbles Fibre Professionnels", price: 49.9, inStock: true, badge: "pro", rating: 4.9, reviewCount: 33, image: "https://images.unsplash.com/photo-1758965364875-e090e5423d2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80" },
    { id: "m6", name: "Enrouleur Câble Fibre 500 m G.652D", category: "Câbles Fibre Professionnels", price: 189.0, inStock: true, badge: null, rating: 4.7, reviewCount: 18, image: "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80" },
    { id: "m7", name: "Câble Fibre Extérieur Armé ADSS 100 m", category: "Câbles Fibre Professionnels", price: 119.0, originalPrice: 149.0, inStock: true, badge: "promo", rating: 4.8, reviewCount: 22, image: "https://images.unsplash.com/photo-1624965439943-09e0238644e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80" },
    { id: "m8", name: "Pigtail Fibre SC/APC Monomode – x10", category: "Câbles Fibre Professionnels", price: 12.9, inStock: true, badge: null, rating: 4.6, reviewCount: 61, image: "https://images.unsplash.com/photo-1594915854088-2128db6a8db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80" },
  ],
  "accessoires-box-installation": [
    { id: "m9", name: "Prise Optique Murale SC/APC Encastrable", category: "Accessoires Box", price: 7.5, inStock: true, badge: null, rating: 4.5, reviewCount: 88, image: "https://images.unsplash.com/photo-1599709173342-d754b32df17d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80" },
    { id: "m10", name: "Boîtier de Raccordement Fibre 4 SC/APC", category: "Accessoires Box", price: 18.9, inStock: true, badge: "nouveau", rating: 4.7, reviewCount: 34, image: "https://images.unsplash.com/photo-1612045194743-877419047a35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80" },
    { id: "m11", name: "Goulotte Câble Plat – lot de 5 m", category: "Accessoires Box", price: 11.9, inStock: true, badge: null, rating: 4.4, reviewCount: 52, image: "https://images.unsplash.com/photo-1578016980868-197203ff4b02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80" },
    { id: "m12", name: "Support Mural Fixation Box Opérateur", category: "Accessoires Box", price: 5.9, inStock: false, badge: null, rating: 4.3, reviewCount: 27, image: "https://images.unsplash.com/photo-1599709173342-d754b32df17d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80" },
  ],
  "reseau-cuivre-connectiques": [
    { id: "m13", name: "Câble RJ45 Cat6 FTP – 3 m", category: "Réseau Cuivre", price: 6.9, inStock: true, badge: null, rating: 4.6, reviewCount: 142, image: "https://images.unsplash.com/photo-1578016980868-197203ff4b02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80" },
    { id: "m14", name: "Câble HDMI 2.1 8K – 2 m", category: "Réseau Cuivre", price: 14.9, inStock: true, badge: "bestseller", rating: 4.8, reviewCount: 97, image: "https://images.unsplash.com/photo-1594915440248-1e419eba6611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80" },
    { id: "m15", name: "Connecteur RJ45 Cat6 – boîte de 50", category: "Réseau Cuivre", price: 9.9, inStock: true, badge: null, rating: 4.5, reviewCount: 66, image: "https://images.unsplash.com/photo-1624965439943-09e0238644e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80" },
    { id: "m16", name: "Switch Réseau 5 ports Gigabit non géré", category: "Réseau Cuivre", price: 24.9, originalPrice: 32.9, inStock: true, badge: "promo", rating: 4.7, reviewCount: 83, image: "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80" },
  ],
  "baies-racks-coffrets": [
    { id: "m17", name: "Baie Réseau Murale 6U – Fond Plein", category: "Baies & Racks", price: 69.0, inStock: true, badge: null, rating: 4.6, reviewCount: 44, image: "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80" },
    { id: "m18", name: "Coffret de Brassage 12 ports LC Duplex", category: "Baies & Racks", price: 54.9, originalPrice: 69.9, inStock: true, badge: "promo", rating: 4.8, reviewCount: 31, image: "https://images.unsplash.com/photo-1702478475268-aa8ef54c084e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80" },
    { id: "m19", name: "Etagère 1U pour Baie Réseau", category: "Baies & Racks", price: 22.9, inStock: true, badge: null, rating: 4.4, reviewCount: 19, image: "https://images.unsplash.com/photo-1702478475268-aa8ef54c084e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80" },
    { id: "m20", name: "Panneau de Brassage 24 ports RJ45 Cat6", category: "Baies & Racks", price: 39.9, inStock: false, badge: null, rating: 4.7, reviewCount: 56, image: "https://images.unsplash.com/photo-1667264501379-c1537934c7ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80" },
  ],
  "outillage-protection": [
    { id: "m21", name: "Dénudeur de Précision Fibre Optique", category: "Outillage", price: 28.9, inStock: true, badge: "bestseller", rating: 4.9, reviewCount: 107, image: "https://images.unsplash.com/photo-1770656505795-350f37352c7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80" },
    { id: "m22", name: "Testeur de Signal Fibre Optique VFL", category: "Outillage", price: 19.9, inStock: true, badge: null, rating: 4.7, reviewCount: 78, image: "https://images.unsplash.com/photo-1770656505795-350f37352c7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80" },
    { id: "m23", name: "Manchons de Soudure Thermique – x100", category: "Outillage", price: 11.5, originalPrice: 15.0, inStock: true, badge: "promo", rating: 4.5, reviewCount: 39, image: "https://images.unsplash.com/photo-1594915854088-2128db6a8db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80" },
    { id: "m24", name: "Gaine Thermo-Rétractable Ø6 mm – 5 m", category: "Outillage", price: 6.9, inStock: true, badge: null, rating: 4.3, reviewCount: 22, image: "https://images.unsplash.com/photo-1624965439943-09e0238644e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80" },
  ],
};

export function getExtraProducts(slug: string): MockProduct[] {
  return EXTRA[slug] ?? [];
}
