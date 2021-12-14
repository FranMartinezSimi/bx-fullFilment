import { useState, forwardRef, useEffect } from 'react';
import { useAuth } from 'context/userContex';
import { useHistory } from 'react-router-dom';
import clientFetch from 'lib/client-fetch';
import DropZone from 'components/Molecules/DropZone';
import Button from 'components/Atoms/Button';
import DatePicker from 'react-datepicker';
import UploadCsv from 'components/Molecules/UploadCsv';
import plantilla from 'assets/plantilla.csv';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import loadArrowOrange from 'assets/brand/loadarrowOrange.svg';
import styles from './styles.scss';

const FormReplenishment = ({ setModalTicket }) => {
  const history = useHistory();
  const { user } = useAuth();
  const userData = JSON.parse(user);
  const userActive = userData.credential.accountId;
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dataToValidate, setDataToValidate] = useState([]);
  const [dataWhitErrors, setDataWhitErrors] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [ticketCreated, setTicketCreated] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [sellerData, setSellerData] = useState({
    emailContact: '',
    nameContact: '',
    nameSeller: '',
    phoneContact: '',
  });
  const [error, setError] = useState({
    contactEmail: false,
  });
  const [form, setForm] = useState({
    schedule: startDate,
    accountId: userActive,
    data: {
      expected_delivery_date: startDate,
      warehouse: 'bx1',
      key: userData.credential.key,
      supplier_name: '',
      items: [],
    },
  });

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      type="button"
      style={{ borderRadius: 16, border: '1px solid #1A6F99', minHeight: 40 }}
      className="form-control text-start "
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ));

  const handleClick = (e) => {
    e.preventDefault();
    setFetchError(false);
    setTicketCreated(false);
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    setForm({
      ...form,
      schedule: date,
      data: {
        ...form.data,
        expected_delivery_date: date,
      },
    });
  };

  const validateData = () => {
    setBtnDisabled(true);

    let itemsWhitErrors = [];
    let count = 0;

    const DATA_TO_VALIDATE = dataToValidate.map((item, key) => {
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
            key,
            errors,
          },
        ];
      } else {
        itemsWhitErrors = [
          ...itemsWhitErrors,
          {
            ...item,
            key,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.data.supplier_name === '') {
      setError((state) => ({
        ...state,
        contactEmail: true,
      }));
    }

    if (form.data?.supplier_name.length < 1) {
      return;
    }

    setBtnDisabled(true);

    const formdata = new FormData();
    formdata.append('archivo', selectedFiles[0]);
    formdata.append('schedule', form.schedule);
    formdata.append('receptionDate', form.receptionDate);
    formdata.append('accountId', form.accountId);
    formdata.append('data', JSON.stringify(form.data));

    setBtnDisabled(true);
    clientFetch('bff/v1/replenishment/addReplenishment', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      body: formdata,
    }, { withFile: true })
      .then(() => {
        setTicketCreated(true);
        setLoading(false);
        setBtnDisabled(true);
      })
      .catch((err) => {
        console.log('err', err);
        setFetchError(true);
        setLoading(false);
        setBtnDisabled(true);
      });
  };

  useEffect(() => {
    clientFetch('bff/v1/contact/findContact', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      body: {
        accountId: userActive,
      },
    }).then((data) => {
      setSellerData(data);
      setForm({
        ...form,
        data: {
          ...form.data,
          supplier_name: data.nameSeller,
        },
      });
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    validateData();
  }, [dataToValidate]);
  return (
    <>
      {fetchError && (
        <ul className="text-center mb-5">
          <li>
            <img src="/bgerrors.png" alt="Proceso incompleto" width="150" />
          </li>
          <li className="py-4" style={{ fontSize: 16 }}>
            ¡Se ha producido un error
            <br />
            por favor, vuelve a intentarlo!
          </li>
          <li>
            <Button
              className="btn btn-secondary fs-5 px-5"
              text="Aceptar"
              onClick={handleClick}
            />
          </li>
        </ul>
      )}
      {ticketCreated && (
        <ul className="text-center mb-5">
          <li>
            <img src="/bgsuccess.jpg" alt="Proceso completado" width="150" />
          </li>
          <li className="py-4" style={{ fontSize: 16 }}>
            ¡Tu programación se esta procesando!
            <br />
            Puedes visualizar en el
            {' '}
            <a href="#!" onClick={(e) => { e.preventDefault(); history.push('/reposiciones'); }}>
              Listado de Reposición.
            </a>
          </li>
          <li>
            <Button
              className="btn btn-secondary fs-5 px-5"
              text="Aceptar"
              onClick={() => setModalTicket(false)}
            />
          </li>
        </ul>
      )}
      {
        !fetchError && !ticketCreated && (
          <>
            <h6
              className="display-font text-center font-bold mb-0"
              style={{
                fontSize: 22,
                fontFamily: 'mont',
                color: '#212121',
              }}
            >
              Reposición de inventario
            </h6>
            <div className="p-5 pt-0 pb-0">
              <form onSubmit={handleSubmit} className="container-fluid m-0 p-5 ">
                <div className="row">
                  <div className="col-sm-12 p-0">
                    <h3
                      className={`${styles.h2From}`}
                    >
                      Datos de Contacto
                    </h3>
                    <div className="row mb-3">
                      <hr className="mx-0 " />
                      <div className="col-6 col-sm-6 m-0 pe-5">
                        <div className="py-1 ">
                          <div className="form-group">
                            <label htmlFor="sellerName" className="w-100">
                              <p className="mb-2">
                                Nombre Seller
                              </p>
                              <input
                                type="text"
                                className="form-control disabled"
                                placeholder="Contacto"
                                name="sellerName"
                                id="sellerName"
                                style={{
                                  borderRadius: 16,
                                  border: '1px solid #1A6F99',
                                  minHeight: 40,
                                  backgroundColor: '#FFF',
                                }}
                                disabled
                                value={sellerData.nameSeller}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-6 col-sm-6 m-0 ps-5">
                        <div className="py-1 ">
                          <div className="form-group">
                            <label htmlFor="contactName" className="w-100">
                              <p className="mb-2">
                                Nombre de contacto
                              </p>
                              <input
                                type="text"
                                className="form-control disabled"
                                placeholder="Carlos Brante"
                                name="contactName"
                                id="contactName"
                                style={{
                                  borderRadius: 16,
                                  border: '1px solid #1A6F99',
                                  minHeight: 40,
                                  backgroundColor: '#FFF',
                                }}
                                disabled
                                value={sellerData.nameContact}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-8 col-sm-6 m-0 pe-5">
                        <div className="py-1 my-4 ">
                          <div className="form-group">
                            <label htmlFor="contactPhone" className="w-100">
                              <p className="mb-2">
                                Teléfono de contacto
                                <span className="text-danger"> *</span>
                              </p>
                              <input
                                type="text"
                                className="form-control disabled"
                                placeholder="+56 9 4270092"
                                name="contactPhone"
                                style={{
                                  borderRadius: 16,
                                  border: '1px solid #1A6F99',
                                  minHeight: 40,
                                  backgroundColor: '#FFF',
                                }}
                                disabled
                                value={sellerData.phoneContact}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-4 col-sm-6 m-0 ps-5">
                        <div className="py-1 my-4 ">
                          <div className="form-group">
                            <label htmlFor="contactEmail" className="w-100">
                              <p className="mb-2">
                                Correo de contacto
                                <span className="text-danger"> *</span>
                              </p>
                              <input
                                type="text"
                                className="form-control disabled"
                                placeholder="Nombre del Seller"
                                name="contactEmail"
                                style={{
                                  borderRadius: 16,
                                  border: '1px solid #1A6F99',
                                  minHeight: 40,
                                  backgroundColor: '#FFF',
                                }}
                                disabled
                                value={sellerData.emailContact}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 p-0 mb-3 mt-2">
                    <h3
                      className={`${styles.h2From}`}
                    >
                      Programa la reposición de tu inventario
                    </h3>
                    <div className="row mb-2">
                      <hr className="mx-0" />
                      <div className="col-8 col-sm-6 m-0 pe-5">
                        <div className="py-1 ">
                          <div className="form-group">

                            <p className="mb-2">
                              Fecha de inicio
                            </p>
                            <DatePicker
                              dateFormat="dd/MM/yyyy h:mm aa"
                              showTimeSelect
                              selected={startDate}
                              onChange={(date) => handleDateChange(date)}
                              // timeClassName={handleColor}
                              customInput={<CustomInput />}
                              minDate={Date.now()}
                              filterDate={isWeekday}
                              // filterTime={filterPassedTime}
                              // locale="es-ES"
                              timeIntervals={30}
                              minTime={setHours(setMinutes(new Date(), 30), 8)}
                              maxTime={setHours(setMinutes(new Date(), 30), 16)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-4 col-sm-6 m-0 ps-5">
                        <div className="py-1 ">
                          <div className="form-group">
                            <p className="mb-2">
                              Hora de tu Programación *
                            </p>
                            <DatePicker
                              dateFormat="h:mm aa"
                              showTimeSelect
                              selected={startDate}
                              onChange={(date) => handleDateChange(date)}
                              // timeClassName={handleColor}
                              customInput={<CustomInput />}
                              minDate={Date.now()}
                              filterDate={isWeekday}
                              // filterTime={filterPassedTime}
                              // locale="es-ES"
                              timeIntervals={30}
                              minTime={setHours(setMinutes(new Date(), 30), 8)}
                              maxTime={setHours(setMinutes(new Date(), 30), 16)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-12 p-0">
                    <h3
                      className={`${styles.h2From}  pt-4`}
                    >
                      Carga tus archivos
                    </h3>
                    <div className="row ">
                      <hr className="mx-" />
                      <div className="col-8 col-sm-6 m-0 pe-5 pt-2">
                        <div className="py-1 ">
                          <div className="form-group">
                            <p className="w-20">
                              Facturas y/o Guía de despacho
                            </p>
                            <DropZone
                              setSelectedFiles={setSelectedFiles}
                              size="small"
                              internalTitle="Arrastra tu archivo o selecciona desde tu computadora en formato jpg - png o pdf"
                              noValidation
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-4 col-sm-6 m-0 ps-5 pt-2">
                        <div className="py-1 ">
                          <div className="form-group">
                            <p className="w-20">
                              Planilla de Reposición
                            </p>
                            <UploadCsv
                              size="small"
                              setDataToValidate={setDataToValidate}
                              setDataWhitErrors={setDataWhitErrors}
                            />
                            {dataWhitErrors.length > 0 && (
                              <p className="text-danger">Tu archivo tiene campos vacíos, llénalos para continuar...</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-0">
                      <div className="col-8 col-sm-6">
                        <div className="py-0 ">
                          <div className="form-group">
                            <div className="p-0 ">
                              <div className="d-grid gap-2 d-md-flex justify-content-md-start">

                                <p className="text-center mt-2">
                                  <small>
                                    ( * ) Campo obligatorio
                                  </small>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-4 col-sm-6">
                        <div className="py-1 ">
                          <div className="form-group">
                            <div className="p-0 ">
                              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <div className="py-3">
                                  <a href={plantilla} className="btn btn-complementary me-3" download>
                                    <img src={loadArrowOrange} alt="Download" width="16" />
                                    <span className="ps-2"> Descarga plantilla de Resposición</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-0">
                      {error.contactEmail && (<span className="text-danger">No existen datos, por favor contáctanos</span>)}
                      <div className="col-8 col-sm-6">
                        <div className="py-1 ">
                          <div className="form-group">
                            <div className="p-3 ">
                              <p className="text-center mt-2">
                                <label className="form-check-label d-none" htmlFor="flexCheckDefault">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="flexCheckDefault"
                                    name="flexCheckDefault"
                                  />
                                  <span className="ps-3">
                                    Acepta los
                                    <a href="!#"> términos y condiciones </a>
                                    de recepción
                                  </span>
                                </label>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {error.contactEmail && (<span className="text-danger">No existen datos, por favor contáctanos</span>)}
                <div className="col-12 text-center p-0">
                  <ul className="d-flex align-items-center justify-content-between">
                    <li className="me-5">
                      <label className="form-check-label d-none" htmlFor="flexCheckDefault">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckDefault"
                          name="flexCheckDefault"
                        />
                        <span className="ps-3">
                          Acepta los
                          <a href="!#"> términos y condiciones </a>
                          de recepción
                        </span>
                      </label>
                    </li>
                    <li className="ms-5">
                      <div className="p-0 bd-highlight d-flex justify-content-end">
                        <Button
                          className={`btn btn-secondary ${btnDisabled ? 'disabled' : ''} fs-5 px-5`}
                          text="Programar"
                          submit
                          loading={loading}
                          disabled={btnDisabled}
                        />
                      </div>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
          </>
        )
      }
    </>
  );
};

export default FormReplenishment;
