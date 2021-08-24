import { useState, useEffect } from 'react';
import { useAuth } from 'context/userContex';
import clientFetch from 'lib/client-fetch';
import DropZone from 'components/Molecules/DropZone';
import Button from 'components/Atoms/Button';
import { useHistory } from 'react-router-dom';

const FormTicket = ({
  orderId,
  setModalTicket,
  getData,
}) => {
  const { user } = useAuth();
  const history = useHistory();
  const userData = JSON.parse(user);
  const userActive = userData.credential.accountId;
  const [form, setForm] = useState({
    motivo: '',
    descTicket: '',
    clienteID: userActive,
    archivo: [],
    orderId,
  });
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [ticketCreated, setTicketCreated] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');
  const [error, setError] = useState({
    motivo: false,
    descTicket: false,
  });
  const DATE = new Date();

  const handleClick = (e) => {
    e.preventDefault();
    history.push('/incidencias');
  };

  const reset = () => {
    getData();
    setTicketCreated(false);
    setModalTicket(false);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === 'motivo' || e.target.name === 'descTicket') {
      setError((state) => ({
        ...state,
        [e.target.name]: false,
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.motivo === '') {
      setError((state) => ({
        ...state,
        motivo: true,
      }));
    }

    if (form.descTicket === '') {
      setError((state) => ({
        ...state,
        descTicket: true,
      }));
    }

    if (form.motivo?.trim().length < 1 || form.descTicket?.trim().length < 1) {
      return;
    }
    setLoading(true);
    clientFetch('ticket/v1/ticketera/addTicket', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      body: form,
    })
      .then((data) => {
        console.log(data);
        setTicketNumber(data._id);
        setTicketCreated(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setFetchError(true);
        setLoading(false);
      });
  };
  useEffect(() => {
    clientFetch('ticket/v1/motivo/getAll', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
    })
      .then((data) => {
        setOptions(data);
      })
      .catch(() => {
        setOptions([{
          motivo: 'No pudimos cargar los motivos, intentalo más tarde',
        }]);
      });
  }, []);
  return (
    <>
      {fetchError && (
        <ul className="text-center mb-5">
          <li>
            <img src="/bgerrors.png" alt="Proceso incompleto" width="150" />
          </li>
          <li className="py-4" style={{ fontSize: 16 }}>
            <p>
              ¡Se ha producido un error de comunicación con los
              <br />
              servidores, vuelve a intentarlo!
            </p>
          </li>
          <li>
            <Button
              className="btn btn-secondary fs-5 px-5"
              text="Aceptar"
              onClick={reset}
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
            {`¡Tu ticket ${ticketNumber} ha sido creado con exito!`}
            <br />
            Revísa el detalle en la
            {' '}
            <a href="!#" onClick={handleClick}>
              <u style={{ color: '#6DCFFF' }}>lista de tickets.</u>
            </a>
          </li>
          <li>
            <Button
              className="btn btn-secondary fs-5 px-5"
              text="Aceptar"
              onClick={reset}
            />
          </li>
        </ul>
      )}
      {
        !fetchError && !ticketCreated && (
          <>
            <h6 className="display-font text-center font-bold" style={{ fontSize: 22 }}>Crear ticket</h6>
            <p className="text-center">
              {`Fecha: ${DATE.getDate()}/${DATE.getMonth()}/${DATE.getFullYear()}`}
            </p>
            <form onSubmit={handleSubmit} className="px-md-5 mx-lg-2">
              <div className="form-group mb-5">
                <label className="form-label w-100" htmlFor="selectBugType" style={{ fontSize: 14 }}>
                  Motivo
                  <span className="text-danger"> *</span>
                  <select
                    className="form-select"
                    id="selectBugType"
                    style={{ borderRadius: 16, border: '1px solid #1A6F99', minHeight: 40 }}
                    onChange={handleChange}
                    name="motivo"
                  >
                    <option value="">Selecciona la opción del motivo</option>
                    {options.map((item) => (
                      <option value={item.motivo} key={item._id}>{item.motivo}</option>
                    ))}
                  </select>
                </label>
                {error.motivo && (<span className="text-danger">Debes seleccionar un motivo para continuar</span>)}
              </div>
              <div className="form-group mb-5">
                <label htmlFor="textArea" className="w-100">
                  Descripción del ticket
                  <span className="text-danger"> *</span>
                  <textarea
                    className="form-control"
                    rows="4"
                    id="textArea"
                    placeholder="Escribe el detalle del ticket"
                    name="descTicket"
                    onChange={handleChange}
                  />
                  {error.descTicket && (<span className="text-danger">Debes completar este campo para continuar</span>)}
                </label>
              </div>
              <div className="form-group mb-5">
                <DropZone
                  boxText="Arrastra tu archivo o selecciona desde tu computadora"
                  title="Carga tu archivo"
                  subTitle="Adjunta la evidencia, puede ser en formato jpg o png (opcional)"
                />
              </div>
              <div className="text-center">
                <p className="text-start">( * ) Campo obligatorio</p>
                <ul className="d-flex align-items-center justify-content-center">
                  <li className="me-5">
                    <Button
                      className="btn btn-complementary fs-5 px-5"
                      text="Cerrar"
                      onClick={() => setModalTicket(false)}
                    />
                  </li>
                  <li className="ms-5">
                    <Button
                      className="btn btn-secondary fs-5 px-5"
                      text="Crear"
                      submit
                      loading={loading}
                    />
                  </li>
                </ul>
              </div>
            </form>
          </>
        )
      }
    </>
  );
};

export default FormTicket;
