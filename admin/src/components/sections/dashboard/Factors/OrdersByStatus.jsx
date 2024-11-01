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
        <div className="user-factors">
            <div className="orders-status">
                <h3>Orders by Status</h3>
                <div className="info-cards">
                    <ul>
                        {stats.ordersByStatus.map((status, index) => (
                            <div className="info-card">
                                <li key={index}>
                                    <span className="status-label">{status._id}</span>
                                </li>
                                <li key={index}>
                                    <span className="status-count">{status.count}</span>
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
