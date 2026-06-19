import { useEffect, useState, type ReactNode } from "react";
import toast from "react-hot-toast";
import type { cart } from "../types";
import { CartContext } from "../Contexts";
const InitialCartItems = localStorage.getItem("cartItems");

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<cart | null>(
    InitialCartItems ? JSON.parse(InitialCartItems) : [],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [CartRes] = await Promise.all([
          fetch("https://fakestoreapi.com/carts/2"),
        ]);
        const [CartData] = await Promise.all([CartRes.json()]);
        setCart(CartData);
      } catch (err) {
        console.log(err);
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
