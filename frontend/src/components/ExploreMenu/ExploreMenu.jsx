import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
import { assets } from '../../assets/assets';
const ExploreMenu = ({ category, setCategory }) => {

    return (
        <div className='explore-menu' id="explore-menu">
            <div className='img-background'>
                <img src={assets.bg} alt="" />
            </div>  
            <h1>Explore our menu</h1>
            <p className='explore-menu-context'>Choose from a diverse menu fearturing a detectable array of dishes crafted with the finest ingredient and culinary expertise. Our mission to satisfy your craving and elevate your dining experience, one delicious meal at time.</p>
            <div className="explore-menu-list">
                {menu_list.map((item, index) => {
                    return (
                        <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className='explore-menu-list-item'>
                            <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ExploreMenu
