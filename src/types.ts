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
  addToCart:(productId: number)=>void;
  removeFromCart:(productId: number)=>void;
};