import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';

const ColumnChart = ({ data }) => (
  <div id="chart">
    <Chart options={data.options} series={data.series} type="bar" height={350} />
  </div>
);
ColumnChart.defaultProps = {
  data: {},
};
ColumnChart.propTypes = {
  data: PropTypes.shape({
    options: {},
    series: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default ColumnChart;
