import { useEffect, useState } from "react";

import Header from "../components/Header/Header";
import Products from "../components/Products/Products";
import { BounceLoader } from "react-spinners";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productsData, setProductsData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        if (data) setIsLoading(false);
        setProductsData(data);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    })();
  }, []);
  return (
    <>
      {isLoading && (
        <div className="loader-container">
          <BounceLoader color="#9816c5" />
        </div>
      )}
      <Header />
      <Products products={productsData} />
    </>
  );
};

export default Home;
