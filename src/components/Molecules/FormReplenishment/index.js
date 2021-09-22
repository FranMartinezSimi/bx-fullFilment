import { useState, forwardRef, useEffect } from 'react';
import { useAuth } from 'context/userContex';
import { useHistory } from 'react-router-dom';
import clientFetch from 'lib/client-fetch';
import DropZone from 'components/Molecules/DropZone';
import Button from 'components/Atoms/Button';
import DatePicker from 'react-datepicker';
import UploadCsv from 'components/Molecules/UploadCsv';

const FormReplenishment = () => {
  const history = useHistory();
  const { user } = useAuth();
  const userData = JSON.parse(user);
  const userActive = userData.credential.accountId;
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dataToValidate, setDataToValidate] = useState([]);
  const [dataWhitErrors, setDataWhitErrors] = useState([]);
  const [dataToUpload, setDataToUpload] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [ticketCreated, setTicketCreated] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
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

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
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

  const handleColor = (time) => (time.getHours() > 12 ? 'text-success' : 'text-error');

  const handleClick = (e) => {
    e.preventDefault();
    setFetchError(false);
    setTicketCreated(false);
  };

  const validateData = () => {
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
        cantida: item.CANTIDAD,
        descipción: item.DESCRIPCION,
      }));
      setDataWhitErrors([]);
      setDataToUpload(dataToSendFormat);
      setForm({
        ...form,
        data: {
          ...form.data,
          items: dataToSendFormat,
        },
      });
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
    setLoading(true);

    const formdata = new FormData();
    formdata.append('archivo', selectedFiles[0]);
    formdata.append('motivo', form.motivo);
    formdata.append('descTicket', form.descTicket);
    formdata.append('clienteID', form.clienteID);
    formdata.append('orderId', form.orderId);

    clientFetch('bff/v1/replenishment/addReplenishment', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      body: formdata,
    }, { withFile: true })
      .then((data) => {
        console.log(data);
        setTicketCreated(true);
        setLoading(false);
        setBtnDisabled(false);
      })
      .catch((err) => {
        console.log('err', err);
        setFetchError(true);
        setLoading(false);
        setBtnDisabled(false);
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
    console.log('dataToValidate', dataToValidate);
    console.log('dataWhitErrors', dataWhitErrors);
    console.log('dataToUpload', dataToUpload);
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
              onClick={handleClick}
            />
          </li>
        </ul>
      )}
      {
        !fetchError && !ticketCreated && (
          <>
            <h6 className="display-font text-center font-bold mb-5" style={{ fontSize: 22 }}>
              Programación de reposición
              <br />
              de productos
            </h6>
            <p className="px-md-5 display-font" style={{ fontSize: 15, fontWeight: 400 }}>Detalles de contacto</p>
            <div className="px-md-5 mx-lg-2">
              <form onSubmit={handleSubmit} className="row">
                <div className="col-md-6 card">
                  <div className="form-group mt-5 mb-4 px-5">
                    <label htmlFor="sellerName" className="w-100">
                      Nombre Seller
                      <span className="text-danger"> *</span>
                      <input
                        type="text"
                        className="form-control disabled"
                        placeholder="Contacto"
                        name="sellerName"
                        id="sellerName"
                        style={{ borderRadius: 16, border: '1px solid #1A6F99', minHeight: 40 }}
                        disabled
                        value={sellerData.nameSeller}
                      />
                    </label>
                  </div>
                  <div className="form-group my-3 px-5">
                    <label htmlFor="contactName" className="w-100">
                      Nombre de contacto
                      <span className="text-danger"> *</span>
                      <input
                        type="text"
                        className="form-control disabled"
                        placeholder="Carlos Brante"
                        name="contactName"
                        id="contactName"
                        style={{ borderRadius: 16, border: '1px solid #1A6F99', minHeight: 40 }}
                        disabled
                        value={sellerData.nameContact}
                      />
                    </label>
                  </div>
                  <div className="form-group my-3 px-5">
                    <label htmlFor="contactPhone" className="w-100">
                      Teléfono de contacto
                      <span className="text-danger"> *</span>
                      <input
                        type="text"
                        className="form-control disabled"
                        placeholder="+56 9 4270092"
                        name="contactPhone"
                        style={{ borderRadius: 16, border: '1px solid #1A6F99', minHeight: 40 }}
                        disabled
                        value={sellerData.phoneContact}
                      />
                    </label>
                  </div>
                  <div className="form-group mt-3 mb-5  px-5">
                    <label htmlFor="contactEmail" className="w-100">
                      Correo de contacto
                      <span className="text-danger"> *</span>
                      <input
                        type="text"
                        className="form-control disabled"
                        placeholder="Nombre del Seller"
                        name="contactEmail"
                        style={{ borderRadius: 16, border: '1px solid #1A6F99', minHeight: 40 }}
                        disabled
                        value={sellerData.emailContact}
                      />
                    </label>
                  </div>
                  {error.contactEmail && (<span className="text-danger">No existen datos, por favor contáctanos</span>)}
                </div>
                <div className="col-md-6">
                  <div className="form-group my-3 px-5">
                    <p className="mb-2">
                      Fecha de inicio
                    </p>
                    <DatePicker
                      showTimeSelect
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      timeClassName={handleColor}
                      customInput={<CustomInput />}
                      minDate={Date.now()}
                      filterDate={isWeekday}
                      filterTime={filterPassedTime}
                    />
                  </div>
                  <div className="form-group mb-3 mt-5 px-5">
                    <p className="my-2">
                      Adjunta tus facturas y/o Guía de despacho
                    </p>
                    <DropZone
                      setSelectedFiles={setSelectedFiles}
                      size="small"
                      boxText="Arrastra tu archivo o selecciona desde tu computadora"
                      internalTitle="Carga o arrastra archivos jpg - png o pdf"
                      noValidation
                    />
                  </div>
                  <p className="text-center my-4" style={{ fontSize: 14 }}>Descarga la plantilla y luego súbelo en formato .csv</p>
                  <div className="form-group my-3 px-5">
                    <p className="mb-2">
                      Planilla de Reposición
                    </p>
                    <UploadCsv
                      size="small"
                      title="Carga o arrastra el archivo .csv o .xlx"
                      setDataToValidate={setDataToValidate}
                      setDataToUpload={setDataToUpload}
                      setDataWhitErrors={setDataWhitErrors}
                    />
                  </div>
                </div>
                <div className="col-12 text-center">
                  <p className="text-center mt-5">
                    <small>
                      ( * ) Campo obligatorio
                    </small>
                  </p>
                  <ul className="d-flex align-items-center justify-content-between">
                    <li className="me-5">
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckDefault"
                          name="flexCheckDefault"
                          defaultChecked
                        />
                        <span className="ps-3">
                          Acepta los
                          <a href="!#"> términos y condiciones </a>
                          de recepción
                        </span>
                      </label>
                    </li>
                    <li className="ms-5">
                      <Button
                        className={`btn btn-secondary ${btnDisabled ? 'disabled' : ''} fs-5 px-5`}
                        text="Si, Crear"
                        submit
                        loading={loading}
                        disabled={btnDisabled}
                      />
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
