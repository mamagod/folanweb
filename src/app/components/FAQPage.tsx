import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, ChevronRight, Search, MessageCircle, Phone, Mail, Package, Truck, Shield, Wrench, Users } from "lucide-react";

interface Props {
  onBack: () => void;
  onContactClick?: () => void;
}

const CATEGORIES = [
  {
    id: "installation",
    label: "Compatibilité & Installation",
    icon: Wrench,
    color: "from-[#353A3F] to-[#2A2E32]",
    faqs: [
      {
        question: "Comment savoir si ce câble est compatible avec ma box (Freebox, Livebox, Bbox, SFR Box) ?",
        answer: "Tous nos câbles SC/APC à SC/APC ou SC/UPC sont parfaitement compatibles avec les box internet des principaux opérateurs français (Orange, Free, SFR, Bouygues). Les connecteurs SC/APC (vert) sont les plus courants et conviennent à la majorité des installations. Si vous avez un doute, notre équipe technique est là pour vous conseiller du lundi au vendredi."
      },
      {
        question: "Quelle longueur de câble choisir ?",
        answer: "Mesurez la distance entre votre prise fibre murale (PTO) et votre box, puis ajoutez 50 cm de marge pour éviter toute tension sur les connecteurs. Les câbles plats peuvent facilement passer sous les portes et le long des plinthes, ce qui peut allonger le trajet réel."
      },
      {
        question: "Puis-je installer le câble fibre moi-même ?",
        answer: "Absolument. L'installation ne nécessite aucun outil ni compétence technique particulière. Il suffit de brancher les deux connecteurs en respectant la couleur (vert côté prise murale, bleu côté box). En cas de doute, suivez nos guides vidéo disponibles sur chaque fiche produit."
      },
      {
        question: "Que signifient SC/APC et SC/UPC ?",
        answer: "SC/APC (vert) et SC/UPC (bleu) désignent deux types de polissage du connecteur optique. Le SC/APC est utilisé côté prise murale chez la plupart des opérateurs français car il réduit les réflexions parasites. Le SC/UPC est utilisé côté box. Ne jamais connecter un SC/APC sur un port SC/UPC et vice-versa sous peine de détériorer les connecteurs."
      },
      {
        question: "Mon câble peut-il passer sous une porte ?",
        answer: "Oui, nos câbles en gaine plate 2 × 3 mm sont spécialement conçus pour passer sous les portes standard (espace de 3 à 5 mm). Respectez un rayon de courbure minimum de 15 mm pour préserver l'intégrité de la fibre."
      },
      {
        question: "Comment fixer le câble discrètement ?",
        answer: "Nous recommandons des clips adhésifs pour câble plat (vendus séparément), à placer tous les 40 à 50 cm le long des plinthes. Le câble plat 2 × 3 mm est quasi invisible une fois posé contre une plinthe blanche. Vous pouvez également utiliser des goulottes de 10 mm minimum."
      },
    ]
  },
  {
    id: "livraison",
    label: "Livraison & Commande",
    icon: Truck,
    color: "from-orange-500 to-orange-600",
    faqs: [
      {
        question: "Quel est le délai de livraison réel ?",
        answer: "Toutes les commandes passées avant 15h sont expédiées le jour même depuis notre entrepôt situé en région lyonnaise. Pour la France métropolitaine, la livraison standard prend généralement 48 à 72 heures ouvrées. Vous recevrez un e-mail avec le numéro de suivi dès l'expédition de votre colis."
      },
      {
        question: "La livraison est-elle gratuite ?",
        answer: "La livraison est offerte pour toute commande supérieure à 29 €. En dessous de ce seuil, un forfait de livraison de 3,90 € est appliqué. Nous expédions via Colissimo et Chronopost selon le transporteur sélectionné à la commande."
      },
      {
        question: "Puis-je modifier ou annuler ma commande ?",
        answer: "Vous pouvez modifier ou annuler votre commande dans un délai de 2 heures après validation, à condition qu'elle n'ait pas encore été préparée. Passé ce délai, contactez notre service client le plus tôt possible. Si le colis est déjà expédié, vous devrez effectuer un retour."
      },
      {
        question: "Livrez-vous en dehors de la France métropolitaine ?",
        answer: "Oui, nous livrons en Belgique, en Suisse, au Luxembourg et dans les DOM-TOM. Les délais et frais de port varient selon la destination. Pour les expéditions hors UE, contactez-nous directement pour obtenir un devis personnalisé."
      },
    ]
  },
  {
    id: "qualite",
    label: "Produits & Qualité",
    icon: Shield,
    color: "from-green-500 to-green-600",
    faqs: [
      {
        question: "Est-ce que vos câbles sont vraiment de qualité professionnelle ?",
        answer: "Absolument. Tous nos câbles optiques sont certifiés selon les normes internationales (CE, RoHS) et testés individuellement en laboratoire avant expédition. Nous utilisons des fibres monomodes G.657A2 de haute qualité avec des pertes d'insertion inférieures à 0,35 dB/km pour garantir des performances stables sur le long terme."
      },
      {
        question: "Y a-t-il une perte de débit avec un câble fibre plus long ?",
        answer: "Non, la fibre monomode ne génère aucune perte mesurable sur les longueurs domestiques (jusqu'à 20 m). Votre débit reste identique à celui annoncé par votre opérateur, que votre câble fasse 1 m ou 20 m. Les pertes ne deviennent perceptibles qu'au-delà de plusieurs kilomètres."
      },
      {
        question: "Quelle est la garantie sur les produits ?",
        answer: "Tous nos produits sont garantis 2 ans contre les défauts de fabrication conformément à la législation européenne. En cas de problème, contactez notre service client avec votre numéro de commande. Nous procédons à un échange ou un remboursement sans frais."
      },
      {
        question: "Comment nettoyer correctement les connecteurs optiques ?",
        answer: "Nous recommandons d'utiliser notre stylo de nettoyage optique professionnel ou nos cassettes de nettoyage à usage unique (kit vendu séparément). Nettoyez avant chaque branchement pour éviter les pertes d'insertion liées aux contaminants. Instructions détaillées fournies avec le kit."
      },
      {
        question: "Vos modules SFP+ sont-ils compatibles avec mon switch ?",
        answer: "Nos modules SFP+ 10G sont compatibles avec les principaux équipements Cisco, Mikrotik, Ubiquiti, Netgear, TP-Link et la plupart des switches standards du marché. Consultez notre liste de compatibilité disponible sur la fiche produit ou contactez-nous en précisant votre modèle de switch."
      },
    ]
  },
  {
    id: "retours",
    label: "Retours & SAV",
    icon: Package,
    color: "from-red-500 to-red-600",
    faqs: [
      {
        question: "Que faire si le câble est trop long ou si je me suis trompé de connecteur ?",
        answer: "Pas d'inquiétude ! Nous proposons un retour gratuit sous 30 jours. Si le produit ne convient pas à votre installation, vous pouvez nous le retourner dans son emballage d'origine pour un remboursement complet ou un échange. Contactez notre service client pour recevoir une étiquette de retour prépayée."
      },
      {
        question: "Comment initier un retour ?",
        answer: "Connectez-vous à votre espace client, sélectionnez la commande concernée et cliquez sur « Retourner un article ». Vous recevrez une étiquette Colissimo prépayée par e-mail. Emballez soigneusement le produit dans son emballage d'origine et déposez-le dans un bureau de poste. Le remboursement est effectué sous 5 à 10 jours ouvrés après réception."
      },
      {
        question: "Que faire si je reçois un produit défectueux ?",
        answer: "Contactez-nous immédiatement avec des photos du produit et de l'emballage à contact@cableboxfibre.fr. Nous vous expédions un produit de remplacement sous 24h sans frais supplémentaires, et nous organisons la récupération du produit défectueux à votre domicile."
      },
    ]
  },
  {
    id: "pro",
    label: "Commandes Professionnelles",
    icon: Users,
    color: "from-purple-500 to-purple-600",
    faqs: [
      {
        question: "Puis-je commander en gros pour une installation professionnelle ?",
        answer: "Oui, nous proposons des tarifs dégressifs automatiques dès 5 unités, visibles directement sur chaque fiche produit. Pour les projets en volume (>50 unités) ou les appels d'offres, contactez notre service commercial par e-mail ou téléphone pour un devis personnalisé. Nous acceptons le paiement par virement bancaire pour les commandes importantes."
      },
      {
        question: "Établissez-vous des devis et des factures pour les entreprises ?",
        answer: "Oui, nous établissons des devis sur mesure et des factures avec TVA pour toutes les commandes professionnelles. Créez un compte professionnel sur notre site ou contactez-nous directement. La facture est automatiquement jointe à chaque commande."
      },
      {
        question: "Proposez-vous des câbles sur mesure ?",
        answer: "Oui, nous fabriquons des câbles fibre optique sur mesure à partir de 10 unités : longueur spécifique, type de connecteurs, gaine adaptée. Délai de fabrication : 5 à 10 jours ouvrés selon la complexité. Contactez notre service technique pour un devis."
      },
      {
        question: "Avez-vous un programme revendeur ?",
        answer: "Oui, nous proposons un programme partenaire pour les installateurs, revendeurs et intégrateurs réseau. Tarifs préférentiels, stock réservé et support technique dédié. Contactez-nous à partenaires@cableboxfibre.fr pour en savoir plus."
      },
    ]
  },
];

export function FAQPage({ onBack, onContactClick }: Props) {
  const [activeCategory, setActiveCategory] = useState("installation");
  const [search, setSearch] = useState("");

  const current = CATEGORIES.find((c) => c.id === activeCategory)!;
  const filteredFaqs = search.trim()
    ? CATEGORIES.flatMap((c) =>
        c.faqs
          .filter(
            (f) =>
              f.question.toLowerCase().includes(search.toLowerCase()) ||
              f.answer.toLowerCase().includes(search.toLowerCase())
          )
          .map((f) => ({ ...f, category: c.label }))
      )
    : null;

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#353A3F] to-[#2A2E32] text-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-gray-300 hover:text-white text-sm transition-colors mb-2"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Retour
          </button>
          <h1 className="text-3xl lg:text-4xl font-semibold">Questions fréquentes</h1>
          <p className="text-gray-300 text-sm lg:text-base max-w-xl mx-auto">
            Retrouvez les réponses à toutes vos questions sur nos produits, la livraison et le service client.
          </p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto mt-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher une question…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl text-sm text-gray-800 bg-white border-0 outline-none shadow-lg focus:ring-2 focus:ring-[#DC580A]/40"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 lg:py-14">

        {/* Search results */}
        {filteredFaqs ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 mb-6">
              {filteredFaqs.length} résultat{filteredFaqs.length !== 1 ? "s" : ""} pour «&nbsp;{search}&nbsp;»
            </p>
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-16 text-gray-400 space-y-2">
                <p className="text-4xl">🔍</p>
                <p className="text-sm">Aucun résultat. Essayez un autre terme ou contactez-nous.</p>
              </div>
            ) : (
              <Accordion.Root type="single" collapsible className="space-y-2">
                {filteredFaqs.map((faq, idx) => (
                  <Accordion.Item
                    key={idx}
                    value={`s-${idx}`}
                    className="bg-white rounded-xl border-2 border-gray-100 overflow-hidden hover:border-[#DC580A] transition-colors duration-200"
                  >
                    <Accordion.Header>
                      <Accordion.Trigger className="group w-full flex items-start justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors gap-4">
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-[#DC580A] block mb-1">{faq.category}</span>
                          <span className="text-sm font-medium text-[#374151] group-hover:text-[#DC580A] transition-colors leading-snug">{faq.question}</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-[#DC580A] flex-shrink-0 mt-1 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                      <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{faq.answer}</div>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            )}
          </div>
        ) : (
          <div className="grid lg:grid-cols-[220px_1fr] gap-8 lg:gap-12">

            {/* Sidebar categories */}
            <nav className="space-y-1">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const active = cat.id === activeCategory;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-left transition-all duration-150 ${
                      active
                        ? "bg-[#DC580A] text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-100 hover:text-[#353A3F]"
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="leading-snug">{cat.label}</span>
                    <span className={`ml-auto text-xs rounded-full px-1.5 py-0.5 font-semibold ${active ? "bg-white/25 text-white" : "bg-gray-100 text-gray-400"}`}>
                      {cat.faqs.length}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Accordion panel */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${current.color} flex items-center justify-center`}>
                  <current.icon className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-[#353A3F]">{current.label}</h2>
              </div>

              <Accordion.Root type="single" collapsible className="space-y-2">
                {current.faqs.map((faq, idx) => (
                  <Accordion.Item
                    key={idx}
                    value={`${activeCategory}-${idx}`}
                    className="bg-white rounded-xl border-2 border-gray-100 overflow-hidden hover:border-[#DC580A] transition-colors duration-200"
                  >
                    <Accordion.Header>
                      <Accordion.Trigger className="group w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors">
                        <span className="text-sm font-medium text-[#374151] group-hover:text-[#DC580A] transition-colors pr-4 leading-snug">
                          {faq.question}
                        </span>
                        <ChevronDown className="w-4 h-4 text-[#DC580A] flex-shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                      <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>

          </div>
        )}

        {/* Contact footer */}
        <div className="mt-12 grid sm:grid-cols-3 gap-4">
          {[
            { icon: MessageCircle, label: "Chat en direct", sub: "Lun–Ven, 9h–18h", action: "Démarrer le chat" },
            { icon: Mail, label: "Envoyer un e-mail", sub: "Réponse sous 24h", action: "contact@folan.fr" },
            { icon: Phone, label: "Nous appeler", sub: "Lun–Ven, 9h–18h", action: "+33 (0)1 XX XX XX XX" },
          ].map(({ icon: Icon, label, sub, action }) => (
            <button
              key={label}
              onClick={onContactClick}
              className="flex items-start gap-4 bg-gray-50 hover:bg-orange-50 rounded-xl p-5 border border-gray-100 hover:border-[#DC580A]/30 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-[#DC580A]/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-[#DC580A]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#353A3F]">{label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
                <p className="text-xs font-medium text-[#DC580A] mt-1">{action}</p>
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
