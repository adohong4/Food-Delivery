import React, { useContext, useEffect, useState } from 'react'
import './Profile.css'
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';
import AddressPopup from '../../components/Popup/AddressPopup/AddressPopup'

const Profile = () => {
    const { url, token } = useContext(StoreContext)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [image, setImage] = useState(false);
    const [showAddressPopup, setShowAddressPopup] = useState(false)

    //get info user by token
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${url}/api/user/profile`, {
                headers: { token }
            });
            if (response.data.success) {
                setName(response.data.data.name);
                setEmail(response.data.data.email);
                // console.log(response.data.data.name);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("There was an error fetching the addresses!", error);
            toast.error("Failed to fetch addresses.");
        }

    };

    // get info address
    const fetchAddresses = async () => {
        try {
            const response = await axios.get(`${url}/api/user/getAllUserAddresses`, {
                headers: { token }
            });
            if (response.data.success) {
                setAddresses(response.data.addresses);
                // console.log(response.data.addresses);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("There was an error fetching the addresses!", error);
            toast.error("Failed to fetch addresses.");
        }
    };

    //update profile
    const updateUserProfile = async () => {
        try {
            const response = await axios.put(`${url}/api/user/updateProfile`, {
                name,
                password
            }, {
                headers: { token }
            });
            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("There was an error updating the profile!", error);
            toast.error("Failed to update profile.");
        }
    };

    useEffect(() => {
        if (token) {
            fetchUserData();
            fetchAddresses();
        }
    }, [token]);


    return (
        <div className='profile'>
            <div className="container my-4 d-flex">
                <div className="profile-info">
                    <h2 className='border-bt'>Profile Information</h2>
                    <div className="form-group">
                        {/* <p>Upload Image</p>
                        <label htmlFor="image" className="d-block">
                            <img
                                src={image ? URL.createObjectURL(image) : assets.upload_area}
                                alt="Upload Preview"
                                className="img-thumbnail upload-preview"
                            />
                        </label> */}
                        <input
                            onChange={(e) => setImage(e.target.files[0])}
                            type="file"
                            id="image"
                            className="form-control-file"
                            style={{ display: 'none' }}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <p>Username</p>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Type here"
                            value={name} // Bind the value
                            onChange={(e) => setName(e.target.value)} // Update the state on change
                        />
                    </div>

                    <div className="form-group">
                        <p>Email</p>
                        <input
                            type="text"
                            name="email"
                            className="form-control"
                            placeholder="Type here"
                            value={email} // Bind the value
                            onChange={(e) => setEmail(e.target.value)} // Update the state on change
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <p>Password</p>
                        <input
                            type="password"
                            name='password'
                            className="form-control"
                            placeholder='Type here'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary add-btn" onClick={updateUserProfile}>
                        SAVE CHANGES
                    </button>
                </div>

                <div className="my-address">
                    <h2 className='border-bt'>My Address</h2>
                    <button
                        type="button"
                        className="btn btn-primary add-btn"
                        onClick={() => setShowAddressPopup(true)}
                    >
                        ADD ADDRESS
                    </button>
                    <div className="address-list">
                        {addresses.map((address, index) => {
                            return (
                                <div key={index} className="my-address-addresses">
                                    <img src={assets.parcel_icon} alt="" className="address-icon" />
                                    <div className="address-details">
                                        <p><span>{address.lastname} {address.firstname}</span></p>
                                        <div className='address-details-body'>
                                            <div className='address-details-left'>
                                                <p>{address.street}, {address.state}, {address.city}, {address.country}, {address.zipcode}, {address.phone}</p>
                                            </div>
                                            <div className='address-details-right'>
                                                <button onClick={fetchAddresses}>Edit</button>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
            <div className='background'>
                <div className='background-left'>
                    <img src={assets.anh4} alt="" />
                </div>
                <div className='background-right'>
                    <img src={assets.img1} alt="" />
                </div>
            </div>
            {showAddressPopup && <AddressPopup setShowAddress={setShowAddressPopup} />}
        </div>

    )
}

export default Profile;
