import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Comment-admin.css';
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
        autoplay: true,       
        autoplaySpeed: 2500,
    };

    return (
        <div>
            <div className='cmt-main'>
                <div className='cmt-right'>
                    <h2>Our Customers’ Insights</h2>
                    {comments.length > 0 ? (
                        <Slider {...settings}>
                            {comments.map((comment) => (
                                <div key={comment.id || `${comment.email}-${comment.orderId}`} className="comment-slide">
                                    <div className="comment-content">
                                        <strong>Email:</strong> <span>{comment.email}</span>
                                        <strong>Order Id:</strong> <span>{comment.orderId}</span>
                                        <div>
                                            <strong>Rating:</strong>
                                            <ReactStars
                                                count={5}
                                                value={comment.rating}
                                                size={24}
                                                activeColor="#ffd700"
                                                edit={false}
                                            />
                                        </div>
                                        <strong>Comment:</strong>
                                        <p>{comment.comment}</p>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <p>No comments available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopComments;
