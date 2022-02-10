import {
  useState, useEffect, useContext,
} from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'context/userContex';
import clientFetch from 'lib/client-fetch';
import PageLayout from 'components/Templates/PageLayout';
import Chart from 'react-apexcharts';
import PageTitle from 'components/Atoms/PageTitle';
import { SocketContext } from 'context/useContextSocketSeller';
import deliveredHands from 'assets/brand/delivered-hands-green.svg';
import rightArrow from 'assets/brand/rightArrow.svg';
import inscribe from 'assets/brand/homeCard1.svg';
import truckRoute from 'assets/brand/truck-route-orange.svg';
import reverseLogistics from 'assets/brand/reverse-logistics-cyan.svg';
import callendar from 'assets/brand/homeCard2.svg';
import HomeMessage from 'components/Atoms/messageHome';
import ProductTopTable from 'components/Templates/ProductTopTable';
import styles from './styles.module.scss';

const Home = () => {
  const { user } = useAuth();
  const [notify, setNotify] = useState(null);
  const [statisticsData, setTotalStatisticsData] = useState([]);
  const history = useHistory();
  const userData = JSON.parse(user);
  const [errorTotales, setErrorTotales] = useState(false);
  const [list, setList] = useState([]);
  const userActive = userData.credential.user.name;
  const { accountId } = userData.credential.accountId;
  const [dataOrders, setDataOrders] = useState({
    series: [''],
    chart: {
      height: 500,
      type: 'radialBar',
    },
    options: {
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
  let componentTotales;
  let noData;
  if (setErrorTotales) {
    componentTotales = <HomeMessage />;
    noData = <></>;
  } else {
    componentTotales = {};
  }

  useEffect(() => {
    (async () => {
      try {
        const monthsOfInventoryResponse = await clientFetch(
          'bff/v1/inventory/getMostRequestedProducts?lastDaysInNumber=7&productQuantityLimit=12',
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
  const charter = () => {
    clientFetch('bff/v1/inventory/getInventoryTurnoverIndicator', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
        accountId,
      },
      method: 'GET',
    })
      .then((dashData) => {
        setDataOrders({
          series: [Math.floor(dashData.indicator)],

          options: {
            plotOptions: {
              radialBar: {
                hollow: {
                  size: '65%',
                },
                chart: {
                  height: 500,
                  type: 'radialBar',
                },
                dataLabels: {
                  name: {
                    show: false,
                  },
                  value: {
                    formatter(val) {
                      return Number(val);
                    },
                    fontSize: '30px',
                    show: true,
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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClickOrders = (e) => {
    e.preventDefault();
    history.push('/ordenes');
  };

  const handleClickMeses = (e) => {
    e.preventDefault();
    history.push('/meses-de-inventario');
  };

  const handleClickUpOrders = (e) => {
    e.preventDefault();
    history.push('/ordenes/subir-ordenes');
  };

  const handleClickInventory = (e) => {
    e.preventDefault();
    history.push('/reposition/create');
  };

  useEffect(() => {
    chart();
    charter();
  }, []);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('client', (dataSocket) => {
      setNotify(dataSocket);
    });
  }, [socket, notify]);
  return (
    <PageLayout title="Bienvenido a Blue360" description="Bienvenido a Blue360" noBreadcrumb>
      <div className={styles.parent}>
        <div className="row justify-content-start">
          <div className="row mt-5">
            <PageTitle
              className="row"
              subtitle={`${userActive}`}
              subtitleClassName="display-font fw-bold fs-3"
              title="Bienvenido a Blue360"
              titleSize="50px"
            />
          </div>
          {statisticsData.length > 0 && !errorTotales ? (
            <div className="col-12 col-sm-12">
              <div className={styles.gridFirst}>
                <div>
                  <div className={styles.orderStatus}>
                    <div className="d-flex justify-content-between mb-1">
                      <div className="col-6 col-sm-6 ms-4">
                        <h1 className={styles.titulo}>
                          Estado de tus órdenes
                        </h1>
                      </div>
                      <div className="col-5 col-sm-5">
                        <div className="d-flex justify-content-end pt-2">
                          <a
                            href="#!"
                            onClick={handleClickOrders}
                          >
                            <h6 className={`text-right ${styles.link}`}>
                              Ver todas las órdenes
                              <img className="px-2" src={rightArrow} alt={rightArrow} />
                            </h6>
                          </a>
                        </div>

                      </div>
                    </div>
                    <div className="row px-5">
                      {statisticsData.length > 0 && statisticsData.map((item) => (
                        <div className="col-4 col-sm-4 mt-5">
                          <div className={`${styles.indicators}`}>
                            <div className="row">
                              <div className="col-12 col-sm-12 pt-3">
                                <div className="row">
                                  <div
                                    className={`col-6 col-sm-6 ${styles.centerImg}`}
                                  >
                                    <img src={item.img} alt={item.state} />
                                  </div>
                                  <div className="col-6 col-sm-6 px-0">
                                    <h5
                                      style={{ color: item.bg }}
                                      className={`text-right ${styles.colorNum}`}
                                    >
                                      {item.number}
                                    </h5>
                                  </div>
                                </div>
                                <div className={`col-12 col-sm-12 ${styles.colorState}`}>
                                  <p
                                    style={{ color: item.bg }}
                                    className="text-center"
                                  >
                                    {item.state}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                      ))}
                    </div>
                    <div className={styles.margin}>
                      <h6 className={`${styles.sevenDays}d-flex justify-content-start`}>Últimos 7 días</h6>
                    </div>
                  </div>
                </div>
                <div>
                  <div className={styles.orders}>
                    <div className="row justify-content-center mb-4">
                      <img style={{ width: '75px', height: '63,85px' }} className="px-2" src={callendar} alt={callendar} />
                    </div>
                    <div className="row justify-content-center mb-1">
                      <h1 className={`${styles.titulo}`}>Reposición de inventario</h1>
                    </div>
                    <div className="row justify-content-center mb-1">
                      <p className={styles.parrafo}>
                        Realiza la programación de la reposición de tu inventario
                      </p>
                    </div>
                    <div className="row justify-content-center mb-1">
                      <div className="p-2 bd-highlight d-flex justify-content-center">
                        <a href="#!" className="btn btn-secondary " onClick={handleClickInventory} style={{ fontSize: 17, width: '204px' }}>
                          Programar
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : componentTotales}
        </div>
        <div className="row mt-2">
          <div className={styles.grid}>
            <div>
              <div className={styles.topRated}>
                <div className="d-flex justify-content-between p-3 px-0">
                  <div className="col-7 col-sm-7 px-0">
                    <h1 className={styles.titulo}>Productos más solicitados</h1>
                  </div>
                  <div className="col-3 col-sm-3 p-0">
                    <p className="text-end pe-4">
                      Últimos 7 días
                    </p>
                  </div>
                </div>
                <div className="">
                  <ProductTopTable data={list} />
                  <div className="d-flex justify-content-end">
                    <a
                      href="#!"
                      onClick={handleClickMeses}
                    >
                      <h6 className={`text-right ${styles.link} ms-0`}>
                        Ver detalle
                        <img className="px-2" src={rightArrow} alt={rightArrow} />
                      </h6>
                    </a>
                  </div>
                </div>

              </div>
            </div>
            <div>
              <div className={styles.rotationInventori}>
                <div className="row justify-content-center mb-2">
                  <h1 className={`${styles.titulo}`}>Rotación de servicios</h1>
                </div>
                <div className={`row justify-content-center ${styles.larg}`}>
                  {!dataOrders.length > 0 ? (
                    <Chart
                      options={dataOrders.options}
                      series={dataOrders.series}
                      type="radialBar"
                      height={190}
                    />
                  ) : noData}
                </div>
                <div className={`row justify-content-end $${styles.sevenDays}`}>
                  Últimos 30 días
                </div>
              </div>
            </div>
            <div>
              <div className={styles.orders}>
                <div className="row justify-content-center mb-4">
                  <img style={{ width: '75px', height: '63,85px' }} className="px-2" src={inscribe} alt={inscribe} />
                </div>
                <div className="row justify-content-center mb-1">
                  <h1 className={`${styles.titulo}`}>Órdenes de servicios</h1>
                </div>
                <div className="row justify-content-center mb-1">
                  <p className={`${styles.parrafo} text-center`}>
                    Sube tus archivos masivos de órdenes de servicio
                  </p>
                </div>
                <div className="row justify-content-center">
                  <div className="p-2 bd-highlight d-flex justify-content-center">
                    <a href="#!" className="btn btn-secondary " onClick={handleClickUpOrders} style={{ fontSize: 17, width: '204px' }}>
                      Subir Ordenes
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
