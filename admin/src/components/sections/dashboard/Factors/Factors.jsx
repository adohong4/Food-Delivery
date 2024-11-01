import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Title, Tooltip, Legend);

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

    // Prepare data for the bar chart
    const chartData = {
        labels: ['Total Users', 'Total Orders', 'Total Foods', 'Total Revenue'],
        datasets: [
            {
                label: 'User Factors',
                data: [
                    stats.totalUsers,
                    stats.totalOrders,
                    stats.totalFoods,
                    stats.totalRevenue,
                ],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)', // Color for Total Users
                    'rgba(255, 99, 132, 0.6)', // Color for Total Orders
                    'rgba(255, 206, 86, 0.6)', // Color for Total Foods
                    'rgba(54, 162, 235, 0.6)', // Color for Total Revenue
                ],
            },
        ],
    };

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
                <div>

                </div>
            </div>
            <div className="orders-status">
                <h3>Orders by Status</h3>
                <div className='orders'>
                    <div className='orders-left'>
                        <ul>
                            {stats.ordersByStatus.map((status, index) => (
                                <li key={index}>
                                    <span className="status-label">{status._id}</span> <span className="status-count">{status.count}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Chart for User Factors */}
                    <div className='orders-right'>
                        <Pie data={chartData} options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: 'User Factors Overview',
                                },
                            },
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Factors;
