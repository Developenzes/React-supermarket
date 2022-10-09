
import useSWR from "swr";
import fetcher from "../fetcher";
import Loader from "../components/Loader";
import {  
  useParams, NavLink, Outlet
} from "react-router-dom";


export default function ProductDetails() {
  const params = useParams();

  const { data: product = {}, loading, error } = useSWR(
    `https://firestore.googleapis.com/v1/projects/supermarket-f0bb7/databases/(default)/documents/productinfo/${params.id}`,
    fetcher
  );

  if (error) {
    return <p>Could not load product details. Please try again later.</p>;
  }

  return (
    <div className="product-details-layout">
      <div>
        {loading && <Loader />}
        <h2>{product.fields?.name.stringValue}</h2>
        <img src={product.fields?.image.stringValue} width="125" height="125" className="product-details-image" alt="product name here"
        />
      </div>
      <div>
        <div className="tabs">
          <ul>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "tab-active" : "")}
                to="details"
              >
                Details
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "tab-active" : "")}
                to="nutrition"
              >
                Nutrition
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "tab-active" : "")}
                to="storage"
              >
                Storage
              </NavLink>
            </li>
          </ul>          
        </div>
        <Outlet context={product.fields} />
      </div>
    </div>
  )
}