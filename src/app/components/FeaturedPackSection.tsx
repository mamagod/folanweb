import { ArrowRight, CheckCircle2 } from "lucide-react";

const IMG_MAIN =
  "https://images.unsplash.com/photo-1606814540563-5c02d62fd409?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxmaWJlciUyMG9wdGljJTIwYnVuZGxlJTIwY2FibGUlMjBzZXQlMjB0ZWNobm9sb2d5JTIwYmx1ZSUyMGxpZ2h0fGVufDF8fHx8MTc4NTM1MzM3OXww&ixlib=rb-4.1.0&q=80&w=1200";

const IMG_CABLES =
  "https://images.unsplash.com/photo-1517373116369-9bdb8cdc9f62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxuZXR3b3JrJTIwY2FibGVzJTIwY29ubmVjdG9ycyUyMGV0aGVybmV0JTIwcGF0Y2glMjBwYW5lbCUyMG9yZ2FuaXplZHxlbnwxfHx8fDE3ODUzNTMzNzh8MA&ixlib=rb-4.1.0&q=80&w=600";

const IMG_CONNECTOR =
  "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwY2FibGVzJTIwY29ubmVjdG9ycyUyMGV0aGVybmV0JTIwcGF0Y2glMjBwYW5lbCUyMG9yZ2FuaXplZHxlbnwxfHx8fDE3ODUzNTMzNzh8MA&ixlib=rb-4.1.0&q=80&w=600";

const PERKS = [
  "Câbles fibre compatibles",
  "Accessoires inclus",
  "Installation facile",
];

const PACK_ITEMS = [
  { label: "Câble SC/APC", sub: "2 m inclus" },
  { label: "Cordon fibre", sub: "SC/UPC" },
  { label: "Accessoires", sub: "Kit complet" },
];

interface Props {
  onPackClick?: () => void;
}

export function FeaturedPackSection({ onPackClick }: Props) {
  return (
    null
  );
}
