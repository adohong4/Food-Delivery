import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Factors from '../../components/sections/dashboard/Factors/Factors.jsx';
import './Dashboard.css';





const Dashboard = ({ url }) => {
    return (
        <div className='Dashboard'>
            <Factors url={url} />
            {/* <ChartContainer url={url} /> */}
        </div>
    )
};

export default Dashboard;
