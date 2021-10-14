import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import clientFetch from 'lib/client-fetch';
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

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalDate, setModalDate] = useState(false);
  const [modalTicket, setModalTicket] = useState(false);
  const [error, setError] = useState(false);
  const [date, setDate] = useState(null);
  const [list, setList] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [orderTracking, setOrderTracking] = useState('');
  const [unifyState, setUnifyState] = useState('');
  const [issue, setIssue] = useState('');
  const [reloadedData, setReloadedData] = useState(false);

  const history = useHistory();

  const getData = () => {
    setError(false);
    clientFetch('order/v1/orders/getOrdersList', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      body: {
        page: 1,
        warehouse: 'bx1',
        status: 'all',
      },
    })
      .then((data) => {
        setLoading(false);
        setList(data);
        const DATE = new Date();
        const monthNames = [
          'Ene',
          'Feb',
          'Mar',
          'Abr',
          'May',
          'Jun',
          'Jul',
          'Ago',
          'Sep',
          'Oct',
          'Nov',
          'Dic',
        ];
        setDate({
          day: DATE.getDate(),
          month: monthNames[DATE.getMonth()],
          time: `${DATE.getHours()} : ${DATE.getMinutes() < 10 ? '0' : ''}${DATE.getMinutes()}`,
        });
        if (reloadedData) {
          useNotify('success', '¡Tus órdenes han sido actualizadas con éxito!');
        }
      })
      .catch(() => {
        setError(true);
        setLoading(false);
        if (reloadedData) {
          useNotify('error', 'Ooopss! ¡No se logro actualizar!');
        }
        setDate(null);
      });
  };

  const data = useMemo(() => list, [list]);

  const handleClickUpdateOrder = (e) => {
    e.preventDefault();
    history.push('/ordenes/subir-ordenes');
  };

  const handleClickUpdateList = (e) => {
    e.preventDefault();
    setLoading(true);
    setReloadedData(true);
    setTimeout(() => {
      setReloadedData(false);
    }, 0);
  };

  const handleClickOrderDeatil = (e, tableData) => {
    e.preventDefault();
    setOrderId(tableData.row.original.orderId);
    setOrderNumber(tableData.row.original.orderNumber);
    setOrderTracking(tableData.row.original.trackingNumber);
    setUnifyState(tableData.row.original.status);
    setIssue(tableData.row.original.statusInc);
    setModal(true);
  };

  const hadleClickDropDown = (e) => {
    e.preventDefault();
    setModalDate(true);
  };

  const handleClickTicket = (e, row) => {
    e.preventDefault();
    setOrderId(row.original.orderId);
    setOrderNumber(row.original.orderNumber);
    setOrderTracking(row.original.trackingNumber);
    setUnifyState(row.original.status);
    setModal(false);
    setModalTicket(true);
  };

  const columns = useMemo(() => [
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
      accessor: (d) => `${d.firstName} ${d.lastName}`,
    },
    {
      Header: 'Estado',
      accessor: 'status',
    },
    {
      Header: 'Nº Tracking',
      accessor: 'trackingNumber',
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
          <small className={`badge--${row.original.statusInc.replace(' ', '').toLowerCase()} px-4 py-1`}>
            {row.original.statusInc}
          </small>
        ) : (
          <a
            href="#!"
            onClick={(e) => { e.preventDefault(); handleClickTicket(e, row); }}
            role="button"
            className="d-block font-weight-bold font-weight-bold"
          >
            <small className="text-secondary-color text-underline">
              <u>
                Crear Ticket
              </u>
            </small>
          </a>
        );
        return (
          component
        );
      },
    },
    {
      accessor: 'ver',
      isVisible: true,
      Cell: (table) => (
        <a
          href="#!"
          onClick={(e) => handleClickOrderDeatil(e, table)}
          role="button"
          className="d-block font-weight-bold font-weight-bold"
        >
          <small className="text-complementary-color">
            Ver Más &gt;
          </small>
        </a>
      ),
    },
  ], []);

  let component;
  if (error) {
    component = <Alert className="mt-5" type="warning" message="Ooopss! Ocurrió un error, intentalo más tarde..." />;
  } else {
    component = <Spinner />;
  }

  const updateComponent = (
    <a href="#!" className="d-flex align-items-center mb-5" onClick={handleClickUpdateList}>
      <Button
        text="Actualizar"
        className="btn btn-secondary me-3 py-2"
        imgPrev={<img src={reload} alt="Actualizar Ordenes" width="13" />}
      />
      {date && (
        <div className="d-xl-flex align-items-center">
          <span className="me-2" style={{ background: '#FF7E44', width: 2, height: 20 }} />
          <span className="me-2">
            <small>
              {' '}
              Última actualización
            </small>
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
  );

  const infoComponent = <TooltipIcon icon={<img src={info} alt="Info" width="18" />} text="Te mostramos tus órdenes de los últimos 90 días" color="#BFEAFF" />;

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (reloadedData) {
      getData();
    }
  }, [reloadedData]);

  return (
    <PageLayout title="Tus órdenes" description="Te mostramos tus órdenes de los últimos días">
      <PageTitle title="Tus órdenes" icon={infoComponent} />
      {updateComponent}
      {list.length && !loading && !error
        ? (
          <div className="mb-5">
            <MainTable
              columns={columns}
              data={data}
              handleClick={handleClickUpdateOrder}
              handleClickUpdate={handleClickUpdateList}
              hadleClickDropDown={hadleClickDropDown}
            />
          </div>
        )
        : component}
      <Modal title={`Detalle de orden ${orderNumber}`} showModal={modal} onClick={(e) => { e.preventDefault(); setModal(false); }}>
        <OrderDetail
          orderNumber={orderNumber}
          id={orderId}
          tracking={orderTracking}
          unifyState={unifyState}
          issue={issue}
          handleClickTicket={handleClickTicket}
        />
      </Modal>
      <Modal showModal={modalDate} size="lg" onClick={(e) => { e.preventDefault(); setModalDate(false); }}>
        <FromToDownloader />
      </Modal>
      <Modal showModal={modalTicket} size="lg" onClick={(e) => { e.preventDefault(); setModalTicket(false); getData(); }}>
        <FromTicket
          orderId={orderId}
          setModalTicket={setModalTicket}
          getData={getData}
        />
      </Modal>
    </PageLayout>
  );
};

export default Orders;
