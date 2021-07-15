import React, { useMemo } from 'react';

import Card from 'components/Molecules/Card';
import GenericTable from 'components/Templates/genericTable';
import styles from './styles.module.scss';

const UpdatedWidthErrors = ({ errorList }) => {
  const data = useMemo(() => errorList, [errorList]);
  const columns = useMemo(() => [
    {
      Header: 'Nº de orden',
      accessor: 'order_number',
    },
    {
      Header: 'Shipedge ID',
      accessor: 'OrderID',
    },
    {
      Header: 'Error',
      accessor: 'CommentAPI',
      Cell: (table) => {
        const { cell } = table;
        return (
          <small className="text-danger">
            {cell.value}
          </small>
        );
      },
    },
  ], []);
  return (
    <div className="container mt-5">
      <div className="row justify-content-between">
        <div className="col-xl-4 col-xxl-5">
          <Card className="mb-4">
            <ul className="d-flex align-items-center m-0">
              <li>
                <span className={styles.numberIcon}>
                  <span className={styles.numberText}>1</span>
                </span>
              </li>
              <li>
                <p>Encontramos órdenes no procesadas que debes corregir.</p>
              </li>
            </ul>
          </Card>
          <Card className="mb-4">
            <ul className="d-flex align-items-center m-0">
              <li>
                <span className={styles.numberIcon}>
                  <span className={styles.numberText}>2</span>
                </span>
              </li>
              <li>
                <p>
                  Debes subir un nuevo archivo sólo con las correcciones de las órdenes
                  no procesadas indicadas en la tabla.
                </p>
              </li>
            </ul>
          </Card>
          <Card className="mb-4">
            <ul className="d-flex align-items-center m-0">
              <li>
                <span className={styles.numberIcon}>
                  <span className={styles.numberText}>3</span>
                </span>
              </li>
              <li>
                <p>
                  Te sugerimos revisar todas las columnas en donde se presentaron los errores,
                  para evitar la recarga de errores continuos.
                </p>
              </li>
            </ul>
          </Card>
          <Card className="mb-4">
            <ul className="d-flex align-items-center m-0">
              <li>
                <span className={styles.numberIcon}>
                  <span className={styles.numberText}>4</span>
                </span>
              </li>
              <li>
                <p>
                  Una vez que tengas un nuevo archivo .csv listo, vuelve a cargarlo.
                  Puedes hacerlo desde el botón cargar órdenes.
                </p>
              </li>
            </ul>
          </Card>
        </div>
        <div className="col-xl-8 col-xxl-6">
          <GenericTable
            columns={columns}
            data={data}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdatedWidthErrors;
