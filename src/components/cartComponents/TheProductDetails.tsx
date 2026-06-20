import { useCartContext } from "../../hooks/useCartContext"

const ProductDetails = ({id,title,category,image}:{id:number,title:string,category:string,image:string}) => {
  const { removeFromCart } = useCartContext()
  return (
    <div>
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <a href={`/categories/${category}`}><h4>{category}</h4></a>
        <button onClick={()=>removeFromCart(id)}>remove</button>
    </div>
  )
}

export default ProductDetails