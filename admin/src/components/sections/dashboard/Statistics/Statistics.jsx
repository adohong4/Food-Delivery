import React from 'react';
import Chart from './Chart.jsx';

const ChartContainer = ({ url }) => {
    return (
        <div>
            <h1>Payment Charts</h1>
            <Chart url={url} />
        </div>
    );
};

export default ChartContainer;
