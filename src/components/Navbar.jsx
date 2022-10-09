import { useContext } from "react";
import { AppContext } from "./AppContext";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    const app = useContext(AppContext);

    const numberOfProducts = app.cart.reduce(
        (total, product) => total + product.quantity, 0
    );

    return (
        <nav className="navbar">           
            <NavLink to="/" className="nav-brand">SuperM</NavLink>
            <ul>
                <li className="nav-item">
                    <NavLink to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/about">About Us</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/products">Products</NavLink>
                </li>
                <li>
                    <NavLink className="nav-item nav-cart btn btn-accent" to="/cart">Cart ({numberOfProducts})</NavLink>
                </li>
            </ul>           
        </nav>
    )
}