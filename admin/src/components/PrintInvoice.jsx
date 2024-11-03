import React from 'react';

const PrintInvoice = ({ selectedOrder }) => {
    const printInvoice = () => {
        const printWindow = window.open('', '', 'width=600,height=400');
        printWindow.document.write(`
            <html>
            <head>
                <title>Invoice</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        color: #333;
                        margin: 0;
                        padding: 20px;
                    }
                    .invoice {
                        background: #fff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        max-width: 600px;
                        margin: auto;
                    }
                    h2 {
                        text-align: center;
                        color: #2c3e50;
                    }
                    h4 {
                        color: #34495e;
                        margin-top: 20px;
                    }
                    p, li {
                        margin: 5px 0;
                    }
                    .total-amount {
                        font-size: 18px;
                        font-weight: bold;
                        color: #27ae60;
                        text-align: right;
                    }
                    .divider {
                        margin: 20px 0;
                        height: 1px;
                        background-color: #e0e0e0;
                    }
                    .customer-info, .order-items {
                        margin-bottom: 20px;
                    }
                    ul {
                        list-style-type: none;
                        padding: 0;
                    }
                    li {
                        padding: 5px;
                        border-bottom: 1px solid #e0e0e0;
                    }
                </style>
            </head>
            <body>
                <div class="invoice">
                    <h2>Order Details</h2>
                    <div class="customer-info">
                        <h4>Customer Information</h4>
                        <p><strong>Name:</strong> ${selectedOrder.address.firstName} ${selectedOrder.address.lastName}</p>
                        <p><strong>Phone:</strong> ${selectedOrder.address.phone}</p>
                        <p><strong>Address:</strong> ${selectedOrder.address.street}, ${selectedOrder.address.state}, ${selectedOrder.address.country}, ${selectedOrder.address.zipcode}</p>
                    </div>
                    
                    <div class="divider"></div>

                    <div class="order-items">
                        <h4>Order Items</h4>
                        <ul>
                            ${selectedOrder.items.map(item => `
                                <li>${item.name} x ${item.quantity}</li>
                            `).join('')}
                        </ul>
                    </div>
                    
                    <div class="divider"></div>

                    <div class="total-amount">
                        <h4>Total Amount:</h4>
                        <p>$${selectedOrder.amount}</p>
                    </div>
                </div>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <button onClick={printInvoice}>Print Invoice</button>
    );
};

export default PrintInvoice;
