import { useState, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import Alert from 'components/Atoms/AlertMessage';
import Spinner from 'components/Atoms/Spinner';
import Modal from 'components/Templates/Modal';
import MainTable from 'components/Templates/MainTable';
import InventoryDetail from 'components/Molecules/InventoryDetail';
import PageTitle from 'components/Atoms/PageTitle';
import PageLayout from 'components/Templates/PageLayout';
import { useInventory } from 'hooks/useInventory';
import { useReposition } from 'context/useReposition';
import DownloadButton from 'components/Pages/inventory/DownloadButton';

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

  const goToHistoryProduct = (sku) => (event) => {
    event.preventDefault();

    push(`inventario/${sku}/history`);
  };

  const columns = useMemo(
    () => [
      {
        Header: 'SKU/UPC',
        accessor: 'sku',
        Cell: ({ row: { original } }) => (
          <a href="#!" onClick={goToHistoryProduct(original.sku)} role="button">
            <span className="d-block text-complementary-color">
              {original.sku}
            </span>
          </a>
        ),
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

  return (
    <PageLayout title="Tu inventario">
      <PageTitle title="Tu inventario" className="mb-5" />
      {inventory.length && !isGetInventory ? (
        <MainTable
          selectableRow
          onChangeSelection={setProductsToReposition}
          columns={columns}
          data={inventory}
          buttonChildren={(
            <div className="d-flex justify-content-end align-items-center">
              <button
                className="btn btn-secondary d-flex justify-content-center align-items-center me-3"
                type="button"
                onClick={handleClickInventory}
              >
                Programar Reposición
              </button>
              <DownloadButton />
            </div>
          )}
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
