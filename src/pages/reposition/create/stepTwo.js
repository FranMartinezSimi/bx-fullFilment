import React, { useMemo, useState, useCallback } from 'react';
import cs from 'classnames';

import MainTable from 'components/Templates/MainTable';
import { InputQuantity } from 'components/Atoms/Form/Input';
import plus from 'assets/brand/newPlus.svg';
import trash from 'assets/brand/trash.svg';

import { useReposition } from 'context/useReposition';

import styles from './stepTwo.module.scss';

const StepTwo = () => {
  const {
    productsToReposition,
    quantitiesToRepositionBySku,
    updateQuantitiesToRepositionBySku,
  } = useReposition();
  const [, setDeleteModal] = useState({
    sku: null,
    isShow: false,
  });

  const showDeleteModal = useCallback(
    (sku) => () => {
      setDeleteModal({
        sku,
        isShow: true,
      });
    },
    [],
  );

  const columns = useMemo(
    () => [
      {
        Header: 'SKU',
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
            onChange={(value) => {
              updateQuantitiesToRepositionBySku(row.values.sku, value);
            }}
            min={0}
            className="mt-1"
            value={quantitiesToRepositionBySku[row.values.sku] || 0}
          />
        ),
      },
      {
        Header: 'Acciones',
        id: 'actions',
        Cell: ({ row }) => (
          <div className="d-flex justify-content-center align-items-center">
            <button
              type="button"
              className={cs(styles.roundedButtom, styles.delete)}
              onClick={showDeleteModal(row.values.sku)}
            >
              <img src={trash} alt="trash" width={13} height={13} />
            </button>
          </div>
        ),
      },
    ],
    [quantitiesToRepositionBySku],
  );

  return (
    <div className="row">
      <div className="col-12 mb-4">
        <p className={styles.title}>
          Detalle de reposición
        </p>
      </div>
      <div className="col-12">
        <MainTable
          columns={columns}
          data={productsToReposition}
          noButtons
          buttonChildren={(
            <div className="col-6 d-flex justify-content-end align-items-center">
              <button
                type="button"
                className={cs(styles.roundedButtom, styles.add)}
              >
                <img src={plus} alt="Ordenes" width={17} height={17} />
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default StepTwo;
