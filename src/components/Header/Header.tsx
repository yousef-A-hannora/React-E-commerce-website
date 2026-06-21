import Logo from "./Logo";
import Navbar from "./Navbar";
import "./Header.css";


const Header = () => {
  const routs: { title: string; url: string }[] = [
    { title: "Home", url: "/" },
    { title: "About", url: "/about" },
    { title: "Blog", url: "/blog" },
    { title: "Cart", url: "/cart" },
    { title: "User", url: "/user" },
  ];

  return (
    <header className="header">
      <Logo />
      <Navbar routs={routs} />
    </header>
  );
};

export default Header;
