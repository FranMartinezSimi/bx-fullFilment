import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { GetDashboradOrders } from 'services/reports';
import deliveredHands from 'assets/brand/delivered-hands-green.svg';
import truckRoute from 'assets/brand/truck-route-orange.svg';
import reverseLogistics from 'assets/brand/reverse-logistics-cyan.svg';
import rightArrow from 'assets/brand/rightArrow.svg';
import Card from 'components/Molecules/Card';

import styles from './styles.module.scss';

const ReportStatusOrders = ({ contentClassName }) => {
  const [statisticsData, setTotalStatisticsData] = useState([]);
  const history = useHistory();

  const getReport = async () => {
    try {
      const response = await GetDashboradOrders();
      const { enviado, procesado, entregado } = response.orders_deliver || {};

      setTotalStatisticsData([
        {
          img: reverseLogistics,
          state: 'Procesados',
          number: procesado,
          bg: '#27A6E5',
        },
        {
          img: deliveredHands,
          number: entregado,
          state: 'Entregado',
          bg: '#408D5C',
        },
        {
          img: truckRoute,
          number: enviado,
          state: 'En Camino',
          bg: '#E5713D',
        },
      ]);
    } catch (error) {
      setTotalStatisticsData([]);
    }
  };

  useEffect(() => getReport(), []);

  const handleClickOrders = (e) => {
    e.preventDefault();
    history.push('/ordenes');
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
      <div className="row row mt-5 mb-4">
        {!statisticsData.length && (
          <div className={styles.simulateReport} />
        )}
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
  );
};

export default ReportStatusOrders;
