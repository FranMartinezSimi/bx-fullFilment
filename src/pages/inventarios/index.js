import React, { useState, useEffect, useMemo } from 'react';

import { useAuth } from '../../context/userContex';
import Alert from '../../components/Atoms/Alert';
import Spinner from '../../components/Atoms/Spinner';
import Modal from '../../components/Templates/Modal';
import MainTable from '../../components/Templates/MainTable';
import InventoryDetail from '../../components/Molecules/InventoryDetail';

const Inventory = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [list, setList] = useState([]);
    const [inventoryId, setInventoryId] = useState('');
    const [skuId, setSkuId] = useState('');
    const [error, setError] = useState(false);

    const data = useMemo(() => list, [list]);

    const columns = useMemo(() => [
        {
          Header: 'SKU/UPC',
          accessor: 'sku',
        },
        {
            Header: 'Descripción',
            accessor: 'description',
        },
        {
            Header: 'En Bodega',
            accessor: 'quantity_in_warehouse',
        },
        {
            Header: 'Disponible',
            accessor: 'quantity_available',
        },
        {
            Header: 'Dañado',
            accessor: 'quantity_hurt',
        },
        {
            Header: 'Reservado',
            accessor: '0',
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
        setSkuId(tableData.row.original.sku);
        
        setModal(true);
    }

    // function handleErrors(response) {
    //     if (!response.ok) {
    //         throw Error(response);
    //     }
    //     return response.json();
    // }

    useEffect(() => {
    const userData = JSON.parse(user);
    let headers = new Headers();
    headers.append("account_id", userData.account_id);
    headers.append("key", userData.key);
    headers.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "warehouse": "bx1",
        "page": 1

    });

    const requestOptions = {
    method: 'POST',
    headers: headers,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://desa-api.bluex.cl//api/v1/fulfillment/inventory/getInventoryList", requestOptions)
        // .then(handleErrors)
        .then(response => response.json())
        .then(data => {
            // console.log('inventoryData: ', data.products);
            if (data.statusCode === 500) {
                setLoading(false);
                setError(true);
                return
            }
            setList(data.products);
            setLoading(false);
        })
        .catch(error => {
            console.log('error', error);
            setError(true);
        });
}, [user])
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
            <Modal title={`Detalle SKU ${skuId}`} subtitle={`Id de producto ${inventoryId}`} showModal={modal} onClick={() => setModal(false)}>
                <InventoryDetail id={inventoryId} />
            </Modal>
        </>
    );
}
    

export default Inventory;