export interface Catalogue {
  id: string;
  slug: string;
  title: string;
  type: "Catalogues" | "Brochures";
  theme: "Fibre optique" | "Réseaux" | "Outils" | "Énergie" | "Solutions";
  description: string;
  fileSize: string;
  edition: string;
  lang: string;
  image: string;
  badge?: "Nouveau" | "Mise à jour 2026";
  featured?: boolean;
}

export const CATALOGUES: Catalogue[] = [
  {
    id: "0",
    slug: "catalogue-general",
    title: "Catalogue général FOLAN",
    type: "Catalogues",
    theme: "Fibre optique",
    description:
      "Retrouvez l'ensemble de nos solutions fibre optique, réseau, outils et accessoires.",
    fileSize: "256 Mo",
    edition: "Édition 2026",
    lang: "FR",
    image: "/src/imports/image-21.png",
    featured: true,
  },
  {
    id: "1",
    slug: "catalogue-connectivite-optique",
    title: "Catalogue Connectivité optique",
    type: "Catalogues",
    theme: "Fibre optique",
    description: "Cordons, câbles, connecteurs et solutions de connectivité fibre optique.",
    fileSize: "68 Mo",
    edition: "Édition 2026",
    lang: "FR",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80",
    badge: "Nouveau",
  },
  {
    id: "2",
    slug: "catalogue-materiel-reseau",
    title: "Catalogue Matériel & équipements réseau",
    type: "Catalogues",
    theme: "Réseaux",
    description: "Switches, modules SFP, baies, racks et équipements réseau.",
    fileSize: "97 Mo",
    edition: "Édition 2026",
    lang: "FR",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    badge: "Mise à jour 2026",
  },
  {
    id: "3",
    slug: "catalogue-cable-wireless",
    title: "Catalogue Cable & Wireless",
    type: "Catalogues",
    theme: "Réseaux",
    description: "Solutions câblées et sans fil pour infrastructures télécom.",
    fileSize: "72 Mo",
    edition: "Édition 2026",
    lang: "FR",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
    badge: "Nouveau",
  },
  {
    id: "4",
    slug: "catalogue-outils-accessoires",
    title: "Catalogue Outils & accessoires",
    type: "Catalogues",
    theme: "Outils",
    description: "Outillage d'installation, kits de nettoyage et accessoires fibre.",
    fileSize: "85 Mo",
    edition: "Édition 2026",
    lang: "FR",
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600&q=80",
  },
  {
    id: "5",
    slug: "catalogue-nouvelle-energie",
    title: "Catalogue Nouvelle énergie",
    type: "Catalogues",
    theme: "Énergie",
    description: "Bornes de recharge, solutions photovoltaïques et mobilité électrique.",
    fileSize: "64 Mo",
    edition: "Édition 2026",
    lang: "FR",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
    badge: "Nouveau",
  },
  {
    id: "6",
    slug: "brochure-solutions-pro",
    title: "Brochure Solutions professionnelles",
    type: "Brochures",
    theme: "Solutions",
    description: "Présentation de nos offres sur mesure pour les professionnels et intégrateurs.",
    fileSize: "24 Mo",
    edition: "Édition 2026",
    lang: "FR",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
  },
];
