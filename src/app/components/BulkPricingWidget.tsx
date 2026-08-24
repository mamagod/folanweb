import { useState } from "react";
import { TrendingDown, Lock, ChevronDown, Info } from "lucide-react";
import { BulkPriceTier } from "../data/products";
import { useAuth } from "../contexts/AuthContext";

interface BulkPricingWidgetProps {
  basePrice: number;
  quantity: number;
  bulkPricing: BulkPriceTier[];
}

export function BulkPricingWidget({ basePrice, quantity, bulkPricing }: BulkPricingWidgetProps) {
  const { isLoggedIn, login } = useAuth();
  const [showTable, setShowTable] = useState(false);

  if (!bulkPricing || bulkPricing.length <= 1) {
    return null;
  }

  // Find current tier
  const currentTier = [...bulkPricing]
    .sort((a, b) => b.minQuantity - a.minQuantity)
    .find((tier) => quantity >= tier.minQuantity) || bulkPricing[0];

  // Find next tier
  const nextTier = bulkPricing.find((tier) => tier.minQuantity > quantity);

  const currentDiscount = currentTier.discount;
  const currentPricePerUnit = basePrice * (1 - currentDiscount / 100);
  const totalSavings = (basePrice - currentPricePerUnit) * quantity;

  // Calculate pricing tiers with actual prices
  const pricingTiers = bulkPricing.map((tier) => ({
    ...tier,
    pricePerUnit: basePrice * (1 - tier.discount / 100),
  }));

  return (
    <div className="space-y-3">
      {/* Current discount banner */}
      {currentDiscount > 0 && (
        <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg px-3 py-2.5">
          <TrendingDown className="w-4 h-4 text-green-600 flex-shrink-0" />
          <div className="flex-1 text-sm">
            <span className="font-semibold text-green-700">
              Remise de {currentDiscount}% appliquée
            </span>
            <span className="text-green-600 ml-1">
              • Économie : {totalSavings.toFixed(2)} €
            </span>
          </div>
        </div>
      )}

      {/* Next tier teaser */}
      {nextTier && (
        <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2.5">
          <Info className="w-4 h-4 text-orange-600 flex-shrink-0" />
          <div className="text-sm text-orange-700">
            <span className="font-medium">
              Ajoutez {nextTier.minQuantity - quantity} pièce{nextTier.minQuantity - quantity > 1 ? "s" : ""}
            </span>
            <span className="text-orange-600 ml-1">
              pour obtenir {nextTier.discount}% de remise
            </span>
          </div>
        </div>
      )}

      {/* View bulk pricing table */}
      <div className="relative">
        <button
          onClick={() => setShowTable(!showTable)}
          className="w-full flex items-center justify-between text-sm text-[#DC580A] hover:text-[#B84808] font-medium transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <TrendingDown className="w-4 h-4" />
            Voir tous les prix dégressifs
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${showTable ? "rotate-180" : ""}`}
          />
        </button>

        {showTable && (
          <div className="mt-3 border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-700">Quantité</th>
                  <th className="px-4 py-2.5 text-right font-semibold text-gray-700">Prix unitaire</th>
                  <th className="px-4 py-2.5 text-right font-semibold text-gray-700">Remise</th>
                </tr>
              </thead>
              <tbody className={isLoggedIn ? "" : "relative"}>
                {!isLoggedIn && (
                  <tr>
                    <td colSpan={3} className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10">
                      <div className="h-full flex flex-col items-center justify-center gap-3 p-6">
                        <div className="w-12 h-12 bg-[#DC580A]/10 rounded-full flex items-center justify-center">
                          <Lock className="w-6 h-6 text-[#DC580A]" />
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-gray-900 mb-1">
                            Connectez-vous pour voir les prix dégressifs
                          </p>
                          <p className="text-xs text-gray-600 mb-3">
                            Profitez de remises exclusives sur vos achats en gros
                          </p>
                          <button
                            onClick={login}
                            className="px-4 py-2 bg-[#DC580A] text-white text-sm font-semibold rounded-lg hover:bg-[#B84808] transition-colors"
                          >
                            Se connecter
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
                {pricingTiers.map((tier, index) => {
                  const isCurrentTier = tier.minQuantity === currentTier.minQuantity;
                  const nextMinQty = pricingTiers[index + 1]?.minQuantity;
                  const rangeText = nextMinQty
                    ? `${tier.minQuantity} - ${nextMinQty - 1}`
                    : `${tier.minQuantity}+`;

                  return (
                    <tr
                      key={tier.minQuantity}
                      className={`border-b border-gray-100 last:border-0 ${
                        isCurrentTier ? "bg-green-50" : "hover:bg-gray-50"
                      } ${!isLoggedIn ? "blur-sm" : ""}`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {rangeText} pièces
                          {isCurrentTier && (
                            <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-semibold rounded">
                              Actuel
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-900">
                        {tier.pricePerUnit!.toFixed(2)} €
                      </td>
                      <td className="px-4 py-3 text-right">
                        {tier.discount > 0 ? (
                          <span className="text-green-600 font-semibold">-{tier.discount}%</span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {!isLoggedIn && (
              <div className="bg-gray-50 border-t border-gray-200 px-4 py-2 text-xs text-gray-500 text-center">
                Les prix affichés sont indicatifs. Connectez-vous pour voir vos tarifs personnalisés.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
