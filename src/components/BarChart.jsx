import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2' ;
class BarChart extends React.Component {
    render() { 
        return (
        <div>
            <h1>BarChart</h1>
            <Bar data={{
                labels:['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            }} width={600} height={400}/>
        </div>
        );
    }
}
 
export default BarChart;