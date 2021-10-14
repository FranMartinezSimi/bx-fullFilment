import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from 'context/userContex';
import clientFetch from 'lib/client-fetch';

import PageLayout from 'components/Templates/PageLayout';
import Card from 'components/Molecules/Card';
import Modal from 'components/Templates/Modal';
import Spinner from 'components/Atoms/Spinner';
import Alert from 'components/Atoms/AlertMessage';
import Button from 'components/Atoms/Button';
import FromTicket from 'components/Molecules/FormTicket';
import avatar from 'assets/brand/avatar.svg';
import avatarResolutor from 'assets/brand/avatar-resolutor.svg';
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
    const refreshToken = window.localStorage.getItem('__refresh-token__');
    // const URL = process.env.REACT_APP_API_CLOUDFRONT;

    // const headers = new Headers();
    // headers.append('Authorization', `Baarer ${refreshToken.replaceAll('"', '')}`);
    // headers.append('client_id', 'public-cli');
    // headers.append('realms', 'fulfillment');
    // headers.append('client_secret', '0');
    // headers.append('host_sso', 'desa.sso.bluex.cl');
    // // headers.append('nameImage', file.name);

    // const requestOptions = {
    //   method: 'GET',
    //   headers,
    //   redirect: 'follow',
    // };

    // fetch(`${URL}${file.name}`, requestOptions)
    //   // .then((response) => response.text())
    //   .then((source) => {
    //     console.log(source);
    //     // const el = document.createElement('a');
    //     // el.setAttribute('href', source);
    //     // el.setAttribute('download', file.name);
    //     // document.body.appendChild(el);
    //     // el.click();
    //     // el.remove();
    //   })
    //   .catch((err) => console.error(err));

    clientFetch('ticket/v1/cloudfront/getImage', {
      method: 'GET',
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
        client_id: 'public-cli',
        client_secret: '0',
        host_sso: 'desa.sso.bluex.cl',
        name_image: file.name,
        realms: 'fulfillment',
        token: `${refreshToken.replaceAll('"', '')}`,
      },
    })
      .then((response) => response.blob())
      .then((source) => {
        console.log(source);
        const el = document.createElement('a');
        el.setAttribute('href', source);
        el.setAttribute('download', file.name);
        document.body.appendChild(el);
        el.click();
        el.remove();
      })
      .catch((err) => console.log('err', err));
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
      <Card className="px-5 mt-3 shadow">
        {ticket != null && !loading ? (
          <>
            <ul className="d-flex justify-content-between align-items-center" style={{ fontSize: 14 }}>
              <li>
                <ul className="d-flex flex-column">
                  <li>
                    <h1 className="display-font" style={{ fontSize: 22 }}>Número de ticket:</h1>
                  </li>
                  <li className="me-2">
                    Nº de orden asociada:
                    {' '}
                    {ticket.orderId}
                  </li>
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
                <h2 className="display-font" style={{ fontSize: 18, fontWeight: 600 }}>{ticket.motivo}</h2>
                <ul className="d-flex align-items-center pt-4">
                  <li className="me-2">
                    <img src={avatar} alt="Cuenta" width="33" />
                  </li>
                  <li className="me-2">{userActive}</li>
                  <li className="me-2">
                    <p className="m-0">
                      <small style={{ color: '#666666' }}>
                        Fecha:
                        {' '}
                        {ticket.fechaCreacion}
                      </small>
                    </p>
                  </li>
                </ul>
                <p className="py-4">
                  {ticket.descTicket}
                </p>
                {ticket.archivo.length > 0 && (
                <ul>
                  <li>
                    <p className="fs-5 mb-4">Archivos Adjuntos</p>
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
              <div className={`col-lg-6 border-start ${!ticket.comentario ? 'd-flex align-items-center' : 'd-flex flex-column justify-content-center'}`}>
                {ticket.comentario ? (
                  <div className="resolutorBox px-lg-5">
                    <p>
                      Comentario resolutor
                    </p>
                    <ul className="card py-3 px-2" style={{ borderRadius: 15 }}>
                      <li>
                        <ul className="d-flex">
                          <li className="mx-3">
                            <img src={avatarResolutor} alt="Respuesta" width="33" />
                          </li>
                        </ul>
                      </li>
                      <li className="px-4 pt-4">
                        <p>{ticket.comentario}</p>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <p className="text-center w-100 display-font" style={{ color: '#cdcdcd', fontSize: 15 }}>
                    ¡El resolutor ya tiene tu ticket en estudio!
                    <br />
                    por favor espera por su comentario
                  </p>
                )}
                {ticket.status === 'Cerrado' && (
                  <div className="px-lg-5">
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
                  </div>
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
