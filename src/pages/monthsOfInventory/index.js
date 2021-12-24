import React, { useEffect, useState, useMemo } from 'react';
import clientFetch from 'lib/client-fetch';

import PageTitle from 'components/Atoms/PageTitle';
import PageLayout from 'components/Templates/PageLayout';
import Spinner from 'components/Atoms/Spinner';
import Alert from 'components/Atoms/AlertMessage';
import MainTable from 'components/Templates/MainTable';

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
        Header: 'En Bodega',
        accessor: 'stock',
      },
      {
        Header: 'Ordenes',
        accessor: 'total_orders',
      },
      {
        Header: 'Inventario',
        accessor: (row) => (row.turnover === -1
          ? '∞'
          : row.turnover === 0
            ? row.turnover
            : Number(row.turnover).toFixed(2)),
      },
    ],
    [],
  );

  useEffect(() => {
    (async () => {
      try {
        const monthsOfInventoryResponse = await clientFetch(
          'bff/v1/inventory/getMonthsOfInventory',
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
        <MainTable columns={columns} data={listMonthsOfInventory} noButtons />
      )}
    </PageLayout>
  );
};

export default MonthsOfInventory;
