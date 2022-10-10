import { useContext, useState } from "react";
import { AppContext } from "../components/AppContext";
import { loadStripe } from "@stripe/stripe-js";
import Button from "../components/Button";
import Input from "../components/Input"

const stripeLoadedPromise = loadStripe("pk_test_51LaKvpKZ1l40C8COqRQgLGFRfag6oNU7khLnSefHSHovXBdCeBxMzk68AiTrlpijTOwmMUl1nqhISh8itD9OF4h100PFmR02zH");

export default function Cart() {
  const app = useContext(AppContext);

  const totalPrice = app.cart.reduce(
    (total, product) => total + (product.price.integerValue || product.price.doubleValue)  * product.quantity,
    0
  );

  const [email, setEmail] = useState("");

  function handleFormSubmit(event) {
    event.preventDefault();

    const lineItems = app.cart.map((product) => {
      return { price: product.price_id.stringValue, quantity: product.quantity };
    });

    stripeLoadedPromise.then((stripe) => {
      stripe
        .redirectToCheckout({
          lineItems: lineItems,
          mode: "payment",
          successUrl: "https://react-supermirkot.netlify.app/",
          cancelUrl: "https://react-supermirkot.netlify.app/",
          customerEmail: email,
        })
        .then((response) => {
          // this will only log if the redirect did not work
          console.log(response.error);
        })
        .catch((error) => {
          // wrong API key? you will see the error message here
          console.log(error);
        });
    });
  }

  return (
    <div className="cart-layout">
      <div>
        <h1>Your Cart</h1>
        {app.cart.length === 0 && (
          <p>You have not added any product to your cart yet.</p>
        )}
        {app.cart.length > 0 && (
          <>
            <table className="table table-cart">
              <thead>
                <tr>
                  <th width="25%" className="th-product">
                    Product
                  </th>
                  <th width="20%">Unit price</th>
                  <th width="10%">Quanity</th>
                  <th width="25%">Total</th>
                </tr>
              </thead>
              <tbody>
                {app.cart?.map((product) => {
                  return (
                    <tr key={product.id.integerValue}>
                      <td>
                        <img
                          src={product.image.stringValue}
                          width="30"
                          height="30"
                          alt=""
                        />{" "}
                        {product.name.stringValue}
                      </td>
                      <td>€{product.price.integerValue || product.price.doubleValue}</td>
                      <td>{product.quantity}</td>
                      <td>
                        <strong>€{(product.price.integerValue || product.price.doubleValue) * product.quantity}</strong>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan="2"></th>
                  <th className="cart-highlight">Total</th>
                  <th className="cart-highlight">€{totalPrice}</th>
                </tr>
              </tfoot>
            </table>
            <form className="pay-form" onSubmit={handleFormSubmit}>
              <p>
                Enter your email and then click on pay and your products will be
                delivered to you on the same day!                
              </p>
              <Input
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                type="email"
                required
              />
              <Button type="submit">Pay</Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}