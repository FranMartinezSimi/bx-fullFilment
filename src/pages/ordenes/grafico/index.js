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
        },
      },
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
        const items = data.orders;
        // const averages = items.map((item) => (item.average));
        const months = items.map((item) => (item.month)).reverse();
        const quantity = items.map((item) => (item.quantity)).reverse();
        const average = items.map((item) => (item.average)).reverse();
        console.log(months);
        console.log(average);
        console.log(quantity);
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
          series: [20],
          options: {
            colors: ['#7DD59D'],
            chart: {
              height: 350,
              type: 'radialBar',
            },
            plotOptions: {
              radialBar: {
                hollow: {
                  size: '70%',
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
      <div className="row align-items-center">
        <div className="col-md-8">
          <PageTitle title="Historico de órdenes" />
          <div className="row my-5">
            <div className="col-8">
              <Card>
                <h4>Total de órdenes y promedio diario</h4>
                <Chart
                  data={dataOrders}
                  options={dataOrders.options}
                  series={dataOrders.series}
                  type="line"
                  height={350}
                />
              </Card>
            </div>
            <div className="col-4">
              <Card>
                <h4 className={` text-center ${styles.titleCard}`}>Total operación FF</h4>

                {!isLoading
                  ? (
                    <div className="d-flex align-items-start flex-column bd-highlight mb-3">
                      <Chart
                        options={dataOrders1.options}
                        series={dataOrders1.series}
                        type="radialBar"
                        height={350}
                      />
                    </div>

                  )
                  : component}
                <div>
                  <h4 className={` text-center ${styles.titleCard}`}>Data</h4>
                  <div className="container">
                    <div className="container">
                      <div className="row">
                        <div className="col">
                          <h5>Desde</h5>
                        </div>
                        <div className="col text-center">
                          <b>-</b>

                        </div>
                        <div className="col">
                          <h5>Hasta</h5>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>

  );
};

export default Grafico;
