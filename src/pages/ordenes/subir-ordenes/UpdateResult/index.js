import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'components/Atoms/Button';
import styles from './styles.module.scss';

const UpdateResult = () => {
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    history.push('/ordenes');
  };
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="text-center">
            <img src="/bgsuccess.jpg" alt="Proceso completado" width="200" />
          </div>
          <h1 className="display-font text-center pb-4">Proceso completado</h1>
          <p>
            A continuación te mostramos los resultados de tu carga masiva.
            Puedes revisar y editar la lista si crees que es necesario. Para
            realizar esta acción sólo debes hacer clic en el botón continuar
            para visualizar la tabla.
          </p>
          <ul className="py-3 w-100 d-flex justify-content-between align-items-center">
            <li>
              <p>
                <b>Procesados</b>
              </p>
              <p>
                <span className={styles.bigNumber}>500</span>
              </p>
            </li>
            <li className={`${styles.xySeparator} ${styles.listItem}`}>
              <p>
                <b>Error</b>
              </p>
              <p>
                <span className={styles.bigNumber}>0</span>
              </p>
            </li>
            <li>
              <p>
                <b>Éxito</b>
              </p>
              <p>
                <span className={styles.bigNumber}>500</span>
              </p>
            </li>
          </ul>
          <div className="text-center">
            <Button
              text="Ir a mis órdenes"
              className="btn btn-secondary ms-auto"
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateResult;
