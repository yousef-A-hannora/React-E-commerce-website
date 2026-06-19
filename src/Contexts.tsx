import {createContext } from "react";
import type { CartContextType, ProductContextType } from "./types";

export const CartContext = createContext<CartContextType | null>(null);


export const ProductContext =createContext<ProductContextType|null>(null)

