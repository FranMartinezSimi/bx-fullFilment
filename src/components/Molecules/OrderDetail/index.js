import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/userContex';

import Spinner from '../../Atoms/Spinner'

const OrderDetail = ({ id }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState({});

  useEffect(() => {
    const userData = JSON.parse(user);
    let headers = new Headers();
    headers.append("account_id", userData.account_id);
    headers.append("key", userData.key);
    headers.append("Content-Type", "application/json");
    
    let raw = JSON.stringify({
      "warehouse": "bx1",
      "id": "1131"
    });
    
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: raw,
      redirect: 'follow'
    };
    fetch("https://desa-api.bluex.cl/api/v1/fulfillment/order/getOrderDetail", requestOptions)
      .then(res => res.json())
      .then((data) => {
          console.log(data);
          setOrderData(data);
          setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }, [id, user]);

  return (
    <>
      {loading
        ? <Spinner />
        : (
          <ul>
            <li className="d-flex justify-content-between">
              <p><b>Fecha:</b></p>
              <p>{orderData.date}</p>
            </li>
            <li className="d-flex justify-content-between">
              <p><b>Estado:</b></p>
              <p>{orderData.estado}</p>
            </li>
            <li className="d-flex justify-content-between">
              <p><b>Orden:</b></p>
              <p>{orderData.order_number}</p>
            </li>
            <li>
              <hr/>
              <p><strong>Detalle Pedido A</strong></p>
              <td><p>SKU</p></td>
              <td><p>Descripción</p></td>
              <td><p>Cantidad</p></td>
              <ol>
                {/* {orderData.detail_order.map((item) => (
                  <li key={item.sku}>
                    {item.sku}
                    -
                    {item.description}
                    -
                    {item.quantity}
                  </li>
                ))} */}
              </ol>
            </li>
            <p><strong>Detalle Pedido B</strong></p>
            <p><strong>Detalle Pedido C</strong></p>
          </ul>
        )
      }
    </>
  );
}
 
export default OrderDetail;