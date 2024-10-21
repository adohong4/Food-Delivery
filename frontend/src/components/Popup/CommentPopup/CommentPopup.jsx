import React, { useContext, useState } from 'react';
import './CommentPopup.css';
import { assets } from '../../../assets/assets';
import { StoreContext } from '../../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactStars from "react-rating-stars-component";

const CommentPopup = ({ setShowComment }) => {
    const { url, setToken } = useContext(StoreContext);
    const [data, setData] = useState({

    });
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");


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
                        <p className="title">Order Review</p>
                        <img onClick={() => setShowComment(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <p><span>Đánh giá của bạn</span></p>
                    <div className="rating">
                        <ReactStars
                            name="rate1"
                            starCount={5}
                            value={rating}
                            onStarClick={(nextValue) => setRating(nextValue)}
                        />
                    </div>
                    <p>Nhận xét của bạn</p>
                    <textarea
                        placeholder="Enter your comment here"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn">
                    Accept
                </button>
            </form>
        </div>
    );
};

export default CommentPopup;

