import React, { useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import useNotify from 'hooks/useNotify';
import PageLayout from 'components/Templates/PageLayout';
import Alert from 'components/Atoms/AlertMessage';
import Spinner from 'components/Atoms/Spinner';
import Modal from 'components/Templates/Modal';
import MainTable from 'components/Templates/MainTable';
import OrderDetail from 'components/Molecules/OrderDetail';
import PageTitle from 'components/Atoms/PageTitle';
import reload from 'assets/brand/reloadWhite.svg';
import info from 'assets/brand/info-ico.svg';
import CardButton from 'components/Atoms/CardButton';
import pdfIcon from 'assets/brand/show.svg';
import trashIcon from 'assets/brand/trash.svg';
import Button from 'components/Atoms/Button';
import FromTicket from 'components/Molecules/FormTicket';
import TooltipIcon from 'components/Atoms/TooltipIcon';
import useSearchParams from 'hooks/useSearchParams';
import DownloadButton from 'components/Pages/ordenes/DownloadButton';
import uploadArrow from 'assets/brand/uploadarrow.svg';
import { useOrders } from 'hooks/useOrders';
import SkuDetail from 'components/Molecules/SkuDetail';

const Orders = () => {
  const [modal, setModal] = useState(false);
  const [modalTicket, setModalTicket] = useState(false);
  const [modalCancel, setModalCancel] = useState(false);
  const [orderSelected, setOrderSelected] = useState({});
  const history = useHistory();
  const objectParams = useSearchParams(history.location.search);
  const {
    isError,
    isLoading,
    orders,
    refresh: refreshOrders,
    refetch,
    updatedAt,
  } = useOrders({ status: objectParams.status });
  const handleClickUpdateOrder = (e) => {
    e.preventDefault();
    history.push('/ordenes/subir-ordenes');
  };
  const [msj, setMsj] = useState({});

  const handleClickUpdateList = (event) => {
    try {
      event.preventDefault();
      refreshOrders();
      useNotify('success', '¡Tus órdenes han sido actualizadas con éxito!');
    } catch (e) {
      useNotify('error', 'Ooopss! ¡No se logro actualizar!');
    }
  };

  const handleClickReloadList = (event) => {
    event.preventDefault();
    history.replace('/ordenes');
    refetch();
  };

  const handleClickOrderDeatil = (order) => (event) => {
    event.preventDefault();
    setOrderSelected(order);
    setModal(true);
  };

  const clickCancel = () => {
    setModalCancel(false);
    setModalCancel(true);
    setMsj(
      {
        text: 'Orden cancelada con éxito',
        textBtn: 'ok',
        img: 'success',
        click: (() => setModalCancel(false)),
      },
    );
  };

  const cancelOrder = ({ status, orderNumber }) => (event) => {
    event.preventDefault();
    const oNS = (
      <>
        <p>
          Orden
          <b className="mx-1">
            N°
            {orderNumber}
          </b>
          se encuentra en estado
          <b className="mx-1">{status}</b>
          por lo cual no puede ser cancelada
        </p>
      </>
    );
    const oN = (
      <>
        <p>
          ¿Deseas cancelar la orden
          <br />
          <b className="mx-1">
            N°
            {orderNumber}
          </b>
          ?
        </p>
      </>
    );
    if (status === 'Pendiente' || status === 'Dropshipped') {
      setModalCancel(true);
      setMsj(
        {
          text: oNS,
          textBtn: 'ok',
          img: 'alert',
          click: (() => setModalCancel(false)),
        },
      );
    } else {
      setModalCancel(true);
      setMsj({
        text: oN,
        textBtn: 'Cancelar',
        img: 'crossalert',
        click: (() => clickCancel(orderNumber)),
      });
    }
  };

  const handleClickTicketCurrying = (order) => (event) => {
    event.preventDefault();
    setOrderSelected(order);
    setModal(false);
    setModalTicket(true);
  };

  const handleClickTicket = (order) => {
    setOrderSelected(order);
    setModal(false);
    setModalTicket(true);
  };

  const handleTrakingNumber = (url) => {
    window.open(url, '_blank');
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Nº orden',
        accessor: 'orderId',
      },
      {
        Header: 'Fecha',
        accessor: 'date',
      },
      {
        Header: 'Destinatario',
        accessor: (d) => `${d.firstName}`,
      },
      {
        Header: 'Estado',
        accessor: 'status',
      },
      {
        Header: 'Nº Tracking',
        accessor: 'trackingNumber',
        isVisible: true,
        Cell: ({ row }) => {
          const component = row.original.trackingNumber && row.original.statusInc.length > 0 ? (
            <a
              href="#!"
              onClick={handleClickTicketCurrying(row.original)}
              role="button"
              className="d-block font-weight-bold font-weight-bold"
            >
              <small className="text-secondary-color text-underline">
                <u>N / N</u>
              </small>
            </a>
          ) : (
            <a
              href="#!"
              onClick={(e) => {
                e.preventDefault();
                handleTrakingNumber(
                  `https://www.blue.cl/seguimiento/?n_seguimiento=${row.original.trackingNumber}`,
                );
              }}
              role="button"
              className="d-block font-weight-bold font-weight-bold"
            >
              <small className="text-secondary-color text-underline">
                <u>{row.original.trackingNumber}</u>
              </small>
            </a>
          );
          return component;
        },
      },
      {
        Header: 'Nº Referencia',
        accessor: 'orderNumber',
      },
      {
        Header: 'Incidencia',
        accessor: 'label',
        isVisible: true,
        Cell: ({ row }) => {
          const component = row.original.statusInc && row.original.statusInc.length > 0 ? (
            <small
              className={`badge--${row.original.statusInc
                .replace(' ', '')
                .toLowerCase()} px-4 py-1`}
            >
              {row.original.statusInc}
            </small>
          ) : (
            <a
              href="#!"
              onClick={handleClickTicketCurrying(row.original)}
              role="button"
              className="d-block font-weight-bold font-weight-bold"
            >
              <small className="text-secondary-color text-underline">
                <u>Crear Ticket</u>
              </small>
            </a>
          );
          return component;
        },
      },
      {
        Header: 'Acciones',
        accessor: 'ver',
        isVisible: true,
        Cell: ({ row: { original } }) => (
          <div className="d-flex justify-content-center align-items-center">
            <CardButton
              onClick={handleClickOrderDeatil(original)}
              className="mx-2"
            >
              <img src={pdfIcon} alt="Actualizar Ordenes" width="10" />
            </CardButton>
            <CardButton
              onClick={cancelOrder(original)}
              className="mx-2"
            >
              <img src={trashIcon} alt="Actualizar Ordenes" width="10" />
            </CardButton>
          </div>
        ),
        // Cell: ({ row: { original } }) => (
        //   <a
        //     href="#!"
        //     onClick={handleClickOrderDeatil(original)}
        //     role="button"
        //     className="d-block font-weight-bold font-weight-bold"
        //   >
        //     <small className="text-complementary-color">Ver Más &gt;</small>
        //   </a>
        // ),
      },
    ],
    [],
  );

  let component;
  if (isError) {
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

  const infoComponent = (
    <TooltipIcon
      icon={<img src={info} alt="Info" width="18" />}
      text="Te mostramos tus órdenes de los últimos 90 días"
      color="#BFEAFF"
    />
  );

  return (
    <PageLayout
      title="Tus órdenes"
      description="Te mostramos tus órdenes de los últimos días"
    >
      <PageTitle
        title={`Tus órdenes ${objectParams.status ? `(${objectParams.status})` : ''}`}
        icon={infoComponent}
      />
      <a
        href="#!"
        className="d-flex align-items-center mb-5"
        onClick={objectParams.status ? handleClickReloadList : handleClickUpdateList}
      >
        <Button
          text={objectParams.status ? 'Ver todo' : 'Actualizar'}
          className="btn btn-secondary me-3 py-2"
          imgPrev={<img src={reload} alt="Actualizar Ordenes" width="13" />}
        />
        {updatedAt && (
          <div className="d-xl-flex align-items-center">
            <span
              className="me-2"
              style={{ background: '#FF7E44', width: 2, height: 20 }}
            />
            <span className="me-2">
              <small> Última actualización</small>
            </span>
            <span className="me-2">
              <small>
                {`${updatedAt?.day}, ${updatedAt?.month} ${updatedAt?.time}`}
                {' '}
                hr.
              </small>
            </span>
          </div>
        )}
      </a>
      {!isLoading && !isError ? (
        <div className="mb-5">
          <MainTable
            columns={columns}
            data={orders}
            buttonChildren={(
              <div className="d-flex justify-content-end align-items-center">
                <button
                  className="btn btn-secondary me-3 d-flex justify-content-center align-items-center"
                  type="button"
                  onClick={handleClickUpdateOrder}
                >
                  <img
                    src={uploadArrow}
                    alt="Actualizar Ordenes"
                    width="13"
                    className="me-3"
                  />
                  Subir Órdenes
                </button>
                <DownloadButton />
              </div>
            )}
          />
        </div>
      ) : (
        component
      )}
      <Modal
        title={`Detalle de orden ${orderSelected?.orderNumber}`}
        showModal={modal}
        onClick={() => setModal(false)}
      >
        <OrderDetail
          orderNumber={orderSelected?.orderNumber}
          id={orderSelected?.orderId}
          tracking={orderSelected?.trackingNumber}
          unifyState={orderSelected.status}
          issue={orderSelected?.statusInc}
          handleClickTicket={handleClickTicket}
        />
      </Modal>
      <Modal
        showModal={modalTicket}
        size="lg"
        onClick={() => {
          setModalTicket(false);
          refreshOrders();
        }}
      >
        <FromTicket
          orderId={orderSelected?.orderId}
          setModalTicket={setModalTicket}
          getData={refreshOrders}
        />
      </Modal>
      <Modal
        showModal={modalCancel}
        size="sm"
        onClick={() => {
          setModalCancel(false);
          refreshOrders();
        }}
      >
        <SkuDetail
          msj={msj.text}
          onClick={msj.click}
          textBtn={msj.textBtn}
          img={msj.img}
        />
      </Modal>
    </PageLayout>
  );
};

export default Orders;
