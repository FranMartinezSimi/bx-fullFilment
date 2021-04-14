import React, {useState} from 'react';

import OrderDetail from './OrderDetail'
import OrderItem from './OrderItem';

import arrowLeft from '../assets/brand/arrow-left.svg';
import loadArrow from '../assets/brand/loadarrow.svg';
import '../assets/styles/OrdersList.css';

const OrdersList = () => {

    const [orders, setOrders] = useState([])

    const [showModal, setModal] = useState(false)

    const [activeOrder, setActiveOrder] = useState({
        order_id: '',
        order_number: '',
        fecha: '',
        description: '',
        tracking: ''
    })

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
            <main>
                <aside>
                    <p>Home</p>
                    <img src={arrowLeft} alt=""/>
                    <p>Ordenes</p>
                </aside>
                <article>
                    <h1>Tus órdenes</h1>
                </article>
                <section>
                    <div>
                        <p>
                            <img src={loadArrow} alt=""/>
                            &nbsp; Subir orden
                        </p>
                        <div className="actions">
                            <input type="text" placeholder="N° OS / Destinatario"/>
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
                            <input type="date" placeholder="Ordenar por"/>
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
                                <th><p>Detalle</p></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                orders.map(order =>
                                    <OrderItem {...order} showDetailHandle={setModal} setOrderDetails={setActiveOrder} />)
                            }
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

                <OrderDetail {...activeOrder} showModal={showModal} hideDetail={setModal}/>
            </main>
        </div>
    );
}

export default OrdersList;
