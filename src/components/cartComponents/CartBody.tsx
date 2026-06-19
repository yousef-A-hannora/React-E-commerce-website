import { ItemRow } from "./ItemRow";
import type { product } from "../../types";
import { useEffect, useState } from "react";

const GetProductData = async function (id: number): Promise<product | null> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

type ProductWithQuantity = product & {
  quantity: number;
};

const CartBody = ({
  products,
}: {
  products: { productId: number; quantity: number }[];
}) => {
  const [productDetails, setProductDetails] = useState<ProductWithQuantity[]>(
    [],
  );
  useEffect(() => {
    const loadProducts = async () => {
      const results = await Promise.all(
        products.map(async (item) => {
          const product = await GetProductData(item.productId);

          if (!product) return null;

          return {
            ...product,
            quantity: item.quantity,
          };
        }),
      );

      const validProducts = results.filter(
        (item): item is ProductWithQuantity => item !== null,
      );

      setProductDetails(validProducts);
    };

    loadProducts();
  }, [products]);
  return (
    <table>
      <thead>
        <tr>
          <th>Product details</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {productDetails.map((product) => {
          return (
            <ItemRow
              id={product?.id}
              title={product?.title}
              price={product?.price}
              category={product?.category}
              image={product?.image}
              quantity={product.quantity}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default CartBody;
