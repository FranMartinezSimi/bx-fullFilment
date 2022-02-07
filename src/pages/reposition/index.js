import { useState, useEffect, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import clientFetch from 'lib/client-fetch';

import { useAuth } from 'context/userContex';
import Modal from 'components/Templates/Modal';
import Alert from 'components/Atoms/AlertMessage';
import Spinner from 'components/Atoms/Spinner';
import ReplenishmentDetail from 'components/Molecules/ReplenishmentDetail';
import MainTable from 'components/Templates/MainTable';
import PageTitle from 'components/Atoms/PageTitle';
import PageLayout from 'components/Templates/PageLayout';
import info from 'assets/brand/info.svg';
import { InputDateRange } from 'components/Atoms/Form/Input';
import { useReposition } from 'context/useReposition';

import styles from './styles.module.scss';

const Reposition = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [error, setError] = useState(false);
  const [modal, setModal] = useState(false);
  const [manifest, setManifest] = useState('');
  const data = useMemo(() => list, [list]);
  const maxDate = useMemo(() => Date.now(), []);
  const history = useHistory();
  const { setRepositionSelected } = useReposition();

  const handleClickOrderDeatil = (e, tableData) => {
    e.preventDefault();
    setModal(true);
    setManifest(tableData.row.original.manifest);
  };

  const goToDetail = useCallback((repositionSelected) => (event) => {
    event?.preventDefault();
    setRepositionSelected(repositionSelected);

    history.push(`/reposition/detail/${repositionSelected.replenishmentId}`);
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'ID de carga ',
        accessor: 'replenishmentId',
        Cell: ({ row: { original } }) => (
          <a href="/#" onClick={goToDetail(original)}>{original.replenishmentId}</a>
        ),
      },
      {
        Header: 'N° productos',
        accessor: 'numProducts',
      },
      {
        Header: 'Fecha',
        accessor: 'fecha',
      },
      {
        Header: 'Estado',
        accessor: 'estado',
        Cell: ({ row }) => {
          let colorSelected;
          let texto = '';
          switch (row.original.estado) {
            case 'Ingresado':
              colorSelected = '#007F00';
              texto = 'Ingresado';
              break;
            case 'En Transito':
            case '':
              colorSelected = '#3363FF';
              texto = 'En Transito';
              break;
            case 'Recibido':
              colorSelected = '#3363FF';
              texto = 'Recibido';
              break;
            default:
              colorSelected = '#3363FF';
              texto = 'En Transito';
          }

          return (
            <small
              className={`badge--${texto
                .replace(' ', '')
                .toLowerCase()}  px-4 py-1 border rounded-pill`}
            >
              <span
                className={styles.small}
                style={{
                  backgroundColor: colorSelected,
                  height: 10,
                  display: 'inline-block',
                  borderRadius: '5rem',
                  marginRight: 5,
                }}
              />
              {texto}
            </small>
          );
        },
      },
      {
        Header: 'F. Entrega',
        accessor: 'fechaEntrega',
      },
      {
        Header: 'Manifiesto',
        accessor: 'ver',
        isVisible: true,
        Cell: (table) => (
          <a
            href="#!"
            onClick={(e) => handleClickOrderDeatil(e, table)}
            role="button"
            className="d-block font-weight-bold font-weight-bold"
          >
            <img src={info} alt="Actualizar Ordenes" width="32" />
          </a>
        ),
      },
    ],
    [],
  );

  let component;

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

  const userData = JSON.parse(user);
  const { accountId } = userData.credential;

  const getAllReplenishment = async () => {
    try {
      const response = await clientFetch(
        'bff/v1/replenishment/findReplenishments',
        {
          headers: {
            apikey: process.env.REACT_APP_API_KEY_KONG,
          },
          body: {
            accountId,
          },
        },
      );

      setLoading(false);
      setList(response);
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  };

  const getDataByDate = useCallback(
    async (startDate, endDate) => {
      try {
        if (!startDate && !endDate) {
          await getAllReplenishment();

          return;
        }

        setLoading(true);

        const response = await clientFetch(
          'bff/v1/replenishment/findReplenishmentsDate',
          {
            headers: {
              apikey: process.env.REACT_APP_API_KEY_KONG,
            },
            body: {
              startDate,
              endDate,
              accountId,
            },
          },
        );
        setLoading(false);
        setList(response);
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    },
    [getAllReplenishment],
  );

  useEffect(() => {
    getAllReplenishment();
    setRepositionSelected(null);
  }, []);

  return (
    <PageLayout title="Reposiciones">
      <PageTitle
        title="Listado reposición de inventario"
        subtitle="Te mostramos el estado de las cargas de tu reposición"
      />

      {list && !loading
        ? (
          <MainTable
            columns={columns}
            data={data}
            noButtons
            buttonChildren={(
              <div className="d-flex justify-content-end">
                <InputDateRange
                  placeholder="Selecciona una fecha"
                  onFilter={getDataByDate}
                  maxDate={maxDate}
                />
              </div>
              )}
          />
        )
        : component}
      <Modal showModal={modal} size="xl" onClick={() => setModal(false)}>
        <ReplenishmentDetail
          columns={columns}
          data={list}
          activeData={manifest}
        />
      </Modal>
    </PageLayout>
  );
};

export default Reposition;
