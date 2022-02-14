import React, { useEffect, useState } from 'react';
import cs from 'classnames';
import clientFetch from 'lib/client-fetch';

import { useAuth } from 'context/userContex';
import PageLayout from 'components/Templates/PageLayout';
import PageTitle from 'components/Atoms/PageTitle';
import info from 'assets/brand/info-ico.svg';
import SkuDetail from 'components/Molecules/SkuDetail';
import Modal from 'components/Templates/Modal';
import loadArrowOrange from 'assets/brand/loadarrowOrange.svg';
import UploadCsvFull from 'components/Molecules/UploadCsvFull';
import MessageResponseProducts from 'components/Molecules/MessageResponseProducts';
import Button from 'components/Atoms/Button';
import Card from 'components/Molecules/Card';
import Tooltip from 'components/Molecules/Tooltip';
import InputWithLabel from 'components/Molecules/Form/InputWithLabel';
import InputNumberWithLabel from 'components/Molecules/Form/InputNumberWithLabel';
import { useDebounce } from 'hooks/useDebounce';
import Spinner from 'components/Atoms/Spinner';
import plantilla from './sku-creation-template.csv';

import styles from './styles.module.scss';

const CreateSku = () => {
  const { user } = useAuth();
  const [setModalTicket] = useState(false);
  const [dataWhitErrors, setDataWhitErrors] = useState([]);
  const [modal, setModal] = useState(false);
  const [dataToValidate, setDataToValidate] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const userData = JSON.parse(user);
  const { accountId, key } = userData.credential;
  const [form, setForm] = useState({});
  const [products, setProducts] = useState([]);
  const [error, setError] = useState({
    sku: false,
    descripcion: false,
  });
  const [errorFull, setErrorFull] = useState(false);
  const [show, setShow] = useState(true);
  const [fetchingSku, setFetchingSku] = useState(false);

  const formSkuValue = useDebounce(form.sku || '', 100);

  const handleChange = (name) => (value) => {
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === 'sku') {
      setError((state) => ({
        ...state,
        [name]: false,
      }));
    }
  };

  const validateData = () => {
    setBtnDisabled(true);

    let itemsWhitErrors = [];
    let count = 0;

    const DATA_TO_VALIDATE = dataToValidate.map((item, k) => {
      let errors = [];
      const itemData = Object.keys(item);
      itemData.map((property) => {
        if (item[property].length === 0) {
          errors = [...errors, property];
          count = 1;
        }

        return property;
      });
      if (errors.length) {
        itemsWhitErrors = [
          ...itemsWhitErrors,
          {
            ...item,
            key: k,
            errors,
          },
        ];
      } else {
        itemsWhitErrors = [
          ...itemsWhitErrors,
          {
            ...item,
            key: k,
          },
        ];
      }
      return item;
    });

    if (count > 0) {
      setDataWhitErrors(itemsWhitErrors);
    }

    if (count === 0 && dataToValidate.length) {
      const dataToSendFormat = DATA_TO_VALIDATE.map((item) => ({
        sku: item.SKU,
        qty: item.CANTIDAD,
        desciption: item.DESCRIPCION,
        // weight: item.PESO,
      }));
      setDataWhitErrors([]);
      setForm({
        ...form,
        data: {
          ...form.data,
          items: dataToSendFormat,
        },
      });
      setBtnDisabled(false);
    }
  };

  const [response, setResponse] = useState({
    img: '',
    estado: 'estado',
    procesado: '0',
    fallidos: '0',
    objeto: [],
  });

  let component;

  useEffect(() => {
    validateData();
  }, [dataToValidate]);

  const handleClear = () => {
    setError({ sku: false });
    const keys = Object.keys(form);
    keys.reduce(
      (acum, value) => ({
        ...acum,
        [value]: '',
      }),
      {},
    );
    setForm(
      keys.reduce(
        (acum, value) => ({
          ...acum,
          [value]: '',
        }),
        {},
      ),
    );
  };

  const handleClickOrderDeatil = (e) => {
    e.preventDefault();
    setModal(true);
  };

  const handleSubmit = () => {
    if (form.sku === '') {
      setError((state) => ({
        ...state,
        sku: true,
      }));
    }
    if (form.descripcion === '') {
      setError((state) => ({
        ...state,
        descripcion: true,
      }));
    }

    if (form.sku?.trim().length < 1 || form.descripcion?.trim().length < 1) {
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

    clientFetch('inventory/v1/services/addProducts', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      body: {
        warehouse: 'bx1',
        account_id: accountId,
        key,
        products: [newProduct],
      },
    })
      .then(() => {
        handleClear();
        setModal(true);
        setModalTicket(true);
        handleClickOrderDeatil();
      })
      .catch(() => {
        setError({ sku: true });
      });
    setDataWhitErrors([]);
  };

  const handleAllSubmit = () => {
    setBtnDisabled(true);

    const productsAdapter = products.map((product) => ({
      sku: product.SKU,
      description: product.DESCRIPCION,
      length: Number(product.LARGO),
      width: Number(product.ANCHO),
      height: Number(product.ALTO),
      weight: Number(product.PESO),
      cost: 0,
      retail: 0,
    }));

    clientFetch('inventory/v1/services/addProducts', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      body: {
        warehouse: 'bx1',
        account_id: accountId,
        key,
        products: productsAdapter,
      },
    })
      .then((res) => {
        const resp = Object.entries(['']);
        resp.push(res);
        const { created, errors } = resp[1].result;
        const dataTable = [...created];

        if (created.length > 0 && errors.length === 0) {
          setResponse({
            img: 'bgsuccess',
            estado: 'Proceso Completado',
            comentario: 'Tus productos han sido cargados exitosamente ',
            procesado: created.length,
            fallidos: errors.length,
            objeto: dataTable,
          });
        } else if (created.length > 0 && errors.length > 0) {
          setResponse({
            img: 'bgincomplete',
            estado: 'Proceso Incompleto',
            comentario:
              'Se ha realizado una carga parcial de tus productos. Puedes revisar los SKU cargados exitosamente y volver a cargar los fallidos.',
            procesado: created.length,
            fallidos: errors.length,
            objeto: dataTable,
          });
        } else if (created.length === errors.length) {
          setResponse({
            img: 'bgError',
            estado: 'Proceso Fallido',
            comentario:
              'No se ha realizado la carga de tus productos. Puedes revisar los SKU y volver a cargar el archivo. ',
            procesado: created.length,
            fallidos: errors.length,
            objeto: dataTable,
          });
        }
        setShow(false);
        setModalTicket(true);
        handleClickOrderDeatil();
        handleClear();
      })
      .catch(() => {
        setTimeout(() => {
          setErrorFull(true);
        }, 100);
      });
  };

  const OnChangeCsvFile = (productsCsv) => {
    if (productsCsv.length > 0) {
      setBtnDisabled(false);
      setProducts(productsCsv);
    } else {
      setBtnDisabled(true);
      setProducts([]);
    }
  };

  const handleSearch = () => {
    const { sku } = form;

    if (!sku || (sku && !sku.trim().length)) {
      setDisabled(true);
      return;
    }

    setFetchingSku(true);

    clientFetch('inventory/v1/services/getSKU', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      body: {
        warehouse: 'bx1',
        sku,
        account_id: accountId,
        key,
      },
    })
      .then((res) => {
        if (res && !res.flag) {
          setDisabled(false);
        } else {
          setDisabled(true);
          setError({ sku: true });
        }
        setFetchingSku(false);
      })
      .catch(() => {
        setDisabled(true);
        setFetchingSku(false);
      });
  };

  useEffect(() => {
    handleSearch();
  }, [formSkuValue]);

  if (!show) {
    component = (
      <MessageResponseProducts
        procesado={response.procesado}
        fallidos={response.fallidos}
        agregados={response.procesado}
        estado={response.estado}
        comentario={response.comentario}
        img={response.img}
        dataTable={response.objeto}
      />
    );
  }

  return (
    <>
      <PageLayout title="Nuevos Productos">
        <PageTitle title="Nuevos Productos" />
        {show ? (
          <div className="row mt-4">
            <div className="col-12 col-md-6 mb-4">
              <Card className={cs(styles.fullHeight, 'px-5 py-5')}>
                <div className="row">
                  <div className="col-12">
                    <h1
                      className={cs(
                        styles.h1,
                        'mb-4 d-flex align-items-center',
                      )}
                    >
                      Agregar SKU
                      {' '}
                      <Tooltip
                        position="right"
                        text="Ingresa todos los datos solicitados para crear un nuevo SKU"
                      >
                        <img src={info} alt="Info" width="18" />
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
                        <Spinner width={30} height={30} />
                      </span>
                    )}
                    {error.sku && (
                      <span className="text-danger mt-2">
                        SKU ya existe, ingresa un código valido
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
                      disabled={disabled}
                    />
                    {error.descripcion && (
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
                      disabled={disabled}
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
                      disabled={disabled}
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
                      disabled={disabled}
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
                      disabled={disabled}
                      autoComplete="off"
                      min={0}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 d-flex justify-content-end mt-5">
                    <Button
                      className={cs(
                        'btn',
                        styles.btnOrange,
                        'btn-complementary mx-2',
                      )}
                      text="Borrar"
                      onClick={handleClear}
                    />
                    <Button
                      className={cs('btn btn-secondary', styles.btnWhite)}
                      text="Agregar"
                      onClick={handleSubmit}
                    />
                  </div>
                </div>
              </Card>
            </div>
            <div className="col-12 col-md-6 mb-4">
              <Card
                className={cs(styles.fullHeight, styles.relative, 'px-5 py-5')}
              >
                <div className="row justify-content-center">
                  <div className="col-12">
                    <h1
                      className={cs(
                        styles.h1,
                        'mb-4 d-flex align-items-center',
                      )}
                    >
                      Importar SKU
                      {' '}
                      <Tooltip
                        position="right"
                        text="Descarga la plantilla y completa los campos solicitados para crear nuevos SKU de forma masiva "
                      >
                        <img src={info} alt="Info" width="18" />
                      </Tooltip>
                    </h1>
                  </div>
                  <div className="col-12 mb-5">
                    {errorFull && (
                      <div
                        className="alert alert-warning alert-dismissible fade show"
                        role="alert"
                        style={{
                          background: '#FFE9E9',
                          border: '1px solid #FD2626',
                          color: '#FD2626',
                        }}
                      >
                        <span className="text-danger font-weight-bold">
                          <p
                            className="font-weight-bold p-0 m-0 text-center"
                            style={{ fontWeight: 'bold', fontSize: '15px' }}
                          >
                            Algo salió mal, verifica el formato de tu archivo
                          </p>
                        </span>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="alert"
                          aria-label="Close"
                          onClick={() => setErrorFull(false)}
                        />
                      </div>
                    )}
                  </div>
                  <div className="col-12 d-flex justify-content-center mb-4">
                    <h2 className={styles.SubTitleMasivo}>Carga masiva SKU</h2>
                  </div>
                  <div className="col-10 d-flex justify-content-center mb-4">
                    <UploadCsvFull
                      size="medium"
                      setDataToValidate={setDataToValidate}
                      setDataWhitErrors={setDataWhitErrors}
                      onChange={OnChangeCsvFile}
                    />
                    {dataWhitErrors.length > 0 && (
                      <p className="text-danger">
                        Archivo contiene campos vacíos, verifica los datos y
                        carga nuevamente
                        {' '}
                      </p>
                    )}
                  </div>
                  <div className="col-12 mb-4">
                    <a
                      href={plantilla}
                      className={`btn btn-complementary ${styles.btndownload}`}
                      download="plantilla-creacion-sku"
                    >
                      <img src={loadArrowOrange} alt="Download" width="16" />
                      <span className="ps-2"> Descarga plantilla</span>
                    </a>
                  </div>
                  <div
                    className={cs(
                      styles.contentButton,
                      'col-12 d-flex justify-content-end mt-5',
                    )}
                  >
                    <button
                      type="button"
                      className={cs('btn btn-secondary', styles.btnWhite)}
                      onClick={handleAllSubmit}
                      disabled={btnDisabled}
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          component
        )}

        <Modal showModal={modal} size="xl">
          <SkuDetail
            onClick={(e) => {
              e.preventDefault();
              setModal(false);
            }}
          />
        </Modal>
      </PageLayout>
    </>
  );
};

export default CreateSku;
