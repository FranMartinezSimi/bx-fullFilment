import React, { useState, useEffect, useMemo } from 'react';

import Alert from '../../components/Atoms/Alert';
import Spinner from '../../components/Atoms/Spinner';
import Modal from '../../components/Templates/Modal';
import MainTable from '../../components/Templates/MainTable';
import InventoryDetail from '../../components/Molecules/InventoryDetail';

const raw = JSON.stringify({
    "page": 1,
    // "status": "all",
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
    const [InventoryId, setInventoryId] = useState('');
    const [error, setError] = useState(false);

    const data = useMemo(() => list, [list]);

    const columns = useMemo(() => [
        {
          Header: 'SKU/upc',
          accessor: 'product_id',
        //   modificar pruduct_id por SKU al subir los cambio
        },
        {
            Header: 'Descripción',
            accessor: 'description',
        },
        {
            Header: 'En Bodega',
            accessor: 'quantity_available',
        },
        {
            Header: 'Disponible',
            accessor: 'quantity_in_warehouse',
        },
        {
            Header: 'Dañado',
            accessor: 'quantity_hurt',
        },
        {
            Header: 'Reservado',
            accessor: '',
        },
        {
            accessor: 'ver',
            isVisible: true,
            Cell: (table) => {
                return(
                    <div
                        onClick={(e) => handleClickInventoryDetail(e, table)}
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

    const handleClickInventoryDetail = (e, tableData) => {
        e.preventDefault();
        setInventoryId(tableData.row.original.product_id);
        
        setModal(true);
    }

    function handleErrors(response) {
        if (!response.ok) {
            throw Error(response);
        }
        return response.json();
    }

    useEffect(() => {
        fetch("https://desa-api.bluex.cl//api/v1/fulfillment/inventory/getInventoryList", requestOptions)
            .then(handleErrors)
            .then((data) => {
                console.log(data.products);
                setList(data.products);
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
                ? (error
                    ? <Alert className="mt-5" type="warning" text="Ooopss! Ocurrió un error, intentalo más tarde..."/>
                    : <Spinner />)
                : <MainTable 
                    columns={columns}
                    data={data}
                />
            }
            <Modal title={`Detalle SKU ${InventoryId}`} showModal={modal} onClick={() => setModal(false)}>
                <InventoryDetail id={InventoryId} />
            </Modal>
        </>
    );
}
    

export default Inventory;