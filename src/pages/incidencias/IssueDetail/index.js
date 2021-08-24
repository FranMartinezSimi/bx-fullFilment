import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import clientFetch from 'lib/client-fetch';

import PageTitle from 'components/Atoms/PageTitle';
import PageLayout from 'components/Templates/PageLayout';
import Card from 'components/Molecules/Card';
import Modal from 'components/Templates/Modal';
import Spinner from 'components/Atoms/Spinner';
import Alert from 'components/Atoms/AlertMessage';
import Button from 'components/Atoms/Button';
import FromTicket from 'components/Molecules/FormTicket';
import avatar from 'assets/brand/avatar.svg';
import dropZoneDownload from 'assets/brand/dropZoneDownload.svg';
import styles from './styles.module.scss';

const IssueDetail = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalTicket, setModalTicket] = useState(false);

  let component;
  if (error) {
    component = <Alert className="mt-5" type="warning" message="Ooopss! Ocurrió un error, intentalo más tarde..." />;
  } else {
    component = <Spinner />;
  }

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
        console.log(data);
        setTicket(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);
  return (
    <PageLayout title={`Ticket ${id}`}>
      <PageTitle title={`Número del Ticket: ${id}`} className="mb-5" />
      <Card>
        {ticket != null && !loading ? (
          <>
            <ul className="d-flex justify-content-between" style={{ fontSize: 14 }}>
              <li>
                <ul className="d-flex">
                  <li className="me-2">Nº de orden asociada: </li>
                  <li>{ticket.orderId}</li>
                </ul>
              </li>
              <li>
                <ul className="d-flex">
                  <li className="me-2">Motivo: </li>
                  <li>{ticket.motivo}</li>
                </ul>
              </li>
              <li>
                <ul className="d-flex">
                  <li className="me-2">Estado: </li>
                  <li>
                    <small className={`badge--${ticket.status.replace(' ', '').toLowerCase()} px-4 py-2`}>
                      {ticket.status}
                    </small>
                  </li>
                </ul>
              </li>
            </ul>
            <hr className="my-4" />
            <div className="row">
              <div className="col-lg-6 pe-5">
                <h2 style={{ fontSize: 22, fontWeight: 400 }}>{ticket.motivo}</h2>
                <p>
                  Fecha:
                  {' '}
                  {ticket.fechaCreacion}
                </p>
                <p className="py-4">
                  {ticket.descTicket}
                </p>
                {ticket.archivo.length > 0 && (
                <ul>
                  <li>
                    <p className="fs-5 mb-4">Archivos Adjuntos</p>
                    <ul>
                      {ticket.archivo.map((file) => (
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
              </div>
              <div className="col-lg-6">
                {ticket.comentario ? (
                  <div className="resolutorBox">
                    <p>
                      Comentario resolutor
                    </p>
                    <ul className="card py-4 px-2" style={{ borderRadius: 15 }}>
                      <li>
                        <ul className="d-flex">
                          <li className="mx-3">
                            <img src={avatar} alt="Cuenta" />
                          </li>
                        </ul>
                      </li>
                      <li className="px-4 pt-4">
                        <p>{ticket.comentario}</p>
                      </li>
                    </ul>
                  </div>
                ) : null}
                {ticket.status === 'Cerrado' && (
                  <>
                    <p>
                      ¿Estas conforme con la resolución de tu ticket?,
                      si no estas conforme puedes volver a crear un ticket de incidencia.
                    </p>
                    <div className="text-end">
                      <Button
                        className="btn btn-secondary px-4"
                        text="Crear Ticket"
                        onClick={(e) => { e.preventDefault(); setModalTicket(true); }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <Modal showModal={modalTicket} size="lg" onClick={(e) => { e.preventDefault(); setModalTicket(false); }}>
              <FromTicket
                orderId={ticket.orderId}
                setModalTicket={setModalTicket}
              />
            </Modal>
          </>
        ) : component}
      </Card>
    </PageLayout>
  );
};

export default IssueDetail;
