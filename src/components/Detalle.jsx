import React from 'react'
import './Detalle.css'
import todo from '../assets/brand/todo.svg'
import calendar from '../assets/brand/calendar.svg'
import flag from '../assets/brand/flag.svg'
import checkmap from '../assets/brand/checkmap.svg'
import arrowDown from '../assets/brand/arrow-down.svg'

const Detalle = (props) => {

    const [orderDetails, setOrderDetails] = React.useState([])

    const raw = JSON.stringify({
        "warehouse": "bx1",
        "id": `${props.order_id}`
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
        fetch("http://desa-api.bluex.cl/api/v1/fulfillment/order/getOrderDetail", requestOptions)
            .then(res => res.json())
            .then((data) => {
                setOrderDetails([...data["detail_order"]])
            })
            .catch(console.log)
        return () => {
        }
      }, [props.order_id])

    return (
        <>
            {props.showModal ?
                <div className="modal">
                    <div className="info">
                        <h3>Detalle de orden</h3>
                        <p><img src={todo} alt="" />  <strong>&nbsp;&nbsp;N° de orden:&nbsp;</strong>&nbsp;&nbsp;&nbsp;&nbsp;{props.order_number}</p>
                        <p><img src={calendar} alt="" /><strong>&nbsp;&nbsp;Fecha:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>&nbsp;&nbsp;&nbsp;&nbsp;{props.fecha}</p>
                        <p><img src={flag} alt="" /><strong>&nbsp;&nbsp;Estado:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>&nbsp;&nbsp;&nbsp;&nbsp;{props.description}</p>
                        <p><img src={checkmap} alt="" /><strong>&nbsp;&nbsp;Tracking:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>&nbsp;&nbsp;&nbsp;&nbsp;{props.tracking} <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<small><em>Última actualización 12-03 11:58</em></small></p>
                        <button><p><strong>Detalle Pedido A</strong></p><img src={arrowDown} alt="" /></button>
                        <table>
                            <thead>
                                <tr>
                                    <td>SKU</td>
                                    <td>Descripción</td>
                                    <td>Cantidad</td>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetails.map((order,index) => (
                                    <tr key={index}>
                                    <td>{order.sku}</td>
                                    <td>{order.description.trim() || "sin datos"}</td>
                                    <td>{order.quantity}</td>
                                </tr>
                                ))}
                                
                            </tbody>
                        </table>
                        <button><p><strong>Detalle Pedido B</strong></p><img src={arrowDown} alt="" /></button>
                        <button><p><strong>Detalle Pedido C</strong></p><img src={arrowDown} alt="" /></button>
                    </div>
                </div> :
                <></>}
        </>
    )
}

export default Detalle
