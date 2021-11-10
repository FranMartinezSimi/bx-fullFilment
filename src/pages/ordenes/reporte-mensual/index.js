import { useState, useEffect } from 'react';
import clientFetch from 'lib/client-fetch';

import PageLayout from 'components/Templates/PageLayout';
import PageTitle from 'components/Atoms/PageTitle';
import Card from 'components/Molecules/Card';
import Chart from 'react-apexcharts';
import Alert from 'components/Atoms/AlertMessage';
import Spinner from 'components/Atoms/Spinner';

const SellerReport = () => {
  const [errorChart, setErrorChart] = useState(false);
  const [statesChart, setStatesChart] = useState(null);
  const [deliveredChart, setDeliveredChart] = useState(null);
  const [pendingChart, setPendingChart] = useState(null);

  let componentChart;

  if (errorChart) {
    componentChart = <Alert className="mt-5" type="warning" message="Ooopss! no se encontraron datos para crear visualizar motivos..." />;
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
        const orderStatus = dashData.statusOrders.map((item) => item.status);
        const orderQuantity = dashData.statusOrders.map((item) => item.quantity);

        if (orderQuantity.length === 0) {
          console.log('pasó');
          setErrorChart(true);
          return;
        }

        const dataDonut = Object.values(dashData.pendingDelivered);
        console.log(dashData);

        const pendingDate = dashData.pendingOrders.map((item) => item.day);
        const pendingQty = dashData.pendingOrders.map((item) => item.quantity);

        setStatesChart({
          series: [{
            data: orderQuantity,
          }],
          options: {
            chart: {
              type: 'bar',
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
            fill: {
              colors: ['#40C0FF'],
            },
            plotOptions: {
              bar: {
                borderRadius: 14,
                horizontal: true,
              },
            },
            dataLabels: {
              enabled: false,
            },
            xaxis: {
              categories: orderStatus,
            },
          },
        });

        setDeliveredChart({
          series: dataDonut,
          options: {
            chart: {
              height: 450,
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
              colors: ['#FF7E44', '#27A6E5'],
            },
            legend: {
              show: false,
            },
          },
        });

        setPendingChart({
          series: [{
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
                borderRadius: 20,
              },
            },
            xaxis: {
              categories: pendingDate,
            },
          },
        });
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
    <PageLayout title="Reporte / Analisís de ordenes" description="Reporte / Analisís de ordenes">
      <PageTitle title="Reporte / Analisís de ordenes" />
      {statesChart && !errorChart ? (
        <>
          <div className="row align-items-stretch">
            <div className="col-md-9 pt-5">
              <Card
                className="shadow my-5"
              >
                <p className="display-font">
                  <b>
                    Estado de las órdenes
                  </b>
                </p>
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
              </Card>
            </div>
            {deliveredChart && (deliveredChart.series[0] > 0 || deliveredChart.series[1] > 0) && (
              <div className="col-md-3 pt-5">
                <div className="mt-4 py-2">
                  <p className="text-center display-font mb-0 mt-2" style={{ fontSize: 16 }}>
                    <b>
                      Selecciona un período y comienza a ver
                      las metrícas de tus operaciones actuales
                    </b>
                  </p>
                  <Card className="mt-4 shadow">
                    <Chart
                      options={deliveredChart.options}
                      series={deliveredChart.series}
                      type="pie"
                    />
                    <ul className="border-top d-flex justify-content-between w-100 pt-5">
                      <li className="w-50">
                        <p className="mb-0 text-center">
                          <span
                            style={{
                              width: 15,
                              height: 15,
                              background: '#FF7E44',
                              display: 'inline-block',
                              borderRadius: '5rem',
                            }}
                          />
                          <b className="ps-2" style={{ fontSize: 14 }}>Entregados</b>
                        </p>
                        <p className="mb-0 text-center">{deliveredChart.series[0]}</p>
                      </li>
                      <li className="w-50 border-left">
                        <p className="mb-0 text-center">
                          <span
                            style={{
                              width: 15,
                              height: 15,
                              background: '#27A6E5',
                              display: 'inline-block',
                              borderRadius: '5rem',
                            }}
                          />
                          <b className="ps-2" style={{ fontSize: 14 }}>Pendientes</b>
                        </p>
                        <p className="mb-0 text-center">{deliveredChart.series[1]}</p>
                      </li>
                    </ul>
                  </Card>
                </div>
              </div>
            )}
          </div>

          {pendingChart && pendingChart.series[0].data.length > 0 && (
            <div className="row mb-5">
              <div className="col-12">
                <Card className="shadow">
                  <p className="display-font">
                    <b>
                      Órdenes pendientes por Fecha
                    </b>
                  </p>
                  <Chart
                    options={pendingChart.options}
                    series={pendingChart.series}
                    type="bar"
                    height={350}
                  />
                </Card>
              </div>
            </div>
          )}
        </>
      ) : componentChart}
    </PageLayout>
  );
};

export default SellerReport;
