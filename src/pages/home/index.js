import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'context/userContex';
import clientFetch from 'lib/client-fetch';
import PageLayout from 'components/Templates/PageLayout';
import PageTitle from 'components/Atoms/PageTitle';
import { SocketContext } from 'context/useContextSocketSeller';
import rightArrow from 'assets/brand/rightArrow.svg';
import inscribe from 'assets/brand/homeCard1.svg';
import callendar from 'assets/brand/homeCard2.svg';
import ProductTopTable from 'components/Templates/ProductTopTable';
import Card from 'components/Molecules/Card';
import ReportStatusOrders from 'components/Pages/home/ReportStatusOrders';
import InventoryTurnoverIndicator from 'components/Pages/home/InventoryTurnoverIndicator';
import CustomCard from 'components/Pages/home/CustomCard';

import styles from './styles.module.scss';

const Home = () => {
  const { user } = useAuth();
  const [notify, setNotify] = useState(null);
  const history = useHistory();
  const userData = JSON.parse(user);
  const [list, setList] = useState([]);
  const userActive = userData.credential.user.name;
  const { accountId } = userData.credential.accountId;

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
          <ReportStatusOrders contentClassName={styles.fullHeight} />
        </div>
        <div className="col-12 col-md-4 mb-4">
          <CustomCard
            contentClassName={`${styles.fullHeight} py-2`}
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
          <InventoryTurnoverIndicator contentClassName={styles.fullHeight} />
        </div>
        <div className="col-12 col-md-4 mb-4">
          <CustomCard
            contentClassName={`${styles.fullHeight} py-2`}
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
