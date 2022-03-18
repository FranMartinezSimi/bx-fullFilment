import { useState, useEffect } from 'react';
import clientFetch from 'lib/client-fetch';

import PageLayout from 'components/Templates/PageLayout';
import PageTitle from 'components/Atoms/PageTitle';
import Chart from 'react-apexcharts';
import BodyMessage from 'components/Atoms/BodyMessageReport';
import Spinner from 'components/Atoms/Spinner';
import styles from './styles.module.scss';

const SellerReport = () => {
  const [errorChart, setErrorChart] = useState(false);
  const [statesChart, setStatesChart] = useState(null);
  const [deliveredChart, setDeliveredChart] = useState(null);
  const [pendingChart, setPendingChart] = useState(null);

  let componentChart;

  if (errorChart) {
    componentChart = <BodyMessage className="mt-5" />;
  } else {
    componentChart = <Spinner />;
  }

  const chart = () => {
    clientFetch('order/v1/dashboards/getAnalysisOrders', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
    })
      .then((dashData) => {
        const items = dashData.pendingOrders.sort((a, b) => {
          if (a.index > b.index) return 1;
          if (a.index < b.index) return -1;
          return 0;
        });
        const orderStatus = dashData.statusOrders.map((item) => item.status);
        const orderQuantity = dashData.statusOrders.map((item) => item.quantity);
        if (orderQuantity.length === 0) {
          setErrorChart(true);
          return;
        }

        const dataDonut = Object.values(dashData.pendingDelivered);
        const status = ['Entregado', 'Pendiente'];
        const pieData = { label: status, series: dataDonut };
        const pendingDate = items.map((item) => (item.day));
        const pendingQty = dashData.pendingOrders.map((item) => item.quantity);
        setStatesChart({
          series: [{
            name: 'órdenes',
            data: orderQuantity,
          }],
          options: {
            chart: {
              type: 'bar',
              height: 350,
              stacked: true,
              zoom: {
                enabled: false,
              },
              events: {
                mounted: (charts) => {
                  charts.windowResizeHandler();
                },
              },
            },
            fill: {
              colors: ['#FF7E44'],
            },
            plotOptions: {
              bar: {
                borderRadius: 0,
                horizontal: true,
                dataLabels: {
                  position: 'top',
                },
              },
            },
            dataLabels: {
              enabled: true,
              offsetX: -16,
            },
            xaxis: {
              categories: orderStatus,
            },
            title: {
              text: 'Estado de las órdenes',
              align: 'left',
              margin: 10,
              offsetX: 23,
              offsetY: 15,
              floating: false,
              style: {
                fontSize: '18px',
                fontWeight: 'bold',
                fontFamily: 'mont',
                color: '#263238',
              },
            },
          },
        });

        setDeliveredChart({
          series: dataDonut,
          options: {
            labels: pieData.label.reverse(),
            chart: {
              height: 0,
              zoom: {
                enabled: false,
              },
              events: {
                mounted: (charts) => {
                  charts.windowResizeHandler();
                },
              },
            },
            fill: {
              colors: ['#FE6767', '#7DD59D'],
            },
            legend: {
              show: false,
              position: 'bottom',
              fontSize: '10px',
              labels: {
                colors: '#7DD59D',
                useSeriesColors: false,
              },

            },
          },
        });

        setPendingChart({
          series: [{
            name: 'Órdenes',
            data: pendingQty,
          }],
          options: {
            colors: ['#2294CC'],
            chart: {
              height: 350,
              stacked: true,
              zoom: {
                enabled: false,
              },
              events: {
                mounted: (charts) => {
                  charts.windowResizeHandler();
                },
              },
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '20%',
                borderRadius: 0,
              },
            },
            xaxis: {
              categories: pendingDate,
            },
            title: {
              text: 'Órdenes pendientes por Fecha',
              align: 'left',
              margin: 10,
              offsetX: 23,
              offsetY: 15,
              floating: false,
              style: {
                fontSize: '18px',
                fontWeight: 'bold',
                fontFamily: 'mont',
                color: '#263238',
              },
            },
          },
        });
      })
      .catch(() => {
        setErrorChart(true);
      });
  };
  useEffect(() => {
    chart();
  }, []);
  return (
    <PageLayout title="Reporte / Analisís de órdenes" description="Reporte / Analisís de órdenes">
      <PageTitle title="Reporte / Analisís de órdenes" />
      {statesChart && !errorChart ? (
        <>
          <div className="row align-items-stretch mt-5">
            <div className={`col-md-9 ${styles.orderStatus} `}>
              <div className="row align-items-center">
                <div className="col-md-12">
                  {statesChart && (
                    <Chart
                      options={statesChart.options}
                      series={statesChart.series}
                      type="bar"
                      height={350}
                    />
                  )}
                </div>
              </div>
            </div>
            {deliveredChart && (deliveredChart.series[0] > 0 || deliveredChart.series[1] > 0) && (
              <div className="col-md-3">
                <>
                  <div className={`${styles.orderStatus}`}>
                    <p className="display-font pt-4 text-center">
                      <b>
                        Entregadas Vs Pendientes
                      </b>
                    </p>
                    <Chart
                      options={deliveredChart.options}
                      series={deliveredChart.series}
                      type="pie"
                    />
                    <ul className="border-top">
                      <div className="container-fluid">
                        <div className="row pt-0">
                          <div className="col-sm-6 pt-2 ">
                            <p className="mb-0 text-center">
                              <span
                                style={{
                                  width: 15,
                                  height: 15,
                                  background: '#7DD59D',
                                  display: 'inline-block',
                                  borderRadius: '5rem',
                                }}
                              />
                              <b className="ps-2" style={{ fontSize: 14 }}>Entregadas</b>
                            </p>
                            <p className="mb-0 text-center">{deliveredChart.series[1]}</p>
                          </div>
                          <div className="col-sm-6 pt-2 ">
                            <li className="">
                              <p className="mb-0 text-center">
                                <span
                                  style={{
                                    width: 15,
                                    height: 15,
                                    background: '#FE6767',
                                    display: 'inline-block',
                                    borderRadius: '5rem',
                                  }}
                                />
                                <b className="ps-2" style={{ fontSize: 14 }}>Pendientes</b>
                              </p>
                              <p className="mb-0 text-center">{deliveredChart.series[0]}</p>
                            </li>
                          </div>
                        </div>
                      </div>
                    </ul>

                  </div>
                </>
              </div>
            )}
          </div>

          {pendingChart && pendingChart.series[0].data.length > 0 && (
            <div className={`row my-5 ${styles.cardPendingDate}`}>
              <div className="col-12 p-4">

                <Chart
                  options={pendingChart.options}
                  series={pendingChart.series}
                  type="bar"
                  height={350}
                />
              </div>
            </div>
          )}
        </>
      ) : componentChart}
    </PageLayout>
  );
};

export default SellerReport;
