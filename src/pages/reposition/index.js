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
import pdfIcon from 'assets/brand/pdf.svg';
import trashIcon from 'assets/brand/trash.svg';
import { InputDateRange } from 'components/Atoms/Form/Input';
import { useReposition } from 'context/useReposition';
import CardButton from 'components/Atoms/CardButton';
import DeleteRepositionModal from 'components/Templates/DeleteRepositionModal';

import AlertModal from 'components/Templates/AlertModal';
import styles from './styles.module.scss';

const Reposition = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [error, setError] = useState(false);
  const [modal, setModal] = useState(false);
  const [manifest, setManifest] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState({
    isShow: false,
    replenishmentId: null,
  });
  const [deleteResponseStatus, setDeleteResponseStatus] = useState({
    isShow: false,
    isError: false,
  });
  const data = useMemo(() => list, [list]);
  const maxDate = useMemo(() => Date.now(), []);
  const history = useHistory();
  const { setRepositionSelected } = useReposition();
  const [comentario, setComentario] = useState('');

  const handleClickOrderDeatil = (manifestOfRow) => () => {
    setModal(true);
    setManifest(manifestOfRow);
  };

  const onToggleDeleteModal = () => {
    setShowDeleteModal((prev) => ({
      ...prev,
      isShow: !prev.isShow,
    }));
  };

  const onClickDeleteReplenishment = (id) => {
    setShowDeleteModal({
      isShow: true,
      replenishmentId: id,
    });
  };

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
        Header: 'ID de carga ',
        accessor: 'replenishmentId',
        Cell: ({ row: { original } }) => (
          <a href="/#" onClick={goToDetail(original)}>
            {original.replenishmentId}
          </a>
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
        Header: 'Acciones',
        accessor: 'ver',
        isVisible: true,
        Cell: ({ row: { original } }) => (
          <div className="d-flex justify-content-center align-items-center">
            <CardButton
              onClick={handleClickOrderDeatil(original.manifest)}
              className="mx-2"
            >
              <img src={pdfIcon} alt="Actualizar Ordenes" width="10" />
            </CardButton>
            <CardButton
              onClick={() => onClickDeleteReplenishment(original.replenishmentId)}
              className="mx-2"
              disabled={
                !['', 'En Transito', 'Recibido', null].includes(original.estado)
              }
            >
              <img src={trashIcon} alt="Actualizar Ordenes" width="10" />
            </CardButton>
          </div>
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

  const onDeleteReplenishment = async () => {
    try {
      await clientFetch('bff/v1/replenishment/deleteReplenishment', {
        headers: {
          apikey: process.env.REACT_APP_API_KEY_KONG,
        },
        body: {
          replenishmentId: showDeleteModal.replenishmentId,
          comentario,
        },
      });

      setDeleteResponseStatus({ isShow: true, isError: false });
      getAllReplenishment();
    } catch (e) {
      setDeleteResponseStatus({ isShow: true, isError: true });
    } finally {
      onToggleDeleteModal();
    }
  };

  const ResetDeleteResponseStatus = () => {
    setDeleteResponseStatus({ isShow: false, isError: false });
  };

  return (
    <PageLayout title="Reposiciones">
      <PageTitle
        title="Listado reposición de inventario"
        subtitle="Te mostramos el estado de las cargas de tu reposición"
      />

      {list && !loading ? (
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
      ) : (
        component
      )}
      <Modal showModal={modal} size="xl" onClick={() => setModal(false)}>
        <ReplenishmentDetail
          columns={columns}
          data={list}
          activeData={manifest}
        />
      </Modal>
      <DeleteRepositionModal
        showModal={showDeleteModal.isShow}
        onAccept={onDeleteReplenishment}
        onCancel={onToggleDeleteModal}
        replenishmentId={showDeleteModal.replenishmentId}
        onChangeText={setComentario}
      />
      <AlertModal
        showModal={deleteResponseStatus.isShow}
        image={
          deleteResponseStatus.isError ? (
            <img alt="alert" src="/bgerrors.png" width={102} height={98} />
          ) : (
            <img alt="alert" src="/bgsuccess.png" width={102} height={98} />
          )
        }
        message={
          deleteResponseStatus.isError
            ? 'Ha ocurrido un error al momento de eliminar, inténtelo más tarde.'
            : 'Reposicion eliminada'
        }
        onClose={ResetDeleteResponseStatus}
      />
    </PageLayout>
  );
};

export default Reposition;
