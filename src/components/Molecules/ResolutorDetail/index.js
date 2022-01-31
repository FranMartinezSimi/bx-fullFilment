import { useState, useEffect } from 'react';
import clientFetch from 'lib/client-fetch';
import { base64StringToBlob } from 'blob-util';
import useNotify from 'hooks/useNotify';
import avatar from 'assets/brand/avatar.svg';
import DropZone from 'components/Molecules/DropZone';
import dropZoneDownload from 'assets/brand/dropZoneDownload.svg';
import Button from 'components/Atoms/Button';
import Modal from 'components/Templates/Modal';
import Spinner from 'components/Atoms/Spinner';
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
  const [downloading, setDownloading] = useState(false);

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
  const handleClick = (e, file) => {
    e.preventDefault();
    setDownloading(true);
    const refreshToken = window.localStorage.getItem('__refresh-token__');

    clientFetch('order/v1/orders/getImagen', {
      method: 'GET',
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
        client_id: 'public-cli',
        client_secret: '0',
        host_sso: process.env.REACT_APP_HOST_SSO,
        name_image: file.name,
        realms: process.env.REACT_APP_SERVICE_NAME,
        token: `${refreshToken.replaceAll('"', '')}`,
      },
    })
      .then((source) => {
        const contentType = source.content_type;
        const b64Data = source.image;

        const blob = base64StringToBlob(b64Data, contentType);

        const blobUrl = URL.createObjectURL(blob);

        const el = document.createElement('a');
        el.setAttribute('href', blobUrl);
        el.setAttribute('download', file.name);
        document.body.appendChild(el);
        el.click();
        el.remove();
        setDownloading(false);
      })
      .catch((err) => {
        console.log('err', err);
        useNotify('error', '¡Se ha producido un error, intentalo de nuevo!');
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
      hora: detailData.hora,
      comentario: detailData.comentario,
      numTicket: detailData.numTicket,
    });
  }, [detailData]);
  return (
    <>
      {form !== null ? (
        <>
          <div className="container p-0">
            <div className="row">
              <div className="col-md-4">
                <h1 className={styles.titulos}>
                  {`Ticket: ${form.numTicket}`}
                </h1>
              </div>
              <div className="col-md-4 ms-auto">
                {form.status !== undefined && (
                  <div className="">
                    <div className="row justify-content-end px-5">
                      <div className="col-6 pe-5">
                        <small className={`badge--${form.status.replace(' ', '').toLowerCase()} px-4 py-2 fs-5 text-white border`}>
                          {form.status}
                        </small>
                        {' '}

                      </div>

                    </div>

                  </div>
                )}
              </div>
            </div>

          </div>

          <ul>
            <h2 className={styles.titulos}>{form.motivo}</h2>
            <div className="container m-0 p-0">
              <div className={`row justify-content-start ${styles.subtitulo}`}>
                <div className="col-4">
                  <p>{`Orden: ${form.orderId}`}</p>
                </div>
                <div className={`col-4 ${styles.subtitulo}`}>
                  Traking:
                </div>
              </div>
            </div>
            <li>
              <ul className="d-flex align-items-center mt-5 mb-0">
                <li className="me-2">
                  <img src={avatar} alt="Cuenta" width="32" height="33" />
                </li>
                <h2 className={`${styles.titulos}`}>
                  {`Cliente: ${form.clienteID}`}
                </h2>
              </ul>

            </li>
            <li>
              <ul className="d-flex align-items-center mt-2">

                <div className="container p-0 ps-3">
                  <div className="row justify-content-start">
                    <div className="container p-0">
                      <div className="row justify-content-start">
                        <div className={`col-4 ${styles.subtitulo} pe-0`}>
                          {`Fecha ${form.fechaCreacion}`}
                        </div>
                        <div className={`col-4 ${styles.subtitulo} p-0`}>
                          <div>
                            {` Hora: ${form.hora}`}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ul>
            </li>
          </ul>
          <div className={`${styles.contentBox} p-1`}>
            <p className={`${styles.formDetails} p-3`} style={{ overflow: 'scroll' }}>
              {form.descTicket}
            </p>
          </div>
          {form.archivo !== undefined && form.archivo.length > 0 && (
            <ul>
              <li>
                <p className="fs-5 mb-4 d-none p-2">Archivos Adjuntos</p>
                <ul>
                  {form.archivo.map((file) => (
                    <li key={file._id} className={styles.fileItem}>
                      <a href={file.uri} target="_blank" rel="noreferrer" download onClick={(e) => handleClick(e, file)}>
                        <ul className="d-flex justify-content-between align-items-center">
                          <li>
                            {`${file.name} `}
                            <span className={styles.fileSize}>{`${file.size} KB`}</span>
                          </li>
                          <li>
                            {downloading ? <Spinner width="15px" height="15px" /> : (
                              <button className={styles.closeButton} type="button">
                                <img src={dropZoneDownload} alt="Descargar" />
                              </button>
                            )}
                          </li>
                        </ul>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          )}
          <form>
            <div className="form-group mb-2">
              {!comment ? (
                <label htmlFor="textArea" className="w-100 mt-5">
                  <h4 className={styles.titulos}>Respuesta</h4>
                  <div className="container p-0 pb-4 pt-2">
                    <div className="row justify-content-start">
                      <div className={`col-4 ${styles.subtitulo} pe-0`}>
                        <div>
                          {`Fecha ${form.fechaCreacion}`}
                        </div>
                        {' '}

                      </div>
                      <div className={`col-4 ${styles.subtitulo} p-0`}>
                        <div>
                          {` Hora: ${form.hora}`}
                        </div>
                        {' '}

                      </div>
                    </div>
                  </div>
                  <textarea
                    className={`form-control ${styles.contentBox}`}
                    style={{ overflow: 'scroll', height: '140px' }}
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
                  <h1 className={`fs-5 mb-4 ${styles.titulos} mt-5 p-0`}>Respuesta</h1>
                  <div className="row justify-content-start pb-4">
                    <div className={`col-4 ${styles.subtitulo}`}>
                      {`Fecha ${form.fechaCreacion} `}
                    </div>
                    <div className={`col-4 ${styles.subtitulo}`}>
                      <div>
                        {` Hora: ${form.hora}`}
                      </div>
                    </div>
                  </div>
                  {' '}
                  <div>
                    <div className={`${styles.contentBox} p-0`} style={{ overflow: 'scroll' }}>
                      <ul>
                        <li>
                          <p className="p-3">{form.comentario}</p>
                        </li>
                      </ul>
                    </div>
                  </div>

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
            <div className={`row align-items-end ${styles.boxResponse}`}>
              <div className="d-flex justify-content-end">
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
                    className="btn btn-secondary fs-5 px-5 py-3 "
                    text="Enviar"
                    submit
                    onClick={handleClickConfirm}
                  />
                )}
              </div>
            </div>

          </form>
          <Modal showModal={modalTicket} size="lg" onClick={() => setModalTicket(false)}>
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
                <img style={{ width: 102, height: 95 }} src="/errorgloboalert.png" alt="aleta" />
                <h4 style={{ fontSize: 22, fontFamily: 'mont' }} className="display-font pt-4">
                  Confirmación
                </h4>
                <p style={{ fontSize: 16 }} className="py-2">
                  Al presionar aceptar, el ticket cambiará
                  de estado a cerrado, finalizando el proceso de
                  resolución de este. ¿Deseas enviar el comentario?
                </p>
                <Button
                  className="btn btn-complementary fs-5 px-5 mb-5 me-4"
                  text="Cancelar"
                  onClick={handleClickRegret}
                />
                <Button
                  className="btn btn-secondary fs-5 px-5 mb-5"
                  text="Aceptar"
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
