import { ItemRow } from "./ItemRow";
import type { product } from "../../types";
import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://fakestoreapi.com";

const GetProductData = async function (id: number): Promise<product | null> {
  try {
    if (!Number.isFinite(id) || id <= 0) return null;
    const res = await fetch(`${API_BASE_URL}/products/${encodeURIComponent(String(id))}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data && typeof data === "object" && typeof data.id === "number") {
      return data;
    }
    return null;
  } catch {
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
