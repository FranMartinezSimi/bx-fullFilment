import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { clientFetch } from "lib/client-fetch";
import PageLayout from "components/Templates/PageLayout";
import PageTitle from "components/Atoms/PageTitle";
import Card from "components/Molecules/Card";
import OrderedList from "components/Molecules/OrderedList";
import ColumnChart from "components/Atoms/ColumnChart";
import Spinner from 'components/Atoms/Spinner';
import styles from "./styles.module.scss";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataOrders, setDataOrders] = useState({
    series: [
      {
        name: "En camino",
        data: [0],
      },
      {
        name: "Procesados",
        data: [0],
      },
      {
        name: "Entregados",
        data: [0],
      },
    ],
    options: {
      colors: ["#3363FF", "#FDCC60", "#FDA460"],
      chart: {
        id: "basic-bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 0,
        },
      },
      xaxis: {
        categories: ["Cargando..."],
      },
      legend: {
        position: "top",
      },
      fill: {
        opacity: 1,
      },
    },
  });
  let history = useHistory();

  const listData = [
    {
      name: "Nombre Producto1",
      sku: "9874754754745",
      stock: "140",
      qty: "11569",
      update: "6 hrs",
    },
    {
      name: "Nombre Producto 2",
      sku: "9877798978",
      stock: "13",
      qty: "128",
      update: "6 hrs",
    },
    {
      name: "Nombre Producto 3",
      sku: "987765567",
      stock: "1340",
      qty: "4",
      update: "6 hrs",
    },
  ];
  const componentOrders = (
    <a
      href="#!"
      style={{ color: "#2BB9FF" }}
      onClick={(e, path) => handleInventory(e, "/ordenes")}
    >
      <p className="text-end me-2">
        <small>ir a ordenes&gt;</small>
      </p>
    </a>
  );
  const componentInventory = (
    <a
      href="#!"
      style={{ color: "#2BB9FF" }}
      onClick={(e, path) => handleInventory(e, "/inventario")}
    >
      <p className="text-end me-2">
        <small>ir a inventario &gt;</small>
      </p>
    </a>
  );
  const handleInventory = (e, path) => {
    e.preventDefault();
    history.push(path);
  };
  const chart = () => {
    console.log("start fetch...");
    clientFetch("orders/getDashboradOrders", {
      body: {
        page: 1,
        warehouse: "bx1",
        status: "all",
      },
    })
      .then((data) => {
        console.log("orders_deliver", data.orders_deliver);
        setIsLoading(false)
        const dates = data.orders_deliver.map((item) => (item.date));
        const send = data.orders_deliver.map((item) => (item.enviado));
        const process = data.orders_deliver.map((item) => (item.procesado));
        const delivered = data.orders_deliver.map((item) => (item.entregado));

        setDataOrders({
          series: [
            {
              name: "En camino",
              data: send,
            },
            {
              name: "Procesados",
              data: process,
            },
            {
              name: "Entregados",
              data: delivered,
            },
          ],
          options: {
            colors: ["#3363FF", "#FDCC60", "#FDA460"],
            chart: {
              id: "basic-bar",
              height: 350,
              stacked: true,
              toolbar: {
                show: false,
              },
            },
            plotOptions: {
              bar: {
                horizontal: false,
                borderRadius: 0,
              },
            },
            xaxis: {
              categories: dates,
            },
            legend: {
              position: "top",
            },
            fill: {
              opacity: 1,
            },
          },
        });

      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    chart();
  }, []);
  return (
    <PageLayout title="Bienvenido a Blue360" description="Bienvenido a Blue360">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <PageTitle
            className="col"
            subtitle="Nicolás Cruz"
            title="Bienvenido a Blue360"
          />
          <div className="col">
            <div className="text-center">
              <img src="/fulfill1.png" alt="" width="180" />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row align-items-stretch">
          <div className="col-lg-6">
            <Card
              className={`${styles.card} shadow my-5`}
              footer={componentOrders}
            >
              <h4 className="display-font">Estado de tus órdenes</h4>
              <p>Ingresa mensualmente</p>
              {isLoading && (
                <div className="mt-5 pt-5">
                  <Spinner />
                </div>
              )}
              { !isLoading && (dataOrders != null) && (
                <ColumnChart
                  data={dataOrders}
                />
              )}
            </Card>
          </div>
          <div className="col-lg-6">
            <Card
              className={`${styles.card} shadow my-5`}
              footer={componentInventory}
            >
              <h4 className="display-font">Productos más vendidos</h4>
              <p>Últimos 30 días</p>
              <OrderedList listData={listData} />
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
