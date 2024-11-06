import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const OrdersByStatus = ({ url }) => {
    const [stats, setStats] = useState({
        ordersByStatus: []
    });

    const fetchFactors = async () => {
        try {
            const response = await axios.get(`${url}/api/statistical/all`);
            if (response.data.success) {
                setStats(response.data.data);
                console.log('Fetched Factors:', response.data.data);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching Factors", error);
            toast.error("Failed to fetch Factors.");
        }
    };

    useEffect(() => {
        fetchFactors();
    }, [url]);

    return (
        <div className="dashboard-stats">
            <div className="order-status">
                <h3>Orders by Status</h3>
                <div className="status-cards">
                    <ul className="status-list">
                        {stats.ordersByStatus.map((status) => (
                            <div className="status-card" key={status._id}>
                                <li>
                                    <span className="status-name">{status._id}</span>
                                </li>
                                <li>
                                    <span className="status-amount">{status.count}</span>
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default OrdersByStatus;
