import { useEffect, useState } from "react";
import CartBody from "../components/cartComponents/CartBody";
import CartTop from "../components/cartComponents/CartTop";
import OrderSummary from "../components/cartComponents/OrderSummary";
import "../components/cartComponents/cart.css";
import type { cart } from "../types";

const cities = [
  { city: "cairo", cost: 20 },
  { city: "Zagazig", cost: 30 },
  { city: "suez", cost: 40 },
  { city: "Alex", cost: 35 },
  { city: "Monufia", cost: 25 },
];

const Cart = () => {
  const [data, setData] = useState<cart | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/carts/1");
        const resData:cart  = await res.json();
        setData(resData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

// console.log("Render:", data);
  return (
    <div className="cartContainer">
      <div style={{ display: "flex", flexDirection: "column", width: "70%" }}>
        {data ? <CartTop itemsCount={data?.products.length} /> : 0}
        {data ? <CartBody products={data?.products}/> : <h1>No Items to Show</h1>}
      </div>
      <OrderSummary Total={550} cities={cities} />
    </div>
  );
};

export default Cart;
