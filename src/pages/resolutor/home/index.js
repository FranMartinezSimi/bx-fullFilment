import { useState, useEffect } from 'react';
import clientFetch from 'lib/client-fetch';

import PageLayout from 'components/Templates/PageLayout';
import Card from 'components/Molecules/Card';
import Chart from 'react-apexcharts';
import Alert from 'components/Atoms/AlertMessage';
import Spinner from 'components/Atoms/Spinner';

const homeResolutor = () => {
  const [statisticsData, setStatisticsData] = useState([]);
  const [legendData, setLegendData] = useState([]);
  const [errorChart, setErrorChart] = useState(false);
  const [data, setData] = useState(null);
  const [openChart, setOpenChart] = useState(null);
  const [closeChart, setCloseChart] = useState(null);
  const [ticketsResume, setTicketsResume] = useState(null);

  const originalRadialChart = {
    options: {
      chart: {
        type: 'radialBar',
        events: {
          mounted: (charts) => {
            charts.windowResizeHandler();
          },
        },
      },
      plotOptions: {
        radialBar: {
          // hollow: {
          //   size: '70%',
          // },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              fontSize: '16px',
              offsetY: 8,
            },
          },
        },
      },
      labels: [''],
    },
  };

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
        const { tickets } = dashData;
        setTicketsResume(tickets);
        setStatisticsData([
          statistics.abiertos,
          statistics.resueltos,
          statistics.total,
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
        const openNumber = (dashData.totales.abiertos * 100) / dashData.totales.total;
        const closeNumber = (dashData.totales.resueltos * 100) / dashData.totales.total;
        setOpenChart({
          series: [openNumber.toFixed(0)],
          ...originalRadialChart,
          options: {
            chart: {
              type: 'radialBar',
              events: {
                mounted: (charts) => {
                  charts.windowResizeHandler();
                },
              },
            },
            plotOptions: {
              radialBar: {
                dataLabels: {
                  name: {
                    show: false,
                  },
                  value: {
                    fontSize: '16px',
                    offsetY: 8,
                    color: '#fff',
                  },
                },
              },
            },
          },
        });
        setCloseChart({
          series: [closeNumber.toFixed(0)],
          ...originalRadialChart,
          options: {
            colors: ['#FF7E44'],
            chart: {
              type: 'radialBar',
              events: {
                mounted: (charts) => {
                  charts.windowResizeHandler();
                },
              },
            },
            plotOptions: {
              radialBar: {
                dataLabels: {
                  name: {
                    show: false,
                  },
                  value: {
                    fontSize: '16px',
                    offsetY: 8,
                    color: '#000000',
                  },
                },
              },
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
                  {data && (
                    <Chart
                      options={data.options}
                      series={data.series}
                      type="donut"
                      height={350}
                    />
                  )}
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
        {statisticsData.length > 0 && !errorChart && (
          <div className="col-md-3 pt-5">
            <div className="bg-complementary-color text-white shadow py-2 mt-5" style={{ borderRadius: 15 }}>
              {openChart && (
                <Chart
                  options={openChart.options}
                  series={openChart.series}
                  type="radialBar"
                  height={120}
                />
              )}
              <p className="text-center" style={{ fontSize: 15 }}>
                Tickets
                <br />
                Abiertos
              </p>
              <p className="text-center mb-0" style={{ fontSize: 22 }}>
                <b>
                  {statisticsData[0]}
                </b>
              </p>
            </div>
            <div className="bg-white mt-4 shadow py-2" style={{ borderRadius: 15 }}>
              {closeChart && (
                <Chart
                  options={closeChart.options}
                  series={closeChart.series}
                  type="radialBar"
                  height={120}
                />
              )}
              <p className="text-center display-font" style={{ fontSize: 15 }}>
                Tickets
                <br />
                Cerrados
              </p>
              <p className="text-center display-font mb-0" style={{ fontSize: 22 }}>
                <b>
                  {statisticsData[1]}
                </b>
              </p>
            </div>
          </div>
        )}
      </div>
      {statisticsData.length > 0 && !errorChart && (
        <div className="row mb-5">
          <div className="col-12">
            <Card className="shadow">
              <p className="display-font">
                <b>
                  Tickets Recientes
                </b>
              </p>
              <table className="table align-middle table-borderless table-hover ">
                <thead>
                  <tr>
                    <th scope="col-5">
                      <p className="fs-5 m-0 display-font">
                        <b> Order Id</b>
                      </p>
                    </th>
                    <th scope="col-2">
                      <p className="fs-5 m-0 display-font">
                        <b>Motivo</b>
                      </p>
                    </th>
                    <th scope="col-2">
                      <p className="fs-5 m-0 display-font">
                        <b>Cliente</b>
                      </p>
                    </th>
                    <th scope="col-3">
                      <p className="fs-5 m-0 display-font">
                        <b>Comentario</b>
                      </p>
                    </th>
                  </tr>
                </thead>
                {ticketsResume && ticketsResume.map((item) => (
                  <tbody>
                    <tr className="greyTbody">
                      <td>
                        <p className="py-3 m-0">
                          {item.orderId}
                        </p>
                      </td>
                      <td>
                        <p className="py-3 m-0">
                          {item.motivo}
                        </p>
                      </td>
                      <td>
                        <p className="py-3 m-0">
                          {item.empresa}
                        </p>
                      </td>
                      <td>
                        <p className="py-3 m-0">
                          {item.comentario.substring(0, 140)}
                          ...
                        </p>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </Card>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default homeResolutor;
