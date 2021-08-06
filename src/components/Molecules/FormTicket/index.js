import { useState, useEffect } from 'react';
import clientFetch from 'lib/client-fetch';
import DropZone from 'components/Molecules/DropZone';
import Button from 'components/Atoms/Button';

const FormTicket = ({ setModalTicket }) => {
  const [form, setForm] = useState([]);
  // const [options, setOptions] = useState([]):
  const OPTIONS = [
    'Producto Erróneo',
    'Producto Faltante',
    'Detalle de envío',
    'Despacho retrasado',
    'Cambio de dirección',
  ];
  const DATE = new Date();
  const handleSubmit = () => {
    console.log('submit');
    setForm([...form]);
  };
  useEffect(() => {
    clientFetch('ticket/v1/motivo/getAll', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
    })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
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
            <select className="form-select" id="selectBugType" style={{ borderRadius: 16, border: '1px solid #1A6F99', minHeight: 40 }}>
              <option selected>Selecciona la opción del motivo</option>
              {OPTIONS.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-group mb-5">
          <label htmlFor="textArea" className="w-100">
            Descripción del ticket
            <span className="text-danger"> *</span>
            <textarea className="form-control" rows="4" id="textArea" placeholder="Escribe el detalle del ticket" />
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
              />
            </li>
          </ul>
        </div>
      </form>
    </>
  );
};

export default FormTicket;
