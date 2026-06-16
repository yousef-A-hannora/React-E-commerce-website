import "./productCard.css"

type ProductCardProps = {
  title: string;
  desc: string;
  price: number;
  rate: number;
};

const ProductCard = ({
  title,
  desc,
  price,
  rate,
}: ProductCardProps) => {
  const stars = "⭐".repeat(Math.round(rate));

  return (
    <div className="product-card">
      <div className="product-image">
        <span>🛍️</span>
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

          <button>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;