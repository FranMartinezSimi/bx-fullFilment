import React, { useState, useEffect, useMemo } from 'react';
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
import Button from 'components/Atoms/Button';
import FromToDownloader from 'components/Molecules/FromToDownloader';
import FromTicket from 'components/Molecules/FormTicket';
import TooltipIcon from 'components/Atoms/TooltipIcon';
import useSearchParams from 'hooks/useSearchParams';
import GetOrdersList from 'services/orders/getOrdersList';
import { monthNames } from 'utils/date';

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalDate, setModalDate] = useState(false);
  const [modalTicket, setModalTicket] = useState(false);
  const [error, setError] = useState(false);
  const [date, setDate] = useState(null);
  const [list, setList] = useState([]);
  const [orderSelected, setOrderSelected] = useState({});
  const history = useHistory();
  const [params, setParams] = useState({});
  const objectParams = useSearchParams(history.location.search);

  const getData = async ({ status } = {}) => {
    try {
      setLoading(true);
      setError(false);
      const DATE = new Date();
      const response = await GetOrdersList({ status });

      setList(response);
      setDate({
        day: DATE.getDate(),
        month: monthNames[DATE.getMonth()],
        time: `${DATE.getHours()} : ${
          DATE.getMinutes() < 10 ? '0' : ''
        }${DATE.getMinutes()}`,
      });
    } catch (e) {
      setError(true);
      setDate(null);
    } finally {
      setLoading(false);
    }
  };

  const data = useMemo(() => list, [list]);

  const handleClickUpdateOrder = (e) => {
    e.preventDefault();
    history.push('/ordenes/subir-ordenes');
  };

  const handleClickUpdateList = async (event) => {
    try {
      event.preventDefault();
      await getData();
      useNotify('success', '¡Tus órdenes han sido actualizadas con éxito!');
    } catch (e) {
      useNotify('error', 'Ooopss! ¡No se logro actualizar!');
    }
  };

  const handleClickReloadList = async (event) => {
    event.preventDefault();
    history.replace('/ordenes');
    setParams({});
    await getData();
  };

  const handleClickOrderDeatil = (order) => (event) => {
    event.preventDefault();
    setOrderSelected(order);
    setModal(true);
  };

  const hadleClickDropDown = (e) => {
    e.preventDefault();
    setModalDate(true);
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
        accessor: 'ver',
        isVisible: true,
        Cell: ({ row: { original } }) => (
          <a
            href="#!"
            onClick={handleClickOrderDeatil(original)}
            role="button"
            className="d-block font-weight-bold font-weight-bold"
          >
            <small className="text-complementary-color">Ver Más &gt;</small>
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

  const infoComponent = (
    <TooltipIcon
      icon={<img src={info} alt="Info" width="18" />}
      text="Te mostramos tus órdenes de los últimos 90 días"
      color="#BFEAFF"
    />
  );

  useEffect(() => {
    setParams(objectParams);
    getData({ status: objectParams.status });
  }, [objectParams.status]);

  return (
    <PageLayout
      title="Tus órdenes"
      description="Te mostramos tus órdenes de los últimos días"
    >
      <PageTitle
        title={`Tus órdenes ${params.status ? `(${params.status})` : ''}`}
        icon={infoComponent}
      />
      <a
        href="#!"
        className="d-flex align-items-center mb-5"
        onClick={params.status ? handleClickReloadList : handleClickUpdateList}
      >
        <Button
          text={params.status ? 'Ver todo' : 'Actualizar'}
          className="btn btn-secondary me-3 py-2"
          imgPrev={<img src={reload} alt="Actualizar Ordenes" width="13" />}
        />
        {date && (
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
                {`${date?.day}, ${date?.month} ${date?.time}`}
                {' '}
                hr.
              </small>
            </span>
          </div>
        )}
      </a>
      {!loading && !error ? (
        <div className="mb-5">
          <MainTable
            columns={columns}
            data={data}
            handleClick={handleClickUpdateOrder}
            handleClickUpdate={handleClickUpdateList}
            hadleClickDropDown={hadleClickDropDown}
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
        showModal={modalDate}
        size="lg"
        onClick={() => setModalDate(false)}
      >
        <FromToDownloader />
      </Modal>
      <Modal
        showModal={modalTicket}
        size="lg"
        onClick={() => {
          setModalTicket(false);
          getData();
        }}
      >
        <FromTicket
          orderId={orderSelected?.orderId}
          setModalTicket={setModalTicket}
          getData={getData}
        />
      </Modal>
    </PageLayout>
  );
};

export default Orders;
