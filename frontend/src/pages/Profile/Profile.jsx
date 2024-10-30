import React, { useContext, useEffect, useState } from 'react'
import './Profile.css'
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';
import AddressPopup from '../../components/Popup/AddressPopup/AddressPopup'

const Profile = () => {
    const { url, token } = useContext(StoreContext)
    const [data, setData] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [image, setImage] = useState(false);
    const [showAddressPopup, setShowAddressPopup] = useState(false)

    const fetchAddresses = async () => {
        try {
            const response = await axios.get(`${url}/api/user/getAllUserAddresses`, {
                headers: { token }
            });
            if (response.data.success) {
                setAddresses(response.data.addresses);
                console.log(response.data.addresses);
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


    return (
        <div className='profile'>
            <div className="container my-4 d-flex">
                <div className="profile-info">
                    <h2 className='border-bt'>Profile Information</h2>
                    <div className="form-group">
                        <p>Upload Image</p>
                        <label htmlFor="image" className="d-block">
                            <img
                                src={image ? URL.createObjectURL(image) : assets.upload_area}
                                alt="Upload Preview"
                                className="img-thumbnail upload-preview"
                            />
                        </label>
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
                        <input type="text" name='name' className="form-control" placeholder='Type here' />
                    </div>

                    <div className="form-group">
                        <p>Email</p>
                        <input type="text" name='name' className="form-control" placeholder='Type here' />
                    </div>

                    <div className="form-group">
                        <p>Password</p>
                        <input type="text" name='name' className="form-control" placeholder='Type here' />
                    </div>

                    <button type="submit" className="btn btn-primary add-btn">
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
                                        <p><span>{address.firstname} {address.lastname}</span></p>
                                        <p>{address.street}</p>
                                        <p>{address.city}</p>
                                        <p>{address.state}</p>
                                        <p>{address.zipcode}</p>
                                        <p>{address.country}</p>
                                        <p>{address.phone}</p>
                                        <button onClick={fetchAddresses}>Edit</button>
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
