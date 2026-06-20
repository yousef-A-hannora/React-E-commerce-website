import Header from "../components/Header/Header";
import Products from "../components/Products/Products";
import { useCartContext } from "../hooks/useCartContext";

const Home = () => {
  const { cart } = useCartContext();
  console.log("Home cart:", cart);
  return (
    <>
      <Header />
      <Products/>
    </>
  );
};

export default Home;
