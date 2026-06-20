import { useEffect, useState, type ReactNode } from "react"
import { ProductContext } from "../Contexts"
import type { product } from "../types";
import { BounceLoader } from "react-spinners";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://fakestoreapi.com";

const ProductContextProvider = ({children}:{children:ReactNode}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProductsData] = useState<product[] | null>([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            setIsLoading(true);
            const [ProductsRes] = await Promise.all([
            fetch(`${API_BASE_URL}/products`),
            ]);
            if (!ProductsRes.ok) {
            setIsLoading(false);
            return;
            }
            const [ProductsData] = await Promise.all([ProductsRes.json()]);

            if (Array.isArray(ProductsData)) {
            setProductsData(ProductsData);
            }
            setIsLoading(false);
        } catch {
            setIsLoading(false);
        }
        };
        fetchData();
    }, []);
    const addToProducts = (id:number)=>{
        if(id) { /* TODO */ }
    }
        const UpdateProduct = (id:number)=>{
        if(id) { /* TODO */ }
    }
        const removeFromProducts = (id:number)=>{
        if(id) { /* TODO */ }
    }
  return (
    <ProductContext.Provider value={{products,addToProducts,UpdateProduct,removeFromProducts}}>
        {isLoading && <div className="loader-container"><BounceLoader color="#9816c5" /></div>}
        {children}
    </ProductContext.Provider>
  );
}

export default ProductContextProvider