import {createContext } from "react";
import type { cart } from "./types";
import type { product } from "./types";


type CartContextType = {
  cart: cart | null;
  setCart: React.Dispatch<React.SetStateAction<cart | null>>;
};

export const ProductContext =createContext<product[]|null>(null)

export const CartContext =
  createContext<CartContextType | null>(null);