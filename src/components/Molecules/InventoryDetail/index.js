import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/userContex';

import Spinner from '../../Atoms/Spinner';
import Alert from '../../Atoms/Alert';
import styles from './styles.module.scss';

const InventoryDetail = ({ id }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
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
    const getInventoryDetail = async () => {
      const data = await fetch("https://desa-api.bluex.cl/api/v1/fulfillment/inventory/getInventoryDetail", requestOptions)
      .then(res => res.json())
      if (data.statusCode === 500) {
        setLoading(false);
        setError(true);
      } else {
        console.log(data);
        setInventoryData(data);
        setLoading(false);
      }
    }
    getInventoryDetail();
  }, [id, user]);

  return (
    <>
      {loading
        ? <Spinner />
        : (
          <>
          {error
            ? <Alert className="" type="warning" text="Ooopss! Ocurrió un error, intentalo más tarde..."/>
            : (
              <>
                <div>
                  <p>Descripcion:</p>
                  <p className={`${styles.bxBadge} bg-white py-5`}>{InventoryData.description}</p>
                </div>
                <ul className="d-flex">
                  <li className="w-50 pe-2">
                    <p className="mb-1 mt-2">Peso:</p>
                    <p className={`${styles.bxBadge}`}>{InventoryData.weight}</p>
                    <p className="mb-1 mt-2">Ancho:</p>
                    <p className={`${styles.bxBadge}`}>{InventoryData.width}</p>
                    <p className="mb-1">Largo:</p>
                    <p className={`${styles.bxBadge}`}>{InventoryData.length}</p>
                    
                  </li>
                  <li className="w-50 ps-2">
                    <p className="mb-1 mt-2">Costo:</p>
                    <p className={`${styles.bxBadge}`}>{InventoryData.cost}</p>
                    <p className="mb-1 mt-2">Alto:</p>
                    <p className={`${styles.bxBadge}`}>{InventoryData.height}</p>
                    <p className="mb-1 mt-2">Fecha </p>
                    <p className={`${styles.bxBadge}`}>{InventoryData.created_date}</p>
                    
                    
                    
                  </li>

                </ul>
              </>
            )
          }
          </>
        )
      }
    </>
  );
}
 
export default InventoryDetail;