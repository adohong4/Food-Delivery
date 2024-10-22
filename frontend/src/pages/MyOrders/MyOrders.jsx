import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
import CommentPopup from '../../components/Popup/CommentPopup/CommentPopup';

const MyOrders = () => {

    const { url, token } = useContext(StoreContext)
    const [data, setData] = useState([]);
    const [showCommentPopup, setShowCommentPopup] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(null);

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } })
        setData(response.data.data)
        console.log(response.data.data)
    }
    useEffect(() => {
        if (token) {
            fetchOrders()
        }
    }, [token])

    const handleCommentClick = (order) => {
        if (order.status === "Delivered") {
            setSelectedOrder(order);
            setShowCommentPopup(true);
        }
    }

    return (
        <div className='my-orders'>
            <h2>My orders</h2>
            <div className="container">
                {data.map((order, index) => {
                    return (
                        <div key={index} className="my-order-orders">
                            <img src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return item.name + " x " + item.quantity
                                }
                                else {
                                    return item.name + " x " + item.quantity + ", "
                                }
                            })}</p>
                            <p>${order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span><b> {order.status}</b></p>
                            <button onClick={fetchOrders} >Track Order</button>
                            <button onClick={() => handleCommentClick(order)} >Comment</button>
                        </div>
                    )
                })}
            </div>
            {showCommentPopup && <CommentPopup setShowComment={setShowCommentPopup} orderId={selectedOrder._id} />}
        </div>
    )
}

export default MyOrders
