import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from 'context/userContex';
import clientFetch from 'lib/client-fetch';
import { base64StringToBlob } from 'blob-util';
import useNotify from 'hooks/useNotify';

import PageLayout from 'components/Templates/PageLayout';
import Card from 'components/Molecules/Card';
import Modal from 'components/Templates/Modal';
import Spinner from 'components/Atoms/Spinner';
import Alert from 'components/Atoms/AlertMessage';
// import Button from 'components/Atoms/Button';
import FromTicket from 'components/Molecules/FormTicket';
import avatar from 'assets/brand/avatar.svg';
import chatRobotina from 'assets/brand/chatRobotina.svg';
import dropZoneDownload from 'assets/brand/dropZoneDownload.svg';
import styles from './styles.module.scss';

const IssueDetail = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalTicket, setModalTicket] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const userData = JSON.parse(user);
  const userActive = userData.credential.user.name ? userData.credential.user.name : 'Cliente';

  let component;
  if (error) {
    component = <Alert className="mt-5" type="warning" message="Ooopss! Ocurrió un error, intentalo más tarde..." />;
  } else {
    component = <Spinner />;
  }

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
      .catch(() => {
        useNotify('error', '¡Se ha producido un error, intentalo de nuevo!');
      });
  };

  useEffect(() => {
    clientFetch('ticket/v1/ticketera/getTicketID', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      body: {
        ticketId: id,
      },
    })
      .then((data) => {
        setTitle(data.numTicket);
        setTicket(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);
  return (
    <PageLayout title={`Ticket ${title}`}>
      <div className="container">
        <Card>
          {ticket != null && !loading ? (
            <>
              <div className={`${styles.cardumen} col-12`}>

                <ul className="d-flex justify-content-between align-items-center px-5 ps-0 pe-2" style={{ fontSize: 14 }}>
                  <li>
                    <ul className="d-flex flex-column">
                      <h6 className={styles.nTicket}>{`N° de Ticket ${title}`}</h6>
                      <p className={styles.oAsociada}>{` Orden asociada: ${title}`}</p>
                    </ul>
                  </li>
                  <li>
                    <ul className="d-flex">
                      <li className="me-2 pb-2">Estado: </li>
                      <li>
                        <small className={`badge--${ticket.status.replace(' ', '').toLowerCase()} px-3 py-2`}>
                          {ticket.status}
                        </small>
                      </li>
                    </ul>
                    <div className={styles.trakN}>{`Nº Traking: ${ticket.numTracking}`}</div>
                  </li>
                </ul>
                <div className="row">
                  <div className="container">
                    <div className={`row border-top pt-0 ms-0 ${styles.cardcita}`}>
                      <div className="col-lg-6 ps-4 pt-0 pb-0 pe-5 border-end">
                        <h5 className={styles.motivo}>{ticket.motivo}</h5>
                        <ul className="d-flex align-items-center pt-4">
                          <li className="ps-1 me-2">
                            <img src={avatar} alt="Cuenta" width="33" />
                          </li>
                          <li
                            style={{ overflow: 'scroll' }}
                            className={`me-2 ${styles.respResolutorP}`}
                          >
                            {userActive}
                          </li>
                        </ul>
                        <div className="row mb-2 ps-3">
                          <div className="col-3 mx-0 px-0">
                            <p className={styles.respResolutorP}>
                              {`Fecha: ${ticket.fechaCreacion}`}
                            </p>
                          </div>
                          <div className="col-5 mx-0 ps-0">
                            <p className={styles.respResolutorP}>
                              {`Hora: ${ticket.hora}`}
                            </p>
                          </div>
                        </div>

                        <p className={`p-4 ${styles.respResolutor}`}>
                          {ticket.descTicket}
                        </p>
                        {ticket.archivo.length > 0 && (
                          <ul>
                            <li>
                              <p className="fs-5 mb-4">Archivo Adjunto</p>
                              <ul>
                                {ticket.archivo.map((file) => (
                                  <li key={file._id} className={styles.fileItem}>
                                    <a href="#!" target="_blank" rel="noreferrer" download onClick={(e) => handleClick(e, file)}>
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
                      </div>
                      <div className="col-lg-6 ps-5 pt-0 pb-0 pe-5">
                        <div className={`col-lg-12 ${!ticket.comentario ? 'd-flex align-items-center' : 'd-flex flex-column justify-content-center'}`}>
                          {ticket.comentario ? (
                            <div className="resolutorBox">
                              <h5 className={styles.motivo}>Respuesta</h5>
                              <ul className="d-flex align-items-center pt-4">
                                <li className="me-2">
                                  <img src={chatRobotina} alt="Cuenta" width="33" />
                                </li>
                                <li className={`me-2 ${styles.respResolutorP}`}>{ticket.empresa}</li>
                              </ul>
                              <div className="row mb-2 ps-3">
                                <div className="col-3 mx-0 px-0">
                                  <p className={styles.respResolutorP}>
                                    {`Fecha: ${ticket.fechaCierre}`}
                                  </p>
                                </div>
                                <div className="col-5 mx-0 ps-0">
                                  <p className={styles.respResolutorP}>
                                    {`Hora: ${ticket.hora}`}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <p className={`p-4 ${styles.respResolutor}`}>
                                  {ticket.comentario}
                                </p>
                              </div>

                            </div>
                          ) : (
                            <p className="text-center w-100 display-font" style={{ color: '#cdcdcd', fontSize: 15 }}>
                              ¡El resolutor ya tiene tu ticket en estudio!
                              <br />
                              por favor espera por su comentario
                            </p>
                          )}
                          {ticket.status === 'Cerrado' && (
                            <div className="text-start ps-1">
                              <p className={styles.content}>
                                Si no estas de acuerdo con la respuesta,
                                puedes volver a ingresar un nuevo ticket
                              </p>
                              <div className="p-0 bd-highlight d-flex justify-content-end ms-5 pt-3">
                                <a
                                  href="#!"
                                  className="btn btn-secondary "
                                  style={{ fontSize: 18, fontFamily: 'lato', lineHeight: '22px' }}
                                  onClick={(e) => { e.preventDefault(); setModalTicket(true); }}
                                  loading={loading}
                                >
                                  Crear Ticket
                                </a>
                              </div>

                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Modal showModal={modalTicket} size="lg" onClick={() => setModalTicket(false)}>
                <FromTicket
                  orderId={ticket.orderId}
                  setModalTicket={setModalTicket}
                />
              </Modal>
            </>
          ) : component}
        </Card>
      </div>

    </PageLayout>
  );
};

export default IssueDetail;
