import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import clientFetch from 'lib/client-fetch';

import PageLayout from 'components/Templates/PageLayout';
import Card from 'components/Molecules/Card';
import Chart from 'react-apexcharts';
import Spinner from 'components/Atoms/Spinner';

const homeResolutor = () => {
  const history = useHistory();
  const [statisticsData, setTotalStatisticsData] = useState([]);
  const [legendData, setLegendData] = useState([]);
  const [data, setData] = useState({
    series: [150, 41, 35, 62, 133, 91, 148],
    options: {
      colors: ['#FF7E44', '#3363FF', '#155C80', '#2294CC', '#7092FF', '#408D5C', '#2BB9FF'],
      labels: ['Producto erróneo', 'Producto faltante.', 'Incluir carta', 'Detalle de envío', 'Despacho retrasado', 'Detener envío', 'Cambio de dirección'],
      chart: {
        type: 'donut',
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      legend: {
        show: false,
      },
      stroke: {
        show: false,
      },
      // tooltip: {
      //   custom({
      //     series, seriesIndex, dataPointIndex,
      //   }) {
      //     return `${'<div class="arrow_box">'
      //       + '<span>'}${series[seriesIndex][dataPointIndex]}</span>`
      //       + '</div>';
      //   },
      // },
    },
  });
  // const [items] = useState([]);
  const chart = () => {
    clientFetch('ticket/v1/dashboard/getDashboard', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
    })
      .then((dashData) => {
        console.log(dashData);
        const statistics = dashData.totales;
        const originalLegend = dashData.chart;
        setTotalStatisticsData([
          {
            img: '/boxOpenIcon.png',
            number: statistics.abiertos,
            state: 'Abiertos',
          },
          {
            img: '/boxWarningIcon.png',
            number: statistics.proceso,
            state: 'En proceso',
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
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClick = (e) => {
    e.preventDefault();
    history.push('/incidencias');
  };
  useEffect(() => {
    chart();
  }, []);
  return (
    <PageLayout title="Bienvenido a Blue360" description="Bienvenido a Blue360" noBreadcrumb>
      <div className="container">
        <div className="row align-items-stretch">
          <div className="col-lg-12 pt-5">
            <Card
              className="shadow my-5"
            >
              <h4 className="display-font mb-4">Estadísticas de incidencias</h4>
              {statisticsData.length > 0 ? (
                <>
                  <ul className="d-flex justify-content-around mb-5">
                    {statisticsData.length > 0 && statisticsData.map((item) => (
                      <li key={item.state}>
                        <div className="item d-flex align-items-center">
                          <div className="me-3">
                            <img src={item.img} alt={item.state} />
                          </div>
                          <div className="pt-3">
                            <h5 className="mb-0">{item.number}</h5>
                            <p>
                              <small>{item.state}</small>
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#!"
                    style={{ color: '#2BB9FF' }}
                    onClick={handleClick}
                  >
                    <p className="text-end me-2 mb-0">
                      <small>Ver listado de tickets&gt;</small>
                    </p>
                  </a>
                </>
              ) : <Spinner />}
            </Card>
            <Card
              className="shadow my-5"
            >
              <h4 className="display-font">Estado de tus órdenes</h4>
              {statisticsData.length > 0 ? (
                <div className="row">
                  <div className="col-md-7">
                    <Chart
                      options={data.options}
                      series={data.series}
                      type="donut"
                      height={350}
                    />
                  </div>
                  <div className="col-md-5">
                    <div className="pt-4 ps-5" style={{ borderRadius: 15, border: '1px solid #D6E0FF' }}>
                      <p>Todos los motivos</p>
                      <ul className="d-flex flex-row flex-wrap w-100">
                        {legendData && legendData.map((item) => (
                          <li key={item.title} className="w-50">
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
              ) : <Spinner />}
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default homeResolutor;
