import React, { useEffect, useState, useMemo } from 'react';
import clientFetch from 'lib/client-fetch';

import PageTitle from 'components/Atoms/PageTitle';
import PageLayout from 'components/Templates/PageLayout';
import Spinner from 'components/Atoms/Spinner';
import Alert from 'components/Atoms/AlertMessage';
import MainTable from 'components/Templates/MainTable';
import downloadArrow from 'assets/brand/downloadarrow.svg';
import getExportFileBlob from 'helpers';

const MonthsOfInventory = () => {
  const [listMonthsOfInventory, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: 'SKU',
        accessor: 'sku',
      },
      {
        Header: 'Descripción',
        accessor: 'description',
      },
      {
        Header: 'Inventario',
        accessor: 'stock',
      },
      {
        Header: 'Ordenes',
        accessor: 'total_orders',
      },
      {
        Header: 'Meses de Inventario',
        accessor: (row) => (row.turnover === -1
          ? '∞'
          : row.turnover === 0
            ? (
              <p style={{
                color: '#FD2626',
                fontFamily: 'lato',
                fontWeight: 'bold',
                fontSize: '14px',
                fontStyle: 'normal',
              }}
              >
                {Number(row.turnover).toFixed(1)}
              </p>
            )
            : row.turnover < 1
              ? (
                <p style={{
                  color: '#333333',
                  fontFamily: 'lato',
                  fontSize: '14px',
                  fontStyle: 'normal',
                }}
                >
                  {Number(row.turnover).toFixed(1)}
                </p>
              )
              : Number(row.turnover).toFixed(2)),
      },
    ],
    [],
  );

  const handleDownloadCsv = () => {
    getExportFileBlob(listMonthsOfInventory, 'Meses de inventario.csv');
  };

  useEffect(() => {
    (async () => {
      try {
        const monthsOfInventoryResponse = await clientFetch(
          'bff/v1/inventory/getMonthsOfInventory?lastDaysInNumber=30',
          {
            headers: {
              apikey: process.env.REACT_APP_API_KEY_KONG,
            },
            method: 'GET',
          },
        );
        setList(monthsOfInventoryResponse);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <PageLayout title="Meses de Inventario">
      <PageTitle title="Meses de Inventario" className="mb-5" />
      {error && (
        <Alert
          className="mt-5"
          type="warning"
          message="Ooopss! Ocurrió un error, intentalo más tarde..."
        />
      )}
      {loading ? (
        <Spinner />
      ) : (
        <MainTable
          columns={columns}
          data={listMonthsOfInventory}
          buttonChildren={(
            <div className="col-md-6">
              <ul className="d-flex justify-content-md-end align-items-center">
                <li>
                  <a
                    href="#!"
                    onClick={handleDownloadCsv}
                    className="position-relative"
                  >
                    <ul
                      className="d-flex align-items-center bg-white px-4"
                      style={{
                        border: '1px solid #155C80',
                        height: '40px',
                        borderRadius: 16,
                      }}
                    >
                      <li>
                        <img src={downloadArrow} alt="download" width="14" />
                      </li>
                      <li className="mx-2">
                        <span>Descargar</span>
                      </li>
                    </ul>
                  </a>
                </li>
              </ul>
            </div>
          )}
        />
      )}
    </PageLayout>
  );
};

export default MonthsOfInventory;
