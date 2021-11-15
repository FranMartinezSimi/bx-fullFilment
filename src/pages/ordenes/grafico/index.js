import React, { useState, useEffect } from 'react';
import { useAuth } from 'context/userContex';
import clientFetch from 'lib/client-fetch';
import Chart from 'react-apexcharts';
import PageLayout from 'components/Templates/PageLayout';
import PageTitle from 'components/Atoms/PageTitle';
import Card from 'components/Molecules/Card';
import Alert from 'components/Atoms/AlertMessage';
import styles from './styles.module.scss';

const Grafico = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const userData = JSON.parse(user);
  const [stateFromTo, setStateFromTo] = useState(null);
  const userActive = userData.credential.accountId;
  const [orderFetchError, setOrderFetchError] = useState(false);
  const [dataOrders1, setDataOrders1] = useState({
    series: [''],
    options: {
      chart: {
        height: 350,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '70%',
          },
          dataLabels: {
            name: {
              show: false,
            },
            total: {
              show: true,
              label: '',
              formatter: (w) => (w.globals.initialSeries[0]),
            },
          },
        },
      },
      stroke: { lineCap: 'round' },
      labels: [''],
    },
  });
  const [dataOrders, setDataOrders] = useState({
    series: [
      {
        name: 'Ordenes',
        type: 'column',
        data: [0],
      },
      {
        name: 'Promedio Ordenes',
        type: 'line',
        data: [0],
      },
    ],
    options: {
      colors: ['#3363FF', '#FDCC60', '#FDA460'],
      chart: {
        id: 'basic-bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 20,
          columnWidth: '10%',
        },
      },
      xaxis: {
        categories: ['Cargando...'],
      },
      legend: {
        position: 'bottom',
      },
      fill: {
        opacity: 1,
      },
    },
  });
  const chart = () => {
    clientFetch('order/v1/dashboards/getHistoricalOrders', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      header: {
        userActive,
      },
      body: {
        page: 1,
        warehouse: 'bx1',
        status: 'all',
      },
    })
      .then((data) => {
        const items = data.orders.sort((a, b) => {
          if (a.index > b.index) return 1;
          if (a.index < b.index) return -1;
          return 0;
        });
        const total = data.totalOrders;
        const months = items.map((item) => (item.month));
        const quantity = items.map((item) => (item.quantity));
        const average = items.map((item) => (item.average));
        const desde = `${months[0]} ${new Date().getFullYear()}`;
        const hasta = `${months[3]} ${new Date().getFullYear()}`;
        setStateFromTo({ from: desde, to: hasta });
        setIsLoading(false);
        setDataOrders({
          series: [
            {
              name: 'Ordenes',
              data: quantity,
              type: 'column',
            },
            {
              name: 'Promedio Ordenes',
              data: average,
            },
          ],
          options: {
            colors: ['#3363FF', '#FDCC60', '#FDA460'],
            chart: {
              stacked: true,
              toolbar: {
                show: false,
              },
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '30%',
              },
            },
            labels: [
              months[0],
              months[1],
              months[2],
              months[3],
            ],
            legend: {
              position: 'bottom',
            },
            fill: {
              opacity: 1,
            },
            dataLabels: {
              enabled: true,
              enabledOnSeries: [1],
            },
          },
        });
        setDataOrders1({
          series: [total],
          options: {
            colors: ['#7DD59D'],
            chart: {
              type: 'radialBar',
            },
            plotOptions: {
              radialBar: {
                dataLabels: {
                  name: {
                    show: false,
                  },
                  value: {
                    fontSize: '30px',
                    offsetY: 8,
                    color: '#000000',
                  },
                },
              },
            },

          },
        });
      })
      .catch(() => {
        setIsLoading(false);
        setOrderFetchError(true);
      });
  };
  let component;

  if (orderFetchError) {
    component = <Alert className="mt-5" type="warning" message="Ooopss! Ocurrió un error, intentalo más tarde..." />;
  } else {
    component = null;
  }
  useEffect(() => {
    chart();
  }, []);

  return (
    <PageLayout title="Historico de órdenes">
      <div className="row m-5">
        <PageTitle title="Historico de órdenes" />
        <div className="col-lg-8">
          <Card>
            {!isLoading
              ? (
                <div>
                  <h4 className={` text-left mb-2 ${styles.titleCard}`}>Total de órdenes y promedio diario</h4>
                  <Chart
                    data={dataOrders}
                    options={dataOrders.options}
                    series={dataOrders.series}
                    height={350}
                  />
                </div>
              )
              : component}
          </Card>
        </div>
        <div className="col-lg-4">
          <Card>
            <h4 className={` text-center ${styles.titleCard}`}>Total operación FF</h4>
            <div className="align-items-center">
              {!isLoading
                ? (
                  <div className="d-flex align-items-center flex-column bd-highlight mb-3">
                    <Chart
                      options={dataOrders1.options}
                      series={dataOrders1.series}
                      type="radialBar"
                      height={300}
                    />

                  </div>
                )
                : component}
            </div>
            <h4 className={` text-center ${styles.titleCard}`}>Data</h4>

            <div className="container">
              <div className="d-flex justify-content-center">
                <div className="p-2 col-example text-left">
                  <div className="col">
                    <b className="text-right">
                      <p><b>{stateFromTo ? stateFromTo.from : ''}</b></p>
                    </b>
                  </div>
                </div>
                <div className="p-2 col-example text-left"><b>-</b></div>
                <div className="p-2 col-example text-left">
                  <p className="text-left">
                    <b>{stateFromTo ? stateFromTo.to : ''}</b>
                  </p>
                </div>
              </div>

            </div>

          </Card>
        </div>
      </div>
    </PageLayout>

  );
};

export default Grafico;
