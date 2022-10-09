import {Link} from "react-router-dom";

export default function Home() {
    return (
        <div className="home-layout">
            <div>
            <h1>Online shopping simplified</h1>
            <p>
                Order your groceries from <em>SuperM</em> with our easy to use app,
                and get your products delivered straight to your doorstep.
            </p>
            <Link to={"/products"} className="btn btn-default">
                Start shopping
            </Link>
            </div>
            <img src="https://res.cloudinary.com/dwbilaknf/image/upload/v1665138468/react-supermarket/home.jpg" width="350" height="240" className="rounded home-image" alt="" />
        </div>
    )      
}