import { useState, useEffect, useMemo, useCallback } from 'react';
import clientFetch from 'lib/client-fetch';
import { useHistory } from 'react-router-dom';

import Alert from 'components/Atoms/AlertMessage';
import Spinner from 'components/Atoms/Spinner';
import Modal from 'components/Templates/Modal';
import MainTable from 'components/Templates/MainTable';
import InventoryDetail from 'components/Molecules/InventoryDetail';
import PageTitle from 'components/Atoms/PageTitle';
import PageLayout from 'components/Templates/PageLayout';
import FormReplenishment from 'components/Molecules/FormReplenishment';
import { useInventory } from 'context/useInventory';

const Inventory = () => {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalInventory, setModalInventory] = useState(false);
  const [list, setList] = useState([]);
  const [inventoryId, setInventoryId] = useState('');
  const [skuId, setSkuId] = useState('');
  const [error, setError] = useState(false);
  const { setProductsToReposition, productsToReposition } = useInventory();
  const { push } = useHistory();

  const handleClickInventoryDetail = (e, tableData) => {
    e.preventDefault();
    setInventoryId(tableData.row.original.product_id);
    setSkuId(tableData.row.original.sku);

    setModal(true);
  };
  const columns = useMemo(
    () => [
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
        Cell: (table) => (
          <a
            href="#!"
            onClick={(e) => handleClickInventoryDetail(e, table)}
            role="button"
            className="font-weight-bold font-weight-bold"
          >
            <small className="d-block text-complementary-color">
              Ver Más &gt;
            </small>
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

  const handleClickInventory = useCallback(
    (e) => {
      e.preventDefault();

      if (productsToReposition.length) {
        push('/reposition/create');
        return;
      }

      setModalInventory(true);
    },
    [productsToReposition],
  );

  useEffect(() => {
    clientFetch('bff/v1/inventory/getProductsList', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      body: {
        page: 1,
        warehouse: 'bx1',
        status: 'all',
      },
    })
      .then((products) => {
        setLoading(false);
        setList(products.products);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);
  if (error) {
    component = <h1>Un Error ql</h1>;
  } else {
    component = <h1>Cargando</h1>;
  }

  return (
    <PageLayout title="Tu inventario">
      <PageTitle title="Tu inventario" className="mb-5" />
      {list.length && !loading ? (
        <MainTable
          selectableRow
          onChangeSelection={setProductsToReposition}
          columns={columns}
          data={list}
          handleClickInventory={handleClickInventory}
        />
      ) : (
        component
      )}
      <Modal
        title={`Detalle SKU ${skuId}`}
        subtitle={`ID de producto ${inventoryId}`}
        showModal={modal}
        onClick={() => setModal(false)}
      >
        <InventoryDetail id={inventoryId} />
      </Modal>
      <Modal
        showModal={modalInventory}
        size="xl"
        onClick={() => setModalInventory(false)}
      >
        <FormReplenishment setModalTicket={setModalInventory} />
      </Modal>
    </PageLayout>
  );
};

export default Inventory;
