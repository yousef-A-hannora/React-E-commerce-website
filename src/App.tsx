import "./App.css";
import "./index.css";
import "./components/Header/Header.css";
import Home from "./pages/Home";
import About from "./pages/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import { Toaster } from "react-hot-toast";
import CartContextProvider from "./Providers/TheCartContextProvider";
import ProductContextProvider from "./Providers/ProductContextProvider";

const App = () => {


  return (
    <>
      <Toaster />
      <ProductContextProvider>
      <CartContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </CartContextProvider>
      </ProductContextProvider>
    </>
  );
};

export default App;
