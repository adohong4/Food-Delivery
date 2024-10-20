import React, { useContext, useState } from 'react';
import './AddressPopup.css';
import { assets } from '../../../assets/assets';
import { StoreContext } from '../../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddressPopup = ({ setShowAddress }) => {
    const { url, setToken } = useContext(StoreContext);
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const onAddress = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        let newUrl = `${url}/api/user/addUserAddress`; // Giả sử endpoint của bạn là /api/address
        const response = await axios.post(newUrl, data, {
            headers: { token }
        });
        if (response.data.success) {
            toast.success('Address added successfully!');
            setShowAddress(false);
        } else {
            toast.error(response.data.message);
        }
    };

    return (
        <div className='address-popup'>
            <form onSubmit={onAddress} className="address-popup-container">
                <div className="place-order-left">
                    <div className="address-popup-title">
                        <p className="title">Delivery Information</p>
                        <img onClick={() => setShowAddress(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <div className="multi-fields">
                        <input required name="firstName" type="text" placeholder='First name' onChange={onChangeHandler} />
                        <input required name="lastName" type="text" placeholder='Last name' onChange={onChangeHandler} />
                    </div>
                    <input required name="street" type="text" placeholder='Street' onChange={onChangeHandler} />
                    <div className="multi-fields">
                        <input required name="city" type="text" placeholder='City' onChange={onChangeHandler} />
                        <input required name="state" type="text" placeholder='State' onChange={onChangeHandler} />
                    </div>
                    <div className="multi-fields">
                        <input required name="zipcode" type="text" placeholder='Zip code' onChange={onChangeHandler} />
                        <input required name="country" type="text" placeholder='Country' onChange={onChangeHandler} />
                    </div>
                    <input required name="phone" type="text" placeholder='Phone' onChange={onChangeHandler} />
                </div>
                <button type="submit" className="btn">
                    ADD ADDRESS
                </button>
            </form>
        </div>
    );
};

export default AddressPopup;

