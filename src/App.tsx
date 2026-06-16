import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";

const App = () => {
  const [productsData, setProductsData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProductsData(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      <Header />
      <Products products={productsData} />
    </>
  );
};
export default App;
