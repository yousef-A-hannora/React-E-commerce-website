import { useContext } from "react";

import Header from "../components/Header/Header";
import Products from "../components/Products/Products";
import { CartContext } from "../Contexts";
import "./Home.css";

const Home = () => {

  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("no data provided");
  }
  const cart = cartContext.cart;
  console.log("Home cart:", cart);
  return (
    <>
      <Header />
      <div className="home-page">
        <div className="home-hero">
          <span className="badge">Shop Now</span>
          <h1>Discover Premium Products</h1>
          <p>
            Explore our curated collection of top-quality items at unbeatable
            prices. Find exactly what you need, all in one place.
          </p>
        </div>
        <Products/>
      </div>
    </>
  );
};

export default Home;
