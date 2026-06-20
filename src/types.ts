export type product={
  "id": number,
  "title": string,
  "image":string,
  "price": number,
  "description": string,
  "category": string,
  "rating": {
    "rate": number,
    "count": number
  }
}

export type cart={
          id: number;
          userId: number;
          date: Date;
          products: {
            productId: number;
            quantity: number;
          }[];
          __v: number;
        }

export type CartContextType = {
  cart: cart | null;
  error: string | null;
  addToCart:(productId: number)=>void;
  removeFromCart:(productId: number)=>void;
};

export type ProductContextType = {
  products: product[]|null;
  error: string | null;
  addToProducts:(productId: number)=>void;
  UpdateProduct:(productId: number)=>void;
  removeFromProducts:(productId: number)=>void;
};