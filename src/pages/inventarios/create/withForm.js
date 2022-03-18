import { useCallback, useState, useEffect, useMemo } from 'react';
import cs from 'classnames';

import Card from 'components/Molecules/Card';
import Tooltip from 'components/Molecules/Tooltip';
import InputWithLabel from 'components/Molecules/Form/InputWithLabel';
import InputNumberWithLabel from 'components/Molecules/Form/InputNumberWithLabel';
import Button from 'components/Atoms/Button';
import Spinner from 'components/Atoms/Spinner';
import Modal from 'components/Templates/Modal';
import SkuDetail from 'components/Molecules/SkuDetail';
import AlertModal from 'components/Templates/AlertModal';
import infoIcon from 'assets/brand/info-ico.svg';
import ValidateExistingSku from 'services/inventory/validateExistingSku';
import AddProducts from 'services/inventory/addProducts';
import { useInventory } from 'hooks/useInventory';
import { useAuth } from 'context/userContex';
import { useDebounce } from 'hooks/useDebounce';

import styles from './styles.module.scss';

const initialForm = {
  sku: '',
  descripcion: '',
  largo: 0,
  ancho: 0,
  alto: 0,
  peso: 0,
};

const WithForm = () => {
  const [form, setForm] = useState(initialForm);
  const [skuExists, setSkuExists] = useState(true);
  const [fetchingSku, setFetchingSku] = useState(false);
  const [fetchingErrorSku, setFetchingErrorSku] = useState(false);
  const [errorForm, setErrorForm] = useState({});
  const [modalDetail, setModalDetail] = useState(false);
  const [newSkuErrorModal, setNewSkuErrorModal] = useState(false);
  const { refresh: refreshInventory } = useInventory();
  const { userParsed } = useAuth();
  const { accountId, key } = userParsed?.credential || {};
  const formSkuValue = useDebounce(form.sku || '', 500);

  const isValidData = useMemo(() => {
    if (!form.sku.trim().length || skuExists) {
      return false;
    }
    if (!form.descripcion.trim().length) {
      return false;
    }
    if (
      form.alto <= 0
      || form.ancho <= 0
      || form.largo <= 0
      || form.peso <= 0
    ) {
      return false;
    }

    return true;
  }, [form, skuExists]);

  const toggleModal = useCallback(() => {
    setModalDetail((prevState) => !prevState);
  }, []);

  const toggleNewSkuErrorModal = useCallback(() => {
    setNewSkuErrorModal((prevState) => !prevState);
  }, []);

  const handleChange = useCallback(
    (name) => (value) => {
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleClear = () => {
    setForm(initialForm);
    setSkuExists(true);
  };

  const handleSubmit = async () => {
    try {
      const errors = {
        ...(form.sku.trim() === '' ? { sku: true } : {}),
        ...(form.descripcion.trim() === '' ? { descripcion: true } : {}),
      };

      if (Object.keys(errors).length) {
        setErrorForm(errors);
        return;
      }

      const newProduct = {
        sku: form.sku,
        description: form.descripcion,
        length: Number(form.largo),
        width: Number(form.ancho),
        height: Number(form.alto),
        weight: Number(form.peso),
        cost: 0,
        retail: 0,
      };

      const { status } = await AddProducts({
        accountId,
        key,
        products: newProduct,
      });

      if (status === 'error') {
        toggleNewSkuErrorModal();
        refreshInventory({ withLoading: false });
        return;
      }

      handleClear();
      refreshInventory({ withLoading: false });
      setErrorForm({});
      toggleModal();
    } catch (error) {
      toggleNewSkuErrorModal();
    }
  };

  useEffect(() => {
    (async () => {
      if (!form.sku.trim().length) return;

      setFetchingSku(true);
      try {
        const response = await ValidateExistingSku({
          sku: form.sku,
          accountId,
          key,
        });

        setSkuExists(response.flag);
      } catch (error) {
        setFetchingErrorSku(true);
      } finally {
        setFetchingSku(false);
      }
    })();
  }, [formSkuValue, accountId, key]);

  return (
    <>
      <Card className={cs(styles.fullHeight, 'px-5 py-5')}>
        <div className="row">
          <div className="col-12">
            <h1 className={cs(styles.h1, 'mb-4 d-flex align-items-center')}>
              Agregar SKU
              {' '}
              <Tooltip
                position="right"
                text="Ingresa todos los datos solicitados para crear un nuevo SKU"
              >
                <img src={infoIcon} alt="Info" width="18" />
              </Tooltip>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className={cs(styles.relative, 'col-12 mb-4')}>
            <InputWithLabel
              label="SKU"
              id="sku"
              value={form.sku}
              onChangeText={handleChange('sku')}
              placeholder="Codigo SKU"
            />
            {fetchingSku && (
              <span className={styles.loadSku}>
                <Spinner width={25} height={25} />
              </span>
            )}
            {((skuExists && form.sku.trim().length > 0) || errorForm.sku) && (
              <span className="text-danger mt-2">
                SKU ya existe, ingresa un código valido
              </span>
            )}
            {fetchingErrorSku && (
              <span className="text-danger mt-2">
                Ha ocurrido un error al validar el SKU.
              </span>
            )}
          </div>
          <div className="col-12 mb-4">
            <InputWithLabel
              label="Descripción"
              id="descripcion"
              value={form.descripcion}
              onChangeText={handleChange('descripcion')}
              placeholder="Ingresa la descripción del producto"
              autoComplete="off"
              disabled={skuExists}
            />
            {errorForm.descripcion && (
              <span className="text-danger mt-2">
                Debes completar este campo para continuar
              </span>
            )}
          </div>
          <div className="col-12 col-md-6 mb-4">
            <InputNumberWithLabel
              label="Largo CM"
              id="largo"
              placeholder="1"
              value={form.largo}
              onChange={handleChange('largo')}
              disabled={skuExists}
              min={0}
            />
          </div>
          <div className="col-12 col-md-6 mb-4">
            <InputNumberWithLabel
              label="Ancho CM"
              id="ancho"
              placeholder="1"
              value={form.ancho}
              onChange={handleChange('ancho')}
              disabled={skuExists}
              autoComplete="off"
              min={0}
            />
          </div>
          <div className="col-12 col-md-6 mb-4">
            <InputNumberWithLabel
              label="Alto CM"
              id="alto"
              placeholder="1"
              value={form.alto}
              onChange={handleChange('alto')}
              disabled={skuExists}
              autoComplete="off"
              min={0}
            />
          </div>
          <div className="col-12 col-md-6 mb-4">
            <InputNumberWithLabel
              label="Peso Kg"
              id="peso"
              placeholder="1"
              value={form.peso}
              onChange={handleChange('peso')}
              disabled={skuExists}
              autoComplete="off"
              min={0}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-end mt-5">
            <Button
              className={cs('btn btn-complementary mx-4', styles.btnForm)}
              text="Borrar"
              onClick={handleClear}
            />
            <button
              className={cs('btn btn-secondary', styles.btnForm)}
              disabled={!isValidData}
              onClick={handleSubmit}
              type="button"
            >
              Agregar
            </button>
          </div>
        </div>
      </Card>
      <Modal showModal={modalDetail}>
        <SkuDetail onClick={toggleModal} />
      </Modal>
      <AlertModal
        showModal={newSkuErrorModal}
        onClose={toggleNewSkuErrorModal}
        image={
          <img alt="alert" src="/errorgloboalert.png" width={102} height={98} />
        }
      >
        Ha ocurrido un error al crear el SKU:
        {' '}
        {form.sku}
      </AlertModal>
    </>
  );
};

export default WithForm;
