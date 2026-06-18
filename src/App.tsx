import "./App.css";
import "./index.css";
import Home from "./pages/Home";
import About from "./pages/About";

import {BrowserRouter, Routes, Route} from "react-router-dom"
import Cart from "./pages/Cart";

const App = () => {
  return (
    <>
<BrowserRouter>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/cart" element={<Cart />} />

</Routes>
</BrowserRouter>
    </>
  );
};
export default App;
