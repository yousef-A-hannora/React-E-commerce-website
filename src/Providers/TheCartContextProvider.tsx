import { useEffect, useState, type ReactNode } from "react";
import toast from "react-hot-toast";
import type { cart } from "../types";
import { CartContext } from "../Contexts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://fakestoreapi.com";

function getInitialCart(): cart | null {
  try {
    const stored = localStorage.getItem("cartItems");
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    if (parsed && typeof parsed === "object" && Array.isArray(parsed.products)) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<cart | null>(getInitialCart());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [CartRes] = await Promise.all([
          fetch(`${API_BASE_URL}/carts/2`),
        ]);
        if (!CartRes.ok) return;
        const [CartData] = await Promise.all([CartRes.json()]);
        if (CartData && typeof CartData === "object" && Array.isArray(CartData.products)) {
          setCart(CartData);
        }
      } catch {
        // Network error — retain existing cart state
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId: number) => {
    toast("Product add to cart successfully")
    setCart((prev) => {
      if (!prev) return prev;

      const exists = prev.products.find((p) => p.productId === productId);

      if (exists) {
        return {
          ...prev,
          products: prev.products.map((p) =>
            p.productId === productId ? { ...p, quantity: p.quantity + 1 } : p,
          ),
        };
      }

      return {
        ...prev,
        products: [...prev.products, { productId, quantity: 1 }],
      };
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        products: prev.products.filter((p) => p.productId !== productId),
      };
    });
  };


  return (
    <CartContext.Provider value={{cart, addToCart, removeFromCart}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
