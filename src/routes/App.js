import React, { useState, useEffect, useMemo } from 'react';

import Layout from '../components/Templates/Layout';
import MainTable from '../components/Templates/MainTable';
import '../styles/main.scss';

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

const App = () => {
    const [list, setList] = useState([]);
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
            width: '5%',
            Cell: (table) => (
              <div
                // onClick={(e) => goToEdit(e, table.row.original._id)}
                role="button"
                className="font-weight-bold font-weight-bold"
              >
                  <p className="my-2">
                    <small>
                    Ver Detalle &gt;
                    </small>
                  </p>
              </div>
    
            ),
          },
    ], []);

    useEffect(() => {
        fetch("https://desa-api.bluex.cl/api/v1/fulfillment/order/getOrderList", requestOptions)
            .then(res => res.json())
            .then((data) => {
                console.log(data.order);
                setList(data.order);
            })
            .catch(console.log)
        return () => {
            console.log('use Effect')
        }
    }, [])
    return (
        <Layout>
            <MainTable columns={columns} data={data}/>
        </Layout>
    );
}
    

export default App;