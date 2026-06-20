
import "./productCard.css";
import { useCartContext } from "../../hooks/useCartContext";

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

  const { addToCart } = useCartContext();

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
            onClick={()=>addToCart(id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
