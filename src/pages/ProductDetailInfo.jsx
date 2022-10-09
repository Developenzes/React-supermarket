import { useOutletContext } from "react-router-dom";
import Button from "../components/Button";
import { useContext } from "react";
import { AppContext } from "../components/AppContext";

export default function ProductDetailInfo() {
  
  const product = useOutletContext();
  const app = useContext(AppContext);

  return (
      <>
        <p>
          {product?.description.stringValue} sold at <strong>€{product?.price.integerValue || product?.price.doubleValue}</strong> per piece.
        </p>
        <Button onClick={() => app.onProductAdd(product)} >€{product?.price.integerValue || product?.price.doubleValue}</Button>
      </>
    );
}