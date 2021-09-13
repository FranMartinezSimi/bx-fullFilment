import { useState, useContext, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { useKeyclockAuth } from 'context/userKeyclockContext';
import { useAuth } from 'context/userContex';

import Card from 'components/Molecules/Card';
import alarm from 'assets/brand/alarm.svg';
import bento from 'assets/brand/bento.svg';
import avatar from 'assets/brand/avatar.svg';
import menu from 'assets/brand/menu.svg';
import arrowDown from 'assets/brand/arrow-down.svg';
import exitSession from 'assets/brand/exitSession.svg';
import PropTypes from 'prop-types';
import { SocketContext } from 'context/useContextSocketSeller';
import styles from './styles.module.scss';

const urlLogin = process.env.REACT_APP_LOGOUT_URL;

const Header = ({ activeNavbar, setActiveNavbar }) => {
  const history = useHistory();
  const { setUserKeyclock } = useKeyclockAuth();
  const { user, setUser } = useAuth();
  const socket = useContext(SocketContext);
  const userData = JSON.parse(user);
  const userActive = userData.credential.user.name ? userData.credential.user.name : 'no encontrado';
  const [rememberShipedge, setRememberShipedge] = useState(true);
  const [logOutCard, setLogOutCart] = useState(false);
  const [notifyCard, setNotifyCart] = useState(false);
  const [responseSocket, setResponseSocket] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    setActiveNavbar(!activeNavbar);
  };
  const handleClickUser = (e) => {
    e.preventDefault();
    if (notifyCard) {
      setNotifyCart(false);
    }
    setLogOutCart(!logOutCard);
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
  const handleClickRemember = () => {
    setRememberShipedge(!rememberShipedge);
  };
  const logOut = () => {
    history.push('/');
    localStorage.removeItem('bxBusinessActiveSession');
    localStorage.removeItem('__access-token__');
    localStorage.removeItem('__refresh-token__');
    if (!rememberShipedge) {
      localStorage.removeItem('bxBusinessActiveFulfillment');
      setUser(null);
    }
    setUserKeyclock(null);
  };
  const signOut = (e) => {
    e.preventDefault();
    const REFRESH_TOKEN = localStorage.getItem('__refresh-token__');
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const urlencoded = new FormData();
    urlencoded.append('client_id', `${userData.credential.user.sub}&refresh_token=${REFRESH_TOKEN}`);

    const requestOptions = {
      method: 'POST',
      headers,
      body: urlencoded,
      redirect: 'follow',
    };

    fetch(urlLogin, requestOptions)
      .then((response) => response.json())
      .then(() => {
        logOut();
      })
      .catch(() => {
        logOut();
      });
  };

  useEffect(() => {
    socket.on('client', (data) => {
      console.log(`esto viene desde el cliente ${Object.entries(data)}`);
      setResponseSocket([...responseSocket, data]);
    });
  }, [socket, responseSocket]);
  return (
    <header className={styles.header}>
      <Card className={`${logOutCard ? '' : 'd-none'} ${styles.headerCard} shadow`}>
        <ul className="text-center">
          <li>
            <img src={avatar} alt="Cuenta" />
          </li>
          <li>
            <p className="mb-0">
              <b>Bienvenido</b>
            </p>
            <p className="mb-0">{userActive}</p>
          </li>
          <li className="my-3">
            <div className="form-check">
              <label className="form-check-label" htmlFor="flexCheckDefault">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={rememberShipedge}
                  checked={rememberShipedge}
                  onChange={handleClickRemember}
                  id="flexCheckDefault"
                />
                Recordar Shipedge User
              </label>
            </div>
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
        <Card className={`${notifyCard ? '' : 'd-none'} ${styles.headerCard} shadow`} onBlur={() => setNotifyCart(false)}>
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
                <a href="#!" onClick={(e) => { e.preventDefault(); history.push(`/incidencia/${item.ticktId}`); }}>
                  El ticket
                  {' '}
                  {item.orderId}
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
              {userActive}
              <br />
              <small>Fulfillment</small>
            </p>
            <img src={arrowDown} alt="Down" width="20" className="d-none" />
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
