import Product from "../components/Product"
import useSWR from "swr";
import Loader from "../components/Loader"
import fetcher from "../fetcher";

export default function Products() {
  const {
    data: products = [],
    loading,
    error,
  } = useSWR(
    "https://firestore.googleapis.com/v1/projects/supermarket-f0bb7/databases/(default)/documents/supermarket",
    fetcher
  );

  return (
    <div className="products-layout">
      <h1>Products</h1>
      <p>Take a look at our products</p>
      <div className="products-grid">
        {loading && <Loader />}
        {error && (
          <p>
            There was an error loading the products. Please try again later.
          </p>
        )}
        {products.documents?.map((product) => { 
          
          return (
            <Product
              key={product.fields.id.integerValue}
              details={product.fields}
            />
          );
        })}
      </div>
    </div>
  );
}