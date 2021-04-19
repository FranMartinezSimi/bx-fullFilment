import React, { useState, useEffect } from 'react';
import Spinner from '../../Atoms/Spinner'

const OrderDetail = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState({});

  useEffect(() => {
    const raw = JSON.stringify({
      "warehouse": "bx1",
      "id": `${id}`
    });
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: raw,
        redirect: 'follow'
    };
    fetch("https://desa-api.bluex.cl/api/v1/fulfillment/order/getOrderDetail", requestOptions)
      .then(res => res.json())
      .then((data) => {
          setOrderData(data);
          setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }, [id]);

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
              <p><b>Detalle de orden:</b></p>
              <ol>
                {orderData.detail_order.map((item) => (
                  <li key={item.sku}>
                    {item.sku}
                    {item.description}
                    {item.quantity}
                  </li>
                ))}
              </ol>
            </li>
          </ul>
        )
      }
    </>
  );
}
 
export default OrderDetail;