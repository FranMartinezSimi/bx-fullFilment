import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from "react-router-dom";
import { clientFetch } from 'lib/client-fetch';

import PageLayout from 'components/Templates/PageLayout';
import Alert from 'components/Atoms/Alert';
import Spinner from 'components/Atoms/Spinner';
import Modal from 'components/Templates/Modal';
import MainTable from 'components/Templates/MainTable';
import OrderDetail from 'components/Molecules/OrderDetail';
import PageTitle from 'components/Atoms/PageTitle';
import reload from 'assets/brand/reload.svg';
import warningIcon from 'assets/brand/warningIcon.svg';
import styles from './styles.module.scss'

const Orders = () => {
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [error, setError] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [date, setDate] = useState(null);
    const [list, setList] = useState([]);
    const [message, setMessage] = useState('');
    const [totalPages, setTotalPages] = useState('');
    const [orderId, setOrderId] = useState('');
    const [orderNumber, setOrderNumber] = useState('');
    const [orderTracking, setOrderTracking] = useState('');


    let history = useHistory();

    const getData = () => {
        setError(false);
        setMessage('');
        clientFetch('orders/getOrdersList', {
            body: {
                "page": 1,
                "warehouse": "bx1",
                "status": "all"
            }
        })
            .then((data) => {
                // console.log('orderData:', data);
                setLoading(false);
                setList(data.order);
                setTotalPages(data.total_pages);
                const DATE = new Date();
                const monthNames = [
                    "Ene",
                    "Feb",
                    "Mar",
                    "Abr",
                    "May",
                    "Jun",
                    "Jul",
                    "Ago",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dic",
                ];
                // console.log(DATE);
                setDate({
                    day: DATE.getDay(),
                    month: monthNames[DATE.getMonth()],
                    time: `${DATE.getHours()} : ${DATE.getMinutes() < 10 ? '0' : ''}${DATE.getMinutes()}`,
                });
                setMessage('success');
            })
            .catch((error) => {
                console.log('error', error);
                setError(true);
                setLoading(false);
                setMessage('error');
                setDate(null);
            });
    }

    const data = useMemo(() => list, [list]);

    const columns = useMemo(() => [
        {
          Header: 'Nº orden',
          accessor: 'order_id',
        },
        {
            Header: 'Fecha',
            accessor: 'fecha',
        },
        {
            Header: 'Destinatario',
            accessor: d => `${d.first_name} ${d.last_name}`
        },
        {
            Header: 'Estado',
            accessor: 'estado',
        },
        {
            Header: 'Nº Tracking',
            accessor: 'numero_tracking',
        },
        {
            Header: 'Nº de referencia',
            accessor: 'order_number',
        },
        {
            accessor: 'ver',
            isVisible: true,
            Cell: (table) => {
                return(
                    <div
                        onClick={(e) => handleClickOrderDeatil(e, table)}
                        role="button"
                        className="font-weight-bold font-weight-bold"
                    >
                        <small>
                            Ver Detalle &gt;
                        </small>
                    </div>
            )},
          },
    ], []);

    const handleClickUpdateOrder = (e) => {
        e.preventDefault();
        history.push("/ordenes/subir-ordenes");
    }

    const handleClickUpdateList = (e) => {
        e.preventDefault();
        setLoading(true);
        setIsUpdate(true);
        getData();
        setTimeout(() => {
            setIsUpdate(false)
        }, 3000)
    }

    const handleClickOrderDeatil = (e, tableData) => {
        e.preventDefault();
        setOrderId(tableData.row.original.order_id);
        setOrderNumber(tableData.row.original.order_number);
        setOrderTracking(tableData.row.original.numero_tracking);
        setModal(true);
    }
    
    let component;
    if (error) {
        component = <Alert className="mt-5" type="warning" text="Ooopss! Ocurrió un error, intentalo más tarde..."/>;
    } else {
        component = <Spinner />;
    }
    
    let componentMessage;
    switch (message) {
        case 'success':
            componentMessage = <p className="py-5"><span className={`${styles.badge}`}>¡Tus órdenes han sido actualizadas con éxito!</span></p>;
            break;
        case 'error':
            componentMessage = <p className="py-5"><span className={`${styles.badge} ${styles.errorMessage}`}> 
                <img src={warningIcon} alt="Actualizar Ordenes" width="25"/>
                <span> Ups, ¡No se logro actualizar! </span>
            </span></p>;
            break;
        default:
            componentMessage = null;
    }

    useEffect(() => {
        getData();
    }, [])
    return (
        <PageLayout title="Tus órdenes" description="Te mostramos tus órdenes de los últimos días">
            <PageTitle title="Tus órdenes" subtitle="Te mostramos tus órdenes de los últimos días"/>
            {isUpdate && (
                componentMessage
            )}
            {date && !isUpdate && (
                <a href="#!" onClick={handleClickUpdateList}>
                    <div className="pt-2 mb-5 d-flex align-items-center">
                        <span className="me-2">Última actualización</span>
                        <span className="me-2">{`${date.day}, ${date.month} ${date.time}`}</span>
                        <img src={reload} alt="Actualizar Ordenes" width="19"/>
                    </div>
                </a>
            )}
            {list.length && !loading && !error
                ? <MainTable 
                    columns={columns}
                    data={data}
                    totalPagesFetch={totalPages}
                    handleClick={handleClickUpdateOrder}
                    handleClickUpdate={handleClickUpdateList}
                    /> 
                : component
            }
            <Modal title={`Detalle de orden ${orderNumber}`} showModal={modal} onClick={() => setModal(false)}>
                <OrderDetail id={orderId} tracking={orderTracking}/>
            </Modal>
        </PageLayout>
    );
}
    

export default Orders;