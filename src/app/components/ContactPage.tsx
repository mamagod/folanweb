import { useState } from "react";
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";

interface Props {
  onBack: () => void;
}

export function ContactPage({ onBack }: Props) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-5 flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#DC580A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
          <div className="h-4 w-px bg-gray-300" />
          <span className="text-sm text-gray-400">Nous contacter</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 lg:py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold tracking-widest text-[#DC580A] uppercase border border-[#DC580A]/30 bg-[#DC580A]/5 rounded-full px-4 py-1.5 mb-4">
            CONTACT
          </span>
          <h1 className="text-3xl lg:text-4xl font-bold text-[#353A3F] mb-3">
            Une question ? Nous sommes là.
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Particulier, installateur ou entreprise — notre équipe répond à toutes vos demandes sous 24h.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Info cards */}
            {[
              {
                icon: Mail,
                label: "E-mail",
                value: "contact@folan.fr",
                sub: "Réponse sous 24h ouvrées",
                href: "mailto:contact@folan.fr",
              },
              {
                icon: Phone,
                label: "Téléphone",
                value: "+33 (0)1 XX XX XX XX",
                sub: "Lun–Ven, 9h–18h",
                href: "tel:+33100000000",
              },
              {
                icon: MapPin,
                label: "Adresse",
                value: "Région Lyonnaise, France",
                sub: "Pas de vente en magasin",
                href: null,
              },
              {
                icon: Clock,
                label: "Horaires",
                value: "Lun–Ven : 9h–18h",
                sub: "Fermé les week-ends et jours fériés",
                href: null,
              },
            ].map(({ icon: Icon, label, value, sub, href }) => (
              <div key={label} className="flex gap-4 items-start bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-[#DC580A]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#DC580A]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
                  {href ? (
                    <a href={href} className="text-sm font-semibold text-[#353A3F] hover:text-[#DC580A] transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-[#353A3F]">{value}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}

            {/* Pro note */}
            <div className="bg-[#353A3F] rounded-xl p-5 text-white">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Clients professionnels</p>
              <p className="text-sm text-gray-200 leading-relaxed">
                Installateurs, entreprises et intégrateurs : mentionnez votre secteur dans le message pour un traitement prioritaire et un devis adapté.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 lg:p-9">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-[#353A3F] mb-2">Message envoyé !</h2>
                  <p className="text-gray-500 text-sm max-w-xs">
                    Merci de nous avoir contactés. Nous vous répondrons dans les 24h ouvrées.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    className="mt-6 text-sm text-[#DC580A] font-semibold hover:underline"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-lg font-bold text-[#353A3F] mb-6">Envoyer un message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nom complet *</label>
                        <input
                          required
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Jean Dupont"
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#DC580A] focus:outline-none text-sm transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">E-mail *</label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="jean@exemple.fr"
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#DC580A] focus:outline-none text-sm transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Sujet *</label>
                      <select
                        required
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#DC580A] focus:outline-none text-sm transition-colors bg-white text-gray-700"
                      >
                        <option value="">Sélectionnez un sujet...</option>
                        <option value="commande">Suivi de commande</option>
                        <option value="produit">Question produit / compatibilité</option>
                        <option value="devis">Demande de devis professionnel</option>
                        <option value="sav">SAV / Retour / Remboursement</option>
                        <option value="partenariat">Partenariat / Revendeur</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Message *</label>
                      <textarea
                        required
                        rows={6}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Décrivez votre demande en détail..."
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#DC580A] focus:outline-none text-sm transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-[#DC580A] hover:bg-[#B84808] text-white font-semibold py-3.5 rounded-lg transition-colors shadow-md hover:shadow-lg"
                    >
                      <Send className="w-4 h-4" />
                      Envoyer le message
                    </button>
                    <p className="text-xs text-gray-400 text-center">
                      En envoyant ce formulaire, vous acceptez notre politique de confidentialité.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
