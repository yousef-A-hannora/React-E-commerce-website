import toast from "react-hot-toast";
import "./productCard.css";
import { CartContext } from "../../Contexts";
import { useContext } from "react";

type ProductCardProps = {
  image:string;
  id: number;
  title: string;
  desc: string;
  price: number;
  rate: number;
};

const ProductCard = ({ image,id, title, desc, price, rate }: ProductCardProps) => {
  const stars = "⭐".repeat(Math.round(rate));

  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("no data provided");
  }
  const setCart = cartContext.setCart;

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} style={{width:'100%'}} />
      </div>

      <div className="product-content">
        <h2>{title}</h2>

        <p className="des">{desc}</p>

        <div className="rating">
          {stars}
          <span>{rate.toFixed(1)}</span>
        </div>

        <div className="footer">
          <span className="price">${price.toFixed(2)}</span>

          <button
            onClick={() => {
              toast("Product added to cart");
              setCart((prev) => {
                if (!prev) return prev;

                const existingProduct = prev.products.find(
                  (p) => p.productId === id,
                );

                if (existingProduct) {
                  return {
                    ...prev,
                    products: prev.products.map((p) =>
                      p.productId === id
                        ? { ...p, quantity: p.quantity + 1 }
                        : p,
                    ),
                  };
                }

                return {
                  ...prev,
                  products: [
                    ...prev.products,
                    {
                      productId: id,
                      quantity: 1,
                    },
                  ],
                };
              });
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
