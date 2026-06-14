import ProductCard from "./productCard"

type products={
    title: string, desc: string, price: number, rate:number
}

const Products = ({products}:{products:products[]}) => {
  return (
    <div style={{display:"flex",justifyContent:"space-around"}}>
    {products.map((value,index)=>{
        const {title,desc,price,rate} = value
        return <ProductCard title={title} desc={desc} price={price} rate={rate} key={index}/>
    })}
    </div>
  )
}

export default Products