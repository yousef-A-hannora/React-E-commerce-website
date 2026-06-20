import { ItemRow } from "./ItemRow";
import type { product } from "../../types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const GetProductData = async function (id: number): Promise<product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch product ${id} (${res.status} ${res.statusText})`);
  }

  return res.json();
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setError(null);
        const results = await Promise.all(
          products.map(async (item) => {
            const product = await GetProductData(item.productId);
            return {
              ...product,
              quantity: item.quantity,
            };
          }),
        );

        setProductDetails(results);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load product details";
        setError(message);
        toast.error(message);
      }
    };

    loadProducts();
  }, [products]);
  if (error) {
    return <p style={{color: "red", textAlign: "center", padding: "1rem"}}>{error}</p>;
  }

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
              id={product.id}
              title={product.title}
              price={product.price}
              category={product.category}
              image={product.image}
              quantity={product.quantity}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default CartBody;
