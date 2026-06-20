import CartBody from "../components/cartComponents/CartBody";
import CartTop from "../components/cartComponents/CartTop";
import OrderSummary from "../components/cartComponents/OrderSummary";
import "../components/cartComponents/cart.css";
import Header from "../components/Header/Header";
import { useCartContext } from "../hooks/useCartContext";
import { useProductContext } from "../hooks/useProductContext";
import type { cart, product } from "../types";

const cities = [
  { city: "cairo", cost: 20 },
  { city: "Zagazig", cost: 30 },
  { city: "suez", cost: 40 },
  { city: "Alex", cost: 35 },
  { city: "Monufia", cost: 25 },
];

const calculateTotal = (products:product[],cart:cart):number=>{
  return cart?.products?.reduce((sum,currentPruduct)=>{
          const price = products?.find((pr)=>{return pr.id === currentPruduct.productId})?.price
          if(!price) return 0;
          return sum + price* currentPruduct.quantity
        },0)
      }
        
const Cart = () => {
  const { cart } = useCartContext();
  const { products } = useProductContext();
  console.log("Cart page cart:", cart);
  return (
    <>
      <Header />
      <div className="cartContainer">
        <div style={{ display: "flex", flexDirection: "column", width: "70%" }}>
          {cart ? <CartTop itemsCount={cart?.products.length} /> : 0}
          {cart ? (
            <CartBody products={cart?.products} />
          ) : (
            <h1>No Items to Show</h1>
          )}
        </div>
        <OrderSummary Total={products && cart ? Math.round(calculateTotal(products,cart)) : 0 } cities={cities} />
      </div>
    </>
  );
};

export default Cart;
