import React, { useEffect, useState } from 'react';
import clientFetch from 'lib/client-fetch';
import { useAuth } from 'context/userContex';
import PageLayout from 'components/Templates/PageLayout';
import PageTitle from 'components/Atoms/PageTitle';
import TooltipIcon from 'components/Atoms/TooltipIcon';
import info from 'assets/brand/info-ico.svg';
import SkuDetail from 'components/Molecules/SkuDetail';
import plantilla from 'assets/plantilla.csv';
import Modal from 'components/Templates/Modal';
import loadArrowOrange from 'assets/brand/loadarrowOrange.svg';
import UploadCsvFull from 'components/Molecules/UploadCsvFull';
import MessageResponseProducts from 'components/Molecules/MessageResponseProducts';
import Button from 'components/Atoms/Button';
import styles from './styles.module.scss';

const Sku = () => {
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
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === 'sku') {
      setError((state) => ({
        ...state,
        [e.target.name]: false,
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

  const infoAdd = <TooltipIcon icon={<img src={info} alt="Info" width="18" />} text="Ingresa todos los datos solicitados para crear un nuevo SKU" color="#BFEAFF" />;
  const infoImport = <TooltipIcon icon={<img src={info} alt="Info" width="18" />} text="Descarga la plantilla y completa los campos solicitados para crear nuevos SKU de forma masiva " color="#BFEAFF" />;
  const handleClear = () => {
    setError({ sku: false });
    const keys = Object.keys(form);
    (keys.reduce((acum, value) => ({
      ...acum,
      [value]: '',
    }), {}));
    setForm(keys.reduce((acum, value) => ({
      ...acum,
      [value]: '',
    }), {}));
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
      .catch((e) => {
        console.log(e);
        setError({ sku: true });
      }); setDataWhitErrors([]);
  };
  const handleAllSubmit = () => {
    setBtnDisabled(true);
    clientFetch('inventory/v1/services/addProducts', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      body: {
        warehouse: 'bx1',
        account_id: accountId,
        key,
        products,
      },
    })
      .then((res) => {
        const resp = Object.entries(['']);
        resp.push(res);
        const { created, errors } = resp[1].result;
        const dataTable = [...created];
        console.log('DATA TABLE', dataTable);
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
            comentario: 'Se ha realizado una carga parcial de tus productos. Puedes revisar los SKU cargados exitosamente y volver a cargar los fallidos.',
            procesado: created.length,
            fallidos: errors.length,
            objeto: dataTable,

          });
        } else if (created.length === errors.length) {
          setResponse({
            img: 'bgError',
            estado: 'Proceso Fallido',
            comentario: 'No se ha realizado la carga de tus productos. Puedes revisar los SKU y volver a cargar el archivo. ',
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
      .catch((e) => {
        console.log(e);
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
    const objeto = {
      sku: form.sku,
    };
    const { sku } = objeto;
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
      })
      .catch(() => {
        setDisabled(true);
      });
  };
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
          <div id="container">
            <div className={styles.col1}>
              <div className="d-flex bd-highlight mb-3">
                <div className="p-2 bd-highlight">
                  <PageTitle
                    title="Agregar Sku"
                    className={`${styles.h1} mb-3`}
                    icon={infoAdd}
                  />
                  <div className="row g-0">
                    <div className="container">
                      <form onSubmit={handleSubmit} className="App">
                        <div className="row g-2">
                          <div className="col-12">
                            <div className="p-3 pt-0 pb-0 px-0">
                              <div className="col-12">
                                <div className="">
                                  <p
                                    className="mb-1 ms-1"
                                  >
                                    SKU
                                  </p>
                                  <input
                                    className={styles.input}
                                    placeholder="Codigo SKU"
                                    name="sku"
                                    value={form.sku}
                                    onChange={handleChange}
                                    onKeyUp={(event) => handleSearch(event)}
                                    autoComplete="off"
                                  />
                                  {error.sku && (<span className="text-danger">SKU ya existe, ingresa un código valido</span>)}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="p-3 pt-0 pb-0 px-0">
                              <div className="col-12">
                                <div className="">
                                  <p
                                    className="mb-1 ms-1"
                                  >
                                    Descripción
                                  </p>
                                  <input
                                    className={styles.input}
                                    placeholder="Ingresa la descripción del producto"
                                    name="descripcion"
                                    value={form.descripcion}
                                    onChange={handleChange}
                                    disabled={disabled}
                                    autoComplete="off"
                                  />
                                  {error.descripcion && (<span className="text-danger">Debes completar este campo para continuar</span>)}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="p-3 pt-0 pb-0 px-0 me-3">
                              <div className="col-12">
                                <div className="">
                                  <p
                                    className="mb-1 ms-1"
                                  >
                                    Largo cm
                                  </p>
                                  <input
                                    type="number"
                                    placeholder="1"
                                    className={styles.input}
                                    name="largo"
                                    value={form.largo}
                                    onChange={handleChange}
                                    disabled={disabled}
                                    min={0}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="p-3 pt-0 pb-0 px-0 ms-3">
                              <div className="col-12">
                                <div className="">
                                  <p
                                    className="mb-1 ms-1"
                                  >
                                    Ancho cm
                                  </p>
                                  <input
                                    type="number"
                                    placeholder="1"
                                    name="ancho"
                                    value={form.ancho}
                                    className={styles.input}
                                    onChange={handleChange}
                                    disabled={disabled}
                                    autoComplete="off"
                                    min={0}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="p-3 pt-0 pb-0 px-0 me-3">
                              <div className="col-12">
                                <div className="">
                                  <p
                                    className="mb-1 ms-1"
                                  >
                                    Alto cm
                                  </p>
                                  <input
                                    type="number"
                                    placeholder="1"
                                    name="alto"
                                    value={form.alto}
                                    onChange={handleChange}
                                    disabled={disabled}
                                    className={styles.input}
                                    autoComplete="off"
                                    min={0}
                                  />

                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="p-3 pt-0 pb-0 px-0 ms-3">
                              <div className="col-12">
                                <div className="">
                                  <p
                                    className="mb-1 ms-1"
                                  >
                                    Peso Kg
                                  </p>
                                  <input
                                    type="number"
                                    placeholder="1"
                                    name="peso"
                                    value={form.peso}
                                    onChange={handleChange}
                                    className={styles.input}
                                    disabled={disabled}
                                    autoComplete="off"
                                    min={0}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className={`row justify-content-end ${styles.divBtn} p-0 m-0 `}>
                            <div className="col-4 p-0A">
                              <Button
                                className={` ${styles.btnOrange}  my-1 btn-complementary`}
                                text="Borrar"
                                onClick={handleClear}
                              />
                            </div>
                            <div className="col-4 p-0 m-1">
                              <Button
                                className={`${styles.btnWhite} px-0`}
                                text="Agregar"
                                onClick={handleSubmit}
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.col2}>
              <div className="d-flex bd-highlight mb-3">
                <div className="p-2 bd-highlight">
                  {!errorFull && (
                    <PageTitle
                      title="Importar SKU"
                      className={`${styles.titleAdd} mb-3`}
                      icon={infoImport}
                    />
                  )}
                  {errorFull && (
                    <div
                      className="alert alert-warning alert-dismissible fade show"
                      role="alert"
                      style={{ background: '#FFE9E9', borderColor: 'red', color: 'red' }}
                    >
                      <span className="text-danger font-weight-bold">
                        <p
                          className="font-weight-bold p-0 m-0 text-center"
                          style={{ fontWeight: 'bold', fontSize: '15px' }}
                        >
                          Algo salió mal, verifica el formato de tu archivo
                        </p>
                      </span>
                      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setErrorFull(false)} />
                    </div>
                  )}
                  <div className="row g-0">
                    <div className="container">
                      <form className="App">
                        <div className={`${styles.h} row g-2`}>
                          <div className="col-12">
                            <div className="p-3 pt-0 pb-0">
                              <div className="col-12">
                                <div className="pt-4 pb-4">
                                  <h2 className={styles.SubTitleMasivo}>Carga masiva SKU</h2>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="p-3 pt-0 pb-0">
                              <div className="col-12">
                                <UploadCsvFull
                                  size="medium"
                                  setDataToValidate={setDataToValidate}
                                  setDataWhitErrors={setDataWhitErrors}
                                  onChange={OnChangeCsvFile}
                                />
                                {dataWhitErrors.length > 0 && (
                                  <p className="text-danger">Archivo contiene campos vacíos, verifica los datos y carga nuevamente </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="p-3 pt-0 pb-0">
                              <div className="col-12">
                                <a href={plantilla} className={`btn btn-complementary ${styles.btndownload}`} download>
                                  <img src={loadArrowOrange} alt="Download" width="16" />
                                  <span className="ps-2"> Descarga plantilla</span>
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="p-3 pt-0 pb-0">
                              <div className="col-12">
                                { }
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="p-3 pt-0 pb-0">
                              <div className="col-12">
                                { }
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="p-3 pt-0 pb-0">
                              <div className="col-12">
                                { }
                              </div>
                            </div>
                          </div>
                          <div className={`row justify-content-end ${styles.divBtn}`}>
                            <div className="col-4">
                              { }
                            </div>
                            <div className="col-4 mb-3">
                              <Button
                                className={`btn ${styles.btnWhite} 
                                ${btnDisabled ? 'disabled' : ''
                                  } `}
                                text="Agregar"
                                onClick={handleAllSubmit}
                                disabled={btnDisabled}
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : component}

        <Modal
          showModal={modal}
          size="xl"
        >
          <SkuDetail onClick={(e) => {
            e.preventDefault();
            setModal(false);
          }}
          />
        </Modal>
      </PageLayout>
    </>
  );
};

export default Sku;
