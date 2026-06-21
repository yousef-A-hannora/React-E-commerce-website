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

export type UserType={
    address: {
      geolocation: {
        lat: string,
        long: string
      },
      city: string,
      street: string,
      number: number,
      zipcode: string
    },
    id: 1,
    email: string,
    username: string,
    password: string,
    name: {
      firstname: string,
      lastname: string
    },
    phone: string,
    __v: number
  }

export type BlogPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type requistState = {
  isLoading:boolean,
  payload:unknown,
  error:string
}

export type CartContextType = {
  cart: cart | null;
  addToCart:(productId: number)=>void;
  removeFromCart:(productId: number)=>void;
};

export type ProductContextType = {
  products: product[]|null;
  addToProducts:(productId: number)=>void;
  UpdateProduct:(productId: number)=>void;
  removeFromProducts:(productId: number)=>void;
};