import React, { useState, useMemo, useCallback } from 'react';
import { setHours, setMinutes } from 'date-fns';
import cs from 'classnames';
import { useHistory } from 'react-router-dom';

import clientFetch from 'lib/client-fetch';

import PageLayout from 'components/Templates/PageLayout';
import PageTitle from 'components/Atoms/PageTitle';
import Card from 'components/Molecules/Card';
import InputWithLabel from 'components/Molecules/Form/InputWithLabel';
import InputDateWithLabel from 'components/Molecules/Form/InputDateWithLabel';
import DropZone from 'components/Molecules/DropZone';
import MainTable from 'components/Templates/MainTable';
import { InputQuantity } from 'components/Atoms/Form/Input';
import DialogModal from 'components/Templates/DialogModal';
import plus from 'assets/brand/newPlus.svg';
import trash from 'assets/brand/trash.svg';
import InventoryRepositionModal from 'components/Templates/InventoryRepositionModal';
import AlertModal from 'components/Templates/AlertModal';

import { useAuth } from 'context/userContex';
import { useInventory } from 'context/useInventory';

import styles from './create.module.scss';

const CreateReposition = () => {
  const [date, setDate] = useState(null);
  const [selectedFiles, setFiles] = useState([]);
  const { seller, userParsed } = useAuth();
  const { productsToReposition, updateQuantities, removeSku, quantitiesBySku } = useInventory();
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
    removeSku(deleteModal.sku);
    hideDeleteModal();
  }, [deleteModal]);

  const minDate = useMemo(() => new Date(), []);
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
              updateQuantities(row.values.sku, value);
            }}
            min={0}
            className="mt-1"
            value={quantitiesBySku[row.values.sku] || 0}
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
    [quantitiesBySku],
  );

  const toggleSkuModal = useCallback(() => {
    setShowSkuModal((prevState) => !prevState);
  }, []);

  const submitInventoryHandle = async () => {
    try {
      setSubmitInventory((prev) => ({ ...prev, loading: true }));

      if (!date) {
        setSubmitInventory({
          error: true,
          message:
            'Selecciona fecha y hora en que deseas programar tu reposición.',
        });

        return;
      }

      const { accountId, warehouse, key } = userParsed.credential;

      let errorQty = false;

      const itemsToReposition = productsToReposition.map((product) => {
        const qty = quantitiesBySku[product.sku] || 0;

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
      formdata.append('archivo', selectedFiles[0]);
      formdata.append('schedule', date);
      formdata.append('receptionDate', null);
      formdata.append('accountId', accountId);
      formdata.append(
        'data',
        JSON.stringify({
          expected_delivery_date: date,
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

  return (
    <PageLayout title="Reposición de Inventario">
      <PageTitle title="Reposición de Inventario" />

      <Card className="my-4">
        <div className="row">
          <div className="col-6">
            <div className="row px-4 my-4">
              <div className="col-12">
                <p className="subtitle">Datos de Contacto</p>
              </div>
            </div>
            <div className="row px-4">
              <div className="col-6">
                <InputWithLabel
                  label="Nombre del Seller"
                  value={seller.nameSeller}
                  id="seller_name"
                  readOnly
                />
              </div>
              <div className="col-6">
                <InputWithLabel
                  label="Nombre de contacto"
                  value={seller.nameContact}
                  id="contact_name"
                  readOnly
                />
              </div>
            </div>
            <div className="row px-4">
              <div className="col-6">
                <InputWithLabel
                  label="Teléfono de contacto"
                  value={seller.phoneContact}
                  id="phone_number"
                  onChangeText={console.log}
                  readOnly
                />
              </div>
              <div className="col-6">
                <InputWithLabel
                  label="Correo de contacto"
                  value={seller.emailContact}
                  id="email_address"
                  onChangeText={console.log}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row px-4 my-4">
              <div className="col-12">
                <p className="subtitle">Agenda tu reposición</p>
              </div>
            </div>
            <div className="row px-4">
              <div className="col-6">
                <InputDateWithLabel
                  label="Fecha"
                  id="date"
                  format="dd/MM/yyyy h:mm aa"
                  showTimeSelect
                  selected={date}
                  onChange={setDate}
                  minDate={minDate}
                  minTime={setHours(setMinutes(minDate, 30), 8)}
                  maxTime={setHours(setMinutes(minDate, 30), 16)}
                />
              </div>
              <div className="col-6">
                <InputDateWithLabel
                  label="Hora"
                  id="hour"
                  format="h:mm aa"
                  showTimeSelect
                  selected={date}
                  onChange={setDate}
                  minDate={minDate}
                  minTime={setHours(setMinutes(minDate, 30), 8)}
                  maxTime={setHours(setMinutes(minDate, 30), 16)}
                  placeholder="--:--"
                />
              </div>
            </div>
            <div className="row px-4">
              <div className="col-6">
                <DropZone
                  setSelectedFiles={setFiles}
                  size="small"
                  internalTitle="Arrastra tu archivo o selecciona desde tu computadora en formato jpg - png o pdf"
                  noValidation
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row px-4 my-4 d-flex justify-content-center">
          <div className="col-12 mb-5">
            <p className="subtitle">Productos seleccionados</p>
          </div>
          <div className="col-8">
            <MainTable
              columns={columns}
              data={productsToReposition}
              noButtons
              buttonChildren={(
                <div className="col-6 d-flex justify-content-end align-items-center">
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
        </div>
        <div className="row px-4 mb-4 d-flex justify-content-end">
          <div className="col-6 d-flex justify-content-end">
            <button
              type="button"
              onClick={!submitInventory.loading ? submitInventoryHandle : null}
              className="btn btn-secondary"
              style={{ width: 190 }}
              disabled={submitInventory.loading}
            >
              {!submitInventory.loading ? (
                'Programar'
              ) : (
                'Cargando...'
              )}
            </button>
          </div>
        </div>
      </Card>
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
    </PageLayout>
  );
};

export default CreateReposition;
