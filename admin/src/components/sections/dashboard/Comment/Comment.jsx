import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Comment.css';
import { toast } from 'react-toastify';
import ReactStars from "react-rating-stars-component";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TopComments = ({ url }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchTopComments = async () => {
            try {
                const response = await axios.get(`${url}/api/comment/topComment`);
                if (response.data.success) {
                    setComments(response.data.data);
                } else {
                    toast.error('Error fetching top comments');
                }
            } catch (error) {
                console.error('Error fetching top comments:', error);
                toast.error('Error fetching top comments');
            }
        };

        fetchTopComments();
    }, [url]);

    // Cấu hình cho Slick Slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div>

            <div className='cmt-main'>
                <div className='cmt-right'>
                    <h2>Our Customers’ Insights</h2>
                    <Slider {...settings}>
                        {comments.map((comment, index) => (
                            <div key={index} className="comment-slide">
                                <div className="comment-content"> {/* Khối chứa các thẻ <p> */}
                                    <p><strong>Email:</strong> {comment.email}</p>
                                    <p><strong>Order Id:</strong> {comment.orderId}</p>
                                    <p>
                                        <strong>Rating:</strong>
                                        <ReactStars
                                            count={5}
                                            value={comment.rating}
                                            size={24}
                                            activeColor="#ffd700"
                                            edit={false}
                                        />
                                    </p>
                                    <p><strong>Comment:</strong> {comment.comment}</p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>

    );
};

export default TopComments;
