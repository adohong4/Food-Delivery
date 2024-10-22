import React, { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactStars from "react-rating-stars-component";

const TopComments = () => {
    const [comments, setComments] = useState([]);
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext)

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

    return (
        <div>
            <h2>Top 5 Comments</h2>
            <table className="Comment-list-table">
                <thead>
                    <tr className="table-header">
                        <th>Email</th>
                        <th>Order Id</th>
                        <th>Rating</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map((comment, index) => (
                        <tr key={index} className='table-row'>
                            <td>{comment.email}</td>
                            <td>{comment.orderId}</td>
                            <td>
                                <ReactStars
                                    count={5}
                                    value={comment.rating}
                                    size={24}
                                    activeColor="#ffd700"
                                    edit={false}
                                />
                            </td>
                            <td>{comment.comment}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TopComments;
