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
import deliveredHands from 'assets/brand/delivered-hands-green.svg';
import truckRoute from 'assets/brand/truck-route-orange.svg';
import reverseLogistics from 'assets/brand/reverse-logistics-cyan.svg';
import callendar from 'assets/brand/homeCard2.svg';
import Modal from 'components/Templates/Modal';
import FormReplenishment from 'components/Molecules/FormReplenishment';
import HomeMessage from 'components/Atoms/messageHome';
import ProductTopTable from 'components/Templates/ProductTopTable';
import styles from './styles.module.scss';

const Home = () => {
  const { user } = useAuth();
  const [notify, setNotify] = useState(null);
  const [statisticsData, setTotalStatisticsData] = useState([]);
  const history = useHistory();
  const [modalInventory, setModalInventory] = useState(false);
  const userData = JSON.parse(user);
  const [errorTotales, setErrorTotales] = useState(false);
  const [list, setList] = useState([]);
  const userActive = userData.credential.user.name;
  const { accountId } = userData.credential.accountId;
  let componentTotales;

  const cardMostRequest = {
    width: '500px',
    height: '26px',
    fontSize: '22px',
    lineHeight: '26px',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontFamily: 'lato',
    color: '#212121',
    marginTop: '18px',
  };
  const seventDays = {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '10px',
    marginTop: '8px',
    lineHeight: '45px',
    color: '#666666',
  };
  const detalleCardTop = {
    color: '#2BB9FF',
    fontSize: 12,
    fontFamily: 'lato',
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: '158%',
  };
  if (setErrorTotales) {
    componentTotales = <HomeMessage />;
  } else {
    componentTotales = null;
  }

  useEffect(() => {
    (async () => {
      try {
        const monthsOfInventoryResponse = await clientFetch(
          'bff/v1/inventory/getMostRequestedProducts?lastDaysInNumber=90&productQuantityLimit=12',
          {
            headers: {
              apikey: process.env.REACT_APP_API_KEY_KONG,
              accountId,
            },
            method: 'GET',
          },
        );
        setList(monthsOfInventoryResponse);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
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
        setTotalStatisticsData([
          {
            img: reverseLogistics,
            state: 'Procesados',
            number: statistics.enviado,
            bg: '#27A6E5',
          },
          {
            img: deliveredHands,
            number: statistics.procesado,
            state: 'Entregado',
            bg: '#408D5C',
          },
          {
            img: truckRoute,
            number: statistics.entregado,
            state: 'En Camino',
            bg: '#E5713D',
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

  const handleClickMeses = (e) => {
    e.preventDefault();
    history.push('/meses-de-inventario');
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
            <div className="row m-0">
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
                              <p style={{ color: '#666666' }}>Últimos 7 días</p>
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
                              <div className="col mt-3 ms-1">
                                <img src={item.img} alt={item.state} />
                              </div>
                              <div className="col">
                                <div className="pt-3">
                                  <h5 style={{ fontSize: '26px', fontFamily: 'mont', lineHeight: '30px', textAlign: 'right', top: '24px', width: '41px', right: '47px', color: item.bg }}>{item.number}</h5>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <small>
                                <p
                                  style={{
                                    fontFamily: 'mont',
                                    fontSize: '15px',
                                    lineHeight: '109.9%',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    color: item.bg,
                                  }}
                                >
                                  {item.state}
                                </p>
                              </small>
                            </div>
                          </div>
                        </div>
                      ))}
                    </ul>
                    <ul className="d-flex justify-content-end m-0 p-0">

                      <a
                        href="#!"
                        style={{ color: '#2BB9FF' }}
                        onClick={handleClick}
                      >
                        <p className="text-end me-2 mb-0 pt-2">
                          <small style={{
                            top: 50,
                            color: '#2BB9FF',
                            fontSize: 12,
                            fontFamily: 'lato',
                            fontWeight: 'bold',
                            fontStyle: 'normal',
                            lineHeight: '158%',
                          }}
                          >
                            Ver todas las órdenes &gt;
                          </small>
                        </p>
                      </a>

                    </ul>
                  </>
                ) : componentTotales}
              </Card>
            </div>
          </div>
          <div className="col-4 row align-items-end ps-0">
            <div
              className={`${styles.shadow}`}
              style={{
                borderRadius: '15px',
                background: '#FFFFFF',
                width: '91%',
                height: '260px',
                padding: '10px',
              }}
            >
              <div className="row">
                <div className="col-8">
                  <h1
                    className=" ps-2 mb-3"
                    style={
                      cardMostRequest
                    }
                  >
                    Productos más solicitados
                  </h1>
                </div>
                <div
                  className="col-4 text-end pe-4"
                  style={seventDays}
                >
                  Últimos 7 días
                </div>
              </div>
              <div style={{ width: '90%', marginLeft: '25px' }}>
                <ProductTopTable data={list} />

              </div>
              <div
                className="container"
              >
                <div className="row" style={{ height: '40px' }}>
                  <div className="col align-self-end">
                    <div
                      className="d-flex justify-content-end m-0 pe-3"
                    >
                      <a
                        href="#!"
                        style={{ color: '#2BB9FF' }}
                        onClick={handleClickMeses}
                      >
                        <p className="text-end me-2 mb-0 pt-2">
                          <small
                            className="mb-2"
                            style={detalleCardTop}
                          >
                            Ver detalle &gt;
                          </small>
                        </p>
                      </a>

                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="row mx-5 m-0 mb-5">
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
