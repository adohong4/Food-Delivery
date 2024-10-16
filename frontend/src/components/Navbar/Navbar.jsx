import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import 'bootstrap/dist/css/bootstrap.min.css';



const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState("home");

    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/")

    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="col-2 navbar-brand">
                <img src={assets.logo} alt="Logo" className="logo" />
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mx-auto">
                    <li className="nav-item">
                        <Link to="/" onClick={() => { setMenu("home"); }} className={`nav-link ${menu === "home" ? "active" : ""}`}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a href="#explore-menu" onClick={() => { setMenu("menu"); }} className={`nav-link ${menu === "menu" ? "active" : ""}`}>
                            Menu
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#app-download" onClick={() => { setMenu("mobile-app"); }} className={`nav-link ${menu === "mobile-app" ? "active" : ""}`}>
                            Mobile App
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#footer" onClick={() => { setMenu("contact-us"); }} className={`nav-link ${menu === "contact-us" ? "active" : ""}`}>
                            Contact Us
                        </a>
                    </li>
                </ul>

                <div className="col-xl-2 navbar-right align-items-center">
                    <div className="navbar-search-icon col-2 me-1">
                        <Link to="/cart">
                            <img src={assets.basket_icon} alt="Cart" />
                        </Link>
                        <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                    </div>
                    {!token ? (
                        <button className="btn btn-signin btn-primary" onClick={() => {
                            console.log("Sign in clicked");
                            setShowLogin(true);
                        }}>
                            Sign in
                        </button>
                    ) : (
                        <div className="navbar-profile col-2 dropdown">
                            <img
                                src={assets.profile_icon}
                                alt="Profile"
                                className="dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            />
                            <ul className="navbar-profile-dropdown dropdown-menu">
                                <li onClick={() => navigate('/myorders')} className="dropdown-item">
                                    <img src={assets.bag_icon} alt="" /><p>Orders</p>
                                </li>
                                <hr className="dropdown-divider" />
                                <li onClick={logout} className="dropdown-item">
                                    <img src={assets.logout_icon} alt="" /><p>Logout</p>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
