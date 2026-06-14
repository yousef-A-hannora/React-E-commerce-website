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
    <div style={{display:'flex',justifyContent:"space-between",padding:"5px 20px"}}>
        <Logo />
        <Navbar routs={routs}/>
    </div>
  )
}

export default Header