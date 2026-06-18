import "./cart.css";

const CartTop = ({ itemsCount }: { itemsCount: number }) => {
  return (
    <div className="Header">
      <div className="headerTop">
        <h1>Shopping cart</h1>
        <h3>{itemsCount} Items</h3>
      </div>
      <hr className="style-two" />
    </div>
  );
};

export default CartTop;
