import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const LineChart = ({ url }) => {
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
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul ', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: '2023',
                data: [
                    40,
                    50,
                    15,
                    25,
                    35,
                    22,
                    35,
                    44,
                    34,
                    60,
                    50,
                    55
                ],
                fill: false, // Không tô màu dưới đường
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)', // Màu đường
                borderWidth: 2,
                tension: 0.35,
            },
            {
                label: '2024', // Thêm nhãn cho đường mới
                data: [
                    30,
                    40,
                    20,
                    35,
                    19,
                    30,
                    25,
                    50,
                    40,
                    70,
                    60,
                    65
                ], // Dữ liệu cho đường mới
                fill: false,
                backgroundColor: 'rgba(255, 99, 132, 0.6)', // Màu nền cho đường mới
                borderColor: 'rgba(255, 99, 132, 1)', // Màu đường mới
                borderWidth: 2,
                tension: 0.35,
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
                        <Line data={chartData} options={{
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

export default LineChart;