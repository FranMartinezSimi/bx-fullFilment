import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import clientFetch from 'lib/client-fetch';
import Button from 'components/Atoms/Button';
import styles from './styles.module.scss';

const UpdateResult = ({ updatedData, setErrorList, setErrorScreen }) => {
  const history = useHistory();
  const [alow, setAlow] = useState([]);
  const [denied, setDenied] = useState([]);
  const handleClick = (e) => {
    e.preventDefault();
    history.push('/ordenes');
  };
  const handleClickErrors = (e) => {
    e.preventDefault();
    setErrorScreen(true);
  };
  useEffect(() => {
    const allowed = updatedData[0].orders.allow ? updatedData[0].orders.allow.length : 0;
    const errors = updatedData[0].orders.denied ? updatedData[0].orders.denied.length : 0;
    const errorsList = updatedData[0].orders.denied ? updatedData[0].orders.denied : [];
    setAlow(allowed);
    setDenied(errors);
    setErrorList(errorsList);

    clientFetch('order/v1/orders/migrationOrderMasive', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
    })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, [updatedData]);
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          {
          denied
            ? (
              <>
                <div className="text-center">
                  <img src="/bgerrors.png" alt="Proceso incompleto" width="150" />
                </div>
                <h1 className="display-font text-center pb-4">Proceso incompleto</h1>
                <p>
                  Hemos encontrado
                  <span style={{ color: '#FF7E44', fontWeight: 700 }}> errores </span>
                  en tu plantilla de órdenes,
                  por lo que no pudimos
                  cargarlas en tu lista. Puedes revisar y corregir los errores haciendo clic
                  en el botón ver
                  <span><a href="#!" onClick={handleClickErrors} style={{ color: '#FF7E44', fontWeight: 700 }}> listado de errores.</a></span>
                </p>
              </>
            )
            : (
              <>
                <div className="text-center">
                  <img src="/bgsuccess.jpg" alt="Proceso completado" width="150" />
                </div>
                <h1 className="display-font text-center pb-4">Proceso completado</h1>
                <p>
                  A continuación te mostramos los resultados de tu carga masiva.
                  Puedes revisar y editar la lista si crees que es necesario. Para
                  realizar esta acción sólo debes hacer clic en el botón continuar
                  para visualizar la tabla.
                </p>
              </>
            )
          }
          <ul className="py-3 w-100 d-flex justify-content-between align-items-center">
            <li>
              <p>
                <b>Procesados</b>
              </p>
              <p>
                <span className={styles.bigNumber}>{alow + denied}</span>
              </p>
            </li>
            <li className={`${styles.xySeparator} ${styles.listItem}`}>
              <a href="!#" onClick={handleClickErrors}>
                <p className={denied ? 'text-danger' : ''}>
                  <b>Error</b>
                </p>
                <p className={denied ? 'text-danger' : ''}>
                  <span className={`${styles.bigNumber} ${denied ? 'text-danger' : ''}`}>{denied}</span>
                </p>
              </a>
            </li>
            <li>
              <p>
                <b>Éxito</b>
              </p>
              <p>
                <span className={styles.bigNumber}>{alow}</span>
              </p>
            </li>
          </ul>
          <div className="text-center">
            <Button
              text="Ir a mis órdenes"
              className="btn btn-secondary ms-auto mt-5"
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateResult;
