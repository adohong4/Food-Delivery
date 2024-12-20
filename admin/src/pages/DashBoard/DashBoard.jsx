import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import DoughnutChart from '../../components/sections/dashboard/Statistics/DoughnutChart.jsx';
import PaymentLineChart from '../../components/sections/dashboard/Statistics/PaymentLineChart.jsx';
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
            </div>

            <div>
                {/* <TopComments url={url} /> */}
                <LineChart url={url} />
            </div>
            <div className='section_das'>
                <OrdersByStatus url={url} />
                <TopSeller url={url} />
            </div>
            <DoughnutChart url={url} />

        </div>
    )
};

export default Dashboard;
