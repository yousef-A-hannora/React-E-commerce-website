import CartBody from "../components/cartComponents/CartBody";
import CartTop from "../components/cartComponents/CartTop";
import OrderSummary from "../components/cartComponents/OrderSummary";
import "../components/cartComponents/cart.css";
import Header from "../components/Header/Header";
import { useContext } from "react";
import { ProductContext } from "../Contexts";
import {CartContext} from '../Contexts'
import type { cart, product } from "../types";
import "../components/cartComponents/cart.css";

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
  const cartContext = useContext(CartContext);
  const productsContext = useContext(ProductContext)
  if (!cartContext) {
    throw new Error("no data provided");
  }
  const { cart } = cartContext;
  console.log("Cart page cart:", cart);
  return (
    <>
      <Header />
      <div className="cart-page">
        <div className="cart-hero">
          <span className="badge">Your Cart</span>
          <h1>Review Your Items</h1>
          <p>
            Take a moment to review your selected products before proceeding
            to checkout.
          </p>
        </div>
        <div className="cartContainer">
          <div style={{ display: "flex", flexDirection: "column", width: "70%" }}>
            {cart ? <CartTop itemsCount={cart?.products.length} /> : 0}
            {cart ? (
              <CartBody products={cart?.products} />
            ) : (
              <h1 className="cart-empty">No Items to Show</h1>
            )}
          </div>
          <OrderSummary Total={productsContext?.products && cart ? Math.round(calculateTotal(productsContext?.products,cart)) : 0 } cities={cities} />
        </div>
      </div>
    </>
  );
};

export default Cart;
