import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Factors from '../../components/sections/dashboard/Factors/Factors.jsx';
import ChartContainer from '../../components/sections/dashboard/Statistics/Statistics.jsx';
import './Analytics.css';
import TopSeller from '../../components/sections/table/TopSeller/TopSeller.jsx';




const Analytics = ({ url }) => {
    return (
        <div className='Analytics'>
            <Factors url={url} />
            <ChartContainer url={url} />
            <TopSeller url={url} />
        </div>
    )
};

export default Analytics;
