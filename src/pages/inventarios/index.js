import React, { useState, useEffect, useMemo } from 'react';
import { clientFetch } from 'lib/client-fetch'

import Alert from 'components/Atoms/Alert';
import Spinner from 'components/Atoms/Spinner';
import Modal from 'components/Templates/Modal';
import MainTable from 'components/Templates/MainTable';
import InventoryDetail from 'components/Molecules/InventoryDetail';
import PageTitle from 'components/Atoms/PageTitle';

const Inventory = () => {
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

    let component;

    if (error) {
      component = <Alert className="mt-5" type="warning" text="Ooopss! Ocurrió un error, intentalo más tarde..."/>;
    } else {
      component = <Spinner />;
    }

    useEffect(() => {
        clientFetch('inventory/getInventoryList', {
            body: {
                "page": 1,
                "warehouse": "bx1",
                "status": "all"
            }
        })
            .then(data => {
                // console.log('orderData:', data);
                setLoading(false);
                setList(data.products);
            })
            .catch(error => {
                console.log('error', error);
                setError(true);
                setLoading(false);
            });
    }, [])
    return (
        <>
            <PageTitle title="Tu inventario" className="mb-5"/>
            {list.length && !loading
                ? <MainTable 
                    columns={columns}
                    data={data}
                    />
                : component
            }
            <Modal title={`Detalle SKU ${skuId}`} subtitle={`Id de producto ${inventoryId}`} showModal={modal} onClick={() => setModal(false)}>
                <InventoryDetail id={inventoryId} />
            </Modal>
        </>
    );
}
    

export default Inventory;