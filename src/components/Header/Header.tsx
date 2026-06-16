import Logo from "./Logo"
import Navbar from "./Navbar"
import "./Header.css"

const Header = () => {
  const routs: {title:string,url:string}[] = [
{ title: 'Home', url: '/' },
{ title: 'About', url: '/about' },
{ title: 'Contact', url: '/contact' },
{ title: 'Blog', url: '/blog' },]

  return (
    <header className="header">
        <Logo />
        <Navbar routs={routs}/>
    </header>
  )
}

export default Header