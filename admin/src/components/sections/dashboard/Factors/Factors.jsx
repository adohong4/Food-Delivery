import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
// import './Factors.css';

const Factors = ({ url }) => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalOrders: 0,
        totalFoods: 0,
        totalRevenue: 0,
        ordersByStatus: []
    });

    const fetchFactors = async () => {
        try {
            const response = await axios.get(`${url}/api/statistical/all`);

            if (response.data.success) {
                setStats(response.data.data);
                console.log('Fetched Factors:', response.data.data); // Kiểm tra dữ liệu trong console
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
        <div className="Factors">
            <h2>User Factors</h2>
            <p>Total Users: {stats.totalUsers}</p>
            <p>Total Foods: {stats.totalFoods}</p>
            <p>Total Orders: {stats.totalOrders}</p>
            <p>Total Revenue: {stats.totalRevenue}</p>
            <h3>Orders by Status</h3>
            <ul>
                {stats.ordersByStatus.map((status, index) => (
                    <li key={index}>{status._id}: {status.count}</li>
                ))}
            </ul>
        </div>
    );
};

export default Factors;