import { useContext } from "react";

import Header from "../components/Header/Header";
import Products from "../components/Products/Products";
// import { BounceLoader } from "react-spinners";
import { CartContext } from "../Contexts";

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
      <Products/>
    </>
  );
};

export default Home;
