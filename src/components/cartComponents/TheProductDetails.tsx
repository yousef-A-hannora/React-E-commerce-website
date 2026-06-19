
const ProductDetails = ({title,category,image}:{title:string,category:string,image:string}) => {
  return (
    <div>
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <a href={`/categories/${category}`}><h4>{category}</h4></a>
        <a>remove</a>
    </div>
  )
}

export default ProductDetails