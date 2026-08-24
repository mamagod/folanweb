import { ArrowRight, CheckCircle2, Wrench, Building2, Store } from "lucide-react";

/* ── Images ── */
const IMG_TECH =
  "https://images.unsplash.com/photo-1597502310092-31cdaa35b46d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxmaWJlciUyMG9wdGljJTIwdGVjaG5pY2lhbiUyMHRlbGVjb20lMjBpbnN0YWxsYXRpb24lMjB3b3JrfGVufDF8fHx8MTc4NTM1NDUzM3ww&ixlib=rb-4.1.0&q=80&w=800";

const IMG_RACK =
  "https://images.unsplash.com/photo-1683322499436-f4383dd59f5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjByYWNrJTIwbmV0d29yayUyMGRhdGElMjBjZW50ZXIlMjBpbmZyYXN0cnVjdHVyZSUyMGJsdWV8ZW58MXx8fHwxNzg1MzU0NTM0fDA&ixlib=rb-4.1.0&q=80&w=800";

const IMG_PARTNER =
  "https://images.unsplash.com/photo-1549923746-c502d488b3ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzaGFrZSUyMHBhcnRuZXJzaGlwJTIwcHJvZmVzc2lvbmFsJTIwbWVldGluZ3xlbnwxfHx8fDE3ODUzNTQ1Mzd8MA&ixlib=rb-4.1.0&q=80&w=800";

/* ── Data ── */
const PERKS = [
  "Commandes en volume",
  "Support technique dédié",
  "Solutions personnalisées",
];

const AUDIENCE_CARDS = [
  {
    id: 1,
    icon: Wrench,
    title: "Installateurs télécom",
    desc: "Produits et accessoires pour vos chantiers fibre.",
    img: IMG_TECH,
    cta: "Voir les produits",
  },
  {
    id: 2,
    icon: Building2,
    title: "Entreprises & intégrateurs",
    desc: "Équipements pour vos infrastructures réseau.",
    img: IMG_RACK,
    cta: "Découvrir les solutions",
  },
  {
    id: 3,
    icon: Store,
    title: "Distributeurs",
    desc: "Solutions adaptées à vos besoins commerciaux.",
    img: IMG_PARTNER,
    cta: "Devenir partenaire",
  },
];

interface Props {
  onContactClick?: () => void;
}

export function ProfessionalSolutionsSection({ onContactClick }: Props) {
  return (
    null
  );
}
