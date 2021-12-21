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
import inscribe from 'assets/brand/homeCard1.svg';
import deliveredHands from 'assets/brand/delivered-hands.svg';
import truckRoute from 'assets/brand/truck-route.svg';
import reverseLogistics from 'assets/brand/reverse-logistics.svg';
import callendar from 'assets/brand/homeCard2.svg';
import Modal from 'components/Templates/Modal';
import FormReplenishment from 'components/Molecules/FormReplenishment';
import HomeMessage from 'components/Atoms/messageHome';
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

  if (setErrorTotales) {
    componentTotales = <HomeMessage />;
  } else {
    componentTotales = null;
  }

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
        // const enviados = statistics.map((item) => item.enviado)
        //   .reduce((item, acc) => item + acc);
        // const procesados = statistics.map((item) => item.procesado)
        //   .reduce((item, acc) => item + acc);
        // const entregados = statistics.map((item) => item.entregado)
        //   .reduce((item, acc) => item + acc);

        setTotalStatisticsData([
          {
            img: reverseLogistics,
            state: 'Procesados',
            number: statistics.procesado,
          },
          {
            img: deliveredHands,
            number: statistics.enviado,
            state: 'Entregado',
          },
          {
            img: truckRoute,
            number: statistics.entregado,
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
      <div style={{ width: '100%' }}>
        <div className="row m-5">
          <div className="col-8">
            <div className="row">
              <PageTitle
                className="row"
                subtitle={`${userActive}`}
                subtitleClassName="display-font fw-bold fs-3"
                title="Bienvenido a Blue360"
                titleSize="50px"
              />
            </div>
            <div>
              <Card className={styles.hei}>
                {statisticsData.length > 0 && !errorTotales ? (
                  <>
                    <div className="d-flex bd-highlight">
                      <div className="p-2 flex-grow-1 bd-highlight">
                        <h4 className="display-font m-1" style={{ fontFamily: 'Lato', fontSize: '22px' }}>Estado de tus órdenes</h4>
                      </div>
                      <ul className="d-flex justify-content-end align-items-center pt-3 mb-3">
                        <li>
                          <a
                            href="#!"
                            style={{ color: '#2BB9FF' }}
                            onClick={handleClick}
                          >
                            <p className="text-end me-2 mb-0">
                              <small style={{ top: 50 }}>Ver listado de órdenes &gt;</small>
                            </p>
                          </a>
                        </li>
                      </ul>
                    </div>

                    <ul className="d-flex justify-content-around mb-2 p-0">
                      {statisticsData.length > 0 && statisticsData.map((item) => (
                        <div className={`${styles.indicadores} mb-3`}>
                          <div className="card-body">
                            <div className="row mx-5 mt-3">
                              <div className="col my-2">
                                <img src={item.img} alt={item.state} />
                              </div>
                              <div className="col">
                                <div className="pt-3">
                                  <h5 className={`${styles.numInd}mb-0`}>{item.number}</h5>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <small>
                                <p className={`${styles.statusInd}`}>
                                  {item.state}
                                </p>
                              </small>
                            </div>
                          </div>
                        </div>
                      ))}
                    </ul>
                    <ul className="d-flex justify-content-bottom align-items-bottom m-0 p-0">
                      <li>
                        <p style={{ color: '#666666' }}>Últimos 7 días</p>
                      </li>

                    </ul>
                  </>
                ) : componentTotales}
              </Card>
            </div>
          </div>
          <div className="col-4">
            <div className="position-relative">
              <img src="/inscribeempresa.png" alt="" width="310" style={{ position: 'relative', top: 87 }} />
            </div>
          </div>
        </div>
        <div className="row mx-5 m-0">
          <div className="col-6 ">
            <Card className={styles.hei}>
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <img src={inscribe} alt="download" width="180" style={{ position: 'relative', bottom: 18 }} />
                </div>
                <div className="flex-grow-1 ms-3 pt-2">
                  <div className="d-flex flex-column bd-highlight mb-3 mt-1">
                    <div className="p-2 bd-highlight">
                      <h5 style={{ color: '#212121' }}>Órdenes de servicios</h5>
                    </div>
                    <div className="p-2 bd-highlight">
                      <p className={`${styles.pFileUp}`}>
                        Sube tus archivos masivos de órdenes de servicio
                      </p>
                    </div>
                    <div className="p-2 bd-highlight d-flex justify-content-end">
                      <a href="#!" className="btn btn-secondary " onClick={handleClickA} style={{ fontSize: 17 }}>
                        Subir órdenes
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
                  <img src={callendar} alt="download" width="160" style={{ position: 'relative', bottom: 20 }} />
                </div>
                <div className="flex-grow-1 ms-3 pt-2">
                  <div className="d-flex flex-column bd-highlight mb-3 mt-1">
                    <div className="p-2 bd-highlight">
                      <h5 style={{ color: '#212121' }}>Reposición de inventario</h5>
                    </div>
                    <div className="p-2 bd-highlight">
                      <p className={`${styles.pFileUp}`}>
                        Realiza la programación de la reposición de tu inventario
                      </p>
                    </div>
                    <div className="p-2 bd-highlight d-flex justify-content-end">
                      <a href="#!" className="btn btn-secondary " onClick={handleClickInventory} style={{ fontSize: 17 }}>
                        Programar
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
      </div>
    </PageLayout>
  );
};

export default Home;
