export interface Guide {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  readTime: string;
  difficulty: "Débutant" | "Intermédiaire" | "Avancé";
  image: string;
  content: {
    introduction: string;
    sections: {
      title: string;
      content: string;
      steps?: string[];
      tips?: string[];
      image?: string;
    }[];
  };
  relatedGuides?: string[];
}

export const GUIDES: Guide[] = [
  {
    id: 1,
    slug: "tuto-installation-fibre",
    title: "Comment installer votre câble fibre optique",
    category: "Installation",
    description: "Guide complet pour raccorder votre box internet à la prise fibre murale en quelques minutes.",
    readTime: "5 min",
    difficulty: "Débutant",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
    content: {
      introduction: "Installer un câble fibre optique est plus simple qu'il n'y paraît. Suivez ce guide étape par étape pour raccorder votre box internet en toute sécurité.",
      sections: [
        {
          title: "Matériel nécessaire",
          content: "Avant de commencer, assurez-vous d'avoir le matériel suivant à portée de main.",
          steps: [
            "Un câble fibre optique SC/APC – SC/UPC (adapté à votre distance)",
            "Votre box internet",
            "Un chiffon doux propre",
          ],
        },
        {
          title: "Étape 1 : Identifier les connecteurs",
          content: "Les connecteurs fibre optique ont des couleurs spécifiques qui indiquent leur type. Il est important de les identifier correctement.",
          steps: [
            "Le connecteur SC/APC est de couleur VERTE – il se branche sur la prise murale",
            "Le connecteur SC/UPC est de couleur BLEUE – il se branche sur votre box",
            "Ne forcez jamais lors de l'insertion des connecteurs",
          ],
          tips: [
            "Gardez les capuchons de protection jusqu'au moment de brancher",
            "Évitez de toucher les embouts avec vos doigts",
          ],
        },
        {
          title: "Étape 2 : Nettoyer les connecteurs",
          content: "La propreté des connecteurs est essentielle pour garantir une connexion optimale.",
          steps: [
            "Retirez délicatement les capuchons de protection",
            "Utilisez un chiffon doux et propre pour essuyer les embouts",
            "Ne soufflez jamais sur les connecteurs (l'humidité peut endommager la fibre)",
          ],
        },
        {
          title: "Étape 3 : Brancher sur la prise murale",
          content: "Connectez le côté vert (SC/APC) à votre prise optique murale.",
          steps: [
            "Alignez le connecteur vert avec la prise murale",
            "Insérez doucement jusqu'à entendre un 'clic'",
            "Le connecteur doit être bien enfoncé sans forcer",
          ],
          tips: [
            "Si vous sentez une résistance, vérifiez l'alignement",
            "Ne tournez pas le connecteur pendant l'insertion",
          ],
        },
        {
          title: "Étape 4 : Brancher sur la box",
          content: "Connectez le côté bleu (SC/UPC) au port fibre de votre box internet.",
          steps: [
            "Localisez le port fibre sur votre box (généralement marqué 'FIBRE' ou 'PON')",
            "Insérez le connecteur bleu jusqu'au clic",
            "Vérifiez que le voyant fibre de la box s'allume (vert ou bleu selon les modèles)",
          ],
        },
        {
          title: "Vérification et dépannage",
          content: "Une fois branché, vérifiez que tout fonctionne correctement.",
          steps: [
            "Le voyant 'Fibre' ou 'Internet' de votre box doit être allumé",
            "Attendez 2-3 minutes pour la synchronisation",
            "Testez votre connexion internet",
          ],
          tips: [
            "Si le voyant ne s'allume pas : vérifiez que les connecteurs sont bien enfoncés",
            "Si la connexion est instable : nettoyez à nouveau les connecteurs",
            "En cas de problème persistant : contactez votre fournisseur d'accès",
          ],
        },
      ],
    },
    relatedGuides: ["guide-choix-cable", "conseils-pose-reseau"],
  },
  {
    id: 2,
    slug: "guide-choix-cable",
    title: "Comment choisir la bonne longueur de câble fibre",
    category: "Conseils d'achat",
    description: "Découvrez comment sélectionner la longueur idéale de câble fibre pour votre installation.",
    readTime: "4 min",
    difficulty: "Débutant",
    image: "https://images.unsplash.com/photo-1594915854088-2128db6a8db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
    content: {
      introduction: "Choisir la bonne longueur de câble est essentiel pour une installation propre et durable. Ce guide vous aide à déterminer la longueur optimale.",
      sections: [
        {
          title: "Mesurer votre distance",
          content: "La première étape consiste à mesurer la distance entre votre prise optique murale et l'emplacement de votre box.",
          steps: [
            "Utilisez un mètre ruban pour mesurer le trajet du câble",
            "N'oubliez pas d'inclure les contournements (portes, plinthes, meubles)",
            "Ajoutez toujours 50 cm à 1 mètre de marge de sécurité",
          ],
          tips: [
            "Prévoyez le trajet le plus discret possible",
            "Évitez les angles trop serrés (rayon minimum : 3 cm)",
          ],
        },
        {
          title: "Longueurs standards disponibles",
          content: "Les câbles fibre optique sont disponibles en plusieurs longueurs standards.",
          steps: [
            "1-2 mètres : Idéal si la prise est proche de la box",
            "3 mètres : La longueur la plus populaire, adaptée à la majorité des installations",
            "5 mètres : Pour traverser une pièce ou passer sous une porte",
            "10 mètres et plus : Pour les grandes distances ou installations multi-pièces",
          ],
        },
        {
          title: "Cas d'usage courants",
          content: "Voici des exemples de situations et les longueurs recommandées.",
          steps: [
            "Prise et box dans le même meuble : 1-2 mètres",
            "Prise et box dans la même pièce : 3-5 mètres",
            "Prise dans l'entrée, box dans le salon : 5-10 mètres",
            "Installation sur plusieurs pièces : 10-20 mètres",
          ],
          tips: [
            "Trop court : impossible à brancher confortablement",
            "Trop long : câble en surplus difficile à ranger",
            "En cas de doute : prenez la longueur supérieure",
          ],
        },
        {
          title: "Conseils de pose",
          content: "Optimisez votre installation avec ces bonnes pratiques.",
          steps: [
            "Utilisez les plinthes pour dissimuler le câble",
            "Les câbles plats passent facilement sous les portes",
            "Évitez de plier le câble à 90 degrés",
            "Fixez le câble avec des clips adaptés (pas d'agrafes métalliques)",
          ],
        },
      ],
    },
    relatedGuides: ["tuto-installation-fibre", "conseils-pose-reseau"],
  },
  {
    id: 3,
    slug: "conseils-pose-reseau",
    title: "Conseils pour une pose réseau professionnelle",
    category: "Installation avancée",
    description: "Techniques et astuces pour installer votre réseau fibre comme un professionnel.",
    readTime: "8 min",
    difficulty: "Intermédiaire",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
    content: {
      introduction: "Une installation réseau soignée garantit des performances optimales et une meilleure durabilité. Découvrez les techniques des professionnels.",
      sections: [
        {
          title: "Planification du parcours",
          content: "Avant de commencer, planifiez soigneusement le trajet de vos câbles.",
          steps: [
            "Dessinez un schéma de votre installation",
            "Identifiez les points de passage (portes, murs, plafonds)",
            "Repérez les sources d'interférences potentielles",
            "Prévoyez l'évolution future de votre installation",
          ],
        },
        {
          title: "Techniques de pose discrète",
          content: "Apprenez à rendre vos câbles invisibles ou discrets.",
          steps: [
            "Longez les plinthes et angles de murs",
            "Utilisez des goulottes décoratives assorties à votre intérieur",
            "Passez les câbles derrière les meubles",
            "Pour les câbles plats : utilisez du ruban adhésif double-face fin",
          ],
          tips: [
            "Choisissez des câbles de couleur assortie à vos murs",
            "Les câbles plats sont moins visibles que les ronds",
            "Regroupez plusieurs câbles dans une même goulotte",
          ],
        },
        {
          title: "Gestion des courbures",
          content: "Les câbles fibre optique sont sensibles aux courbures excessives.",
          steps: [
            "Rayon de courbure minimum : 30 mm (3 cm)",
            "Utilisez des guides-câbles pour les angles",
            "Ne pliez jamais le câble à angle droit",
            "Laissez le câble former des courbes naturelles",
          ],
        },
        {
          title: "Protection et sécurisation",
          content: "Protégez votre installation pour garantir sa longévité.",
          steps: [
            "Évitez les zones de passage intensif",
            "Protégez les câbles au sol avec des protège-câbles",
            "N'agrafez jamais un câble fibre (utilisez des clips plastiques)",
            "Éloignez les câbles des sources de chaleur",
          ],
          tips: [
            "Les câbles fibre ne craignent pas les interférences électromagnétiques",
            "Ils peuvent côtoyer des câbles électriques sans problème",
            "Évitez l'exposition directe au soleil sur de longues périodes",
          ],
        },
        {
          title: "Étiquetage et documentation",
          content: "Documentez votre installation pour faciliter la maintenance future.",
          steps: [
            "Étiquetez chaque extrémité de câble",
            "Notez les longueurs et chemins de câblage",
            "Prenez des photos de l'installation",
            "Conservez les certificats de test (si applicable)",
          ],
        },
        {
          title: "Tests et validation",
          content: "Vérifiez la qualité de votre installation.",
          steps: [
            "Testez la connexion immédiatement après l'installation",
            "Vérifiez les débits avec un test de vitesse",
            "Inspectez visuellement tous les points de connexion",
            "Documentez les performances de base",
          ],
        },
      ],
    },
    relatedGuides: ["tuto-installation-fibre", "faq-depannage"],
  },
  {
    id: 4,
    slug: "faq-depannage",
    title: "FAQ Dépannage : Solutions aux problèmes courants",
    category: "Dépannage",
    description: "Réponses aux questions fréquentes et solutions aux problèmes les plus courants.",
    readTime: "6 min",
    difficulty: "Débutant",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
    content: {
      introduction: "Vous rencontrez un problème avec votre installation fibre ? Consultez notre FAQ pour trouver rapidement une solution.",
      sections: [
        {
          title: "Problèmes de connexion",
          content: "Les problèmes les plus fréquents liés à la connexion internet.",
          steps: [
            "Q : Le voyant fibre de ma box ne s'allume pas",
            "R : Vérifiez que les deux connecteurs sont bien enfoncés. Nettoyez les embouts avec un chiffon doux. Si le problème persiste, testez avec un autre câble.",
            "",
            "Q : Ma connexion est lente ou instable",
            "R : Inspectez le câble pour détecter d'éventuelles courbures trop serrées. Nettoyez les connecteurs. Vérifiez qu'aucun appareil ne compresse le câble.",
            "",
            "Q : La connexion se coupe régulièrement",
            "R : Cela peut indiquer un connecteur mal enfoncé ou sale. Débranchez, nettoyez, et rebranchez fermement les deux extrémités.",
          ],
        },
        {
          title: "Problèmes physiques",
          content: "Questions sur le câble et son installation physique.",
          steps: [
            "Q : Puis-je plier mon câble fibre ?",
            "R : Oui, mais avec un rayon de courbure minimum de 3 cm. Les câbles G.657A2 tolèrent mieux les courbures que les versions plus anciennes.",
            "",
            "Q : Mon câble est trop court, puis-je le rallonger ?",
            "R : Il n'est pas recommandé de rallonger un câble fibre avec un adaptateur pour une installation domestique. Utilisez un câble de la bonne longueur.",
            "",
            "Q : Le câble passe sous une porte, est-ce un problème ?",
            "R : Non, les câbles plats sont conçus pour cela. Assurez-vous que la porte ne compresse pas excessivement le câble.",
          ],
        },
        {
          title: "Compatibilité",
          content: "Questions sur la compatibilité avec différents équipements.",
          steps: [
            "Q : Ce câble fonctionne-t-il avec toutes les box ?",
            "R : Oui, les câbles SC/APC – SC/UPC sont compatibles avec toutes les box fibre françaises (Orange, Free, SFR, Bouygues, etc.).",
            "",
            "Q : Puis-je utiliser ce câble pour du matériel professionnel ?",
            "R : Oui, nos câbles sont certifiés pour un usage professionnel et résidentiel.",
            "",
            "Q : Quelle différence entre SC/APC et SC/UPC ?",
            "R : SC/APC (vert) a un connecteur biseauté à 8° pour minimiser les réflexions. SC/UPC (bleu) a un connecteur plat. Les deux sont nécessaires pour votre installation box.",
          ],
        },
        {
          title: "Entretien",
          content: "Conseils pour maintenir votre installation en bon état.",
          steps: [
            "Q : Comment nettoyer mes connecteurs ?",
            "R : Utilisez un chiffon doux non pelucheux. Pour un nettoyage professionnel, utilisez un kit de nettoyage fibre avec cassettes jetables.",
            "",
            "Q : À quelle fréquence dois-je nettoyer les connecteurs ?",
            "R : Nettoyez-les lors de chaque déconnexion/reconnexion. Pour une installation fixe, un nettoyage annuel suffit.",
            "",
            "Q : Dois-je remettre les capuchons de protection ?",
            "R : Oui, absolument ! Les capuchons protègent les embouts de la poussière lorsque le câble n'est pas utilisé.",
          ],
        },
        {
          title: "Performances",
          content: "Questions sur les débits et performances.",
          steps: [
            "Q : Ce câble supporte-t-il la fibre 10 Gbps ?",
            "R : Oui, nos câbles monomode G.657A2 supportent des débits allant jusqu'à 10 Gbps et au-delà.",
            "",
            "Q : La longueur du câble affecte-t-elle le débit ?",
            "R : Pour les longueurs domestiques (jusqu'à 100 m), l'impact est négligeable. La fibre a une très faible atténuation.",
            "",
            "Q : Puis-je utiliser un câble de 20 m pour une distance de 2 m ?",
            "R : Techniquement oui, mais c'est peu pratique. Le câble en surplus sera difficile à ranger proprement.",
          ],
        },
      ],
    },
    relatedGuides: ["tuto-installation-fibre", "conseils-pose-reseau"],
  },
];
