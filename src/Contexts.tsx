import {createContext } from "react";
import type { cart } from "./types";

export const NameContext = createContext("Yousef")

type CartContextType = {
  cart: cart | null;
  setCart: React.Dispatch<React.SetStateAction<cart | null>>;
};

export const CartContext =
  createContext<CartContextType | null>(null);