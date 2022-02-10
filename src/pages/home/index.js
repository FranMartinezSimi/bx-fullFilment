import { useState, useEffect, useContext } from 'react';
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
import ProductTopTable from 'components/Templates/ProductTopTable';
import Card from 'components/Molecules/Card';
import styles from './styles.module.scss';

const CustomCard = ({ title, subtitle, image, btnText, onClick }) => (
  <Card className={`${styles.fullHeight} py-2`}>
    <div className="row">
      <div className="col-12 d-flex justify-content-center mb-4">
        <img
          style={{ width: '75px', height: '63,85px' }}
          className="px-2"
          src={image}
          alt={image}
        />
      </div>
      <div className="col-12 d-flex justify-content-center mb-2">
        <span className={`${styles.titulo}`}>{title}</span>
      </div>
      <div className="col-12 d-flex justify-content-center mb-2">
        <p className={styles.parrafo}>{subtitle}</p>
      </div>
      <div className="col-12 d-flex justify-content-center mb-2">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onClick}
          style={{ fontSize: 17, width: '204px' }}
        >
          {btnText}
        </button>
      </div>
    </div>
  </Card>
);

const Home = () => {
  const { user } = useAuth();
  const [notify, setNotify] = useState(null);
  const [statisticsData, setTotalStatisticsData] = useState([]);
  const history = useHistory();
  const userData = JSON.parse(user);
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
              formatter: (w) => w.globals.initialSeries[0],
            },
          },
        },
      },
      stroke: { lineCap: 'round' },
      labels: [''],
    },
  });

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
    }).then((dashData) => {
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
    });
  };
  const charter = () => {
    clientFetch('bff/v1/inventory/getInventoryTurnoverIndicator', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
        accountId,
      },
      method: 'GET',
    }).then((dashData) => {
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
                  formatter: (w) => w.globals.initialSeries[0],
                },
              },
            },
          },
          stroke: { lineCap: 'round' },
          labels: [''],
        },
      });
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
    <PageLayout
      title="Bienvenido a Blue360"
      description="Bienvenido a Blue360"
      noBreadcrumb
    >
      <div className="mt-4">
        <PageTitle
          title="Bienvenido a Blue360"
          titleSize="50px"
          subtitle={`${userActive}`}
          subtitleClassName="display-font fw-bold fs-3"
        />
      </div>

      <div className="row">
        <div className="col-12 col-md-8 mb-4">
          <Card className={styles.fullHeight}>
            <div className="row mb-4">
              <div className="col-12 col-md-12 d-flex justify-content-between align-items-center">
                <h1 className={styles.titulo}>Estado de tus órdenes</h1>
                <a href="#!" onClick={handleClickOrders}>
                  <span className={`text-right ${styles.link}`}>
                    Ver todas las órdenes
                    <img className="px-2" src={rightArrow} alt={rightArrow} />
                  </span>
                </a>
              </div>
            </div>
            <div className="row my-5">
              {statisticsData.map((item) => (
                <div className="col-12 col-md-4 px-5">
                  <Card className="py-4 mb-4">
                    <div className="row">
                      <div className={`col-6 col-sm-6 ${styles.centerImg}`}>
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
                      <p style={{ color: item.bg }} className="text-center">
                        {item.state}
                      </p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
            <div className="row">
              <div className="col-12 d-flex justify-content-start px-5">
                <span className={`${styles.sevenDays}`}>Últimos 7 días</span>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-12 col-md-4 mb-4">
          <CustomCard
            title="Reposición de inventario"
            subtitle="Realiza la programación de la reposición de tu inventario"
            btnText="Programar"
            image={callendar}
            onClick={handleClickInventory}
          />
        </div>
        <div className="col-12 col-md-5 mb-4">
          <Card className={styles.fullHeight}>
            <div className="row mb-2">
              <div className="col-12 col-md-12 d-flex justify-content-between align-items-center">
                <h1 className={styles.titulo}>Productos más solicitados</h1>
                <span className={`${styles.sevenDays} text-end m-0`}>
                  Últimos 7 días
                </span>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12">
                <ProductTopTable data={list} />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12 d-flex justify-content-end">
                <a href="#!" onClick={handleClickMeses}>
                  <span className={`text-right ${styles.link} ms-0`}>
                    Ver detalle
                    <img className="px-2" src={rightArrow} alt={rightArrow} />
                  </span>
                </a>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-12 col-md-3 mb-4">
          <Card className={styles.fullHeight}>
            <div className="row">
              <div className="col-12 mb-2">
                <h1 className={`${styles.titulo}`}>Rotación de servicios</h1>
              </div>
              <div className="col-12 mb-2">
                <Chart
                  options={dataOrders.options}
                  series={dataOrders.series}
                  type="radialBar"
                  height={190}
                />
              </div>
              <div className="col-12 mb-2">
                <p className={`${styles.sevenDays} text-end m-0`}>
                  Últimos 30 días
                </p>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-12 col-md-4 mb-4">
          <CustomCard
            title="Órdenes de servicios"
            subtitle="Sube tus archivos masivos de órdenes de servicio"
            btnText="Subir Ordenes"
            image={inscribe}
            onClick={handleClickUpOrders}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
