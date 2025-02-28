import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

function Header() {
    return (
        <>
            <nav className="navbar navbar-expand-sm ">
                <div className="container-fluid">
                    <Link to="/" >
                        <img src={logo} alt="Logo" className="rounded-pill logo" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav me-auto" >
                            <li className="nav-item">
                                <Link to="/" className="nav-link">
                                    HOME
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/list/product-hot" className="nav-link">
                                    PRODUCT HOT
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/about" className="nav-link">
                                    ABOUT
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contact" className="nav-link">
                                    CONTACT
                                </Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="text" placeholder="Search"></input>
                            <button className="btn btn-search" type="button">Search</button>
                        </form>
                    </div>
                </div>


            </nav>

        </>
    )
}
export default Header;