import { useEffect, useState, type ReactNode } from "react"
import { ProductContext } from "../Contexts"
import type { product } from "../types";
import { BounceLoader } from "react-spinners";
import toast from "react-hot-toast";

const ProductContextProvider = ({children}:{children:ReactNode}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProductsData] = useState<product[] | null>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const res = await fetch("https://fakestoreapi.com/products");

            if (!res.ok) {
              const message = `Failed to fetch products (${res.status} ${res.statusText})`;
              setError(message);
              toast.error(message);
              return;
            }

            const productsData: product[] = await res.json();
            setProductsData(productsData);
        } catch (err) {
            const message = err instanceof Error ? err.message : "An unexpected error occurred while fetching products";
            setError(message);
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
        };
        fetchData();
    }, []);
    const addToProducts = (id:number)=>{
        if(id) {console.log("Added")}
        //TODO
    }
        const UpdateProduct = (id:number)=>{
        if(id) {console.log("Updated")}
        //TODO
    }
        const removeFromProducts = (id:number)=>{
        if(id) {console.log("Deleted")}
        //TODO
    }
  return (
    <ProductContext.Provider value={{products,error,addToProducts,UpdateProduct,removeFromProducts}}>
        {isLoading && <div className="loader-container"><BounceLoader color="#9816c5" /></div>}
        {error && <div className="error-container" style={{color: "red", textAlign: "center", padding: "1rem"}}>{error}</div>}
        {children}
    </ProductContext.Provider>
  );
}

export default ProductContextProvider