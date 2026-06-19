import "./App.css";
import "./index.css";
import "./components/Header/Header.css";
import Home from "./pages/Home";
import About from "./pages/About";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import { Toaster } from "react-hot-toast";
import { ProductContext } from "./Contexts";
import type { product } from "./types";
import { BounceLoader } from "react-spinners";
import CartContextProvider from "./Providers/TheCartContextProvider";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productsData, setProductsData] = useState<product[] | null>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [ProductsRes] = await Promise.all([
          fetch("https://fakestoreapi.com/products"),
        ]);
        const [ProductsData] = await Promise.all([ProductsRes.json()]);

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

  return (
    <>
      {isLoading && (
        <div className="loader-container">
          <BounceLoader color="#9816c5" />
        </div>
      )}
      <Toaster />
      <CartContextProvider>
      <ProductContext.Provider value={productsData}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </ProductContext.Provider>
      </CartContextProvider>
    </>
  );
};

export default App;
