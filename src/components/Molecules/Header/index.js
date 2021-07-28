import { useState } from 'react';

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
import styles from './styles.module.scss';

const Header = ({ activeNavbar, setActiveNavbar }) => {
  const history = useHistory();
  const { setUserKeyclock } = useKeyclockAuth();
  const { user, setUser } = useAuth();
  const userData = JSON.parse(user);
  const userActive = userData.credential.user.name ? userData.credential.user.name : 'no encontrado';
  const [rememberShipedge, setRememberShipedge] = useState(true);
  const [logOutCard, setLogOutCart] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setActiveNavbar(!activeNavbar);
  };
  const handleClickUser = (e) => {
    e.preventDefault();
    setLogOutCart(!logOutCard);
  };
  const handleClickRemember = () => {
    setRememberShipedge(!rememberShipedge);
  };
  const signOut = (e) => {
    e.preventDefault();
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
      <ul className="d-flex w-100 justify-content-end align-items-center my-2">
        <li className="px-4 d-none">
          <a href="!#" onClick={handleClick}>
            <img src={menu} alt="Menu" width="35" />
          </a>
        </li>
        <li className="d-flex">
          <img src={alarm} alt="Notificaciones" className="d-none" />
          <img src={bento} alt="Suite" className="d-none" />
          <img src={avatar} alt="Cuenta" />
          <a href="!#" onClick={handleClickUser} className="d-flex pe-5">
            <p>
              {userActive}
              <br />
              <small>Fulfillment</small>
            </p>
            <img src={arrowDown} alt="Down" width="20" />
          </a>
        </li>
      </ul>
    </header>
  );
};

Header.defaultProps = {
  setActiveNavbar: () => {},
};

Header.propTypes = {
  activeNavbar: PropTypes.bool.isRequired,
  setActiveNavbar: PropTypes.func,
};

export default Header;
