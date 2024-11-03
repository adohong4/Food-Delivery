import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import OrdersByStatus from '../../components/sections/dashboard/Factors/OrdersByStatus';
import OrderItem from '../../components/OrderItem';
import OrderPopup from '../../components/PopUp/OrderPopup';
import PrintInvoice from '../../components/PrintInvoice';
import './Orders.css';

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

        return () => clearInterval(interval);
    }, [currentPage]);

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
            <OrdersByStatus url={url} />
            <h3>Order Page</h3>
            <div className="order-list">
                {orders.map((order, index) => (
                    <OrderItem
                        key={index}
                        order={order}
                        openPopup={openPopup}
                        statusHandler={statusHandler}
                    />
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
                <OrderPopup
                    selectedOrder={selectedOrder}
                    closePopup={closePopup}
                    printInvoice={<PrintInvoice selectedOrder={selectedOrder} />}
                />
            )}
        </div>
    );
};

export default Orders;
