import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const PaymentLineChart = ({ url }) => {
    const [payments, setPayments] = useState([]);
    const [period, setPeriod] = useState('day');

    const fetchPayments = async (selectedPeriod) => {
        try {
            const response = await axios.get(`${url}/api/chart/payment?period=${selectedPeriod}`);
            if (response.data.success) {
                setPayments(response.data.payments);
                console.log('Fetched Payments:', response.data.payments);
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching payments", error);
        }
    };

    useEffect(() => {
        fetchPayments(period);
    }, [period, url]); // Fetch payments when period or url changes

    // Prepare data for the bar chart
    const chartData = {
        labels: payments.map(payment => {
            if (period === 'day') return payment.date;
            if (period === 'week') return `Week ${payment.week} ${payment.year}`;
            if (period === 'month') return `Month ${payment.month} ${payment.year}`;
            if (period === 'year') return `Year ${payment.year}`;
            return '';
        }),
        datasets: [
            {
                label: 'Total Amount',
                data: payments.map(payment => payment.totalAmount),
                fill: false, // Không tô màu dưới đường
                backgroundColor: 'rgba(255, 69, 0, 1)',
                borderColor: 'rgba(255, 69, 0, 1)', // Màu đường
                borderWidth: 2,
                tension: 0.35,
            },
        ],
    };

    return (
        <div className="user-factors">
            <div className="orders-status">
                <h3>Payments Overview</h3>
                <div className="period-buttons">
                    {/* Buttons for selecting period */}
                    <button onClick={() => setPeriod('day')}>Day</button>
                    <button onClick={() => setPeriod('week')}>Week</button>
                    <button onClick={() => setPeriod('month')}>Month</button>
                    <button onClick={() => setPeriod('year')}>Year</button>
                </div>
                <div className='orders'>
                    {/* Chart for Payments */}
                    <div className='orders-right-2'>
                        <Line data={chartData} options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: 'Payments Overview',
                                },
                            },
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentLineChart;
