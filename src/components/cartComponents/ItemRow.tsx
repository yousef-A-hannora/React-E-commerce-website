import ProductDetails from "./productDetails";

export const ItemRow = ({
  title,
  price,
  category,
  image,
  quantity,
}: {
  title: string;
  price: number;
  category: string;
  image: string;
  quantity: number;
}) => {
  return (
    <tr>
      <td>
        <ProductDetails image={image} title={title} category={category} />
      </td>{" "}
      <td>
        <h3>{quantity}</h3>
      </td>
      <td>{price}</td>
      <td>
        {price*quantity}
      </td>
    </tr>
  );
};
