import { useState, useEffect, useMemo } from 'react';
import clientFetch from 'lib/client-fetch';

import Alert from 'components/Atoms/AlertMessage';
import Spinner from 'components/Atoms/Spinner';
import ResolutorTable from 'components/Templates/ResolutorTable';
import PageTitle from 'components/Atoms/PageTitle';
import PageLayout from 'components/Templates/PageLayout';

const Incidencias = () => {
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
      accessor: 'numTicket',
    },
    {
      Header: 'Motivo',
      accessor: 'motivo',
    },
    {
      Header: 'Descripción',
      accessor: 'descTicket',
      Cell: ({ row }) => {
        const maxCharacter = row.original.descTicket.length;
        return (
          <small>
            { row.original.descTicket.slice(0, 30) }
            { maxCharacter >= 30 ? ' ...' : '' }
          </small>
        );
      },
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
  ], []);

  let component;

  if (error) {
    component = <Alert className="mt-5" type="warning" message="Ooopss! Ocurrió un error, intentalo más tarde..." />;
  } else {
    component = <Spinner />;
  }
  const getData = () => {
    clientFetch('ticket/v1/ticketera/getAllTickets', {
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
  const getDataByDate = (startDate, endDate) => {
    setLoading(true);
    clientFetch('ticket/v1/ticketera/getTicketsDates', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      body: {
        startDate,
        endDate,
      },
    })
      .then((issues) => {
        setLoading(false);
        setList(issues);
        console.log(issues);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <PageLayout title="Lista de tickets con incidencias">
      <PageTitle title="Lista de tickets con incidencias" className="mb-5" />
      {list && !loading
        ? (
          <ResolutorTable
            columns={columns}
            data={data}
            getData={getData}
            getDataByDate={getDataByDate}
          />
        )
        : component}
    </PageLayout>
  );
};

export default Incidencias;
