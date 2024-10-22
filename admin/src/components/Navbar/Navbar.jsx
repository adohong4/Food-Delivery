import React from 'react'
import './Navbar.css'
import { assets } from "../../assets/assets"

const Navbar = () => {
    return (
        <div>
            <div className="section-nav">
                <div className="navbar">
                    <img className="logo" src={assets.logo} alt="Logo" />
                    <img className="profile" src={assets.profile_image} alt="Profile" />
                </div>
            </div>
            {/* <div className="section-banner">
                <div className="banner">
                    <h1 className="welcome-text">Welcome to Admin</h1>
                </div>
            </div> */}
        </div>
    )
}

export default Navbar
