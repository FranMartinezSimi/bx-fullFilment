import { useState, useEffect, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import clientFetch from 'lib/client-fetch';
import Alert from 'components/Atoms/AlertMessage';
import getExportFileBlob from 'helpers';
import Spinner from 'components/Atoms/Spinner';
import arrowDown from 'assets/brand/arrow-down.svg';
import MainTable from 'components/Templates/MainTable';
import PageTitle from 'components/Atoms/PageTitle';
import PageLayout from 'components/Templates/PageLayout';
import CardButton from 'components/Atoms/CardButton';
import { useReposition } from 'context/useReposition';
import styles from './styles.module.scss';

const DeleteReplenishment = () => {
  // const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [error, setError] = useState(false);
  const data = useMemo(() => list, [list]);
  const history = useHistory();
  const { setRepositionSelected } = useReposition();

  const goToDetail = useCallback(
    (repositionSelected) => (event) => {
      event?.preventDefault();
      setRepositionSelected(repositionSelected);

      history.push(`/reposition/detail/${repositionSelected.replenishmentId}`);
    },
    [],
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Seller ',
        accessor: 'seller',
      },
      {
        Header: 'ID Carga',
        accessor: 'replenishmentId',
        Cell: ({ row: { original } }) => (
          <a href="/#" onClick={goToDetail(original)}>
            {original.replenishmentId}
          </a>
        ),
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
            case 'eliminado':
              colorSelected = '#6E6893';
              texto = 'Eliminado';
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
        Header: 'Creación',
        accessor: 'fecha',
      },
      {
        Header: 'Eliminación',
        accessor: 'fechaEntrega',
      },
    ],
    [],
  );
  let component;
  const handlePrint = () => {
    const lista = [];
    Object.entries(list)
      .forEach(([key]) => {
        const { seller, replenishmentId, estado, fecha, fechaEntrega } = list[key];
        lista.push({ seller, replenishmentId, estado, fecha, fechaEntrega });
      });
    getExportFileBlob(lista);
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

  const getAllReplenishment = async () => {
    try {
      const response = await clientFetch(
        '/bff/v1/replenishment/findDeleteReplenishments',
        {
          headers: {
            apikey: process.env.REACT_APP_API_KEY_KONG,
          },
          body: {
            accountId: 29,
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

  useEffect(() => {
    getAllReplenishment();
    setRepositionSelected(null);
  }, []);
  return (
    <PageLayout title="Reposiciones">
      <PageTitle
        title="Reposiciones de Inventario a Eliminar"
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
    </PageLayout>

  );
};

export default DeleteReplenishment;
