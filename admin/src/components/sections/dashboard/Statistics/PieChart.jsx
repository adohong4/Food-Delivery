import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Title, Tooltip, Legend);

const PieChart = ({ url }) => {
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
                    'rgba(75, 192, 192, 0.6)', // Màu cho Total Users
                    'rgba(255, 99, 132, 0.6)', // Màu cho Total Orders
                    'rgba(255, 206, 86, 0.6)', // Màu cho Total Foods
                    'rgba(54, 162, 235, 0.6)', // Màu cho Total Revenue
                ],
            },
        ],
    };

    return (
        <div className="user-factors">
            <div className="orders-status">
                <h3>Orders by Status</h3>
                <div className='orders'>
                    {/* Chart for User Factors */}
                    <div className='orders-right-2'>
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

export default PieChart;