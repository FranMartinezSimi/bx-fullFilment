import { useState, useEffect } from 'react';
import clientFetch from 'lib/client-fetch';

import avatar from 'assets/brand/avatar.svg';
import DropZone from 'components/Molecules/DropZone';
import dropZoneDownload from 'assets/brand/dropZoneDownload.svg';
import Button from 'components/Atoms/Button';
import Modal from 'components/Templates/Modal';

import styles from './styles.module.scss';

const ResolutorDetail = ({
  detailData, getData, setShowSlideNav, comment, setComment,
}) => {
  const [loading, setLoading] = useState(false);
  const [modalTicket, setModalTicket] = useState(false);
  const [responseError, setResponseError] = useState(false);
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
    setForm((statusState) => ({
      ...statusState,
      status: 'Cerrado',
    }));
    setModalTicket(true);
  };
  const handleClickRegret = (e) => {
    e.preventDefault();
    if (detailData.status === 'Abierto') {
      setForm((statusState) => ({
        ...statusState,
        status: 'Abierto',
      }));
    }
    setModalTicket(false);
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
      .then(() => {
        setLoading(false);
        setModalTicket(false);
        setShowSlideNav(false);
        getData();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setResponseError(true);
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
      fechaCierre: detailData.fechaCierre,
      comentario: detailData.comentario,
      numTicket: detailData.numTicket,
    });
  }, [detailData]);
  return (
    <>
      {form !== null ? (
        <>
          <ul>
            <li>
              <h2>{form.motivo}</h2>
              <h4 style={{ fontSize: 15 }}>
                <span>
                  Nº Ticket:
                  {' '}
                </span>
                <span>{form.numTicket}</span>
              </h4>
            </li>
            {form.status !== undefined && (
              <li className="position-relative">
                <div className="mt-3">
                  <small className={`badge--${form.status.replace(' ', '').toLowerCase()} px-4 py-2 fs-5`}>
                    { form.status }
                  </small>
                </div>
              </li>
            )}
            <li>
              <ul className="d-flex align-items-center mt-5">
                <li className="me-2">
                  <img src={avatar} alt="Cuenta" width="30" />
                </li>
                <li className="me-4">
                  <span>
                    Cliente Id:
                    {' '}
                    {form.clienteID}
                  </span>
                </li>
                <li>
                  <span>
                    <small>
                      <b>Fecha de creación: </b>
                      {form.fechaCreacion}
                    </small>
                  </span>
                </li>
              </ul>
            </li>
          </ul>
          <p className="py-4">
            {form.descTicket}
          </p>
          {form.archivo !== undefined && form.archivo.length > 0 && (
          <ul>
            <li>
              <p className="fs-5 mb-4 d-none">Archivos Adjuntos</p>
              <ul>
                {form.archivo.map((file) => (
                  <li key={file._id} className={styles.fileItem}>
                    <a href={file.uri} target="_blank" rel="noreferrer" download>
                      <ul className="d-flex justify-content-between align-items-center">
                        <li>
                          {`${file.name} `}
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
            <div className="form-group mb-2">
              {!comment ? (
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
                    value={form.comentario}
                  />
                  {error.comentario && (<span className="text-danger">Debes completar este campo para continuar</span>)}
                </label>
              ) : (
                <>
                  <p className="fs-5 mb-4">Comentario Resolutor</p>
                  <ul className="card p-4" style={{ background: '#fbfbfb', borderRadius: 8 }}>
                    <li>
                      <ul className="d-flex align-items-center mb-4">
                        <li className="me-2">
                          <img src={avatar} alt="Cuenta" width="30" />
                        </li>
                        <li className="me-4">
                          <span>
                            Cliente Id:
                            {' '}
                            {form.clienteID}
                          </span>
                        </li>
                        <li>
                          <span>
                            <small>
                              <b>Fecha de cierre: </b>
                              {form.fechaCierre}
                            </small>
                          </span>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p>{form.comentario}</p>
                    </li>
                  </ul>
                </>
              )}
            </div>
            <div className="form-group mb-5 d-none">
              <DropZone
                boxText="Arrastra tu archivo o selecciona desde tu computadora"
                title="Carga tu archivo"
                subTitle="Adjunta la evidencia, puede ser en formato jpg o png (opcional)"
              />
            </div>
            <div className="text-end">
              {comment && (
                <Button
                  className="btn btn-complementary fs-5 px-5 d-none"
                  text="Editar comentario"
                  submit
                  onClick={() => setComment(false)}
                />
              )}
              {!comment && (
                <Button
                  className="btn btn-secondary fs-5 px-3 py-3"
                  text="Guardar comentario"
                  submit
                  onClick={handleClickConfirm}
                />
              )}
            </div>
          </form>
          <Modal showModal={modalTicket} size="lg" onClick={(e) => { e.preventDefault(); setModalTicket(false); }}>
            {responseError ? (
              <div className="px-4 text-center">
                <img src="/errorgloboalert.png" alt="aleta" />
                <p style={{ fontSize: 16 }} className="py-4">
                  ¡Se ha producido un error de comunicación con los
                  <br />
                  servidores, vuelve a intentarlo!
                </p>
                <Button
                  className="btn btn-complementary fs-5 px-5 mb-5 me-4"
                  text="volver"
                  onClick={(e) => {
                    e.preventDefault(); setResponseError(false); setModalTicket(false);
                  }}
                />
              </div>
            ) : (
              <div className="px-4 text-center">
                <img src="/coment-arlert.png" alt="aleta" />
                <h4 style={{ fontSize: 22 }} className="display-font pt-4">
                  ¿Estas seguro que quieres
                  <br />
                  enviar el comentario?
                </h4>
                <p style={{ fontSize: 16 }} className="py-4">
                  Una vez comentado el ticket su estado cambiara a Cerrado.
                </p>
                <Button
                  className="btn btn-complementary fs-5 px-5 mb-5 me-4"
                  text="No"
                  onClick={handleClickRegret}
                />
                <Button
                  className="btn btn-secondary fs-5 px-5 mb-5"
                  text="Si, Acepto"
                  loading={loading}
                  onClick={handleSubmit}
                />
              </div>
            )}
          </Modal>
        </>
      ) : (
        <p>funca</p>
      )}
    </>
  );
};

export default ResolutorDetail;
