import {
  useState, useEffect, useContext,
} from 'react';

import { useHistory } from 'react-router-dom';
import { useAuth } from 'context/userContex';
import clientFetch from 'lib/client-fetch';
import PageLayout from 'components/Templates/PageLayout';
import PageTitle from 'components/Atoms/PageTitle';
import Card from 'components/Molecules/Card';
// import ColumnChart from 'components/Atoms/ColumnChart';
// import Alert from 'components/Atoms/AlertMessage';
// import Spinner from 'components/Atoms/Spinner';
import { SocketContext } from 'context/useContextSocketSeller';
// import styles from './styles.module.scss';
import shopping from 'assets/brand/shopping.png';
import callendar from 'assets/brand/callendar.png';
import Alert from 'assets/brand/alertRed.png';
import closeX from 'assets/brand/closeX.svg';
import styles from './styles.module.scss';

const Home = () => {
  const { user } = useAuth();
  const [orderFetchError, setOrderFetchError] = useState(false);
  const [notify, setNotify] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log(isLoading);
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
  console.log(dataOrders);
  const history = useHistory();
  const userData = JSON.parse(user);
  const userActive = userData.credential.user.name;

  const handleInventory = (e, path) => {
    e.preventDefault();
    history.push(path);
  };
  console.log(handleInventory);

  console.log(orderFetchError);

  // const componentOrders = (
  //   <a
  //     href="#!"
  //     style={{ color: '#2BB9FF' }}
  //     onClick={(e) => handleInventory(e, '/ordenes')}
  //   >
  //     <p className="text-end me-2">
  //       <small style={{ fontSize: '1.2em' }}>ir a órdenes &gt;</small>
  //     </p>
  //   </a>
  // );

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
      .catch(() => {
        setIsLoading(false);
        setOrderFetchError(true);
      });
  };

  useEffect(() => {
    chart();
  }, []);
  const socket = useContext(SocketContext);

  const parrafoAlert = 'Debido a la alta demanda generada por Cyberday, les informamos que pueden existir retrasos en los envíos. Estamos reforzando nuestras acciones para entregarles el mejor servicio. Esperamos su comprensión. Y para cualquier consulta es';

  useEffect(() => {
    socket.on('client', (data) => {
      setNotify(data);
    });
  }, [socket, notify]);
  return (
    <PageLayout title="Bienvenido a Blue360" description="Bienvenido a Blue360" noBreadcrumb>
      <div className="col-11">
        <div className="alert alert-warning alert-dismissible fade show" role="alert" style={{ marginTop: 50 }}>
          <div className="row">
            <div className="col-1 d-flex justify-content-start">
              <img src={Alert} alt="" style={{ tabSize: '14px' }} />
            </div>
            <div className="col-2">
              <h1 style={{ color: '#212121', fontFamily: 'lato', fontWeight: 'bold' }}>Comunicado</h1>
            </div>
            <div className="col-8">
              <p className="text-center" style={{ fontFamily: 'Lato', fontSize: '13px', style: 'normal' }}>{parrafoAlert}</p>
            </div>
            <div className="col-1 d-flex justify-content-end">
              <a href="!#" data-testid="printed-username" className={`p-0 ${styles.close}`}>
                <span aria-hidden="true" className="p-0">
                  <img src={closeX} alt="Cuenta" width="16" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-8">
          <div className="row">
            <PageTitle
              className="row"
              subtitle={userActive}
              subtitleClassName="display-font fw-bold fs-3"
              title="Bienvenido a Blue360"
              titleSize="50px"
            />
          </div>
          <div className="row">
            <Card />

          </div>
        </div>
        <div className="col-4">
          <div className="position-relative">
            <img src="/fulfill1.png" alt="" width="250" style={{ position: 'relative', top: 75, left: '50px' }} />
          </div>
        </div>
      </div>

      <div className="row" style={{ marginTop: 70 }}>
        <div className="col-5">
          <Card className="shadow my-5">
            <div className="row ">
              <div className="col-4">
                <img src={callendar} alt="download" width="150" style={{ position: 'relative', top: 2 }} />
              </div>
              <div className="col-8">
                <h2 style={{}}>Solicita tu programación de inventario</h2>
                <p style={{ position: 'relative', top: 2, fontSize: 17 }}>
                  Realiza la programación de la reposición de tu inventario
                </p>
                <a href="#!" className="btn btn-secondary">
                  Programar
                </a>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-6">
          <Card className="shadow my-5">
            <div className="row align-items-md-stretch">
              <div className="col-4">
                <img src={shopping} alt="download" width="150" style={{ position: 'relative', top: 2 }} />
              </div>
              <div className="col-8">
                <h1 style={{ color: '#FF7E44' }}>¡Comencemos con tus ordenes!</h1>
                <p style={{ position: 'relative', top: 2, fontSize: 17 }}>
                  sube tus archivos masivos de ordenes
                </p>
                <a href="#!" className="btn btn-secondary">
                  Subir órdenes
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
