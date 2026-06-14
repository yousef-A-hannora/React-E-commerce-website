import "./App.css";
import "./index.css"
import Form from "./components/Form";
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";


const App = () => {
type products={
    title: string, desc: string, price: number, rate:number
}
const products:products[] = [
{ title: 'Pizza', desc: 'this is a pizza', price: 120, rate:3},
{ title: 'Laptop', desc: 'this is a laptop', price: 500,rate:4},
{ title: 'Mobile', desc: 'this is a mobile', price: 350,rate:5},
];
  return(
  <>
    <Header />
    <Form />
    <Products products={products} />
  </>);
};
export default App;
