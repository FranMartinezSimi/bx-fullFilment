import { useState, useEffect, useMemo } from 'react';
import { useAuth } from 'context/userContex';
import clientFetch from 'lib/client-fetch';

import Alert from 'components/Atoms/AlertMessage';
import Spinner from 'components/Atoms/Spinner';
import MainTable from 'components/Templates/MainTable';
import PageTitle from 'components/Atoms/PageTitle';
import PageLayout from 'components/Templates/PageLayout';

const Incidencias = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [error, setError] = useState(false);

  const data = useMemo(() => list, [list]);

  const columns = useMemo(() => [
    {
      Header: 'Nº de orden',
      accessor: 'orderId',
    },
    {
      Header: 'Nº ticket',
      accessor: '_id',
    },
    {
      Header: 'Motivo',
      accessor: 'motivo',
    },
    {
      Header: 'Descripción',
      accessor: 'descTicket',
    },
    {
      Header: 'Fecha',
      accessor: 'fechaCreacion',
    },
    {
      Header: 'Estado',
      accessor: 'status',
      Cell: ({ row }) => (
        <small className={`badge--${row.original.status.replace(' ', '').toLowerCase()} px-4 py-1`}>
          { row.original.status }
        </small>
      ),
    },
    {
      accessor: 'ver',
      isVisible: true,
      Cell: (table) => (
        <a
          href="#!"
          onClick={(e) => console.log(e, table.row.original)}
          role="button"
          className="font-weight-bold font-weight-bold d-none"
        >
          <small className="d-block text-complementary-color">
            Ver Más &gt;
          </small>
        </a>
      ),
    },
  ], []);

  let component;

  if (error) {
    component = <Alert className="mt-5" type="warning" message="Ooopss! Ocurrió un error, intentalo más tarde..." />;
  } else {
    component = <Spinner />;
  }

  const userData = JSON.parse(user);
  const userActive = userData.credential.accountId;

  useEffect(() => {
    clientFetch('ticket/v1/ticketera/getTickets', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      body: {
        accountId: userActive,
        rol: 'client',
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
    <PageLayout title="Lista de tickets con incidencias">
      <PageTitle title="Lista de tickets con incidencias" className="mb-5" />
      {list && !loading
        ? (
          <MainTable
            columns={columns}
            data={data}
            noFilters
          />
        )
        : component}
    </PageLayout>
  );
};

export default Incidencias;
