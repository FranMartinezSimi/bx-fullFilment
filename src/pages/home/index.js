import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { useAuth } from 'context/userContex';
import clientFetch from 'lib/client-fetch';
import PageLayout from 'components/Templates/PageLayout';
import PageTitle from 'components/Atoms/PageTitle';
import Card from 'components/Molecules/Card';
import ColumnChart from 'components/Atoms/ColumnChart';
import Alert from 'components/Atoms/AlertMessage';
import Spinner from 'components/Atoms/Spinner';
import styles from './styles.module.scss';

const Home = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [orderFetchError, setOrderFetchError] = useState(false);
  const [dataOrders, setDataOrders] = useState({
    series: [
      {
        name: 'En camino',
        data: [0],
      },
      {
        name: 'Procesados',
        data: [0],
      },
      {
        name: 'Entregados',
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
        position: 'top',
      },
      fill: {
        opacity: 1,
      },
    },
  });
  const history = useHistory();
  const userData = JSON.parse(user);
  const userActive = userData.credential.user.name;

  const handleInventory = (e, path) => {
    e.preventDefault();
    history.push(path);
  };

  const componentOrders = (
    <a
      href="#!"
      style={{ color: '#2BB9FF' }}
      onClick={(e) => handleInventory(e, '/ordenes')}
    >
      <p className="text-end me-2">
        <small>ir a ordenes&gt;</small>
      </p>
    </a>
  );

  const chart = () => {
    clientFetch('order/v1/orders/getDashboradOrders', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      body: {
        page: 1,
        warehouse: 'bx1',
        status: 'all',
      },
    })
      .then((data) => {
        const items = data.orders_deliver.sort((a, b) => {
          if (a.index < b.index) {
            return 1;
          }
          if (a.index > b.index) {
            return -1;
          }
          return 0;
        });
        // console.log('orders_deliver', items);
        const dates = items.map((item) => (item.date));
        const send = items.map((item) => (item.enviado));
        const process = items.map((item) => (item.procesado));
        const delivered = items.map((item) => (item.entregado));

        setIsLoading(false);
        setDataOrders({
          series: [
            {
              name: 'En camino',
              data: send,
            },
            {
              name: 'Procesados',
              data: process,
            },
            {
              name: 'Entregados',
              data: delivered,
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
                borderRadius: '20px',
                columnWidth: '30%',
              },
            },
            xaxis: {
              categories: dates,
            },
            legend: {
              position: 'top',
            },
            fill: {
              opacity: 1,
            },
          },
        });
      })
      .catch((error) => {
        console.log('error', error);
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
    <PageLayout title="Bienvenido a Blue360" description="Bienvenido a Blue360" noBreadcrumb>
      <div className="container mt-5">
        <div className="row justify-content-between align-items-center">
          <PageTitle
            className="col"
            subtitle={userActive}
            title="Bienvenido a Blue360"
          />
          <div className="col">
            <div className="text-end">
              <img src="/fulfill1.png" alt="" width="180" />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row align-items-stretch">
          <div className="col-lg-12">
            <Card
              className={`${styles.card} shadow my-5`}
              footer={componentOrders}
            >
              <h4 className="display-font">Estado de tus órdenes</h4>
              <p>Ingresa mensualmente</p>
              {isLoading && (
                <div className="mt-5 pt-5">
                  <Spinner />
                </div>
              )}
              {!orderFetchError && !isLoading
                ? (
                  <ColumnChart
                    data={dataOrders}
                  />
                )
                : component}
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
