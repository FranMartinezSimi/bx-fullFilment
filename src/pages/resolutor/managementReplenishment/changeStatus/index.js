import { useState, useEffect, useMemo } from 'react';
import clientFetch from 'lib/client-fetch';
import Alert from 'components/Atoms/AlertMessage';
import Modal from 'components/Templates/Modal';
import arrowDown from 'assets/brand/arrow-down.svg';
import Spinner from 'components/Atoms/Spinner';
import getExportFileBlob from 'helpers';
import MainTable from 'components/Templates/MainTable';
import PageTitle from 'components/Atoms/PageTitle';
import PageLayout from 'components/Templates/PageLayout';
import CardButton from 'components/Atoms/CardButton';
import { useReposition } from 'context/useReposition';
import styles from './styles.module.scss';

const ChangeStatus = () => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [error, setError] = useState(false);
  const [modal, setModal] = useState(false);
  const data = useMemo(() => list, [list]);
  const { setRepositionSelected } = useReposition();

  const columns = useMemo(
    () => [
      {
        Header: 'Seller ',
        accessor: 'seller',
      },
      {
        Header: 'ID Carga',
        accessor: 'replenishmentId',
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
              colorSelected = '#D6E0FF';
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
        Header: 'Fecha Creación',
        accessor: 'fecha',
      },
      {
        Header: 'Cambio de Estado',
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

  const listPutReplenishment = async () => {
    try {
      const response = await clientFetch(
        '/bff/v1/replenishment/findChangeStatusReplenishment',
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
    listPutReplenishment();
    setRepositionSelected(null);
  }, []);
  return (
    <PageLayout title="Reposiciones">
      <PageTitle
        title="Cambio de Estado de Reposiciones de Inventario"
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
      <Modal showModal={modal} size="xl" onClick={() => setModal(false)}>
        sds
      </Modal>
    </PageLayout>
  );
};

export default ChangeStatus;
