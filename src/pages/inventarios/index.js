import React, { useState, useEffect, useMemo } from 'react';

import Spinner from '../../components/Atoms/Spinner';
import Modal from '../../components/Templates/Modal';
import MainTable from '../../components/Templates/MainTable';
import OrderDetail from '../../components/Molecules/OrderDetail';

const raw = JSON.stringify({
    "page": 1,
    "status": "all",
    "warehouse": "bx1"
});

const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: raw,
    redirect: 'follow'
};

const Inventory = () => {
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [list, setList] = useState([]);
    const [orderId, setOrderId] = useState('');
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
            accessor: 'tracking',
        },
        {
            Header: 'Estado Tracking',
            accessor: 'description',
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
                            Ver &gt;
                        </small>
                    </div>
            )},
          },
    ], []);

    const handleClickOrderDeatil = (e, tableData) => {
        e.preventDefault();
        setOrderId(tableData.row.original.order_id);
        setModal(true);
    }

    function handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    }

    useEffect(() => {
        fetch("https://desa-api.bluex.cl/api/v1/fulfillment/order/getOrderList", requestOptions)
            .then(handleErrors)
            .then((data) => {
                setList(data.order);
                setLoading(false)
            })
            .catch((error) => {
                console.log('error', error)
                setError(true);
            })
    }, [])
    return (
        <>
            <h1 className="display-font" style={{fontWeight: 900}}>Tu inventario</h1>
            {loading
                ? (error ? <p className="alert alert-warning" role="alert">Error</p> : <Spinner />)
                : <MainTable 
                    columns={columns}
                    data={data}
                />
            }
            <Modal title={`Detalle de orden ${orderId}`} showModal={modal} onClick={() => setModal(false)}>
                <OrderDetail id={orderId} />
            </Modal>
        </>
    );
}
    

export default Inventory;