import { Check, Package, Truck, Home } from "lucide-react";

interface OrderConfirmationPageProps {
  onBackToHome: () => void;
  onContactClick?: () => void;
}

export function OrderConfirmationPage({ onBackToHome, onContactClick }: OrderConfirmationPageProps) {
  const orderNumber = Math.random().toString(36).substring(2, 10).toUpperCase();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" strokeWidth={3} />
          </div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-3">
            Commande confirmée !
          </h1>
          <p className="text-gray-600 mb-2">
            Merci pour votre commande. Un email de confirmation vous a été envoyé.
          </p>
          <p className="text-sm text-gray-500">
            Numéro de commande: <span className="font-mono font-semibold text-gray-700">#{orderNumber}</span>
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">Prochaines étapes</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-[#353A3F]" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Préparation de la commande</h3>
                <p className="text-sm text-gray-600">
                  Votre commande est en cours de préparation dans notre entrepôt
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Expédition</h3>
                <p className="text-sm text-gray-600">
                  Vous recevrez un email avec le numéro de suivi dès l'expédition
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Home className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Livraison</h3>
                <p className="text-sm text-gray-600">
                  Livraison estimée sous 24-48h ouvrées
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Besoin d'aide ?</h3>
          <p className="text-sm text-gray-700 mb-3">
            Notre équipe support est disponible du lundi au vendredi de 9h à 18h
          </p>
          <div className="flex flex-wrap gap-2 text-sm mb-3">
            <span className="text-gray-600">📧 contact@folan.fr</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-600">📞 01 23 45 67 89</span>
          </div>
          <button
            onClick={onContactClick}
            className="text-sm font-semibold text-[#DC580A] hover:underline"
          >
            Nous contacter →
          </button>
        </div>

        <button
          onClick={onBackToHome}
          className="w-full py-3 bg-[#DC580A] text-white font-semibold rounded-lg hover:bg-[#B84808] transition-colors"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
}
