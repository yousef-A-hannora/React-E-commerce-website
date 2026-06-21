import ProductCard from "./productCard"

import { ProductContext } from "../../Contexts"
import { useContext } from "react"

const Products = () => {
  const productsContext = useContext(ProductContext)
  return (
    <div className="products-grid">
    {productsContext?.products?.map((value,index)=>{
        const {id,title,description,price,rating,image} = value
        return <ProductCard image={image} id={id} title={title} desc={description} price={price} rate={rating.rate} key={index}/>
    })}
    </div>
  )
}

export default Products