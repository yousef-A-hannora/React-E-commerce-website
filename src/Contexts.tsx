import {createContext } from "react";
import type { CartContextType, product } from "./types";

export const CartContext = createContext<CartContextType | null>(null);


export const ProductContext =createContext<product[]|null>(null)

