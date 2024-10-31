import React from 'react';
import Chart from './Chart.jsx';
import LineChart from './LineChart.jsx';
import PieChart from './PieChart.jsx';

const ChartContainer = ({ url }) => {
    return (
        <div clas>
            <h1>Payment Charts</h1>
            <Chart url={url} />
            <LineChart url={url} />
            <PieChart url={url} />
        </div>
    );
};

export default ChartContainer;
