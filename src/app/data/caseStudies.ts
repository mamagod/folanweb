export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  client: string;
  sector: string;
  location: string;
  countryCode: string;
  year: number;
  image: string;
  featured: boolean;
  tags: string[];
  challenge: string;
  solution: string;
  solutionDetails: string[];
  results: { label: string; value: string; unit?: string }[];
  productsUsed: string[];
  quote?: { text: string; author: string; role: string };
  relatedSlugs?: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "1",
    slug: "datacenter-tier3-lyon",
    title: "Migration zéro interruption d'un datacenter bancaire Tier III",
    subtitle: "Haute densité MPO/MTP et continuité de service",
    client: "Groupe bancaire européen (anonymisé)",
    sector: "Finance & Datacenter",
    location: "Lyon, France",
    countryCode: "FR",
    year: 2023,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=80",
    featured: true,
    tags: ["MPO/MTP", "Haute densité", "Migration", "Datacenter"],
    challenge:
      "Un grand groupe bancaire devait migrer son datacenter Tier III de Lyon vers une nouvelle infrastructure 400G sans aucune interruption de service. Le projet imposait une densité extrême — plus de 8 000 connexions fibre — dans un espace rack limité, avec des délais serrés et des exigences de traçabilité totale.",
    solution:
      "FOLAN a conçu et fabriqué sur mesure une solution MPO/MTP haute densité en mode OS2, intégrée dans des baies précâblées et pré-testées en atelier à Rillieux-la-Pape. La livraison s'est effectuée en séquences hebdomadaires pour permettre une bascule progressive.",
    solutionDetails: [
      "Conception sur mesure de 640 cassettes MPO/MTP 12 fibres en OS2",
      "Précâblage et tests d'insertion en atelier (IL < 0,35 dB/connexion)",
      "Baies 42U intégrées clé en main avec étiquetage et documentation complète",
      "Coordination des livraisons en 8 phases sur 4 mois",
      "Support technique on-site lors de chaque bascule nocturne",
    ],
    results: [
      { label: "Connexions déployées", value: "8 400", unit: "" },
      { label: "Temps d'arrêt", value: "0", unit: "min" },
      { label: "Délai de livraison", value: "4", unit: "mois" },
    ],
    productsUsed: [
      "Cassettes MPO/MTP OS2",
      "Baies optiques 1U haute densité",
      "Cordons LC/LC OS2",
      "Modules de jonction MPO",
    ],
    quote: {
      text: "La rigueur de FOLAN sur les tests en amont et la souplesse de leur planning nous ont permis de tenir nos engagements contractuels sans aucun incident. Un partenaire de confiance.",
      author: "Directeur Infrastructure",
      role: "Groupe bancaire, Lyon",
    },
    relatedSlugs: ["campus-universitaire-francfort", "operateur-ftth-uk"],
  },
  {
    id: "2",
    slug: "reseau-hospitalier-idf",
    title: "Infrastructure optique pour réseau hospitalier régional",
    subtitle: "Fiabilité critique pour l'imagerie médicale et les dossiers patients",
    client: "GHT Île-de-France Nord (anonymisé)",
    sector: "Santé",
    location: "Île-de-France, France",
    countryCode: "FR",
    year: 2023,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1400&q=80",
    featured: false,
    tags: ["Santé", "Sur mesure", "Redondance", "LSZH"],
    challenge:
      "Un groupement hospitalier de territoire devait relier 7 établissements avec une infrastructure fibre redondante, capables de transporter simultanément l'imagerie DICOM, la VoIP et les flux de supervision. Les locaux techniques imposaient des câbles LSZH à faible émission de fumée, et la criticité médicale exigeait des délais de réparation inférieurs à 30 minutes.",
    solution:
      "FOLAN a fourni une connectique personnalisée avec des longueurs exactes pour chaque lien inter-bâtiment, des tiroirs optiques étiquetés par flux, et une documentation as-built complète. Un stock de pièces de rechange a été pré-positionné dans chaque site.",
    solutionDetails: [
      "Câbles optiques monomode LSZH mesurés au mètre près pour 7 sites",
      "Tiroirs optiques 1U codés couleur par flux (imagerie / réseau / sécurité)",
      "Documentation as-built remise sous 48h après installation",
      "Stock de secours pré-positionné dans chaque local technique",
      "Formation du personnel technique interne",
    ],
    results: [
      { label: "Sites interconnectés", value: "7", unit: "" },
      { label: "MTTR cible", value: "< 30", unit: "min" },
      { label: "Disponibilité réseau", value: "99,99", unit: "%" },
    ],
    productsUsed: [
      "Câbles OS2 LSZH sur mesure",
      "Tiroirs optiques codés couleur",
      "Connecteurs SC/APC",
      "Kits de fusion terrain",
    ],
    quote: {
      text: "Les longueurs sur mesure et la documentation fournie ont divisé par trois notre temps d'intervention lors des maintenances préventives.",
      author: "Responsable DSI",
      role: "GHT Île-de-France Nord",
    },
    relatedSlugs: ["datacenter-tier3-lyon", "port-autonome-marseille"],
  },
  {
    id: "3",
    slug: "operateur-ftth-uk",
    title: "Intégration de 2 500 baies pour un déploiement FTTH national",
    subtitle: "Production grande série et logistique just-in-time",
    client: "Opérateur télécoms alternatif (anonymisé)",
    sector: "Télécom",
    location: "Southend-on-Sea, Royaume-Uni",
    countryCode: "GB",
    year: 2022,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80",
    featured: true,
    tags: ["FTTH", "Grande série", "Intégration de baies", "Royaume-Uni"],
    challenge:
      "Un opérateur alternatif engagé dans un déploiement FTTH couvrant 800 000 prises devait recevoir des baies de distribution optique pré-intégrées en flux tendu, avec une cohérence de configuration garantie sur l'ensemble des lots. Toute erreur de câblage ou de référence entraînait des pénalités contractuelles importantes.",
    solution:
      "L'atelier de Southend-on-Sea a déployé une chaîne d'assemblage dédiée avec contrôle qualité automatisé par scan. Chaque baie était testée, étiquetée et emballée individuellement avant expédition, avec un bordereau de conformité horodaté.",
    solutionDetails: [
      "Assemblage et test de 2 500 baies ODU en 18 mois",
      "Contrôle qualité 100% par scan code-barres et test OTDR automatisé",
      "Emballage individuel avec rapport de test inclus",
      "Livraisons hebdomadaires en flux tendu selon le planning de déploiement terrain",
      "Gestion d'un référentiel de 14 variantes de configuration",
    ],
    results: [
      { label: "Baies livrées", value: "2 500", unit: "" },
      { label: "Taux de non-conformité", value: "0,02", unit: "%" },
      { label: "Délai de production", value: "18", unit: "mois" },
    ],
    productsUsed: [
      "Baies ODU 19\" 2U",
      "Connecteurs SC/APC FTTH",
      "Cordons de brassage OM4",
      "Splitters optiques 1×8 et 1×16",
    ],
    quote: {
      text: "The consistency across 2,500 racks was remarkable. FOLAN's quality process gave us the confidence to accelerate our rollout without additional on-site checks.",
      author: "Head of Network Deployment",
      role: "Telecom operator, UK",
    },
    relatedSlugs: ["datacenter-tier3-lyon", "campus-universitaire-francfort"],
  },
  {
    id: "4",
    slug: "campus-universitaire-francfort",
    title: "Modernisation du réseau optique d'un campus universitaire",
    subtitle: "40 km de fibre monomode pour 12 bâtiments interconnectés",
    client: "Université technique de Francfort-sur-le-Main (anonymisé)",
    sector: "Enseignement supérieur",
    location: "Francfort, Allemagne",
    countryCode: "DE",
    year: 2024,
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=1400&q=80",
    featured: false,
    tags: ["Campus", "Monomode", "Allemagne", "Infrastructure"],
    challenge:
      "Le réseau cuivre vieillissant d'un grand campus universitaire ne supportait plus les usages multimédia et le Wi-Fi 6 généralisé. La DSI devait moderniser l'infrastructure portante sur 40 km de liaisons inter-bâtiments tout en maintenant les cours et les services numériques en continu, avec un budget maîtrisé.",
    solution:
      "FOLAN Allemagne a coordonné la fourniture de câbles OS2 armés pour les cheminements enterrés, de jarretières LC/LC pour les répartiteurs, et d'une documentation réseau complète. La livraison a été séquencée bâtiment par bâtiment pour ne jamais interrompre les activités pédagogiques.",
    solutionDetails: [
      "40 km de câbles OS2 armés pour cheminements enterrés et en gaine",
      "1 200 jarretières LC/LC duplex OS2 mesurées sur plan",
      "12 répartiteurs optiques muraux pré-câblés et testés",
      "Phasage sur 3 semestres universitaires pour zéro interruption",
      "Livraison de la DOE (Documentation des Ouvrages Exécutés) complète",
    ],
    results: [
      { label: "Bâtiments connectés", value: "12", unit: "" },
      { label: "Débit inter-campus", value: "× 40", unit: "" },
      { label: "Économie vs cuivre", value: "35", unit: "%" },
    ],
    productsUsed: [
      "Câbles OS2 armés anti-rongeurs",
      "Jarretières LC/LC duplex OS2",
      "Répartiteurs muraux 24FO",
      "Boîtiers d'épissure extérieurs",
    ],
    relatedSlugs: ["operateur-ftth-uk", "stade-connecte-bordeaux"],
  },
  {
    id: "5",
    slug: "port-autonome-marseille",
    title: "Infrastructure fibre industrielle pour un port autonome",
    subtitle: "Connectique ATEX et surveillance temps réel sur 8 km de quais",
    client: "Port autonome de Méditerranée (anonymisé)",
    sector: "Industrie & Logistique",
    location: "Marseille, France",
    countryCode: "FR",
    year: 2023,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80",
    featured: false,
    tags: ["Industrie", "ATEX", "IoT", "Outdoor"],
    challenge:
      "Le port devait déployer un réseau de surveillance IoT et de gestion des grues sur 8 km de quais exposés à la salinité, aux vibrations et aux zones ATEX. Les câbles et connecteurs devaient répondre à des normes industrielles très strictes tout en garantissant une disponibilité de 24h/24.",
    solution:
      "FOLAN a fourni des câbles armés à gaine HDPE résistants aux UV et à la corrosion, associés à des connecteurs à verrouillage mécanique pour les zones humides. Chaque connexion a été testée à l'OTDR avec certification de traçabilité conforme aux exigences portuaires.",
    solutionDetails: [
      "8 km de câbles OS2 armés gaine HDPE UV-résistant",
      "Connecteurs étanches IP68 à verrouillage mécanique",
      "Boîtiers d'épissure inox pour zones salées",
      "Tests OTDR complets avec rapport de certification",
      "Formation des équipes maintenance du port",
    ],
    results: [
      { label: "Km de quais couverts", value: "8", unit: "km" },
      { label: "Points IoT connectés", value: "320", unit: "" },
      { label: "Disponibilité réseau", value: "99,97", unit: "%" },
    ],
    productsUsed: [
      "Câbles OS2 armés HDPE extérieur",
      "Connecteurs SC IP68 étanches",
      "Boîtiers d'épissure inox 316L",
      "Cordons industriels renforcés",
    ],
    relatedSlugs: ["reseau-hospitalier-idf", "stade-connecte-bordeaux"],
  },
  {
    id: "6",
    slug: "stade-connecte-bordeaux",
    title: "Backbone optique d'un stade 4.0 pour grands événements",
    subtitle: "Ultra-haute densité pour la diffusion 4K et la connectivité fan",
    client: "Stade atlantique de Bordeaux (anonymisé)",
    sector: "Sports & Événementiel",
    location: "Bordeaux, France",
    countryCode: "FR",
    year: 2024,
    image: "https://images.unsplash.com/photo-1540747913346-19212a4b423a?w=1400&q=80",
    featured: false,
    tags: ["Événementiel", "4K", "Haute densité", "OM4"],
    challenge:
      "La rénovation du stade pour accueillir des compétitions internationales exigeait un backbone optique supportant simultanément la diffusion broadcast 4K, le Wi-Fi dense pour 45 000 spectateurs et les systèmes de sécurité vidéo. Le chantier ne disposait que d'une fenêtre de 6 mois entre deux saisons sportives.",
    solution:
      "FOLAN a conçu un backbone OM4 haute densité avec des cassettes MPO précâblées permettant une installation ultra-rapide sur site. Les baies de distribution ont été livrées pré-brassées et prêtes à connecter, réduisant le temps d'installation de 60%.",
    solutionDetails: [
      "Backbone multimode OM4 50/125 sur 3 niveaux de gradins",
      "180 cassettes MPO-12 pré-câblées pour distribution broadcast",
      "Baies 42U pré-brassées livrées clé en main",
      "Installation coordonnée avec 6 autres corps d'état en simultané",
      "Recette technique complète J-7 avant le premier match officiel",
    ],
    results: [
      { label: "Spectateurs connectés", value: "45 000", unit: "" },
      { label: "Réduction temps install.", value: "60", unit: "%" },
      { label: "Délai mise en service", value: "6", unit: "mois" },
    ],
    productsUsed: [
      "Câbles OM4 50/125 intérieur LSZH",
      "Cassettes MPO/MTP OM4 12 fibres",
      "Baies optiques 1U haute densité",
      "Cordons LC/LC OM4 Uniboot",
    ],
    quote: {
      text: "Les baies pré-câblées ont été une révélation. On a branché et allumé : tout fonctionnait du premier coup. Sur un chantier aussi contraint, c'est inestimable.",
      author: "Directeur Technique",
      role: "Stade atlantique, Bordeaux",
    },
    relatedSlugs: ["datacenter-tier3-lyon", "campus-universitaire-francfort"],
  },
];
