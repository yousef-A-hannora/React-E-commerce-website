type route={title:string,url:string}

const Navbar = ({routs}:{routs:route[]}) => {
  
  return (
    <nav>
      <ul className="nav-list">
        {routs.map((route) => (
          <li key={route.url}>
            <a href={route.url}>{route.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Navbar