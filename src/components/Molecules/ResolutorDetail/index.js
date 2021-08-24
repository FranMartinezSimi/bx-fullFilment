import { useState, useEffect } from 'react';
import clientFetch from 'lib/client-fetch';

import DropZone from 'components/Molecules/DropZone';
import dropZoneDownload from 'assets/brand/dropZoneDownload.svg';
import Button from 'components/Atoms/Button';
import Modal from 'components/Templates/Modal';
import styles from './styles.module.scss';

const list = ['Abierto', 'En Proceso', 'Cerrado'];

const ResolutorDetail = ({ detailData }) => {
  const [loading, setLoading] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [modalTicket, setModalTicket] = useState(false);
  const [form, setForm] = useState(null);
  const [error, setError] = useState({
    comentario: false,
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === 'comentario') {
      setError((oldState) => ({
        ...oldState,
        [e.target.name]: false,
      }));
    }
  };
  const handleDropDown = (e) => {
    e.preventDefault();
    console.log('funca', e);
    setDropDown(!dropDown);
  };
  const handleChangeTicketState = (e, item) => {
    e.preventDefault();
    console.log('funca', item);
    setForm((statusState) => ({
      ...statusState,
      status: item,
    }));
  };
  const handleClickConfirm = (e) => {
    e.preventDefault();
    if (form.comentario === '') {
      setError((state) => ({
        ...state,
        comentario: true,
      }));
    }

    if (form.comentario?.trim().length < 1) {
      return;
    }
    setModalTicket(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    clientFetch('ticket/v1/ticketera/updateTicket', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      body: form,
    })
      .then((data) => {
        console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    setForm({
      _id: detailData._id,
      motivo: detailData.motivo,
      descTicket: detailData.descTicket,
      clienteID: detailData.clienteID,
      archivo: detailData.archivo,
      orderId: detailData.orderId,
      status: detailData.status,
      fechaCreacion: detailData.fechaCreacion,
      comentario: detailData.comentario,
    });
  }, [detailData]);
  return (
    <>
      {form !== null ? (
        <>
          <ul className="d-flex justify-content-between">
            <li>
              <h2>{form.motivo}</h2>
              <p>
                <img src="/user.png" alt="" />
                <span>
                  Creado por cliente id:
                  {' '}
                </span>
                <span>{form.clienteID}</span>
              </p>
            </li>
            {form.status !== undefined && (
              <li className="position-relative">
                <a href="#!" onClick={handleDropDown}>
                  <small className={`badge--${form.status.replace(' ', '').toLowerCase()} px-4 py-1`}>
                    { form.status }
                  </small>
                </a>
                <ul
                  className={`${dropDown ? '' : 'd-none'} bg-white shadow position-absolute p-4`}
                  style={{ top: 25, borderRadius: 15, width: 110 }}
                  onBlur={() => setDropDown(false)}
                >
                  {list && list.map((item) => (
                    <li key={item} className="text-center">
                      <a className="py-2 d-block" href="#!" onClick={(e) => { handleChangeTicketState(e, item); setDropDown(false); }}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
          <p className="py-4">
            {form.descTicket}
          </p>
          {form.archivo !== undefined && form.archivo.length > 0 && (
          <ul>
            <li>
              <p className="fs-5 mb-4">Archivos Adjuntos</p>
              <ul>
                {form.archivo.map((file) => (
                  <li key={file.path} className={styles.fileItem}>
                    <a href="!#">
                      <ul className="d-flex justify-content-between align-items-center">
                        <li>
                          {`${file.path} `}
                          <span className={styles.fileSize}>{`${file.size} KB`}</span>
                        </li>
                        <li>
                          <button className={styles.closeButton} type="button">
                            <img src={dropZoneDownload} alt="Descargar" />
                          </button>
                        </li>
                      </ul>
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          )}
          <form className="py-5">
            <div className="form-group mb-5">
              <label htmlFor="textArea" className="w-100">
                Comentario
                <span className="text-danger"> *</span>
                <textarea
                  className="form-control"
                  rows="4"
                  id="textArea"
                  placeholder="Agrega un comentario"
                  name="comentario"
                  onChange={handleChange}
                />
                {error.comentario && (<span className="text-danger">Debes completar este campo para continuar</span>)}
              </label>
            </div>
            <div className="form-group mb-5 d-none">
              <DropZone
                boxText="Arrastra tu archivo o selecciona desde tu computadora"
                title="Carga tu archivo"
                subTitle="Adjunta la evidencia, puede ser en formato jpg o png (opcional)"
              />
            </div>
            <div className="text-end">
              <Button
                className="btn btn-secondary fs-5 px-5"
                text="Enviar"
                submit
                onClick={handleClickConfirm}
              />
            </div>
          </form>
          <Modal showModal={modalTicket} size="lg" onClick={(e) => { e.preventDefault(); setModalTicket(false); }}>
            <div className="px-4 text-center">
              <img src="/errorgloboalert.png" alt="aleta" />
              <h4 style={{ fontSize: 22 }} className="display-font py-4">Confirmación</h4>
              <p style={{ fontSize: 16 }} className="py-4">
                Si envias el comentario a cliente, automaticamente el ticket
                <br />
                cambiara de estado ha resuelto, dando por finalizado el ticket.
                <br />
                ¿Estas seguro que quieres enviar el comentario?
              </p>
              <Button
                className="btn btn-complementary fs-5 px-5 mb-5 me-4"
                text="No"
                onClick={(e) => { e.preventDefault(); setModalTicket(false); }}
              />
              <Button
                className="btn btn-secondary fs-5 px-5 mb-5"
                text="Si"
                loading={loading}
                onClick={handleSubmit}
              />
            </div>
          </Modal>
        </>
      ) : (
        <p>funca</p>
      )}
    </>
  );
};

export default ResolutorDetail;
