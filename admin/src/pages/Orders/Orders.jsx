import React from 'react';
import './Orders.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';
import ReactPaginate from 'react-paginate';

const Orders = ({ url }) => {
    const [orders, setOrders] = useState([]);
    const [totalOrder, setTotalOrder] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const fetchAllOrders = async (page = 1) => {
        const response = await axios.get(`${url}/api/table/orders?page=${page}&limit=10`);
        if (response.data.success) {
            setOrders(response.data.data);
            setTotalOrder(response.data.totalOrders);
            setTotalPages(response.data.totalPages);
        } else {
            toast.error("Error");
        }
    };

    const statusHandler = async (event, orderId) => {
        const selectedValue = event.target.value;

        const response = await axios.post(url + "/api/order/status", {
            orderId,
            status: selectedValue
        });

        if (response.data.success) {
            await fetchAllOrders(currentPage);

        }

        console.log(`Order ${orderId}: ${selectedValue}`);
    };

    useEffect(() => {
        fetchAllOrders(currentPage);
    }, [currentPage]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchAllOrders(currentPage);
        }, 60000); // 1 minutes = 60000 ms

        return () => clearInterval(interval); // reload when time runs out!
    },)

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1);
    };

    const openPopup = (order) => {
        setSelectedOrder(order);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedOrder(null);
    };

    return (
        <div className="order-name">
            <h3>Order Page</h3>
            <div className="order-list">
                {orders.map((order, index) => (
                    <div key={index} className="order-item" >
                        <img src={assets.parcel_icon} alt="" />
                        <div onClick={() => openPopup(order)}>
                            <p className="order-food-item">
                                {order.items.map((item, idx) => (
                                    <span key={idx}>
                                        {item.name} x {item.quantit}{idx < order.items.length - 1 ? ', ' : ''}
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
                ))}
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="<"
                renderOnZeroPageCount={null}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />

            {/* Popup for Order information */}
            {isPopupOpen && (
                <div className="popUp">
                    <div className="popup-order-content">
                        <h2>Order Details</h2>
                        {selectedOrder && (
                            <div>
                                <h4>Customer Information</h4>
                                <p>Name: {selectedOrder.address.firstName} {selectedOrder.address.lastName}</p>
                                <p>Phone: {selectedOrder.address.phone}</p>
                                <p>Address: {selectedOrder.address.street}, {selectedOrder.address.state}, {selectedOrder.address.country}, {selectedOrder.address.zipcode}</p>

                                {/* Hiển thị trạng thái với màu sắc */}
                                <h4>Status</h4>
                                <p style={{
                                    color: selectedOrder.status === "Wait for confirmation" ? "#2c3e50" :
                                        selectedOrder.status === "Food processing" ? "#d35400" :
                                            selectedOrder.status === "Out for delivery" ? "#f39c12" :
                                                selectedOrder.status === "Delivered" ? "#27ae60" :
                                                    "#ecf0f1"
                                }}>
                                    {selectedOrder.status}
                                </p>

                                <h4>Order Items</h4>
                                <ul>
                                    {selectedOrder.items.map((item, index) => (
                                        <li key={index}>
                                            {item.name} x {item.quantity} {/* Đảm bảo dùng 'quantity' đúng chính tả */}
                                        </li>
                                    ))}
                                </ul>
                                <h4>Total Amount</h4>
                                <p>${selectedOrder.amount}</p>
                                <button onClick={closePopup}>Close</button>
                            </div>
                        )}
                    </div>
                </div>

            )}
        </div>
    );
};

export default Orders;
