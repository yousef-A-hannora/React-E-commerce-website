import { useEffect, useState, type ReactNode } from "react";
import toast from "react-hot-toast";
import type { cart } from "../types";
import { CartContext } from "../Contexts";

function loadCartFromStorage(): cart | null {
  try {
    const stored = localStorage.getItem("cartItems");
    if (!stored) return null;
    return JSON.parse(stored) as cart;
  } catch {
    return null;
  }
}

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<cart | null>(loadCartFromStorage);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const res = await fetch("https://fakestoreapi.com/carts/2");

        if (!res.ok) {
          const message = `Failed to fetch cart (${res.status} ${res.statusText})`;
          setError(message);
          toast.error(message);
          return;
        }

        const cartData: cart = await res.json();
        setCart(cartData);
      } catch (err) {
        const message = err instanceof Error ? err.message : "An unexpected error occurred while fetching cart";
        setError(message);
        toast.error(message);
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
    <CartContext.Provider value={{cart, error, addToCart, removeFromCart}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
