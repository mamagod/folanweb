export type BadgeType = "nouveau" | "promo" | "bestseller" | "pro" | null;

export interface ProductVariant {
  label: string;
  price: number;
  originalPrice?: number;
}

export interface BulkPriceTier {
  minQuantity: number;
  discount: number;
  pricePerUnit?: number;
}

export interface ProductResource {
  title: string;
  type: "video" | "pdf" | "guide" | "faq";
  thumbnail?: string;
  duration?: string;
  url?: string;
}

export interface ProductGuide {
  installationSteps?: string[];
  resources?: ProductResource[];
  faq?: { question: string; answer: string }[];
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  breadcrumb: string[];
  description: string;
  benefits: string[];
  variants: ProductVariant[];
  inStock: boolean;
  badge: BadgeType;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  thumbnails: { url: string; alt: string }[];
  specs: { label: string; value: string }[];
  bulkPricing?: BulkPriceTier[];
  guide?: ProductGuide;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    slug: "cable-fibre-sc-apc-sc-upc-1m",
    name: "Câble Fibre SC/APC – SC/UPC Monomode",
    category: "Câbles Fibre pour Box",
    breadcrumb: ["Boutique", "Câbles Fibre Optique", "Câbles pour Box Fibre"],
    description:
      "Câble de raccordement fibre optique monomode G.657A2 en gaine plate ultra-flexible. Idéal pour relier votre prise optique murale à votre box internet.",
    benefits: [
      "Compatible avec toutes les box fibre françaises (Orange, Free, SFR, Bouygues) sans aucune configuration supplémentaire.",
      "La gaine plate ultra-flexible se glisse facilement sous les portes et le long des plinthes pour une installation propre et invisible.",
      "Fabriqué en fibre monomode G.657A2 pour des performances stables jusqu'à 10 Gbps sur 100 mètres.",
    ],
    variants: [
      { label: "1 m", price: 7.9 },
      { label: "2 m", price: 8.9 },
      { label: "3 m", price: 9.9, originalPrice: 12.9 },
      { label: "5 m", price: 11.9 },
      { label: "10 m", price: 15.9 },
      { label: "15 m", price: 19.9 },
      { label: "20 m", price: 22.9 },
    ],
    inStock: true,
    badge: "bestseller",
    rating: 4.8,
    reviewCount: 342,
    imageUrl:
      "https://images.unsplash.com/photo-1594915854088-2128db6a8db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    thumbnails: [
      {
        url: "https://images.unsplash.com/photo-1594915854088-2128db6a8db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=80",
        alt: "Vue principale",
      },
      {
        url: "https://images.unsplash.com/photo-1594915440248-1e419eba6611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=80",
        alt: "Connecteur SC/APC",
      },
      {
        url: "https://images.unsplash.com/photo-1624965439943-09e0238644e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=80",
        alt: "Détail gaine",
      },
    ],
    specs: [
      { label: "Type de fibre", value: "Monomode G.657A2" },
      { label: "Connecteur A", value: "SC/APC (vert)" },
      { label: "Connecteur B", value: "SC/UPC (bleu)" },
      { label: "Longueur d'onde", value: "1310 / 1550 nm" },
      { label: "Atténuation", value: "≤ 0,35 dB/km" },
      { label: "Diamètre gaine", value: "2 × 3 mm (plat)" },
      { label: "Rayon de courbure min.", value: "15 mm" },
      { label: "Certification", value: "CE, RoHS" },
    ],
    bulkPricing: [
      { minQuantity: 1, discount: 0 },
      { minQuantity: 5, discount: 5 },
      { minQuantity: 10, discount: 10 },
      { minQuantity: 20, discount: 15 },
      { minQuantity: 50, discount: 20 },
    ],
    guide: {
      installationSteps: [
        "Identifiez votre prise fibre murale (PTO) et votre box internet",
        "Branchez le connecteur SC/APC (vert) sur la prise murale",
        "Branchez le connecteur SC/UPC (bleu) sur votre box",
        "Vérifiez que le voyant fibre de votre box s'allume en vert ou bleu"
      ],
      resources: [
        {
          title: "Installation complète en vidéo",
          type: "video",
          duration: "4 min",
          thumbnail: "https://images.unsplash.com/photo-1612045194743-877419047a35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=80",
        },
        {
          title: "Manuel d'installation PDF",
          type: "pdf",
        },
        {
          title: "Bien choisir sa longueur de câble",
          type: "guide",
        },
      ],
      faq: [
        {
          question: "Quelle longueur de câble choisir ?",
          answer: "Mesurez la distance entre votre prise fibre murale et votre box, puis ajoutez 50 cm de marge pour éviter toute tension. Les câbles plats peuvent facilement passer sous les portes."
        },
        {
          question: "Mon câble est-il compatible avec ma box ?",
          answer: "Oui, tous nos câbles SC/APC – SC/UPC sont compatibles avec toutes les box fibre françaises (Orange, Free, SFR, Bouygues) sans aucune configuration."
        },
        {
          question: "Puis-je installer le câble moi-même ?",
          answer: "Absolument ! L'installation ne nécessite aucun outil ni compétence technique. Il suffit de brancher les deux connecteurs. En cas de doute, suivez notre guide vidéo."
        }
      ]
    },
  },
  {
    id: 2,
    slug: "cable-fibre-sc-apc-3m",
    name: "Câble Fibre SC/APC – SC/UPC 3 m — Le plus vendu",
    category: "Câbles Fibre pour Box",
    breadcrumb: ["Boutique", "Câbles Fibre Optique", "Câbles pour Box Fibre"],
    description:
      "Notre câble 3 m est la longueur idéale pour la majorité des installations domestiques. Format plat, pose rapide, compatibilité universelle.",
    benefits: [
      "La longueur de 3 m couvre la quasi-totalité des configurations d'installation fibre à domicile sans excès de câble.",
      "Le format plat 2 × 3 mm assure une discrétion maximale sur les murs et les plinthes sans vis ni perçage.",
      "Testé et certifié CE / RoHS, ce câble garantit une stabilité parfaite du signal sur l'ensemble de sa durée de vie.",
    ],
    variants: [
      { label: "3 m", price: 9.9, originalPrice: 12.9 },
      { label: "5 m", price: 11.9 },
    ],
    inStock: true,
    badge: "bestseller",
    rating: 4.9,
    reviewCount: 521,
    imageUrl:
      "https://images.unsplash.com/photo-1594915440248-1e419eba6611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    thumbnails: [
      {
        url: "https://images.unsplash.com/photo-1594915440248-1e419eba6611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=80",
        alt: "Vue principale",
      },
      {
        url: "https://images.unsplash.com/photo-1594915854088-2128db6a8db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=80",
        alt: "Connecteur SC/APC",
      },
    ],
    specs: [
      { label: "Type de fibre", value: "Monomode G.657A2" },
      { label: "Longueur", value: "3 m" },
      { label: "Connecteur A", value: "SC/APC (vert)" },
      { label: "Connecteur B", value: "SC/UPC (bleu)" },
      { label: "Atténuation", value: "≤ 0,35 dB/km" },
      { label: "Certification", value: "CE, RoHS" },
    ],
    bulkPricing: [
      { minQuantity: 1, discount: 0 },
      { minQuantity: 5, discount: 5 },
      { minQuantity: 10, discount: 10 },
      { minQuantity: 20, discount: 15 },
      { minQuantity: 50, discount: 20 },
    ],
    guide: {
      installationSteps: [
        "Repérez votre prise optique murale (PTO) et votre box internet",
        "Branchez le connecteur SC/APC (vert) sur la prise murale",
        "Branchez le connecteur SC/UPC (bleu) sur le port fibre de votre box",
        "Vérifiez que le voyant fibre de votre box s'allume en vert ou bleu fixe"
      ],
      resources: [
        {
          title: "Tutoriel installation câble 3 m",
          type: "video",
          duration: "3 min",
          thumbnail: "https://images.unsplash.com/photo-1612045194743-877419047a35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=80",
        },
        { title: "Guide de pose câble plat", type: "pdf" },
        { title: "Compatibilité box françaises", type: "guide" },
      ],
      faq: [
        {
          question: "Le câble 3 m convient-il à la plupart des logements ?",
          answer: "Oui, 3 m est la longueur idéale pour 80 % des installations domestiques françaises. Elle suffit pour relier la PTO à la box dans une même pièce avec une marge confortable."
        },
        {
          question: "Puis-je passer le câble plat sous une porte ?",
          answer: "Absolument. La gaine plate 2 × 3 mm est conçue pour glisser sous les portes et le long des plinthes sans perçage. Un rayon de courbure minimum de 15 mm est à respecter."
        },
        {
          question: "Le câble 3 m est-il compatible avec ma box SFR ?",
          answer: "Oui, comme toute notre gamme, ce câble est compatible avec toutes les box fibre françaises (Orange Livebox, Freebox, SFR Box, Bbox Bouygues) sans aucune configuration."
        }
      ]
    },
  },
  {
    id: 3,
    slug: "cable-fibre-sc-apc-5m",
    name: "Câble Fibre SC/APC – SC/UPC 5 m",
    category: "Câbles Fibre pour Box",
    breadcrumb: ["Boutique", "Câbles Fibre Optique", "Câbles pour Box Fibre"],
    description:
      "La longueur 5 m offre plus de liberté pour placer votre box à distance de la prise optique. Installation longue distance, zéro perte de débit.",
    benefits: [
      "Cinq mètres de longueur vous permettent de positionner votre box dans une pièce adjacente ou derrière un meuble, sans toucher à la prise murale.",
      "La fibre monomode garantit aucune dégradation du signal sur cette longueur, quel que soit votre abonnement (1 Gbps ou plus).",
      "Gaine plate résistante aux UV et aux chocs mécaniques, adaptée à une pose durable en intérieur comme en extérieur protégé.",
    ],
    variants: [
      { label: "5 m", price: 11.9 },
      { label: "10 m", price: 15.9 },
    ],
    inStock: true,
    badge: null,
    rating: 4.7,
    reviewCount: 287,
    imageUrl:
      "https://images.unsplash.com/photo-1624965439943-09e0238644e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    thumbnails: [
      {
        url: "https://images.unsplash.com/photo-1624965439943-09e0238644e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=80",
        alt: "Vue principale",
      },
    ],
    specs: [
      { label: "Type de fibre", value: "Monomode G.657A2" },
      { label: "Longueur", value: "5 m" },
      { label: "Connecteur A", value: "SC/APC (vert)" },
      { label: "Connecteur B", value: "SC/UPC (bleu)" },
      { label: "Certification", value: "CE, RoHS" },
    ],
    bulkPricing: [
      { minQuantity: 1, discount: 0 },
      { minQuantity: 5, discount: 5 },
      { minQuantity: 10, discount: 10 },
      { minQuantity: 20, discount: 15 },
      { minQuantity: 50, discount: 20 },
    ],
    guide: {
      installationSteps: [
        "Mesurez la distance entre la prise murale et votre box et vérifiez que 5 m suffit",
        "Passez le câble le long des plinthes ou sous un seuil de porte pour un rendu propre",
        "Branchez le SC/APC (vert) côté prise murale et le SC/UPC (bleu) côté box",
        "Contrôlez l'absence de courbures trop serrées (rayon min. 15 mm) avant de fixer le câble"
      ],
      resources: [
        {
          title: "Poser un câble plat sur 5 m — vidéo",
          type: "video",
          duration: "5 min",
          thumbnail: "https://images.unsplash.com/photo-1750711158632-5273ec9b9b86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=80",
        },
        { title: "Fiche technique câble 5 m (PDF)", type: "pdf" },
        { title: "Conseils de pose longue distance", type: "guide" },
      ],
      faq: [
        {
          question: "Y a-t-il une perte de débit sur 5 m ?",
          answer: "Non, la fibre monomode G.657A2 ne génère aucune perte mesurable sur 5 m. Votre débit reste identique à celui annoncé par votre opérateur, qu'il soit de 500 Mbps ou 8 Gbps."
        },
        {
          question: "Comment fixer le câble discrètement ?",
          answer: "Utilisez des clips adhésifs pour câble plat (vendus séparément) à coller le long des plinthes ou du cadre de porte. Le câble plat 2 × 3 mm est quasi invisible une fois posé."
        },
        {
          question: "Ce câble convient-il à un usage extérieur protégé ?",
          answer: "La gaine est résistante aux UV et aux chocs mécaniques légers. Elle convient pour un passage en véranda ou terrasse couverte, mais n'est pas homologuée pour une exposition directe aux intempéries."
        }
      ]
    },
  },
  {
    id: 4,
    slug: "cable-fibre-sc-apc-10m",
    name: "Câble Fibre SC/APC – SC/UPC 10 m",
    category: "Câbles Fibre pour Box",
    breadcrumb: ["Boutique", "Câbles Fibre Optique", "Câbles pour Box Fibre"],
    description:
      "Le câble 10 m est la solution idéale pour les installations sur plusieurs pièces ou les appartements de grande surface.",
    benefits: [
      "Dix mètres de câble plat pour relier votre box à une prise optique éloignée, sans jonction ni perte de signal intermédiaire.",
      "Compatible avec les installations industrielles légères et les bureaux à domicile nécessitant une grande flexibilité de câblage.",
      "Fibre G.657A2 certifiée, résistante aux courbures serrées, idéale pour les passages sous des plinthes ou des seuils de porte.",
    ],
    variants: [
      { label: "10 m", price: 15.9 },
      { label: "15 m", price: 19.9 },
      { label: "20 m", price: 22.9 },
    ],
    inStock: true,
    badge: null,
    rating: 4.8,
    reviewCount: 198,
    imageUrl:
      "https://images.unsplash.com/photo-1578016980868-197203ff4b02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    thumbnails: [
      {
        url: "https://images.unsplash.com/photo-1578016980868-197203ff4b02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=80",
        alt: "Vue principale",
      },
    ],
    specs: [
      { label: "Type de fibre", value: "Monomode G.657A2" },
      { label: "Longueur", value: "10 m" },
      { label: "Connecteur A", value: "SC/APC (vert)" },
      { label: "Connecteur B", value: "SC/UPC (bleu)" },
      { label: "Certification", value: "CE, RoHS" },
    ],
    bulkPricing: [
      { minQuantity: 1, discount: 0 },
      { minQuantity: 5, discount: 5 },
      { minQuantity: 10, discount: 10 },
      { minQuantity: 20, discount: 15 },
      { minQuantity: 50, discount: 20 },
    ],
    guide: {
      installationSteps: [
        "Planifiez le trajet du câble entre la PTO et votre box (pièces traversées, portes, couloir)",
        "Déroulez le câble sans le tordre ni créer de boucles serrées — rayon de courbure min. 15 mm",
        "Fixez le câble tous les 50 cm avec des clips adhésifs pour câble plat",
        "Branchez les connecteurs (SC/APC vert côté mural, SC/UPC bleu côté box) et vérifiez le voyant"
      ],
      resources: [
        {
          title: "Installation sur 10 m — tutoriel complet",
          type: "video",
          duration: "7 min",
          thumbnail: "https://images.unsplash.com/photo-1594915854088-2128db6a8db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=80",
        },
        { title: "Guide installation longue distance (PDF)", type: "pdf" },
        { title: "Choisir entre 10 m, 15 m et 20 m", type: "guide" },
      ],
      faq: [
        {
          question: "Puis-je passer le câble 10 m dans une goulotte ?",
          answer: "Oui, le câble plat 2 × 3 mm est parfaitement adapté aux goulottes standard. Choisissez une goulotte de largeur minimale 10 mm pour pouvoir passer le câble sans forcer."
        },
        {
          question: "Y a-t-il un risque de perte de signal sur 10 m ?",
          answer: "Aucun. La fibre monomode G.657A2 présente une atténuation inférieure à 0,35 dB/km. Sur 10 m, la perte est imperceptible et ne dégrade en rien votre connexion."
        },
        {
          question: "Puis-je commander des longueurs supérieures ?",
          answer: "Oui, nous proposons des câbles jusqu'à 20 m en stock et des longueurs sur mesure jusqu'à 100 m sur devis. Contactez notre service commercial pour les projets spécifiques."
        }
      ]
    },
  },
  {
    id: 5,
    slug: "module-sfp-10g",
    name: "Module SFP+ 10G Monomode LC",
    category: "Switches & Modules SFP",
    breadcrumb: ["Boutique", "Matériel & Équipements Réseau", "Switches & Modules SFP"],
    description:
      "Module transceiver SFP+ 10 Gigabit pour transmission longue distance sur fibre monomode. Compatible avec les principaux équipements réseau du marché.",
    benefits: [
      "Débits jusqu'à 10 Gbps sur 10 km en fibre monomode LC, idéal pour les infrastructures réseau exigeantes.",
      "Compatibilité universelle avec les switchs Cisco, Mikrotik, Ubiquiti, Netgear et la plupart des équipements standards du marché.",
      "Format SFP+ standard et chipset de qualité industrielle pour une fiabilité optimale en environnement 24/7.",
    ],
    variants: [{ label: "10 km", price: 29.9 }],
    inStock: true,
    badge: "pro",
    rating: 4.9,
    reviewCount: 156,
    imageUrl:
      "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    thumbnails: [
      {
        url: "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=80",
        alt: "Module SFP+",
      },
    ],
    specs: [
      { label: "Norme", value: "SFP+ 10GBASE-LR" },
      { label: "Connecteur", value: "LC Duplex" },
      { label: "Type de fibre", value: "Monomode (SMF)" },
      { label: "Distance max.", value: "10 km" },
      { label: "Longueur d'onde TX/RX", value: "1310 nm / 1310 nm" },
      { label: "Débit", value: "10,3125 Gbps" },
      { label: "Température", value: "0 °C à +70 °C" },
      { label: "Certification", value: "CE, RoHS" },
    ],
    bulkPricing: [
      { minQuantity: 1, discount: 0 },
      { minQuantity: 3, discount: 8 },
      { minQuantity: 5, discount: 12 },
      { minQuantity: 10, discount: 18 },
    ],
    guide: {
      installationSteps: [
        "Vérifiez que votre switch ou routeur dispose d'un slot SFP+ 10G disponible",
        "Retirez le cache anti-poussière du module et du port avant l'insertion",
        "Insérez le module SFP+ jusqu'au clic de verrouillage — ne forcez pas",
        "Connectez le câble LC duplex et attendez l'initialisation du lien (5 à 15 secondes)"
      ],
      resources: [
        {
          title: "Installer un module SFP+ sur un switch",
          type: "video",
          duration: "6 min",
          thumbnail: "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=80",
        },
        { title: "Liste de compatibilité switches (PDF)", type: "pdf" },
        { title: "Différences SFP vs SFP+ vs SFP28", type: "guide" },
      ],
      faq: [
        {
          question: "Ce module est-il compatible avec mon switch Cisco ?",
          answer: "Oui, notre module SFP+ 10GBASE-LR est compatible avec les principaux équipements Cisco, Mikrotik, Ubiquiti, Netgear, TP-Link et la grande majorité des switches standards. Consultez notre liste de compatibilité pour vérifier votre modèle exact."
        },
        {
          question: "Quelle fibre utiliser avec ce module ?",
          answer: "Ce module fonctionne exclusivement sur fibre monomode (SMF) avec connecteurs LC duplex. N'utilisez pas de fibre multimode, qui provoquerait une absence de lien ou des erreurs de transmission."
        },
        {
          question: "Le module supporte-t-il le DDM / DOM ?",
          answer: "Oui, ce module intègre la surveillance numérique (DDM/DOM), ce qui vous permet de monitorer en temps réel la température, la tension et la puissance optique TX/RX depuis l'interface de votre switch."
        }
      ]
    },
  },
  {
    id: 6,
    slug: "kit-nettoyage-pro",
    name: "Kit de Nettoyage Fibre Optique Pro",
    category: "Kits de Nettoyage",
    breadcrumb: ["Boutique", "Outils & Accessoires", "Kits de nettoyage fibre"],
    description:
      "Kit complet de nettoyage pour connecteurs fibre optique. Indispensable pour maintenir des performances optimales et éviter les pertes d'insertion liées à la contamination.",
    benefits: [
      "Le kit comprend 50 cassettes de nettoyage à usage unique et un stylo de nettoyage pour les deux types de connecteurs les plus courants (LC et SC).",
      "Chaque cassette élimine plus de 99 % des contaminants (huile, poussière, eau) sans laisser de résidu ni rayer la fibre.",
      "Format compact et transportable, idéal pour les techniciens en déplacement ou les interventions sur site chez les particuliers.",
    ],
    variants: [
      { label: "Kit 50 cassettes", price: 12.9 },
      { label: "Kit 100 cassettes", price: 22.9, originalPrice: 28.9 },
    ],
    inStock: true,
    badge: "nouveau",
    rating: 4.6,
    reviewCount: 234,
    imageUrl:
      "https://images.unsplash.com/photo-1770656505795-350f37352c7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    thumbnails: [
      {
        url: "https://images.unsplash.com/photo-1770656505795-350f37352c7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=80",
        alt: "Kit nettoyage",
      },
    ],
    specs: [
      { label: "Contenu", value: "50 cassettes + 1 stylo" },
      { label: "Compatible connecteurs", value: "SC, LC, FC, ST" },
      { label: "Efficacité nettoyage", value: "> 99 % contaminants" },
      { label: "Résidu", value: "Zéro résidu" },
      { label: "Certification", value: "IEC 61300-3-35" },
    ],
    bulkPricing: [
      { minQuantity: 1, discount: 0 },
      { minQuantity: 3, discount: 10 },
      { minQuantity: 5, discount: 15 },
      { minQuantity: 10, discount: 25 },
    ],
    guide: {
      installationSteps: [
        "Retirez le cache anti-poussière du connecteur à nettoyer",
        "Insérez le stylo de nettoyage dans le connecteur et appuyez une fois fermement",
        "Pour les cassettes, passez la fibre sur la surface nettoyante en un seul mouvement",
        "Replacez immédiatement le cache anti-poussière après nettoyage pour éviter toute recontamination"
      ],
      resources: [
        {
          title: "Technique de nettoyage connecteur SC/LC",
          type: "video",
          duration: "3 min",
          thumbnail: "https://images.unsplash.com/photo-1770656505795-350f37352c7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=80",
        },
        { title: "Procédure de nettoyage IEC 61300-3-35 (PDF)", type: "pdf" },
        { title: "Quand et pourquoi nettoyer ses connecteurs ?", type: "guide" },
      ],
      faq: [
        {
          question: "À quelle fréquence faut-il nettoyer les connecteurs ?",
          answer: "Nettoyez systématiquement avant chaque branchement et après chaque déconnexion. Un connecteur non nettoyé peut provoquer jusqu'à 1 dB de perte supplémentaire, soit une dégradation visible du débit sur les liens 10G."
        },
        {
          question: "Peut-on réutiliser les cassettes de nettoyage ?",
          answer: "Non, chaque cassette est à usage unique pour garantir l'efficacité du nettoyage. Une cassette réutilisée risque de redistribuer les contaminants plutôt que de les éliminer."
        },
        {
          question: "Le kit est-il compatible avec les connecteurs LC ?",
          answer: "Oui, le kit comprend des accessoires pour les connecteurs SC et LC (les plus courants), ainsi que FC et ST. Le stylo de nettoyage s'adapte à chaque format grâce à ses embouts interchangeables."
        }
      ]
    },
  },
];
