import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import DoughnutChart from '../../components/sections/dashboard/Statistics/DoughnutChart.jsx';
import PaymentLineChart from '../../components/sections/dashboard/Statistics/PaymentLineChart.jsx';
import UserFactors from '../../components/sections/dashboard/Factors/UserFactor.jsx';
import TopSeller from '../../components/sections/table/TopSeller/TopSeller.jsx';
import OrdersByStatus from '../../components/sections/dashboard/Factors/OrdersByStatus.jsx';
import TopComments from '../../components/sections/dashboard/Comment/Comment.jsx';
import Factors from '../../components/sections/dashboard/Factors/Factors.jsx';
import LineChart from '../../components/sections/dashboard/Statistics/LineChart.jsx';


const Dashboard = ({ url }) => {
    return (
        <div className='Dashboard'>
            <Factors url={url} />
            <div className='Chart'>
                <PaymentLineChart url={url} />
                <DoughnutChart url={url} />
            </div>
            <LineChart url={url} />
            <div>
                <UserFactors url={url} />
                <TopComments url={url} />
            </div>
            <div>
                <OrdersByStatus url={url} />
                <TopSeller url={url} />
            </div>

        </div>
    )
};

export default Dashboard;
