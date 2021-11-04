import { useState, useEffect } from 'react';
import clientFetch from 'lib/client-fetch';

import PageLayout from 'components/Templates/PageLayout';
import Card from 'components/Molecules/Card';
import Chart from 'react-apexcharts';
import Alert from 'components/Atoms/AlertMessage';
import Spinner from 'components/Atoms/Spinner';

const homeResolutor = () => {
  const [statisticsData, setTotalStatisticsData] = useState([]);
  const [legendData, setLegendData] = useState([]);
  const [errorChart, setErrorChart] = useState(false);
  const [data, setData] = useState({
    series: [],
    options: {
      colors: ['#FF7E44', '#3363FF', '#155C80', '#2294CC', '#7092FF', '#408D5C', '#2BB9FF'],
      labels: ['Producto erróneo', 'Producto faltante.', 'Incluir carta', 'Detalle de envío', 'Despacho retrasado', 'Detener envío', 'Cambio de dirección'],
      chart: {
        type: 'donut',
        height: 350,
        zoom: {
          enabled: false,
        },
        events: {
          mounted: (charts) => {
            charts.windowResizeHandler();
          },
        },
      },
      legend: {
        show: false,
      },
      stroke: {
        show: false,
      },
    },
  });

  let componentChart;

  if (errorChart) {
    componentChart = <Alert className="mt-5" type="warning" message="Ooopss! no se encontraron datos para crear visualizar motivos..." />;
  } else {
    componentChart = <Spinner />;
  }
  const chart = () => {
    clientFetch('ticket/v1/dashboard/getDashboard', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
    })
      .then((dashData) => {
        const statistics = dashData.totales;
        const originalLegend = dashData.chart;
        setTotalStatisticsData([
          {
            img: '/boxOpenIcon.png',
            number: statistics.abiertos,
            state: 'Abiertos',
          },
          {
            img: '/boxClosedIcon.png',
            number: statistics.resueltos,
            state: 'Resueltos',
          },
          {
            img: '/boxInfoIcon.png',
            number: statistics.total,
            state: 'Total',
          },
        ]);
        if (dashData.chart.series.length === 0) {
          setErrorChart(true);
          return;
        }
        setData({
          series: dashData.chart.series,
          options: {
            colors: ['#FF7E44', '#3363FF', '#155C80', '#2294CC', '#7092FF', '#408D5C', '#2BB9FF'],
            labels: dashData.chart.label,
            chart: {
              type: 'donut',
              height: 350,
              zoom: {
                enabled: false,
              },
              events: {
                mounted: (charts) => {
                  charts.windowResizeHandler();
                },
              },
            },
            legend: {
              show: false,
            },
            stroke: {
              show: false,
            },
          },
        });
        const legendFormated = originalLegend.label.map((value, index) => ({
          img: `/res-ico-${index}`,
          name: value,
          value: originalLegend.series[index],
        }));
        setLegendData(legendFormated);
      })
      .catch((err) => {
        console.log(err);
        setErrorChart(true);
      });
  };
  useEffect(() => {
    chart();
  }, []);
  return (
    <PageLayout title="Bienvenido a Blue360" description="Bienvenido a Blue360" noBreadcrumb>
      <div className="row align-items-stretch">
        <div className="col-md-9 pt-5">
          <Card
            className="shadow my-5"
          >
            <h4 className="display-font">Visualización de motivos</h4>
            {statisticsData.length > 0 && !errorChart ? (
              <div className="row align-items-center">
                <div className="col-md-6">
                  <Chart
                    options={data.options}
                    series={data.series}
                    type="donut"
                    height={350}
                  />
                </div>
                <div className="col-lg-6">
                  <div className="pt-4 ps-4" style={{ borderRadius: 15, border: '1px solid #D6E0FF' }}>
                    <p>Todos los motivos</p>
                    <ul className="d-flex flex-row flex-wrap w-100">
                      {legendData && legendData.map((item) => (
                        <li key={item.name} className="w-50">
                          <ul className="d-flex mb-2">
                            <li className="pe-4">
                              <img src={`${item.img}.png`} alt={item.name} />
                            </li>
                            <li className="m-0">
                              <h4 style={{ fontSize: 21 }}>{item.value}</h4>
                              <p className="m-0">
                                <small style={{ fontSize: 10 }}>
                                  {item.name}
                                </small>
                              </p>
                            </li>
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : componentChart}
          </Card>
        </div>
        <div className="col-md-3 pt-5">
          <Card className="mt-5">
            <p>Totales</p>
          </Card>
          <Card className="mt-4">
            <p>Cerrados</p>
          </Card>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Card>
            <p className="display-font">
              <b>
                Tickets Recientes
              </b>
            </p>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default homeResolutor;
