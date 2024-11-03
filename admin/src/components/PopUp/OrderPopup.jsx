import React from 'react';
import PrintInvoice from '../PrintInvoice';

const OrderPopup = ({ selectedOrder, closePopup, printInvoice }) => {
    return (
        <div className="popUp">
            <div className="popup-order-content">
                <h2>Order Details</h2>
                {selectedOrder && (
                    <div>
                        <h4>Customer Information</h4>
                        <p>Name: {selectedOrder.address.firstName} {selectedOrder.address.lastName}</p>
                        <p>Phone: {selectedOrder.address.phone}</p>
                        <p>Address: {selectedOrder.address.street}, {selectedOrder.address.state}, {selectedOrder.address.country}, {selectedOrder.address.zipcode}</p>

                        {/* color status display */}
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
                                    {item.name} x {item.quantity}
                                </li>
                            ))}
                        </ul>
                        <h4>Total Amount</h4>
                        <p>${selectedOrder.amount}</p>
                        <div className='btn-group'>
                            <button onClick={closePopup}>Close</button>
                            <PrintInvoice selectedOrder={selectedOrder} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderPopup;
