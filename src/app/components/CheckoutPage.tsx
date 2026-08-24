import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { useCart } from "../contexts/CartContext";

interface CheckoutPageProps {
  onBack: () => void;
  onComplete: () => void;
}

export function CheckoutPage({ onBack, onComplete }: CheckoutPageProps) {
  const { items, getTotalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const totalPrice = getTotalPrice();
  const shippingCost = totalPrice >= 50 ? 0 : 4.9;
  const finalTotal = totalPrice + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      onComplete();
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 lg:py-12">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-[#DC580A] mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Retour au panier
      </button>

      <h1 className="text-3xl font-semibold text-gray-900 mb-8">Finaliser ma commande</h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations personnelles</h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC580A] focus:border-transparent outline-none transition-all"
                  placeholder="votre.email@exemple.fr"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC580A] focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nom *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC580A] focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC580A] focus:border-transparent outline-none transition-all"
                  placeholder="06 12 34 56 78"
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Adresse de livraison</h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Adresse *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC580A] focus:border-transparent outline-none transition-all"
                  placeholder="123 rue de la Fibre"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Code postal *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC580A] focus:border-transparent outline-none transition-all"
                    placeholder="75001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Ville *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC580A] focus:border-transparent outline-none transition-all"
                    placeholder="Paris"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Votre commande</h2>

            <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.variant.label}`}
                  className="flex justify-between text-sm"
                >
                  <span className="text-gray-600">
                    {item.product.name.slice(0, 30)}... × {item.quantity}
                  </span>
                  <span className="font-medium text-gray-900">
                    {(item.variant.price * item.quantity).toFixed(2)} €
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
              <div className="flex justify-between text-gray-600">
                <span>Sous-total</span>
                <span className="font-medium">{totalPrice.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Livraison</span>
                <span className="font-medium">
                  {shippingCost === 0 ? "Gratuite" : `${shippingCost.toFixed(2)} €`}
                </span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-semibold text-gray-900 mb-6">
              <span>Total</span>
              <span>{finalTotal.toFixed(2)} €</span>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 bg-[#DC580A] text-white font-semibold rounded-lg hover:bg-[#B84808] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Traitement en cours...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Valider la commande
                </>
              )}
            </button>

            <div className="mt-4 text-xs text-gray-500 text-center">
              En validant, vous acceptez nos conditions générales de vente
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
