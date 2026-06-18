import "./App.css";
import "./index.css";
import Home from "./pages/Home";
import About from "./pages/About";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import { Toaster } from "react-hot-toast";
import type { cart } from "./types";
import { CartContext } from "./Contexts";

const App = () => {
  const [cart, setCart] = useState<cart | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/carts/2");
        const resData: cart = await res.json();
        setCart(resData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Toaster />
      <CartContext.Provider value={{cart,setCart}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
      </BrowserRouter>
      </CartContext.Provider>
    </>
  );
};

export default App;
