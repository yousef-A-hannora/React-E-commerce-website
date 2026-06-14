type route={title:string,url:string}

const Navbar = (prob:{routs:route[]}) => {
  
  return (
    <>
      <ul>
        {prob.routs.map((object, index) => {
          return (
            <a href={object.url} key={String(index)}>
              <li>{object.title}</li>
            </a>
          );
        })}
      </ul>
    </>
  );
};

export default Navbar;
