import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { GetDashboradOrders } from 'services/reports';
import deliveredHands from 'assets/brand/delivered-hands-green.svg';
import truckRoute from 'assets/brand/truck-route-orange.svg';
import reverseLogistics from 'assets/brand/reverse-logistics-cyan.svg';
import rightArrow from 'assets/brand/rightArrow.svg';
import Card from 'components/Molecules/Card';
import GetCountBackorder from 'services/orders/getCountBackorder';
import AlertInfo from 'components/Molecules/AlertInfo';
import IndicatorCard from './IndicatorCard';

import styles from './styles.module.scss';

const ReportStatusOrders = ({ contentClassName }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [statistics, setStatistics] = useState({
    procesado: 0,
    entregado: 0,
    enviado: 0,
  });
  const [backOrderTotal, setBackOrderTotal] = useState(0);
  const history = useHistory();

  const getReport = () => {
    GetDashboradOrders().then((response) => {
      const { enviado, procesado, entregado } = response.orders_deliver || {};
      setStatistics({ enviado, procesado, entregado });
      setIsFetching(false);
    }).catch(() => setIsFetching(false));
  };

  const getBackOrder = async () => {
    try {
      const { total } = await GetCountBackorder();

      if (!total) return;

      setBackOrderTotal(Number(total));
    } catch (error) {
      setBackOrderTotal(0);
    }
  };

  useEffect(() => {
    getReport();
    getBackOrder();
  }, []);

  const handleClickOrders = (e) => {
    e.preventDefault();
    history.push('/ordenes');
  };

  const goToBackOrder = (e) => {
    e.preventDefault();
    history.push('/ordenes?status=Sin Stock');
  };

  return (
    <Card className={contentClassName}>
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
      <div className="row row mt-5">
        <IndicatorCard
          background="#27A6E5"
          image={reverseLogistics}
          text="Procesados"
          indicator={statistics.procesado}
          isFetching={isFetching}
        />
        <IndicatorCard
          background="#408D5C"
          image={deliveredHands}
          text="Entregado"
          indicator={statistics.entregado || 500}
          isFetching={isFetching}
        />
        <IndicatorCard
          background="#E5713D"
          image={truckRoute}
          text="En Camino"
          indicator={statistics.enviado}
          isFetching={isFetching}
        />
      </div>
      <div className="row mb-3">
        <div className="col-12 d-flex justify-content-between align-items-center px-5">
          <span className={`${styles.sevenDays}`}>Últimos 7 días</span>
          {backOrderTotal > 0 && (
            <AlertInfo>
              Tienes
              {' '}
              {backOrderTotal}
              {' '}
              órdenes Sin Stock, haz clic
              {' '}
              <a href="/#" onClick={goToBackOrder}>
                “Aquí”
              </a>
              {' '}
              para ver más.
            </AlertInfo>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ReportStatusOrders;
