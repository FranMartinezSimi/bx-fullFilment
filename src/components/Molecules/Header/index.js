
import React from 'react'
import alarm from '../../../assets/brand/alarm.svg';
import bento from '../../../assets/brand/bento.svg';
import avatar from '../../../assets/brand/avatar.svg';
import arrowDown from '../../../assets/brand/arrow-down.svg';
import styles from './styles.module.scss';

const Header = () => {
  return ( 
    <header className={styles.header}>
      <img src={alarm} alt="" />
      <img src={bento} alt="" />
      <img src={avatar} alt="" />
      <p>Nicolás Cruz<br />
        <small>Fulfillment By</small>
      </p>
      <img src={arrowDown} alt="" />

    </header>
  );
}
 
export default Header;