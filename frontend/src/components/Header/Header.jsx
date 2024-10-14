import React, { useState } from 'react'
import './Header.css'

const Header = () => {

    return (
        <div className='nav'>
            <div className="nav-contents">
                <h2>Order your favourite food here</h2>
                <p>Choose from a diverse menu fearturing a detectable array of dishes crafted with the finest ingredient and culinary expertise. Our mission to satisfy your craving and elevate your dining experience, one delicious meal at time.</p>
                <button onClick={() => document.getElementById('explore-menu').scrollIntoView({ behavior: 'smooth' })}>
                    View menu
                </button>
            </div>
        </div>
    )
}

export default Header
