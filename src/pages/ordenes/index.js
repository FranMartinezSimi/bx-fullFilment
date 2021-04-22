import React, { useState, useEffect, useMemo } from 'react';

import { useAuth } from '../../context/userContex';
import Alert from '../../components/Atoms/Alert';
import Spinner from '../../components/Atoms/Spinner';
import Modal from '../../components/Templates/Modal';
import MainTable from '../../components/Templates/MainTable';
import OrderDetail from '../../components/Molecules/OrderDetail';

const Orders = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [list, setList] = useState([]);
    const [totalPages, setTotalPages] = useState('');
    const [orderId, setOrderId] = useState('');
    const [orderNumber, setOrderNumber] = useState('');
    const [error, setError] = useState(false);

    const data = useMemo(() => list, [list]);

    const columns = useMemo(() => [
        {
          Header: 'Nº orden',
          accessor: 'order_number',
        },
        {
            Header: 'Fecha de creación',
            accessor: 'fecha',
        },
        {
            Header: 'Destinatarios',
            accessor: 'first_name',
        },
        {
            Header: 'Estado OS',
            accessor: 'description',
        },
        {
            Header: 'Estado Tracking',
            accessor: 'tracking_description',
        },
        {
            Header: 'Nº Tracking',
            accessor: 'numero_tracking',
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

    const handleClickOrderDeatil = (e, tableData) => {
        e.preventDefault();
        setOrderId(tableData.row.original.order_id);
        setOrderNumber(tableData.row.original.order_number);
        setModal(true);
    }

    function handleErrors(response) {
        if (!response.ok) {
            throw Error(JSON.stringify(response));
        }
        return response.json();
    }

    useEffect(() => {
        const userData = JSON.parse(user);
        let headers = new Headers();
        headers.append("account_id", userData.account_id);
        headers.append("key", userData.key);
        headers.append("Content-Type", "application/json");

        let raw = JSON.stringify({
        "page": 1,
        "warehouse": "bx1",
        "status": "all"
        });

        const requestOptions = {
        method: 'POST',
        headers: headers,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://desa-api.bluex.cl/api/v1/fulfillment/order/getOrderList", requestOptions)
            // .then(handleErrors)
            .then(response => response.json())
            .then(data => {
                console.log('data:', data);
                setList(data.order);
                setTotalPages(data.total_pages);
                setLoading(false);
            })
            .catch(error => console.log('error', error));
    }, [user])
    return (
        <>
            <h1 className="display-font" style={{fontWeight: 900}}>Tus órdenes</h1>
            {loading
                ? (error
                    ? <Alert className="mt-5" type="warning" text="Ooopss! Ocurrió un error, intentalo más tarde..."/>
                    : <Spinner />)
                : (
                    <>
                        <MainTable 
                            columns={columns}
                            data={data}
                        />
                        <p className="mb-5">{`Mostrando 20 de ${(totalPages * 20)}`}</p>
                    </>
                )
            }
            <Modal title={`Detalle de orden ${orderNumber}`} showModal={modal} onClick={() => setModal(false)}>
                <OrderDetail id={orderId} />
            </Modal>
        </>
    );
}
    

export default Orders;