import { useState, useEffect, useContext } from 'react';
import { useAuth } from 'context/userContex';
import PageLayout from 'components/Templates/PageLayout';
import PageTitle from 'components/Atoms/PageTitle';
import { SocketContext } from 'context/useContextSocketSeller';
import ReportStatusOrders from 'components/Pages/home/ReportStatusOrders';
import InventoryTurnoverIndicator from 'components/Pages/home/InventoryTurnoverIndicator';
import CustomCard from 'components/Pages/home/CustomCard';
import MostRequestedProducts from 'components/Pages/home/MostRequestedProducts';
import NonStockOrderProducts from 'components/Pages/home/NonStockOrderProducts';

import styles from './styles.module.scss';

const Home = () => {
  const { user } = useAuth();
  const [notify, setNotify] = useState(null);
  const userData = JSON.parse(user);
  const userActive = userData.credential.user.name;

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
          <CustomCard contentClassName={`${styles.fullHeight} py-2`} />
        </div>
        <div className="col-12 col-md-5 mb-4">
          <MostRequestedProducts contentClassName={styles.fullHeight} />
        </div>
        <div className="col-12 col-md-3 mb-4">
          <InventoryTurnoverIndicator contentClassName={styles.fullHeight} />
        </div>
        <div className="col-12 col-md-4 mb-4">
          <NonStockOrderProducts contentClassName={styles.fullHeight} />
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
