import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ArrowDown from '../../../assets/brand/arrow-black-down.svg';
import ArrowUp from '../../../assets/brand/arrow-black-up.svg';
import styles from './styles.module.scss';

const DropDown = ({ children }) => {
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setOpen(!open);
  };
  return (
    <div className="mt-5">
      <a href="#!" onClick={handleClick} className="bg-ligth-grey d-flex justify-content-between align-items-center my-2 p-3">
        <p className={`mb-0 display-font ${styles.title}`}>
          Detalle de pedido
        </p>
        {open
          ? <img src={ArrowUp} alt="Down" width="20" />
          : <img src={ArrowDown} alt="Down" width="20" />}
      </a>
      <div className={`${styles.dropdown} ${open ? styles.open : styles.close}`}>
        {children}
      </div>
    </div>
  );
};

DropDown.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DropDown;
