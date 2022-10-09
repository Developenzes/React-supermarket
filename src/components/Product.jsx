import { Link } from "react-router-dom";
import Button from "./Button";
import { useContext} from "react";
import { AppContext } from "./AppContext";

export default function Product({details}) {
    const app = useContext(AppContext);

    const productFromCart = app.cart.find(product => product.id.integerValue === details.id.integerValue);
    const quantity = productFromCart ? productFromCart.quantity : 0;
       
    return (
        <div className="product">
            <div className="product-image-container">
                <Link to={`/products/${details.id.integerValue}/details`}><img src={details.image.stringValue} width="100" height="100" className="product-image" alt={details.name.stringValue}
                /></Link>
                <div className="product-quantity-container">
                <div className="product-quantity">{quantity}</div>
                </div>
            </div>
            <div className="product-info">
                <h3>{details.name.stringValue}</h3>
                <p>{details.description.stringValue}</p>
            </div>
            <div className="product-checkout">
                <div>
                    {quantity !== 0 && 
                    <Button outline className="product-delete" onClick={() => app.onProductDelete(details.id.integerValue)} >x</Button>}
                </div>
                <Button outline onClick={() => app.onProductAdd(details)}>€{details.price.integerValue || details.price.doubleValue}</Button>
            </div>
        </div>
    )
}
