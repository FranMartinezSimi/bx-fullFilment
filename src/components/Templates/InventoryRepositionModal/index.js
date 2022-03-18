import { useState, useMemo, useCallback } from 'react';

import MainTable from 'components/Templates/MainTable';
import { InputQuantity } from 'components/Atoms/Form/Input';
import Modal from 'components/Templates/Modal';
import { useInventory } from 'hooks/useInventory';
import { useReposition } from 'context/useReposition';

const InventoryRepositionModal = ({ showModal, onCloseModal }) => {
  const [selected, setSelected] = useState([]);
  const {
    updateQuantitiesToRepositionBySku,
    quantitiesToRepositionBySku,
    productsToReposition,
    productsToRepositionKeyedBySku,
    addProductToReposition,
  } = useReposition();
  const { inventory } = useInventory();

  const columns = [
    {
      Header: 'SKU/UPC',
      accessor: 'sku',
    },
    {
      Header: 'Descripción',
      accessor: 'description',
    },
    {
      Header: 'Cantidad',
      id: 'quantity',
      Cell: ({ row }) => (
        <InputQuantity
          onChange={(value) => updateQuantitiesToRepositionBySku(row.values.sku, value)}
          min={0}
          className="mt-1"
          value={quantitiesToRepositionBySku[row.values.sku] || 0}
        />
      ),
    },
    {
      Header: 'En Bodega',
      accessor: 'quantity_in_warehouse',
    },
  ];

  const inventoryFiltered = useMemo(() => {
    if (!productsToReposition.length) {
      return inventory;
    }

    return inventory.filter(
      (product) => !productsToRepositionKeyedBySku[product.sku],
    );
  }, [inventory, productsToReposition, productsToRepositionKeyedBySku]);

  const addToReposition = useCallback(() => {
    addProductToReposition(selected);
    onCloseModal();
  }, [selected]);

  return (
    <Modal showModal={showModal} size="xl" onClick={onCloseModal}>
      <div className="row">
        <div className="col-12 mb-4">
          <p className="h6 text-center">Seleccionar SKU a reponer</p>
        </div>
      </div>
      <div className="px-5">
        <MainTable
          selectableRow
          onChangeSelection={setSelected}
          columns={columns}
          data={inventoryFiltered}
          noButtons
        />
        <div className="row d-flex justify-content-end align-intems-center mb-4">
          <div className="col-3">
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={addToReposition}
              style={{ height: 40, fontSize: 18, padding: 0 }}
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InventoryRepositionModal;
