import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/userContex';

import Spinner from '../../Atoms/Spinner'

const InventoryDetail = ({ id }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [InventoryData, setInventoryData] = useState({});

  useEffect(() => {
    const userData = JSON.parse(user);
    let headers = new Headers();
    headers.append("account_id", userData.account_id);
    headers.append("key", userData.key);
    headers.append("Content-Type", "application/json");
    
    let raw = JSON.stringify({
      "warehouse": "bx1",
      "product_id": `${id}`
    });
    
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: raw,
      redirect: 'follow'
    };
    fetch("https://desa-api.bluex.cl/api/v1/fulfillment/inventory/getInventoryDetail", requestOptions)
      .then(res => res.json())
      .then((data) => {
        console.log(data);
          setInventoryData(data);
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
            <li>
              <p><b>Descripcion:</b></p>
              {/* <input style={{borderRadius: '15px'}}>{InventoryData.description}</input> */}
              <p>{InventoryData.description}</p>
            </li>
            <hr/>
            <li className="d-flex justify-content-between">
              <p><b>Fecha:</b></p>
              <p>{InventoryData.created_date}</p>
            </li>
            <li className="d-flex justify-content-between">
              <p><b>Costo:</b></p>
              <p>{InventoryData.cost}</p>
            </li>
            <li className="d-flex justify-content-between">
              <p><b>Peso:</b></p>
              <p>{InventoryData.weight}</p>
            </li>
            <li className="d-flex justify-content-between">
              <p><b>Ancho:</b></p>
              <p>{InventoryData.width}</p>
            </li>
            <li className="d-flex justify-content-between">
              <p><b>Alto:</b></p>
              <p>{InventoryData.height}</p>
            </li>
            <li className="d-flex justify-content-between">
              <p><b>Largo:</b></p>
              <p>{InventoryData.length}</p>
            </li>

          </ul>
        )
      }
    </>
  );
}
 
export default InventoryDetail;