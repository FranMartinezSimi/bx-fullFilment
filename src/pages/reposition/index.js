import { useState, useEffect, useMemo } from 'react';
import { useAuth } from 'context/userContex';
import clientFetch from 'lib/client-fetch';
// import Modal from 'components/Templates/Modal';

import Alert from 'components/Atoms/AlertMessage';
import Spinner from 'components/Atoms/Spinner';
// import ReplenishmentDetail from 'components/Molecules/ReplenishmentDetail';
import ReplenishmentTable from 'components/Templates/ReplenishmentTable';
import PageTitle from 'components/Atoms/PageTitle';
import PageLayout from 'components/Templates/PageLayout';
// import info from 'assets/brand/info.svg';

const Reposition = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [error, setError] = useState(false);
  // const [modal, setModal] = useState(false);
  // const [activeData, setActiveData] = useState('');
  const data = useMemo(() => list, [list]);

  const handleClickInventory = (e) => {
    e.preventDefault();
  };

  // const handleClickOrderDeatil = (e, tableData) => {
  //   e.preventDefault();
  //   setModal(true);
  //   setActiveData(tableData.row.original.replenishmentId);
  // };

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
    // {
    //   Header: 'Manifiesto',
    //   accessor: 'ver',
    //   isVisible: true,
    //   Cell: (table) => (
    //     <a
    //       href="#!"
    //       onClick={(e) => handleClickOrderDeatil(e, table)}
    //       role="button"
    //       className="d-block font-weight-bold font-weight-bold"
    //     >
    //       <img src={info} alt="Actualizar Ordenes" width="32" />
    //     </a>
    //   ),
    // },
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
        console.log(issues);
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
            handleClickInventory={handleClickInventory}

          />
        )
        : component}

    </PageLayout>

  );
};

export default Reposition;
