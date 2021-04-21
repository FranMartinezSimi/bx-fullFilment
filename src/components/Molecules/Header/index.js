
import React from 'react'
import alarm from '../../../assets/brand/alarm.svg';
import bento from '../../../assets/brand/bento.svg';
import avatar from '../../../assets/brand/avatar.svg';
// import hamburguesa from './png/hamburguesa.png';
import arrowDown from '../../../assets/brand/arrow-down.svg';
import styles from './styles.module.scss';

const Header = ({ activeNavbar, setActiveNavbar }) => {
  const handleClick = (e) => {
    e.preventDefault();
    setActiveNavbar(!activeNavbar);
  }
  return ( 
    <header className={styles.header}>
      <ul className="d-flex w-100 justify-content-between align-items-center my-2">
        <li className="px-4">
          <a href="!#" onClick={handleClick}>
            <img src={bento} alt="Suite" />
          </a>
        </li>
        <li className="d-flex">
          <img src={alarm} alt="Notificaciones" />
          <img src={bento} alt="Suite" />
          <img src={avatar} alt="Cuenta" />
          <p>Nicolás Cruz<br />
            <small>Fulfillment By</small>
          </p>
          <img src={arrowDown} alt="Down" />
        </li>
      </ul>
    </header>
  );
}
 
export default Header;