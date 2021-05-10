import React, { useState, useEffect } from 'react';
import { clientFetch } from 'lib/client-fetch';

import Spinner from '../../Atoms/Spinner';
import Alert from '../../Atoms/Alert';
import styles from './styles.module.scss';

const InventoryDetail = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [InventoryData, setInventoryData] = useState({});

  const getData = (id) => {
    clientFetch('inventory/getProductDetail', {
      body: {
        "warehouse": "bx1",
        "product_id": `${id}`
      }
    })
    .then((data) => {
      if (data.statusCode === 500) {
        setLoading(false);
        setError(true);
      } else {
        console.log(data);
        setInventoryData(data);
        setLoading(false);
      }
    })
  }

  useEffect(() => {
    getData(id);
  }, [id]);

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
                  <p>Descripción:</p>
                  <p className={`${styles.bxBadge} bg-white pt-2 pb-5`}>{InventoryData.description}</p>
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
                    <p className="mb-1 mt-2">Fecha de Actualización:</p>
                    <p className={`${styles.bxBadge}`}>{InventoryData.updated_date}</p>
                    
                    
                    
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