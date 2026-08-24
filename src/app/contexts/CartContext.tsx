import { createContext, useContext, useState, ReactNode } from "react";
import { Product, ProductVariant } from "../data/products";

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeFromCart: (productId: number, variantLabel: string) => void;
  updateQuantity: (productId: number, variantLabel: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, variant: ProductVariant, quantity = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.variant.label === variant.label
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      return [...prev, { product, variant, quantity }];
    });
  };

  const removeFromCart = (productId: number, variantLabel: string) => {
    setItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.variant.label === variantLabel)
      )
    );
  };

  const updateQuantity = (productId: number, variantLabel: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantLabel);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.variant.label === variantLabel
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((sum, item) => {
      let effectivePrice = item.variant.price;

      // Apply bulk discount if available
      if (item.product.bulkPricing) {
        const tier = [...item.product.bulkPricing]
          .sort((a, b) => b.minQuantity - a.minQuantity)
          .find((t) => item.quantity >= t.minQuantity);
        if (tier && tier.discount > 0) {
          effectivePrice = item.variant.price * (1 - tier.discount / 100);
        }
      }

      return sum + effectivePrice * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
