import ProductDetails from "./TheProductDetails";


export const ItemRow = ({
  id,
  title,
  price,
  category,
  image,
  quantity,
}: {
  id:number
  title: string;
  price: number;
  category: string;
  image: string;
  quantity: number;
}) => {
  return (
    <tr>
      <td>
        <ProductDetails id={id} image={image} title={title} category={category} />
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
