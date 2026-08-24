const categories = [
  {
    id: 1,
    slug: "cables-fibre-box",
    name: "Câbles Fibre pour Box",
    subtitle: "Freebox, Livebox, SFR Box…",
    image: "https://images.unsplash.com/photo-1693314184947-af516631ff1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
  },
  {
    id: 2,
    slug: "cables-fibre-pro",
    name: "Câbles Fibre Professionnels",
    subtitle: "Câbles d'infrastructure & enrouleurs",
    image: "https://images.unsplash.com/photo-1758965364875-e090e5423d2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
  },
  {
    id: 3,
    slug: "accessoires-box-installation",
    name: "Accessoires Box & Installation",
    subtitle: "Prises murales, boîtiers, fixations",
    image: "https://images.unsplash.com/photo-1599709173342-d754b32df17d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
  },
  {
    id: 4,
    slug: "reseau-cuivre-connectiques",
    name: "Réseau Cuivre & Connectiques",
    subtitle: "RJ45, HDMI, câbles cuivre",
    image: "https://images.unsplash.com/photo-1578016980868-197203ff4b02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
  },
  {
    id: 5,
    slug: "baies-racks-coffrets",
    name: "Baies, Racks & Coffrets",
    subtitle: "Armoires réseau & distribution",
    image: "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
  },
  {
    id: 6,
    slug: "outillage-protection",
    name: "Outillage & Protection",
    subtitle: "Dénudeurs, pinces, testeurs",
    image: "https://images.unsplash.com/photo-1770656505795-350f37352c7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
  },
];

interface Props {
  onCategoryClick?: (slug: string) => void;
}

export function ProductCategoriesGrid({ onCategoryClick }: Props) {
  return (
    null
  );
}
