import React, {useEffect} from 'react'

import todo from '../assets/brand/todo.svg'
import calendar from '../assets/brand/calendar.svg'
import flag from '../assets/brand/flag.svg'
import checkmap from '../assets/brand/checkmap.svg'
import arrowDown from '../assets/brand/arrow-down.svg'
import '../assets/styles/Detalle.css'

const OrderDetail = (props) => {

    const {order_id, order_number, fecha, description, tracking, showModal, hideDetail} = props;

    const [orderDetails, setOrderDetails] = React.useState([])

    const raw = JSON.stringify({
        "warehouse": "bx1",
        "id": `${order_id}`
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: raw,
        redirect: 'follow'
    };

    useEffect(() => {
        fetch("https://desa-api.bluex.cl/api/v1/fulfillment/order/getOrderDetail", requestOptions)
            .then(res => res.json())
            .then((data) => {
                setOrderDetails([...data["detail_order"]])
            })
            .catch(console.log)
        return () => {
        }// eslint-disable-next-line
    }, [order_id]);

    const hideDetailHandle = () => {
        hideDetail(false);
    }

    return (
        <>
            {
                showModal &&
                <>
                    <div className="offModal">
                        <button className="close" onClick={hideDetailHandle}>X</button>
                    </div>

                    <div className="modal">
                        <div className="info">
                            <h3>Detalle de orden</h3>
                            <p>
                                <img src={todo} alt=""/> <strong>&nbsp;&nbsp;N° de
                                orden:&nbsp;</strong>&nbsp;&nbsp;&nbsp;&nbsp;{order_number}
                            </p>
                            <p>
                                <img src={calendar} alt=""/>
                                <strong>&nbsp;&nbsp;Fecha:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                {fecha}
                            </p>
                            <p><
                                img src={flag} alt=""/>
                                <strong>&nbsp;&nbsp;Estado:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                {description}
                            </p>
                            <p>
                                <img src={checkmap} alt=""/>
                                <strong>&nbsp;&nbsp;Tracking:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
                                &nbsp;&nbsp;&nbsp;&nbsp;{tracking}
                                <br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <small>
                                    <em>Última actualización 12-03 11:58</em>
                                </small>
                            </p>
                            <button>
                                <p>
                                    <strong>Detalle Pedido A</strong>
                                </p>
                                <img src={arrowDown} alt=""/>
                            </button>
                            <table>
                                <thead>
                                <tr>
                                    <td>SKU</td>
                                    <td>Descripción</td>
                                    <td>Cantidad</td>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    orderDetails && orderDetails.map((order, index) => (
                                        <tr key={index}>
                                            <td>{order.sku}</td>
                                            <td>{order.description.trim() || "sin datos"}</td>
                                            <td>{order.quantity}</td>
                                        </tr>
                                    ))
                                }

                                </tbody>
                            </table>
                            <button><p><strong>Detalle Pedido B</strong></p><img src={arrowDown} alt=""/></button>
                            <button><p><strong>Detalle Pedido C</strong></p><img src={arrowDown} alt=""/></button>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default OrderDetail;
