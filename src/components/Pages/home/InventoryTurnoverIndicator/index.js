import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

import Card from 'components/Molecules/Card';
import { GetInventoryTurnoverIndicator } from 'services/reports';
import { useAuth } from 'context/userContex';

import styles from './styles.module.scss';

const InventoryTurnoverIndicator = ({ contentClassName }) => {
  const { userParsed } = useAuth();

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
    if (!userParsed) return;

    const { accountId } = userParsed.credential;

    GetInventoryTurnoverIndicator(accountId).then((dashData) => {
      setDataOrders({
        series: [
          dashData.indicator === 0 ? 0 : Number(dashData.indicator).toFixed(1),
        ],
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
  }, [userParsed]);

  return (
    <Card className={contentClassName}>
      <div className="row">
        <div className="col-12 mb-4">
          <h1 className={`${styles.titulo}`}>Rotación de inventario</h1>
        </div>
        <div className="col-12 mb-2">
          <Chart
            options={dataOrders.options}
            series={dataOrders.series}
            type="radialBar"
            height={190}
          />
        </div>
        <div className="col-12">
          <p className={`${styles.sevenDays} text-end m-0`}>Últimos 30 días</p>
        </div>
      </div>
    </Card>
  );
};

export default InventoryTurnoverIndicator;
