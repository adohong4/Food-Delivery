import React, { useContext, useState } from 'react';
import './CommentPopup.css';
import { assets } from '../../../assets/assets';
import { StoreContext } from '../../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactStars from "react-rating-stars-component";

const CommentPopup = ({ setShowComment, orderId }) => {
    const { url, token } = useContext(StoreContext);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleRatingChange = (newRating) => {
        setRating(newRating); // Cập nhật giá trị rating
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra nếu rating là 0
        if (rating < 1) {
            toast.error("Vui lòng chọn đánh giá từ 1 đến 5.");
            return;
        }

        try {
            const response = await axios.post(
                `${url}/api/comment/addComment`,
                {
                    orderId, // Sử dụng orderId từ props
                    rating,
                    comment,
                },
                { headers: { token } } // Thêm token vào headers
            );

            if (response.data.success) {
                toast.success(response.data.message);
                setRating(0);
                setComment("");
                setShowComment(false); // Đóng popup sau khi gửi bình luận thành công
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error adding comment", error);
            toast.error("Bạn đã bình luận!!");
        }
    };

    return (
        <div className='address-popup'>
            <form className="address-popup-container" onSubmit={handleSubmit}>
                <div className="address-popup-title">
                    <p className="title">Order Review</p>
                    <img className="close-icon" onClick={() => setShowComment(false)} src={assets.cross_icon} alt="Close" />
                </div>
                <div className="popup-content">
                    <p className="review-title"><span>Your assessment</span></p>
                    <div className="rating">
                        <ReactStars
                            name="rate1"
                            starCount={5}
                            value={rating}
                            onChange={handleRatingChange}
                        />
                    </div>
                    <p className="comment-label">Your comments</p>
                    <textarea
                        className="comment-textarea"
                        placeholder="Enter your comment here"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn">Accept</button>
            </form>
        </div>

    );
};

export default CommentPopup;
