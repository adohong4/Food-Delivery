import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';


export const FoodItem = ({ id, name, price, description, image }) => {

    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext)

    const handleAddToCart = (id) => {
        addToCart(id);
        toast.success('Added to Cart!');
    };

    const handleRemoveFromCart = (id) => {
        removeFromCart(id);
        toast.error('Removed from Cart');
    }

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img src={url + "/images/" + image} alt="" className="food-item-image" />
                {!cartItems[id]
                    ? <img className='add' onClick={() => handleAddToCart(id)} src={assets.add_icon_white} alt="" />
                    : <div className='food-item-counter'>
                        <img onClick={() => handleRemoveFromCart(id)} src={assets.remove_icon_red} alt="" />
                        <p>{cartItems[id]}</p>
                        <img onClick={() => handleAddToCart(id)} src={assets.add_icon_green} alt="" />
                    </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className="food-item-description">{description}</p>
                <p className="food-item-price">${price}</p>
            </div>
        </div>
    )
}



export default FoodItem
