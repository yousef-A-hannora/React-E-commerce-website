import "./App.css";
import "./index.css";
import "./components/Header/Header.css"
import Home from "./pages/Home";
import About from "./pages/About";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import { Toaster } from "react-hot-toast";
import type { cart } from "./types";
import { CartContext, ProductContext } from "./Contexts";
import type { product } from "./types";
import { BounceLoader } from "react-spinners";

const App = () => {
  const [cart, setCart] = useState<cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [productsData, setProductsData] = useState<product[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [ProductsRes,CartRes] =await Promise.all([
          fetch("https://fakestoreapi.com/products"),
          fetch("https://fakestoreapi.com/carts/2")
        ])
        const [ProductsData,CartData] = await Promise.all([
          ProductsRes.json(), CartRes.json()
        ])

        if (ProductsData){
        setIsLoading(false);
        }
        setProductsData(ProductsData);
        setCart(CartData);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
    {isLoading && <div className="loader-container">
          <BounceLoader color="#9816c5" />
        </div>}
  <Toaster />
  <ProductContext.Provider value={productsData}>
      <CartContext.Provider value={{ cart, setCart }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </CartContext.Provider>
  </ProductContext.Provider>
    </>
  );
};

export default App;
