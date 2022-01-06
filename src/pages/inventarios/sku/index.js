import React, { useEffect, useState } from 'react';
import clientFetch from 'lib/client-fetch';
import { useAuth } from 'context/userContex';
import PageLayout from 'components/Templates/PageLayout';
import PageTitle from 'components/Atoms/PageTitle';
import TooltipIcon from 'components/Atoms/TooltipIcon';
import info from 'assets/brand/info-ico.svg';
import SkuDetail from 'components/Molecules/SkuDetail';
// import plantilla from 'assets/plantilla.csv';
import Modal from 'components/Templates/Modal';
// import loadArrowOrange from 'assets/brand/loadarrowOrange.svg';
// import DropZone from 'components/Molecules/DropZone';
import Button from 'components/Atoms/Button';
import styles from './styles.module.scss';

const Sku = () => {
  const { user } = useAuth();
  const [setModalTicket] = useState(false);
  const [dataWhitErrors, setDataWhitErrors] = useState([]);
  const [modal, setModal] = useState(false);
  // const [setSelectedFiles] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const userData = JSON.parse(user);
  const { accountId, key } = userData.credential;
  const [form, setForm] = useState({});
  const [error, setError] = useState({
    sku: false,
    descripcion: false,
  });
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
  useEffect(() => {
  }, []);
  const infoAdd = <TooltipIcon icon={<img src={info} alt="Info" width="18" />} text="Ingresa todos los datos solicitados para crear un nuevo SKU" color="#BFEAFF" />;
  const handleClear = () => {
    const keys = Object.keys(form);
    console.log(keys.reduce((acum, value) => ({
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
    const objeto = {
      sku: form.sku,
      description: form.descripcion,
      length: Number(form.largo),
      width: Number(form.ancho),
      height: Number(form.alto),
      weight: Number(form.peso),
      cost: 0,
      retail: 0,
    };
    const objeto1 = [''];
    objeto1.push(objeto);
    console.log(objeto1[1]);
    const { sku } = objeto;
    console.log(sku);
    if (sku.length === 0) {
      console.log('sin campos');
    } else {
      clientFetch('inventory/v1/services/addProducts', {
        headers: {
          apikey: process.env.REACT_APP_API_KEY_KONG,
        },
        body: {
          warehouse: 'bx1',
          account_id: accountId,
          key,
          products: [objeto],
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
        }); setDataWhitErrors([]);
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
        console.log(res);
        if (res && res.flag) {
          setDisabled(true);
          setError(true);
        } else {
          setDisabled(false);
        }
      })
      .catch((e) => {
        console.log(e);
        setDisabled(true);
      });
  };

  return (
    <PageLayout title="Nuevos Productos">
      <PageTitle title="Nuevos Productos" />

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
                        <div className="p-3 pt-0 pb-0">
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
                              // autoComplete="off"
                              />
                              {error.sku && (<span className="text-danger">Debes completar este campo para continuar</span>)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="p-3 pt-0 pb-0">
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
                        <div className="p-3 pt-0 pb-0">
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
                                name="largo"
                                value={form.largo}
                                onChange={handleChange}
                                disabled={disabled}
                                className={styles.input}
                                min={0}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="p-3 pt-0 pb-0">
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
                        <div className="p-3 pt-0 pb-0">
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
                              {dataWhitErrors.length > 0 && (
                                <p className="text-danger">Tu archivo tiene campos vacíos, llénalos para continuar...</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="p-3 pt-0 pb-0">
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
                                disabled={disabled}
                                className={styles.input}
                                autoComplete="off"
                                min={0}

                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row justify-content-end pt-4">
                        <div className="col-4">
                          <Button
                            className="btn btn-complementary fs-5 px-5"
                            text="Borrar"
                            onClick={handleClear}
                          />
                        </div>
                        <div className="col-4">
                          <Button
                            className={`btn btn-secondary ${disabled ? 'disabled' : ''} fs-5 px-5`}
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
        {/* <div className={styles.col2}>
          <div className="d-flex bd-highlight mb-3">
            <div className="p-2 bd-highlight">
              <PageTitle
                title="Importar SKU"
                className={`${styles.h1} mb-3`}
                icon={infoImport}
              />
              <div className="row g-0">
                <div className="container">
                  <div className={`${styles.h} row g-2`}>
                    <div className="col-12">
                      <div className="p-3 pt-0 pb-0">
                        <div className="col-12">
                          <div className="pt-4 pb-4">
                            <h2>Carga el archivo de los sku</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="p-3 pt-0 pb-0">
                        <div className="col-12">
                          <DropZone
                            setSelectedFiles={setSelectedFiles}
                            size="medium"
                            internalTitle="Arrastra tu archivo o selecciona
                             desde tu computadora en formato Csv y Excel"
                            noValidation
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="p-3 pt-0 pb-0">
                        <div className="col-12">
                          <a href={plantilla} className="btn btn-complementary w-26 me-3" download>
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
                    <div className="row justify-content-end pt-4">
                      <div className="col-4">
                        { }
                      </div>
                      <div className="col-4">
                        <Button
                          className="btn btn-secondary fs-5 px-5 me-0"
                          text="Agregar"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
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
  );
};

export default Sku;
