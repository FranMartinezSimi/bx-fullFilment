import React from 'react'

import Chart from "react-apexcharts";

const ColumnChart = ({data}) => {
  return (
    <div id="chart">
      <Chart options={data.options} series={data.series} type="bar" height={350} />
    </div>
  );
}
 
export default ColumnChart;