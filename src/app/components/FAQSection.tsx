import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "Comment savoir si ce câble est compatible avec ma box ?",
    answer:
      "Tous nos câbles SC/APC à SC/UPC sont compatibles avec les box des principaux opérateurs français (Orange, Free, SFR, Bouygues). En cas de doute, notre équipe technique est disponible du lundi au vendredi.",
  },
  {
    question: "Quel est le délai de livraison réel ?",
    answer:
      "Les commandes passées avant 15h sont expédiées le jour même depuis notre entrepôt en région lyonnaise. Comptez 48 à 72 heures ouvrées pour la France métropolitaine.",
  },
  {
    question: "Que faire si le câble est trop long ou si je me suis trompé de connecteur ?",
    answer:
      "Nous proposons un retour gratuit sous 30 jours. Contactez notre service client pour recevoir une étiquette de retour prépayée et procéder à un échange ou un remboursement complet.",
  },
  {
    question: "Est-ce que vos câbles sont vraiment de qualité professionnelle ?",
    answer:
      "Oui. Tous nos câbles sont certifiés CE/RoHS et testés individuellement avant expédition. Nous utilisons des fibres monomodes G.657A2 avec des pertes d'insertion minimales pour garantir des performances stables.",
  },
  {
    question: "Puis-je commander en gros pour une installation professionnelle ?",
    answer:
      "Oui, nous proposons des tarifs dégressifs à partir de 5 unités. Pour les projets d'envergure, contactez-nous par email ou téléphone — nous acceptons aussi le règlement par virement bancaire.",
  },
  {
    question: "Comment nettoyer correctement les connecteurs optiques ?",
    answer:
      "Utilisez notre stylo de nettoyage optique professionnel avant chaque branchement. Un connecteur propre garantit une transmission optimale et évite les pertes de signal liées à la contamination.",
  },
];

interface Props {
  onFaqClick?: () => void;
}

export function FAQSection({ onFaqClick }: Props = {}) {
  return (
    <section className="bg-white py-14 lg:py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">

        {/* ── Main grid: left pitch / right accordion ── */}
        <div className="grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20 items-start">

          {/* LEFT — editorial title */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-24">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-[#353A3F] leading-tight tracking-tight">
              Tout ce que vous devez savoir avant de commander.
            </h2>
            <p className="text-sm lg:text-base text-gray-500 leading-relaxed">
              Vous ne trouvez pas de réponse ? Nos experts répondent dans la
              journée ouvrable.
            </p>
            <button
              onClick={onFaqClick}
              className="self-start inline-flex items-center gap-2 text-sm font-semibold text-[#C75B12] hover:text-[#a04a0f] transition-colors group"
            >
              Lire toutes les FAQ
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
            </button>
          </div>

          {/* RIGHT — clean accordion */}
          <Accordion.Root type="single" collapsible className="divide-y divide-gray-100">
            {faqs.map((faq, i) => (
              <Accordion.Item key={i} value={`faq-${i}`} className="group">
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full items-center justify-between gap-6 py-5 text-left">
                    <span className="text-sm lg:text-[0.9375rem] font-semibold text-gray-800 group-hover:text-[#353A3F] transition-colors leading-snug">
                      {faq.question}
                    </span>
                    <ChevronDown className="w-4 h-4 flex-shrink-0 text-gray-400 group-hover:text-[#C75B12] transition-all duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-[#C75B12]" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <p className="pb-5 text-sm text-gray-500 leading-relaxed max-w-xl">
                    {faq.answer}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>

        {/* ── Bottom banner ── */}
        <div className="mt-14 lg:mt-16 rounded-2xl bg-[#C75B12] px-8 py-8 lg:px-12 lg:py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="max-w-lg">
            <h3 className="text-xl lg:text-2xl font-bold text-white leading-tight mb-2">
              Un projet ? Obtenez un devis en 24h.
            </h3>
            <p className="text-sm text-white/75 leading-relaxed">
              Que ce soit 10 cordons ou 10 000 — envoyez-nous vos spécifications
              et nous revenons avec un tarif, un délai et une validation
              technique dans la journée.
            </p>
          </div>
          <button className="flex-shrink-0 inline-flex items-center gap-2.5 border-2 border-white text-white hover:bg-white hover:text-[#C75B12] font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-200 whitespace-nowrap">
            Envoyer une demande
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
