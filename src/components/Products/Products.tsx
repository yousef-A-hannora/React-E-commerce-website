import ProductCard from "./productCard"

import type {product} from '../../types'

const Products = ({products}:{products:product[]}) => {
  return (
    <div style={{display:"flex",justifyContent:"space-around",padding:'20px',flexWrap:'wrap'}}>
    {products.map((value,index)=>{
        const {title,description,price,rating} = value
        return <ProductCard title={title} desc={description} price={price} rate={rating.rate} key={index}/>
    })}
    </div>
  )
}

export default Products