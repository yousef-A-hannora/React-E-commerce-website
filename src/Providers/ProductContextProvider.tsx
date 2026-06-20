import { useEffect, useState, type ReactNode } from "react"
import { ProductContext } from "../Contexts"
import type { product } from "../types";
import { BounceLoader } from "react-spinners";
import { fetchJson } from "../utils/api";

const ProductContextProvider = ({children}:{children:ReactNode}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProductsData] = useState<product[] | null>([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            setIsLoading(true);
            const ProductsData = await fetchJson<product[]>("/products");

            if (ProductsData) {
            setIsLoading(false);
            }
            setProductsData(ProductsData);
        } catch (err) {
            setIsLoading(false);
            console.log(err);
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
    <ProductContext.Provider value={{products,addToProducts,UpdateProduct,removeFromProducts}}>
        {isLoading && <div className="loader-container"><BounceLoader color="#9816c5" /></div>}
        {children}
    </ProductContext.Provider>
  );
}

export default ProductContextProvider