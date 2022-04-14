/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from 'react';
import clientFetch from 'lib/client-fetch';
import Alert from 'components/Atoms/AlertMessage';
import arrowDown from 'assets/brand/arrow-down.svg';
import Spinner from 'components/Atoms/Spinner';
import getExportFileBlobResolutor from 'helpers/fileBlobResolutor';
import MainTable from 'components/Templates/MainTable';
import PageTitle from 'components/Atoms/PageTitle';
import PageLayout from 'components/Templates/PageLayout';
import CardButton from 'components/Atoms/CardButton';
import styles from './styles.module.scss';

const index = () => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [error, setError] = useState(false);
  const data = useMemo(() => list, [list]);

  const columns = useMemo(
    () => [
      {
        Header: 'Seller',
        accessor: 'seller',
      },
      {
        Header: 'SKU/UPC',
        accessor: 'sku/upc',
      },
      {
        Header: 'Descripción',
        accesor: 'descripción',
      },
      {
        Header: 'En bodega',
        accesor: 'en bodega',
      },
      {
        Header: 'Disponible',
        accesor: 'disponible',
      },
    ],
  );

  let component;
  const handlePrint = () => {
    const lista = [];
    Object.entries(list)
      .forEach(([key]) => {
        const { seller, replenishmentId, estado, fecha, fechaEntrega } = list[key];
        lista.push({ seller, replenishmentId, estado, fecha, fechaEntrega });
      });
    getExportFileBlobResolutor(lista);
  };
  if (error) {
    component = (
      <Alert
        className="mt-5"
        type="warning"
        message="Ooopss! Ocurrió un error, intentalo más tarde..."
      />
    );
  } else {
    component = <Spinner />;
  }
  const clientUrl = '';
  const listPutReplenishment = () => {
    clientFetch(clientUrl, {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
    })
      .then((issues) => {
        setLoading(false);
        setList(issues);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };
  useEffect(() => {
    listPutReplenishment();
  }, []);
  return (
    <PageLayout title="SKU a reactivar">
      <PageTitle
        title="SKU a reactivar"
        subtitle=""
        className="pb-3"
      />
      {list && !loading ? (
        <MainTable
          columns={columns}
          data={data}
          noButtons
          buttonChildren={(
            <div className="d-flex justify-content-end">
              <CardButton
                className={`mx-1 ${styles.btnPdf}`}
                onClick={() => handlePrint(list)}
              >
                Descargar Detalle
                <img src={arrowDown} alt="Actualizar Ordenes" width="10" className="ms-4" />
              </CardButton>
            </div>
          )}
        />
      ) : (
        component
      )}
      {/* <MainTable
        columns={columns}
        data={testData}
        noButtons
        buttonChildren={(
          <div className="d-flex justify-content-end">
            <CardButton
              className={`mx-1 ${styles.btnPdf}`}
              onClick={() => handlePrint(list)}
            >
              Descargar Detalle
              <img src={arrowDown} alt="Actualizar Ordenes" width="10" className="ms-4" />
            </CardButton>
          </div>
        )}
      /> */}
    </PageLayout>

  );
};
export default index;
