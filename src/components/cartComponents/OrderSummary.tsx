import CoponCOmponent from "./CoponCOmponent";

const OrderSummary = ({Total,cities}:{Total:number,cities:{city:string,cost:number}[]}) => {


  return <div className="orderSummary">
    <h2>Order Summary</h2>
    <hr className="style-two"/>
    <div>
        <h3>items</h3>
        <h3>{Total} Total</h3>
    </div>
    <form>
        <label>Shipping</label>
        <input list="cities"/>
        <datalist id="cities">
            {
                cities.map((city)=>{
                    return <option value={`${city.city} - ${city.cost}`}/>
                })
            }
        </datalist>
        <CoponCOmponent />
        <hr className="style-two"/>
        <div>
        <h3>items</h3>
        <h3>{Total} Total</h3>
        </div>
        <button>CHECKOUT</button>
    </form>
  </div>;
};

export default OrderSummary;
