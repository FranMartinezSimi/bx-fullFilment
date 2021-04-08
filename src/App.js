import alarm from './assets/brand/alarm.svg';
import bento from './assets/brand/bento.svg';
import avatar from './assets/brand/avatar.svg';
import arrowDown from './assets/brand/arrow-down.svg';
import arrowLeft from './assets/brand/arrow-left.svg';
import loadArrow from './assets/brand/loadarrow.svg';
import './App.css';
import React from 'react'
import Detalle from './components/Detalle'

function App() {


  const [orders, setOrders] = React.useState([])

  const [showModal, setModal] = React.useState(false)

  const [activeOrder, setActiveOrder] = React.useState({})

  const raw = JSON.stringify({
    "page": 1,
    "status": "all",
    "warehouse": "bx1"
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: raw,
    redirect: 'follow'
  };


  React.useEffect(() => {
    fetch("https://desa-api.bluex.cl/api/v1/fulfillment/order/getOrderList", requestOptions)
        .then(res => res.json())
        .then((data) => {
          setOrders([...data["order"]])
        })
        .catch(console.log)
    return () => {
      console.log('use Effect')
    }// eslint-disable-next-line
  }, [])
  return (
    <div className="container">
      <Detalle
        showModal={showModal}
        order_number={activeOrder.order_number}
        fecha={activeOrder.fecha}
        description={activeOrder.description}
        tracking={activeOrder.tracking}
        order_id={activeOrder.order_id}
      />
      {showModal ? <div className="offModal"><button className="close" onClick={() => { setModal(false) }}>X</button></div> : <></>}
      <header>
        <img src={alarm} alt="" />
        <img src={bento} alt="" />
        <img src={avatar} alt="" />
        <p>Nicolás Cruz<br />
          <small>Fulfillment By</small>
        </p>
        <img src={arrowDown} alt="" />

      </header>
      <main>
        <aside>
          <p>Home</p>
          <img src={arrowLeft} alt="" />
          <p>Ordenes</p>
        </aside>
        <article>
          <h1>Tus órdenes</h1>
        </article>
        <section>
          <div>
            <p>
              <img src={loadArrow} alt="" />
              &nbsp; Subir orden
            </p>
            <div className="actions">
              <input type="text" placeholder="N° OS / Destinatario"></input>
              <select id="pages" name="pages" placeholder="Filtro por estado">
                <option value="1">Filtrar por estado</option>
                <option value="1">Correcta</option>
                <option value="2">Incompleta</option>
                <option value="3">Error</option>
              </select>
              <select id="pages" name="pages" placeholder="Filtro por tracking">
                <option value="1">Filtrar por tracking</option>
                <option value="1">En tránsito</option>
                <option value="2">En bodega</option>
                <option value="3">Entregado</option>
              </select>
              <input type="date" placeholder="Ordenar por"></input>
            </div>
          </div>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th><p>N° Orden</p></th>
                  <th><p>Destinatario</p></th>
                  <th><p>Estado OS</p></th>
                  <th><p>Estado Tracking</p></th>
                  <th><p>Fecha de orden</p></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (<tr key={index}>
                  <td>{order.order_number}</td>
                  <td>{order.first_name}</td>
                  <td>{order.description}</td>
                  <td>{order.tracking}</td>
                  <td>{order.fecha}</td>
                  <td><button onClick={() => { setModal(true); setActiveOrder(orders[index]) }}>Ver Detalle &#62;</button> </td>
                </tr>))}
              </tbody>
            </table>
          </div>
          <div className="commands">
            <p>Órdenes</p>
            <select id="pages" name="pages">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
            <p>Mostrando 8 de 8</p>
            <p>&#60; 1 2 3 4 5 &#62;</p>
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2021 Blue Express - Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

export default App;
