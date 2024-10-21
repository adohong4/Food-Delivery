import React from 'react';
import ChartComponent from './chartComponent';

const ChartContainer = ({ url }) => {
    return (
        <div>
            <h1>Payment Charts</h1>
            <ChartComponent url={url} />
        </div>
    );
};

export default ChartContainer;
