import { CiShoppingCart } from "react-icons/ci";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

function Header() {
    return (
        <>
            <nav className="navbar navbar-expand-sm header">
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
                        <form className="d-flex"  >
                            <input className="form-control me-2" type="text" placeholder="Search" />
                            <button className="btn btn-search" type="button">Search</button>
                        </form>
                        <ul className="navbar-nav ms-auto" >
                            <li className="nav-item">
                                <Link to="/cart" className="nav-link">
                                    <CiShoppingCart style={{ fontSize: "35px" }} />
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/account" className="nav-link">
                                    <MdAccountCircle style={{ fontSize: "35px" }} />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>


            </nav >

        </>
    )
}
export default Header;