import { useState, useEffect, useMemo } from 'react';
import clientFetch from 'lib/client-fetch';

import PageLayout from 'components/Templates/PageLayout';
import PageTitle from 'components/Atoms/PageTitle';
import DropDownCalendar from 'components/Molecules/DropDownCalendar';
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
  const chart = (m) => {
    clientFetch('order/v1/dashboards/getAnalysisOrdersMonths', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      body: {
        month: m,
      },
    })
      .then((dashData) => {
        const items = dashData.pendingOrders.sort((a, b) => {
          if (a.index > b.index) return 1;
          if (a.index < b.index) return -1;
          return 0;
        });
        if (dashData.statusOrders.length === 0) {
          dashData.statusOrders = [{ status: 'sin Datos', quantity: 0 }];
        }
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
        if (dashData.pendingOrders.length === 0) {
          dashData.pendingOrders = [{ index: 23, day: 'nd', quantity: 0 }];
        }
        const pendingQty = dashData.pendingOrders.map((item) => item.quantity);
        setStatesChart({
          series: [{
            name: '??rdenes',
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
              text: 'Estado de las ??rdenes',
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
            title: {
              text: 'Entregados vs Pendientes',
              align: 'center',
              margin: 50,
              offsetX: 0,
              offsetY: 5,
              floating: false,
              style: {
                fontSize: '18px',
                fontWeight: 'bold',
                fontFamily: 'mont',
                color: '#263238',
              },
            },
            legend: {
              show: false,
              position: 'bottom',
              horizontalAlign: 'center',
              fontSize: '18px',
              fontFamily: 'mont',
              fontWeight: 'bold',
              labels: {
                colors: 'black',
                useSeriesColors: false,
              },

            },
          },
        });

        setPendingChart({
          series: [{
            name: '??rdenes',
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
              text: '??rdenes pendientes por Fecha',
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
  const fecha = new Date()
    .toLocaleDateString('en-us', { year: 'numeric', month: 'numeric', day: 'numeric' })
    .split('/');
  const month = fecha[0];
  const year = Number(fecha[2]);
  const last = { month: Number(month), year };
  const penultimate = { month: month - 1 };
  const antepenultimate = { month: month - 2 };
  const giveMeMonth = (m) => {
    switch (m) {
      case 1:
        last.month = 'Enero';
        break;
      case 2:
        last.month = 'Febrero';
        break;
      case 3:
        last.month = 'Marzo';
        break;
      case 4:
        last.month = 'Abril';
        break;
      case 5:
        last.month = 'Mayo';
        break;
      case 6:
        last.month = 'Junio';
        break;
      case 7:
        last.month = 'Julio';
        break;
      case 8:
        last.month = 'Agosto';
        break;
      case 9:
        last.month = 'Septiembre';
        break;
      case 10:
        last.month = 'Octubre';
        break;
      case 11:
        last.month = 'Noviembre';
        break;
      case 12:
        last.month = 'Diciembre';
        break;
      default:
        m = 'm';
    }
    return last.month;
  };
  const resp1 = giveMeMonth(last.month);
  const resp2 = giveMeMonth(penultimate.month);
  const resp3 = giveMeMonth(antepenultimate.month);
  const Months = [
    {
      label: resp1,
      onClick: () => chart(Number(month)),
    },
    { label: resp2, onClick: () => chart(penultimate.month) },
    { label: resp3, onClick: () => chart(antepenultimate.month) },
  ];
  const MonthsArr = Months.map((x) => x);
  const items = useMemo(
    () => MonthsArr,
    [],
  );
  useEffect(() => {
    chart(month);
  }, []);
  return (
    <PageLayout title="Analis??s de ??rdenes" description="Reporte / Analis??s de ??rdenes">
      <PageTitle title="Analis??s de ??rdenes" />
      <DropDownCalendar items={items} />

      {statesChart && !errorChart ? (
        <div className="mt-1 mb-3">

          <div className={styles.parent}>
            <div className={`${styles.div1} pt-1 pe-5`}>
              {statesChart && (
                <Chart
                  options={statesChart.options}
                  series={statesChart.series}
                  type="bar"
                  height={350}
                />
              )}
            </div>
            <div className={styles.div2}>
              {deliveredChart && (deliveredChart.series[0] > 0 || deliveredChart.series[1] > 0) && (
                <div className={styles.flex}>
                  <div>
                    <Chart
                      options={deliveredChart.options}
                      series={deliveredChart.series}
                      type="pie"
                      height={300}
                    />
                  </div>
                  <div>
                    <ul className="border-top">
                      <div className="row pt-0">
                        <div className={`col-sm-6 pt-2 border-end h-70 ${styles.pendEntr}`}>
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
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.div3}>
              {pendingChart && pendingChart.series[0].data.length > 0 && (
                <div className="px-2 pt-1">
                  <Chart
                    options={pendingChart.options}
                    series={pendingChart.series}
                    type="bar"
                    height={355}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : componentChart}
    </PageLayout>
  );
};

export default SellerReport;
