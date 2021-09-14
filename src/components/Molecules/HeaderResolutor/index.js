import { useState, useContext, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { useKeyclockAuth } from 'context/userKeyclockContext';

import Card from 'components/Molecules/Card';
import alarm from 'assets/brand/alarm.svg';
import bento from 'assets/brand/bento.svg';
import avatar from 'assets/brand/avatar.svg';
import menu from 'assets/brand/menu.svg';
import exitSession from 'assets/brand/exitSession.svg';
import PropTypes from 'prop-types';
import { SocketContext } from 'context/useContextSocketSeller';

import styles from './styles.module.scss';

const Header = ({ activeNavbar, setActiveNavbar }) => {
  const socket = useContext(SocketContext);
  const [responseSocket, setResponseSocket] = useState([]);

  const history = useHistory();
  const { setUserKeyclock } = useKeyclockAuth();
  const [logOutCard, setLogOutCart] = useState(false);
  const [notifyCard, setNotifyCart] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setActiveNavbar(!activeNavbar);
  };
  const handleClickUser = (e) => {
    e.preventDefault();
    setLogOutCart(!logOutCard);
  };
  const logOut = () => {
    history.push('/');
    setUserKeyclock(null);
  };
  const signOut = (e) => {
    e.preventDefault();
    logOut();
  };
  const handleClickNotify = (e) => {
    e.preventDefault();
    if (logOutCard) {
      setLogOutCart(false);
    }
    if (responseSocket.length > 0) {
      setNotifyCart(!notifyCard);
    }
  };
  useEffect(() => {
    socket.on('resolutor', (data) => {
      setResponseSocket([...responseSocket, data]);
    });
  }, [socket, responseSocket]);
  return (
    <header className={styles.header}>
      <Card className={`${logOutCard ? '' : 'd-none'} ${styles.headerCard} shadow`} onMouseLeave={() => setLogOutCart(false)}>
        <ul className="text-center">
          <li>
            <img src={avatar} alt="Cuenta" />
          </li>
          <li>
            <p className="mb-0">
              <b>Bienvenido</b>
            </p>
          </li>
          <li>
            <a href="!#" onClick={signOut}>
              <img src={exitSession} alt="exit" />
              <span>
                Cerrar Sesión
              </span>
            </a>
          </li>
        </ul>
      </Card>
      {responseSocket.length > 0 && (
        <Card className={`${notifyCard ? '' : 'd-none'} ${styles.headerCard} shadow`} onMouseLeave={() => setNotifyCart(false)}>
          <ul>
            <li>
              <ul className="d-flex justify-content-between">
                <li className="me-4"><h5>Notificaciones</h5></li>
                <li className="">
                  <a href="#!" onClick={(e) => { e.preventDefault(); setResponseSocket([]); }}>
                    <small>Borrar todo</small>
                  </a>
                </li>
              </ul>
            </li>
            {responseSocket.length > 0 && responseSocket.map((item) => (
              <li key="id">
                <a href="#!" onClick={(e) => { e.preventDefault(); history.push('/incidencias'); }}>
                  El ticket
                  {' '}
                  {item.numTicket}
                  {' '}
                  cambió de estado a
                  {' '}
                  {item.statusDesc}
                </a>
              </li>
            ))}
          </ul>
        </Card>
      )}
      <ul className="d-flex w-100 justify-content-end align-items-center my-2">
        <li className="px-4 d-none">
          <a href="!#" onClick={handleClick}>
            <img src={menu} alt="Menu" width="35" />
          </a>
        </li>
        <li className="d-flex">
          <img src={bento} alt="Suite" className="d-none" />
          <a href="#!" className={`position-relative me-4 pt-2 ${styles.headerNotifyLink}`} onClick={handleClickNotify}>
            <img src={alarm} alt="Notificaciones" className="w-100" width="50" />
            {responseSocket.length > 0 && (
              <span className={styles.headerNotify}>
                <span className={styles.headerNotifyNumber}>{responseSocket.length}</span>
              </span>
            )}
          </a>
          <a href="!#" onClick={handleClickUser} className="d-flex pe-5">
            <img src={avatar} alt="Cuenta" width="50" />
            <p className="d-none">
              <br />
              <small>Fulfillment</small>
            </p>
          </a>
        </li>
      </ul>
    </header>
  );
};

Header.defaultProps = {
  setActiveNavbar: () => { },
};

Header.propTypes = {
  activeNavbar: PropTypes.bool.isRequired,
  setActiveNavbar: PropTypes.func,
};

export default Header;
