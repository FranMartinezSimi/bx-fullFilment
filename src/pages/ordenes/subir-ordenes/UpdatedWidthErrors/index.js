import React, { useMemo } from 'react';

import PageLayout from 'components/Templates/PageLayout';
import PageTitle from 'components/Atoms/PageTitle';
import Card from 'components/Molecules/Card';
import GenericTable from 'components/Templates/genericTable';
import styles from './styles.module.scss';

const UpdatedWidthErrors = () => {
  const list = [
    {
      orderNumber: 123123123,
      date: '12/01/2021',
      error: 'Error de SKU',
    },
    {
      orderNumber: 123123123,
      date: '12/01/2021',
      error: 'Error de SKU',
    },
    {
      orderNumber: 123123123,
      date: '12/01/2021',
      error: 'Error de SKU',
    },
    {
      orderNumber: 123123123,
      date: '12/01/2021',
      error: 'Error de SKU',
    },
    {
      orderNumber: 123123123,
      date: '12/01/2021',
      error: 'Error de SKU',
    },
    {
      orderNumber: 123123123,
      date: '12/01/2021',
      error: 'Error de SKU',
    },
    {
      orderNumber: 123123123,
      date: '12/01/2021',
      error: 'Error de SKU',
    },
    {
      orderNumber: 123123123,
      date: '12/01/2021',
      error: 'Error de SKU',
    },
    {
      orderNumber: 123123123,
      date: '12/01/2021',
      error: 'Error de SKU',
    },
    {
      orderNumber: 123123123,
      date: '12/01/2021',
      error: 'Error de SKU',
    },
    {
      orderNumber: 123123123,
      date: '12/01/2021',
      error: 'Error de SKU',
    },
    {
      orderNumber: 123123123,
      date: '12/01/2021',
      error: 'Error de SKU',
    },
    {
      orderNumber: 123123123,
      date: '12/01/2021',
      error: 'Error de SKU',
    },
    {
      orderNumber: 123123123,
      date: '12/01/2021',
      error: 'Error de SKU',
    },
  ];
  const data = useMemo(() => list, [list]);
  const columns = useMemo(() => [
    {
      Header: 'Nº de orden',
      accessor: 'orderNumber',
    },
    {
      Header: 'Fecha',
      accessor: 'date',
    },
    {
      Header: 'Error',
      accessor: 'error',
    },
  ], []);
  return (
    <PageLayout title="Errores en la carga de órdenes">
      <PageTitle title="Errores en la carga de órdenes." subtitle="Sigue este paso a paso." />
      <div className="container mt-5">
        <div className="row justify-content-between">
          <div className="col-5">
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
          <div className="col-6">
            <GenericTable
              columns={columns}
              data={data}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default UpdatedWidthErrors;
