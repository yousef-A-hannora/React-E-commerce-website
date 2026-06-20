type route={title:string,url:string}
import { useCartContext } from "../../hooks/useCartContext";
import { Link } from "react-router-dom";

const Navbar = ({routs}:{routs:route[]}) => {
const {cart} = useCartContext()
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