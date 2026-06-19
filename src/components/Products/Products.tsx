import ProductCard from "./productCard"

import { ProductContext } from "../../Contexts"
import { useContext } from "react"

const Products = () => {
  const products = useContext(ProductContext)
  return (
    <div style={{display:"flex",justifyContent:"space-around",padding:'20px',flexWrap:'wrap'}}>
    {products?.map((value,index)=>{
        const {id,title,description,price,rating,image} = value
        return <ProductCard image={image} id={id} title={title} desc={description} price={price} rate={rating.rate} key={index}/>
    })}
    </div>
  )
}

export default Products