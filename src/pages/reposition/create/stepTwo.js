import React, { useMemo, useState, useCallback, useEffect } from 'react';
import cs from 'classnames';
import { useHistory } from 'react-router-dom';

import clientFetch from 'lib/client-fetch';
import MainTable from 'components/Templates/MainTable';
import { InputQuantity } from 'components/Atoms/Form/Input';
import DialogModal from 'components/Templates/DialogModal';
import plus from 'assets/brand/newPlus.svg';
import trash from 'assets/brand/trash.svg';
import InventoryRepositionModal from 'components/Templates/InventoryRepositionModal';
import AlertModal from 'components/Templates/AlertModal';

import { useReposition } from 'context/useReposition';
import { useAuth } from 'context/userContex';

import styles from './stepTwo.module.scss';

const StepTwo = () => {
  const {
    productsToReposition,
    quantitiesToRepositionBySku,
    updateQuantitiesToRepositionBySku,
    removeProductToReposition,
    formToReposition,
  } = useReposition();
  const [deleteModal, setDeleteModal] = useState({
    sku: null,
    isShow: false,
  });
  const [showSkuModal, setShowSkuModal] = useState(false);
  const [submitInventory, setSubmitInventory] = useState({
    loading: false,
    error: false,
    message: '',
    success: false,
  });
  const { seller, userParsed } = useAuth();
  const { replace } = useHistory();

  const showDeleteModal = useCallback(
    (sku) => () => {
      setDeleteModal({
        sku,
        isShow: true,
      });
    },
    [],
  );

  const hideDeleteModal = useCallback(
    () => setDeleteModal({ sku: null, isShow: false }),
    [],
  );

  const onDeleteSkuHandle = useCallback(() => {
    removeProductToReposition(deleteModal.sku);
    hideDeleteModal();
  }, [deleteModal]);

  const toggleSkuModal = useCallback(() => {
    setShowSkuModal((prevState) => !prevState);
  }, []);

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

  const submitInventoryHandle = async () => {
    try {
      setSubmitInventory((prev) => ({ ...prev, loading: true }));

      const { accountId, warehouse, key } = userParsed.credential;

      let errorQty = false;

      const itemsToReposition = productsToReposition.map((product) => {
        const qty = quantitiesToRepositionBySku[product.sku] || 0;

        if (!qty) {
          errorQty = true;
        }

        return {
          sku: product.sku,
          qty,
          desciption: product.description,
        };
      });

      if (errorQty) {
        setSubmitInventory({
          error: true,
          message: 'Valida que los SKU no se encuentren con cantidad 0.',
        });

        return;
      }

      const formdata = new FormData();
      formdata.append('archivo', formToReposition.files[0]);
      formdata.append('schedule', formToReposition.date);
      formdata.append('receptionDate', null);
      formdata.append('accountId', accountId);
      formdata.append(
        'data',
        JSON.stringify({
          expected_delivery_date: formToReposition.date,
          warehouse,
          key,
          supplier_name: seller.nameSeller,
          items: itemsToReposition,
        }),
      );

      await clientFetch(
        'bff/v1/replenishment/addReplenishment',
        {
          headers: {
            apikey: process.env.REACT_APP_API_KEY_KONG,
          },
          body: formdata,
        },
        { withFile: true },
      );

      setSubmitInventory({
        success: true,
        message:
          'Se ha agendado exitosamente la reposición de inventario, visualiza su estado en la lista de reposiciones.',
      });
    } catch (e) {
      setSubmitInventory({
        error: true,
        message: 'Ha ocurrido un error inesperado, Inténtelo más tarde',
      });
    } finally {
      setSubmitInventory((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    if (!productsToReposition.length) {
      toggleSkuModal();
    }
  }, []);

  return (
    <div className="row">
      <div className="col-12 mb-4">
        <p className={styles.title}>Detalle de reposición</p>
      </div>
      <div className="col-12">
        <MainTable
          columns={columns}
          data={productsToReposition}
          noButtons
          buttonChildren={(
            <div className="w-100 d-flex justify-content-end align-items-center">
              <button
                type="button"
                className={cs(styles.roundedButtom, styles.add)}
                onClick={toggleSkuModal}
              >
                <img src={plus} alt="Ordenes" width={17} height={17} />
              </button>
            </div>
          )}
        />
      </div>
      <div className="col-12 d-flex justify-content-end">
        <button
          type="button"
          onClick={!submitInventory.loading ? submitInventoryHandle : null}
          className={cs(styles.nextButton, 'btn btn-secondary')}
          style={{ width: 190 }}
          disabled={submitInventory.loading || !productsToReposition.length}
        >
          {!submitInventory.loading ? 'Programar' : 'Cargando...'}
        </button>
      </div>
      <DialogModal
        showModal={deleteModal.isShow}
        onAccept={onDeleteSkuHandle}
        onCancel={hideDeleteModal}
      >
        <p>
          ¿Estás seguro que deseas eliminar el
          {' '}
          <b>
            SKU
            {deleteModal.sku}
          </b>
          ?
        </p>
      </DialogModal>
      <InventoryRepositionModal
        showModal={showSkuModal}
        onCloseModal={toggleSkuModal}
      />
      <AlertModal
        showModal={submitInventory.error}
        message={submitInventory.message}
        onClose={() => setSubmitInventory((prev) => ({ ...prev, error: false }))}
      />
      <AlertModal
        image={<img alt="alert" src="/bgsuccess.png" width={102} height={98} />}
        showModal={submitInventory.success}
        message={submitInventory.message}
        onClose={() => replace('/reposition')}
      />
    </div>
  );
};

export default StepTwo;
