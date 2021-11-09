import {
  useState, useEffect, useContext,
} from 'react';

import { useHistory } from 'react-router-dom';
import { useAuth } from 'context/userContex';
import clientFetch from 'lib/client-fetch';
import PageLayout from 'components/Templates/PageLayout';
import PageTitle from 'components/Atoms/PageTitle';
import Card from 'components/Molecules/Card';
import { SocketContext } from 'context/useContextSocketSeller';
import shopping from 'assets/brand/shopping.png';
import callendar from 'assets/brand/callendar.png';
import Modal from 'components/Templates/Modal';
import FormReplenishment from 'components/Molecules/FormReplenishment';
// import Alert from 'assets/brand/alertRed.png';
// import closeX from 'assets/brand/closeX.svg';
import styles from './styles.module.scss';

const Home = () => {
  const { user } = useAuth();
  const [notify, setNotify] = useState(null);
  const [statisticsData, setTotalStatisticsData] = useState([]);
  const history = useHistory();
  const [modalInventory, setModalInventory] = useState(false);
  const userData = JSON.parse(user);
  const [errorTotales, setErrorTotales] = useState(false);
  const userActive = userData.credential.user.name;
  let componentTotales;

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
        const statistics = dashData.orders_deliver;
        const enviados = statistics[0].enviado + statistics[1].enviado
          + statistics[2].enviado + statistics[2].enviado;
        const procesados = statistics[0].procesado + statistics[1].procesado
          + statistics[2].procesado;
        const entregados = statistics[0].entregado + statistics[1].entregado
          + statistics[2].entregado;

        console.log(statistics);
        // for (const order of statistics.keys()) {
        //   console.log(order.date);
        // }
        setTotalStatisticsData([
          {
            img: '/boxIconRefresh.png',
            number: procesados,
            state: 'Procesadas',
          },
          {
            img: '/boxIconCheck.png',
            number: entregados,
            state: 'Entregadas',
          },
          {
            img: '/boxIconTruck.png',
            number: enviados,
            state: 'En Camino',
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
        setErrorTotales(true);
      });
  };
  const handleClick = (e) => {
    e.preventDefault();
    history.push('/ordenes');
  };

  const handleClickA = (e) => {
    e.preventDefault();
    history.push('/ordenes/subir-ordenes');
  };

  const handleClickInventory = (e) => {
    e.preventDefault();
    setModalInventory(true);
  };

  useEffect(() => {
    chart();
  }, []);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('client', (dataSocket) => {
      setNotify(dataSocket);
    });
  }, [socket, notify]);
  return (
    <PageLayout title="Bienvenido a Blue360" description="Bienvenido a Blue360" noBreadcrumb>
      {/* <div className={`container-fluid ${styles.alert}`} role="alert">
        <div className="d-flex bd-highlight align-content-md-center">
          <div className="p-2 flex-fill bd-highlight d-flex align-content-center flex-wrap">
            <img src={Alert} alt="" className={`${styles.img}`} />
          </div>
          <div className="p-2 flex-fill bd-highlight  d-flex align-content-center flex-wrap">
            <h1 className={`${styles.tAlert}`}>Comunicado</h1>
          </div>
          <div className="p-1 flex-fill bd-highlight d-flex align-content-center flex-wrap">
            <p className={`${styles.pAlert}`}>{parrafoAlert}</p>
          </div>
          <div className="p-2 flex-fill bd-highlight d-flex align-content-center flex-wrap">
            <a href="!#" data-testid="printed-username" className={`p-0 ${styles.close}`}>
              <span aria-hidden="true" className="p-0">
                <img src={closeX} alt="Cuenta" width="16" />
              </span>
            </a>
          </div>
        </div>
      </div> */}
      <div className="row mb-5">
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
          <div>
            <Card>
              <h4 className="display-font mb-4">Estados de tus órdenes</h4>
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

                  <ul className="d-flex justify-content-between align-items-center pt-3 mb-0">
                    <li>
                      <p>Actualizado hace 7 días</p>
                    </li>
                    <li>
                      <a
                        href="#!"
                        style={{ color: '#2BB9FF' }}
                        onClick={handleClick}
                      >
                        <p className="text-end me-2 mb-0">
                          <small style={{ fontSize: '1em' }}>Ver listado de órdenes &gt;</small>
                        </p>
                      </a>
                    </li>
                  </ul>
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

      <div className="row my-5">
        <div className="col-6">
          <Card>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                <img src={callendar} alt="download" width="140" style={{ position: 'relative', top: 2 }} />
              </div>
              <div className="flex-grow-1 ms-3">
                <div className="d-flex flex-column bd-highlight mb-3">
                  <div className="p-2 bd-highlight">
                    <h3 style={{}}>Solicita tu programación de inventario</h3>
                  </div>
                  <div className="p-2 bd-highlight">
                    <p style={{ position: 'relative', top: 2, fontSize: 17 }}>
                      Realiza la programación de la reposición de tu inventario
                    </p>
                  </div>
                  <div className="p-2 bd-highlight">
                    <a href="#!" className="btn btn-secondary" onClick={handleClickA}>
                      Programar
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-6">
          <Card className={styles.hei}>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                <img src={shopping} alt="download" width="160" style={{ position: 'relative', top: 2 }} />
              </div>
              <div className="flex-grow-1 ms-3">
                <div className="d-flex flex-column bd-highlight mb-3">
                  <div className="p-2 bd-highlight">
                    <h5 style={{ color: '#FF7E44' }}>¡Comencemos con tus órdenes!</h5>
                  </div>
                  <div className="p-2 bd-highlight">
                    <p className={`${styles.pFileUp}`}>
                      sube tus archivos masivos de órdenes
                    </p>
                  </div>
                  <div className="p-2 bd-highlight">
                    <a href="#!" className="btn btn-secondary" onClick={handleClickInventory}>
                      Subir órdenes
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Modal showModal={modalInventory} size="xl" onClick={(e) => { e.preventDefault(); setModalInventory(false); }}>
        <FormReplenishment
          setModalTicket={setModalInventory}
        />
      </Modal>
    </PageLayout>
  );
};

export default Home;
