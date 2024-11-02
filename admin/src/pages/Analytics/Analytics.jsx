import React, { useEffect, useState } from 'react';
import Factors from '../../components/sections/dashboard/Factors/Factors.jsx';
import ChartContainer from '../../components/sections/dashboard/Statistics/Statistics.jsx';
import './Analytics.css';


const Analytics = ({ url }) => {
    return (
        <div className='Analytics'>
            <Factors url={url} />
            <ChartContainer url={url} />
        </div>
    )
};

export default Analytics;
