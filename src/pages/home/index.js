import React from 'react';

import { useHistory } from "react-router-dom";
import PageLayout from 'components/Templates/PageLayout';
import PageTitle from 'components/Atoms/PageTitle';
import Card from 'components/Molecules/Card';
import OrderedList from 'components/Molecules/OrderedList';
import styles from './styles.module.scss'

const Home = () => {
  let history = useHistory();
  const listData = [
    {
      name: 'Nombre Producto1',
      sku: '9874754754745',
      stock: '140',
      qty: '11569',
      update: '6 hrs'
    },
    {
      name: 'Nombre Producto 2',
      sku: '9877798978',
      stock: '13',
      qty: '128',
      update: '6 hrs'
    },
    {
      name: 'Nombre Producto 3',
      sku: '987765567',
      stock: '1340',
      qty: '4',
      update: '6 hrs'
    },
  ]
  const componentOrders = <a href="#!" style={{color: '#2BB9FF'}} onClick={(e, path) => handleInventory(e, "/ordenes")}><p className="text-end me-2"><small>ir a ordenes&gt;</small></p></a>;
  const componentInventory= <a href="#!" style={{color: '#2BB9FF'}} onClick={(e, path) => handleInventory(e, "/inventario")}><p className="text-end me-2"><small>ir a inventario &gt;</small></p></a>;
  const handleInventory = (e, path) => {
    e.preventDefault();
    history.push(path);
  }
  return (
    <PageLayout
      title="Bienvenido a Blue360"
      description="Bienvenido a Blue360"
    >
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <PageTitle
            className="col"
            subtitle="Nicolás Cruz"
            title="Bienvenido a Blue360"
          />
          <div className="col">
            <div className="text-center">
              <img src="/fulfill1.png" alt="" width="150" />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row align-items-stretch mt-5">
          <div className="col-6">
            <Card
              className={`${styles.card} shadow my-5"`}
              footer={componentOrders}
            >
              <h4 className="display-font">Estado de tus órdenes</h4>
              <p>Ingresa mensualmente</p>
            </Card>
          </div>
          <div className="col-6">
            <Card
              className={`${styles.card} shadow my-5"`}
              footer={componentInventory}
            >
              <h4 className="display-font">Productos más vendidos</h4>
              <p>Últimos 30 días</p>
              <OrderedList listData={listData}/>
            </Card>
          </div>
        </div>
      </div>

    </PageLayout>
  );
}
 
export default Home;