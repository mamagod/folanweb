import { useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Tag, X } from "lucide-react";
import { useCart } from "../contexts/CartContext";

interface CartPageProps {
  onBack: () => void;
  onCheckout: () => void;
}

// Mock discount codes
const DISCOUNT_CODES: Record<string, { type: "percentage" | "fixed"; value: number; label: string }> = {
  "BIENVENUE10": { type: "percentage", value: 10, label: "10% de réduction" },
  "FIBRE20": { type: "percentage", value: 20, label: "20% de réduction" },
  "PROMO5": { type: "fixed", value: 5, label: "5€ de réduction" },
  "CADEAU15": { type: "fixed", value: 15, label: "15€ de réduction" },
};

export function CartPage({ onBack, onCheckout }: CartPageProps) {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; type: "percentage" | "fixed"; value: number; label: string } | null>(null);
  const [discountError, setDiscountError] = useState("");

  const applyDiscount = () => {
    const code = discountCode.trim().toUpperCase();
    if (!code) {
      setDiscountError("Veuillez entrer un code promo");
      return;
    }

    const discount = DISCOUNT_CODES[code];
    if (discount) {
      setAppliedDiscount({ code, ...discount });
      setDiscountError("");
      setDiscountCode("");
    } else {
      setDiscountError("Code promo invalide");
    }
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountError("");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Votre panier est vide</h2>
          <p className="text-gray-500 mb-8">
            Découvrez notre sélection de câbles fibre optique et équipements réseau professionnels.
          </p>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#DC580A] text-white rounded-lg hover:bg-[#B84808] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Continuer mes achats
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = getTotalPrice();

  // Calculate discount
  let discountAmount = 0;
  if (appliedDiscount) {
    if (appliedDiscount.type === "percentage") {
      discountAmount = (totalPrice * appliedDiscount.value) / 100;
    } else {
      discountAmount = Math.min(appliedDiscount.value, totalPrice);
    }
  }

  const priceAfterDiscount = totalPrice - discountAmount;
  const shippingCost = priceAfterDiscount >= 50 ? 0 : 4.9;
  const finalTotal = priceAfterDiscount + shippingCost;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-[#DC580A] mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Continuer mes achats
      </button>

      <h1 className="text-3xl font-semibold text-gray-900 mb-8">Mon Panier</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            // Calculate effective price with bulk discount
            let effectivePrice = item.variant.price;
            let bulkDiscount = 0;
            if (item.product.bulkPricing) {
              const tier = [...item.product.bulkPricing]
                .sort((a, b) => b.minQuantity - a.minQuantity)
                .find((t) => item.quantity >= t.minQuantity);
              if (tier && tier.discount > 0) {
                bulkDiscount = tier.discount;
                effectivePrice = item.variant.price * (1 - tier.discount / 100);
              }
            }
            const itemTotal = effectivePrice * item.quantity;

            return (
              <div
                key={`${item.product.id}-${item.variant.label}`}
                className="bg-white border border-gray-200 rounded-xl p-4 lg:p-6"
              >
                <div className="flex gap-4">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-20 h-20 lg:w-24 lg:h-24 object-cover rounded-lg flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">Longueur: {item.variant.label}</p>

                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.variant.label,
                              item.quantity - 1
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="w-8 text-center font-medium text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.variant.label,
                              item.quantity + 1
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-semibold text-lg text-gray-900">
                            {itemTotal.toFixed(2)} €
                          </div>
                          {(item.variant.originalPrice || bulkDiscount > 0) && (
                            <div className="text-sm text-gray-400 line-through">
                              {(item.variant.price * item.quantity).toFixed(2)} €
                            </div>
                          )}
                          {bulkDiscount > 0 && (
                            <div className="text-xs text-green-600 font-medium">
                              -{bulkDiscount}% remise quantité
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id, item.variant.label)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Récapitulatif</h2>

            {/* Discount Code Input */}
            <div className="mb-4 pb-4 border-b border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Code promo
              </label>
              {appliedDiscount ? (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-green-600" />
                    <div>
                      <div className="text-sm font-semibold text-green-700">{appliedDiscount.code}</div>
                      <div className="text-xs text-green-600">{appliedDiscount.label}</div>
                    </div>
                  </div>
                  <button
                    onClick={removeDiscount}
                    className="p-1 hover:bg-green-100 rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-green-600" />
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) => {
                        setDiscountCode(e.target.value.toUpperCase());
                        setDiscountError("");
                      }}
                      onKeyDown={(e) => e.key === "Enter" && applyDiscount()}
                      placeholder="Entrez votre code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#DC580A] focus:border-transparent outline-none"
                    />
                    <button
                      onClick={applyDiscount}
                      className="px-4 py-2 bg-[#DC580A] text-white text-sm font-semibold rounded-lg hover:bg-[#B84808] transition-colors"
                    >
                      Appliquer
                    </button>
                  </div>
                  {discountError && (
                    <p className="text-xs text-red-600">{discountError}</p>
                  )}
                  <div className="text-xs text-gray-500">
                    Codes disponibles : BIENVENUE10, FIBRE20, PROMO5
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
              <div className="flex justify-between text-gray-600">
                <span>Sous-total</span>
                <span className="font-medium">{totalPrice.toFixed(2)} €</span>
              </div>
              {appliedDiscount && discountAmount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Réduction ({appliedDiscount.code})</span>
                  <span className="font-medium">-{discountAmount.toFixed(2)} €</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Livraison</span>
                <span className="font-medium">
                  {shippingCost === 0 ? "Gratuite" : `${shippingCost.toFixed(2)} €`}
                </span>
              </div>
            </div>

            {priceAfterDiscount < 50 && priceAfterDiscount > 0 && (
              <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-[#353A3F]">
                Plus que <strong>{(50 - priceAfterDiscount).toFixed(2)} €</strong> pour la livraison
                gratuite
              </div>
            )}

            <div className="flex justify-between text-lg font-semibold text-gray-900 mb-6">
              <span>Total</span>
              <span>{finalTotal.toFixed(2)} €</span>
            </div>

            <button
              onClick={onCheckout}
              className="w-full py-3 bg-[#DC580A] text-white font-semibold rounded-lg hover:bg-[#B84808] transition-colors"
            >
              Passer la commande
            </button>

            <div className="mt-4 space-y-2 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gray-400" />
                <span>Paiement sécurisé</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gray-400" />
                <span>Livraison 24-48h</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gray-400" />
                <span>Retour gratuit sous 30 jours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
