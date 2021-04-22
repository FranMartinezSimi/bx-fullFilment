import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/userContex';

import Spinner from '../../Atoms/Spinner';
import DropDown from '../../Molecules/DropDown';
import Todo from '../../../assets/brand/todo.svg';
import Calendar from '../../../assets/brand/calendar.svg';
import Flag from '../../../assets/brand/flag.svg';
// import Checkmap from '../../../assets/brand/checkmap.svg';

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
      "id": `${id}`
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
          <>
            <ul className="px-4">
              <li className="d-flex my-3">
                <div className="me-4">
                  <img src={Todo} alt="Lista" width="15"/>
                </div>
                <p className="me-4" style={{width: "80px"}}><b>Nº de orden</b></p>
                <p>{orderData.order_number}</p>
              </li>
              <li className="d-flex my-3">
                <div className="me-4">
                  <img src={Calendar} alt="Lista" width="15"/>
                </div>
                <p className="me-4" style={{width: "80px"}}><b>Fecha orden</b></p>
                <p>{orderData.date}</p>
              </li>
              <li className="d-flex my-3">
                <div className="me-4">
                  <img src={Flag} alt="Lista" width="15"/>
                </div>
                <p className="me-4" style={{width: "80px"}}><b>Estado</b></p>
                <p>{orderData.estado}</p>
              </li>
            </ul>
            <div className="px-4 mb-3">
              <DropDown>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="border-0" style={{fontWeight: 400}}>SKU</th>
                    <th scope="col" className="border-0" style={{fontWeight: 400}}>Descripción</th>
                    <th scope="col" className="border-0" style={{fontWeight: 400}}>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.detail_order.map((item) => (
                    <tr key={item.sku}>
                      <td>
                        <small>
                          {item.sku}
                        </small>
                      </td>
                      <td>
                        <small>
                          {item.description}
                        </small>
                      </td>
                      <td>
                        <small>
                          {item.quantity}
                        </small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </DropDown>
            </div>
          </>
        )
      }
    </>
  );
}
 
export default OrderDetail;