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
  // const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [error, setError] = useState(false);
  const [modal, setModal] = useState(false);
  const data = useMemo(() => list, [list]);
  const [resp, setResp] = useState([]);
  const { setRepositionSelected } = useReposition();

  const columns = useMemo(
    () => [
      {
        Header: 'Seller ',
        accessor: 'numProducts',
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
        Header: 'Fecha Creación',
        accessor: 'fecha',
      },
      {
        Header: 'Fecha Solicitud Cambio Estado',
        accessor: 'fechaEntrega',
      },
    ],
    [],
  );

  let component;
  const handlePrint = () => {
    console.log(resp);
    getExportFileBlob(resp);
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

  const listDeleteReplenishment = async () => {
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
      response.map(
        (i) => [setResp({
          seller: i.seller,
          IdCarga: i.replenishmentId,
          estado: i.estado,
          Creacion: i.fecha,
          eliminacion: i.fechaEntrega,
        })],
      );
      setLoading(false);
      setList(response);
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    listDeleteReplenishment();
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
      <Modal showModal={modal} size="xl" onClick={() => setModal(false)}>
        sds
      </Modal>
    </PageLayout>
  );
};

export default ChangeStatus;
