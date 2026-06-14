import Logo from "./Logo"
import Navbar from "./Navbar"
import "./Header.css"

const Header = () => {
  return (
    <div style={{display:'flex',justifyContent:"space-between",padding:"5px 20px"}}>
        <Logo />
        <Navbar />
    </div>
  )
}

export default Header