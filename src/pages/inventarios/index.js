import { useState, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import Alert from 'components/Atoms/AlertMessage';
import Spinner from 'components/Atoms/Spinner';
import Modal from 'components/Templates/Modal';
import MainTable from 'components/Templates/MainTable';
import InventoryDetail from 'components/Molecules/InventoryDetail';
import PageTitle from 'components/Atoms/PageTitle';
import PageLayout from 'components/Templates/PageLayout';
import { useInventory } from 'context/useInventory';
import { useReposition } from 'context/useReposition';

const Inventory = () => {
  const [modal, setModal] = useState(false);
  const [inventoryId, setInventoryId] = useState('');
  const [skuId, setSkuId] = useState('');
  const { inventory, isGetInventory, errorGetInventory } = useInventory();
  const {
    setProductsToReposition,
    productsToReposition,
    setSelectedModeToReposition,
  } = useReposition();
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

  if (errorGetInventory) {
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
        setSelectedModeToReposition('sku');
      }

      push('/reposition/create');
    },
    [productsToReposition],
  );

  if (errorGetInventory) {
    component = <h1>Cargando</h1>;
  } else {
    component = <h1>Cargando</h1>;
  }

  return (
    <PageLayout title="Tu inventario">
      <PageTitle title="Tu inventario" className="mb-5" />
      {inventory.length && !isGetInventory ? (
        <MainTable
          selectableRow
          onChangeSelection={setProductsToReposition}
          columns={columns}
          data={inventory}
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
    </PageLayout>
  );
};

export default Inventory;
