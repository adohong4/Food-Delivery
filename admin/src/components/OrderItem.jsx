import React from 'react';
import { assets } from '../assets/assets';

const OrderItem = ({ order, openPopup, statusHandler }) => {
    return (
        <div className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div onClick={() => openPopup(order)}>
                <p className="order-food-item">
                    {order.items.map((item, idx) => (
                        <span key={idx}>
                            {item.name} x {item.quantity}{idx < order.items.length - 1 ? ', ' : ''}
                        </span>
                    ))}
                </p>
                <p className="order-item-name">
                    {order.address.firstName} {order.address.lastName}
                </p>
                <p>
                    {order.address.street}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                </p>
            </div>
            <div className="order-item-phone">{order.address.phone}</div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                style={{
                    backgroundColor: order.status === "Wait for confirmation" ? "#2c3e50" :
                        order.status === "Food processing" ? "#d35400" :
                            order.status === "Out for delivery" ? "#f39c12" :
                                order.status === "Delivered" ? "#27ae60" :
                                    "#ecf0f1",
                    color: ["Wait for confirmation", "Food processing", "Out for delivery", "Delivered"].includes(order.status) ? "white" : "black"
                }}
            >
                <option value="Wait for confirmation">Wait for confirmation</option>
                <option value="Food processing">Food processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
            </select>
        </div>
    );
};

export default OrderItem;
