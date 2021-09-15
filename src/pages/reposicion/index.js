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
      Header: '1 ',
      accessor: '',
    },
    {
      Header: '2',
      accessor: '',
    },
    {
      Header: '3',
      accessor: '',
    },
    {
      Header: '4',
      accessor: '',
    },
    {
      Header: '5',
      accessor: '',
    },
    {
      Header: '6',
      accessor: '',
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
    <PageLayout title="Reposiciones">
      <PageTitle title="Lista de Reposiciones" className="mb-5" />
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
