import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserFactors = ({ url }) => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalOrders: 0,
        totalFoods: 0,
        totalRevenue: 0,
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
            <h2>User Factors</h2>
            <div className="info-cards">
                <div className="info-card">
                    <h3>Total Users</h3>
                    <p>{stats.totalUsers}</p>
                </div>
                <div className="info-card">
                    <h3>Total Foods</h3>
                    <p>{stats.totalFoods}</p>
                </div>
                <div className="info-card">
                    <h3>Total Orders</h3>
                    <p>{stats.totalOrders}</p>
                </div>
                <div className="info-card">
                    <h3>Total Revenue/ Day</h3>
                    <p>${stats.totalRevenue.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default UserFactors;
