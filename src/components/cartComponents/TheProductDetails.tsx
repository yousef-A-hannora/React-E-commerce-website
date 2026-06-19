import { useContext } from "react"
import { CartContext } from "../../Contexts"

const ProductDetails = ({id,title,category,image}:{id:number,title:string,category:string,image:string}) => {
  const cartContext = useContext(CartContext)
  if(!cartContext) throw new Error("No Cart Passed")
  const removeFromCart = cartContext.removeFromCart
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