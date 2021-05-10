import React, { useState, useEffect } from 'react';
import { clientFetch } from 'lib/client-fetch';

import Spinner from '../../Atoms/Spinner';
import DropDown from '../../Molecules/DropDown';
import Alert from '../../Atoms/Alert';
import Todo from '../../../assets/brand/todo.svg';
import Calendar from '../../../assets/brand/calendar.svg';
import Flag from '../../../assets/brand/flag.svg';
import Checkmap from '../../../assets/brand/checkmap.svg';

const OrderDetail = ({ id, tracking, unifyState }) => {
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState({});

  const getData = (id) => {
    clientFetch('orders/getOrderDetail', {
      body: {
        "warehouse": "bx1",
        "id": `${id}`
      }
    })
      .then((data) => {
          // console.log('orderDetail:', data);
          setOrderData(data);
          setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }
  
  useEffect(() => {
    getData(id)
  }, [id]);
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
                <p className="me-4 display-font" style={{width: "140px", fontSize: 14, fontWeight: 800}}>Nº de Shipping</p>
                <p>{id}</p>
              </li>
              <li className="d-flex my-3">
                <div className="me-4">
                  <img src={Calendar} alt="Lista" width="15"/>
                </div>
                <p className="me-4 display-font" style={{width: "140px", fontSize: 14, fontWeight: 800}}>Fecha orden</p>
                <p>{orderData.date}</p>
              </li>
              <li className="d-flex my-3">
                <div className="me-4">
                  <img src={Flag} alt="Lista" width="15"/>
                </div>
                <p className="me-4 display-font" style={{width: "140px", fontSize: 14, fontWeight: 800}}>Estado Unificado</p>
                <p>{unifyState}</p>
              </li>
              <li className="d-flex my-3">
                <div className="me-4">
                  <img src={Checkmap} alt="Lista" width="15"/>
                </div>
                <p className="me-4 display-font" style={{width: "140px", fontSize: 14, fontWeight: 800}}>Nº de Tracking</p>
                <p>{tracking}</p>
              </li>
            </ul>
            <div className="px-4 mb-3">
              <DropDown>
              <table className="table">
                {orderData.detail_order
                    ?
                      (
                        <thead>
                          <tr>
                            <th scope="col" className="border-0" style={{fontWeight: 400}}>SKU</th>
                            <th scope="col" className="border-0" style={{fontWeight: 400}}>Descripción</th>
                            <th scope="col" className="border-0" style={{fontWeight: 400}}>Cantidad</th>
                          </tr>
                        </thead>
                      )
                    : null
                }
                <tbody>
                  {orderData.detail_order
                    ?
                      orderData.detail_order.map((item) => (
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
                    ))
                    : (
                      <tr>
                        <td>
                          <Alert className="" type="warning" text="Ooopss! Ocurrió un error, intentalo más tarde..."/>
                        </td>
                      </tr>
                      )
                }
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