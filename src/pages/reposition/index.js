import { useState, useEffect, useMemo } from 'react';
import { useAuth } from 'context/userContex';
import clientFetch from 'lib/client-fetch';

import Alert from 'components/Atoms/AlertMessage';
import Spinner from 'components/Atoms/Spinner';
import ReplenishmentTable from 'components/Templates/ReplenishmentTable';
import PageTitle from 'components/Atoms/PageTitle';
import PageLayout from 'components/Templates/PageLayout';

const Reposition = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [error, setError] = useState(false);

  const data = useMemo(() => list, [list]);

  const columns = useMemo(() => [
    {
      Header: 'ID de carga ',
      accessor: 'replenishmentId',
    },
    {
      Header: 'Estado',
      accessor: 'estado',
      Cell: ({ row }) => (
        <small className={
          `badge--${row.original.estado.replace(' ', '').toLowerCase()}
          ${row.original.estado.toLowerCase() === 'exitoso' ? 'text-white' : ''}
          px-4 py-1`
        }
        >
          {row.original.estado}
        </small>
      ),
    },
    {
      Header: 'Fecha',
      accessor: 'fecha',
    },
    {
      Header: 'N° productos',
      accessor: 'numProducts',
    },
  ], []);

  let component;

  if (error) {
    component = <Alert className="mt-5" type="warning" message="Ooopss! Ocurrió un error, intentalo más tarde..." />;
  } else {
    component = <Spinner />;
  }

  const userData = JSON.parse(user);
  const { accountId } = userData.credential;

  const getDataByDate = (startDate, endDate) => {
    setLoading(true);
    clientFetch('bff/v1/replenishment/findReplenishmentsDate', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      body: {
        startDate,
        endDate,
        accountId,
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
    clientFetch('bff/v1/replenishment/findReplenishments', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,

      },
      body: {
        accountId,
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
  }, []);
  return (
    <PageLayout title="Reposiciones">
      <PageTitle title="Listado reposición de inventario" subtitle="Te mostramos el estado de las cargas de tu reposición" />

      {list && !loading
        ? (
          <ReplenishmentTable
            columns={columns}
            data={data}
            getDataByDate={getDataByDate}
          />
        )
        : component}

    </PageLayout>

  );
};

export default Reposition;
