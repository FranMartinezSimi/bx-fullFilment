import React from 'react';

import { useHistory } from 'react-router-dom';
import { useKeyclockAuth } from 'context/userKeyclockContext';
import { useAuth } from 'context/userContex';

import alarm from 'assets/brand/alarm.svg';
import bento from 'assets/brand/bento.svg';
import avatar from 'assets/brand/avatar.svg';
import menu from 'assets/brand/menu.svg';
import arrowDown from 'assets/brand/arrow-down.svg';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const Header = ({ activeNavbar, setActiveNavbar }) => {
  const history = useHistory();
  const { setUserKeyclock } = useKeyclockAuth();
  const { user } = useAuth();
  const userData = JSON.parse(user);
  const userActive = userData.credential.user.name;

  const handleClick = (e) => {
    e.preventDefault();
    setActiveNavbar(!activeNavbar);
  };
  const signOut = (e) => {
    e.preventDefault();
    history.push('/');
    localStorage.removeItem('bxBusinessActiveSession');
    localStorage.removeItem('__access-token__');
    localStorage.removeItem('__refresh-token__');
    setUserKeyclock(null);
  };
  return (
    <header className={styles.header}>
      <ul className="d-flex w-100 justify-content-between align-items-center my-2">
        <li className="px-4">
          <a href="!#" onClick={handleClick}>
            <img src={menu} alt="Menu" width="35" />
          </a>
        </li>
        <li className="d-flex">
          <img src={alarm} alt="Notificaciones" />
          <img src={bento} alt="Suite" />
          <img src={avatar} alt="Cuenta" />
          <a href="!#" onClick={signOut} className="d-flex">
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
