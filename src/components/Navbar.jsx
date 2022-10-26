import { useContext, useState } from "react";
import { AppContext } from "./AppContext";
import { NavLink } from "react-router-dom";
import Hamburger from 'hamburger-react';

export default function Navbar() {
    const app = useContext(AppContext);
    const [isOpen, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(!isOpen)
    }

    const numberOfProducts = app.cart.reduce(
        (total, product) => total + product.quantity, 0
    );

    return (
        <nav className="navbar">           
            <NavLink to="/" className="nav-brand">SuperM</NavLink>
            <ul className={isOpen ? "active" : ""}>
                <li className="nav-item">
                    <NavLink to="/" onClick={handleClick}>Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/about" onClick={handleClick}>About Us</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/products" onClick={handleClick}>Products</NavLink>
                </li>
                <li>
                    <NavLink className="nav-item nav-cart btn btn-accent" to="/cart" onClick={handleClick}>Cart ({numberOfProducts})</NavLink>
                </li>
            </ul>
            <Hamburger toggled={isOpen} toggle={setOpen} />            
        </nav>
    )
}