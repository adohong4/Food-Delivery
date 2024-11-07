import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });
    const [addresses, setAddresses] = useState([]);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const fetchAddresses = async () => {
        try {
            const response = await axios.get(`${url}/api/user/getAllUserAddresses`, {
                headers: { token }
            });
            if (response.data.success) {
                setAddresses(response.data.addresses);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("There was an error fetching the addresses!", error);
            toast.error("Failed to fetch addresses.");
        }
    };

    useEffect(() => {
        if (token) {
            fetchAddresses();
        }
    }, [token]);

    const handleAddressChange = (event) => {
        const selectedAddress = JSON.parse(event.target.value);
        setData({
            firstName: selectedAddress.firstname,
            lastName: selectedAddress.lastname,
            email: selectedAddress.email || '', // Handle cases where email might be undefined
            street: selectedAddress.street,
            city: selectedAddress.city,
            state: selectedAddress.state,
            zipcode: selectedAddress.zipcode,
            country: selectedAddress.country,
            phone: selectedAddress.phone
        });
    };

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        });
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2,
        };
        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
        } else {
            alert("Error");
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/cart');
        } else if (getTotalCartAmount() === 0) {
            navigate('/cart');
        }
    }, [token]);

    return (
        <form onSubmit={placeOrder} className="place-order">
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className='Place-address'>
                    <select onChange={handleAddressChange} defaultValue="">
                        <option value="" disabled>Select your delivery address</option>
                        {addresses.map((address, index) => (
                            <option key={index} value={JSON.stringify(address)}>
                                {address.firstname} {address.lastname}, {address.street}, {address.state}, {address.city}, {address.country}, {address.zipcode}, {address.phone}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="multi-fields">
                    <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
                    <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
                </div>
                <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
                <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
                <div className="multi-fields">
                    <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
                    <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
                </div>
                <div className="multi-fields">
                    <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
                    <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
                </div>
                <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Free</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    <button type="submit" className="place-order-btn">Place Order</button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
