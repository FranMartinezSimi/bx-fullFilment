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
  const giveMeMonthGraph = (n) => {
    console.log(n);
  };
  const fecha = new Date()
    .toLocaleDateString('en-us', { year: 'numeric', month: 'numeric', day: 'numeric' })
    .split('/');
  const month = fecha[0];
  const year = fecha[2];
  const last = { month: Number(month) };
  const penultimate = { month: month - 1, year };
  const antepenultimate = { month: month - 2, year };
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
  const items = useMemo(
    () => [
      { label: resp1, onClick: () => giveMeMonthGraph({ month: Number(month), year: fecha[2] }) },
      { label: resp2, onClick: () => giveMeMonthGraph(penultimate) },
      { label: resp3, onClick: () => giveMeMonthGraph(antepenultimate) },
    ],
    [],
  );
  useEffect(() => {
    chart();
  }, []);
  return (
    <PageLayout title="Analisís de órdenes" description="Reporte / Analisís de órdenes">
      <PageTitle title="Analisís de órdenes" />
      {statesChart && !errorChart ? (
        <div className="my-4">
          <DropDownCalendar items={items} />

          <div className={styles.parent}>
            <div className={`${styles.div1} p-1`}>
              {statesChart && (
                <Chart
                  options={statesChart.options}
                  series={statesChart.series}
                  type="bar"
                  height={435}
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
                      height={380}
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
                <Chart
                  options={pendingChart.options}
                  series={pendingChart.series}
                  type="bar"
                  height={435}
                />
              )}
            </div>
          </div>
        </div>
      ) : componentChart}
    </PageLayout>
  );
};

export default SellerReport;
