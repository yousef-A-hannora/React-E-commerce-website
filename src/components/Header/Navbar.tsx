type route={title:string,url:string}
import { CartContext } from "../../Contexts";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Navbar = ({routs}:{routs:route[]}) => {
  const cartContext = useContext(CartContext)
if(!cartContext) {
  throw new Error("no data provided")
}
const {cart,} = cartContext
  return (
    <nav>
      <ul className="nav-list">
        {routs.map((route) => (
          
          <li key={route.url}>
            <Link to={route.url}>{route.title==="Cart" ? `${route.title}(${cart?.products?.length})`:route.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Navbar