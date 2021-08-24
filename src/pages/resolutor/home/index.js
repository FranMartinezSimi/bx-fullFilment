import { useState, useEffect } from 'react';
import clientFetch from 'lib/client-fetch';

import PageLayout from 'components/Templates/PageLayout';
import Card from 'components/Molecules/Card';
import Chart from 'react-apexcharts';

const homeResolutor = () => {
  const [statisticsData, setTotalStatisticsData] = useState([]);
  const [data] = useState({
    series: [{
      name: 'Desktops',
      data: [150, 41, 35, 62, 133, 91, 148],
    }],
    options: {
      colors: ['#99B1FF'],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
        width: 1,
      },
      title: {
        // text: 'Product Trends by Month',
        align: 'left',
      },
      grid: {
        row: {
          // colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
      },
    },
  });
  // const [items] = useState([]);
  const chart = () => {
    clientFetch('ticket/v1/dashboard/getDashboard', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
    })
      .then((dashData) => {
        const statistics = dashData.totales;
        setTotalStatisticsData([
          {
            img: '/boxOpenIcon.png',
            number: statistics.abiertos,
            state: 'Abiertos',
          },
          {
            img: '/boxWarningIcon.png',
            number: statistics.proceso,
            state: 'En proceso',
          },
          {
            img: '/boxClosedIcon.png',
            number: statistics.resueltos,
            state: 'Resueltos',
          },
          {
            img: '/boxInfoIcon.png',
            number: statistics.total,
            state: 'Total',
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    chart();
  }, []);
  return (
    <PageLayout title="Bienvenido a Blue360" description="Bienvenido a Blue360" noBreadcrumb>
      <div className="container">
        <div className="row align-items-stretch">
          <div className="col-lg-12 pt-5">
            <Card
              className="shadow my-5"
            >
              <h4 className="display-font mb-4">Estadísticas de incidencias</h4>
              <ul className="d-flex justify-content-around mb-5">
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
              <a
                href="#!"
                style={{ color: '#2BB9FF' }}
              >
                <p className="text-end me-2 mb-0">
                  <small>Ver listado de tickets&gt;</small>
                </p>
              </a>
            </Card>
            <Card
              className="shadow my-5"
            >
              <h4 className="display-font">Estado de tus órdenes</h4>
              <Chart
                options={data.options}
                series={data.series}
                type="line"
                height={350}
              />
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default homeResolutor;
