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
// import IconOrder1 from 'assets/brand/Icon-Order1.svg';
import styles from './styles.module.scss';

const Home = () => {
  const { user } = useAuth();
  const [notify, setNotify] = useState(null);
  const [statisticsData] = useState([]);
  const history = useHistory();
  const userData = JSON.parse(user);
  const [errorTotales, setErrorTotales] = useState(false);
  const userActive = userData.credential.user.name;
  let componentTotales;
  const handleInventory = (e, path) => {
    e.preventDefault();
    history.push(path);
  };
  console.log(handleInventory);

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
      .then((dashData) => {
        console.log(dashData.orders_deliver);
        //   const statistics = dashData.totales;
        //   setTotalStatisticsData([
        //     {
        //       img: '/IconOrder1.svg',
        //       number: statistics.abiertos,
        //       state: 'Procesadas',
        //     },
        //     {
        //       img: '/boxClosedIcon.png',
        //       number: statistics.resueltos,
        //       state: 'Entregadas',
        //     },
        //     {
        //       img: '/boxInfoIcon.png',
        //       number: statistics.total,
        //       state: 'En Camino',
        //     },
        //   ]);
      })
      .catch((err) => {
        console.log(err);
        setErrorTotales(true);
      });
  };
  const handleClick = (e) => {
    e.preventDefault();
    history.push('/incidencias');
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
      <div className="col-1">
        <div className={` ${styles.alert}`} role="alert">
          <div className="row">
            <div className="col-1 d-flex justify-content-start my-5">
              <img src={Alert} alt="" className={`${styles.img}`} />
            </div>
            <div className="col-2 my-5">
              <h1 className={`${styles.tAlert}`}>Comunicado</h1>
            </div>
            <div className="col-8 ">
              <p className={`${styles.pAlert}`}>{parrafoAlert}</p>
            </div>
            <div className="col-1 d-flex justify-content-end my-5">
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
            <Card
              className={`shadow my-5 ${styles.analyticsOrders}`}
            >
              <h4 className="display-font mb-4" style={{ fontFamily: 'mont', fontSize: '22px', lineHeight: '26px' }}>Estados de tus ordenes</h4>
              {statisticsData.length > 0 && !errorTotales ? (
                <>
                  <ul className="d-flex justify-content-around mb-2">
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
                    <p className="text-end me-2 mb-0 pt-4">
                      <small style={{ fontSize: '1.2em' }}>Ver listado de tickets &gt;</small>
                    </p>
                  </a>
                </>
              ) : componentTotales}
            </Card>
          </div>
        </div>
        <div className="col-4">
          <div className="position-relative">
            <img src="/fulfill1.png" alt="" width="250" style={{ position: 'relative', top: 75, left: '50px' }} />
          </div>
        </div>
      </div>

      <div className="row my-5" style={{ marginTop: 1 }}>
        <div className="col-5">
          <Card className={`shadow my-5  ${setNotify.fileUp}`}>
            <div className="row">
              <div className="col-4">
                <img src={callendar} alt="download" width="140" style={{ position: 'relative', top: 2 }} />
              </div>
              <div className="col-8">
                <h3 style={{}}>Solicita tu programación de inventario</h3>
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
          <Card className={`shadow my-5 ${setNotify.fileUp}`}>
            <div className="row align-items-md-stretch">
              <div className="col-4">
                <img src={shopping} alt="download" width="150" style={{ position: 'relative', top: 2 }} />
              </div>
              <div className="col-8">
                <h5 style={{ color: '#FF7E44' }}>¡Comencemos con tus ordenes!</h5>
                <p className={`${styles.pFileUp}`}>
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
