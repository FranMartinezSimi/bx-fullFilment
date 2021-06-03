import React from 'react';

import Chart from "react-apexcharts";
import PropTypes from 'prop-types';

const ColumnChart = ({data}) => {
  return (
    <div id="chart">
      <Chart options={data.options} series={data.series} type="bar" height={350} />
    </div>
  );
}

ColumnChart.propTypes = {
  data: PropTypes.object
}

export default ColumnChart;