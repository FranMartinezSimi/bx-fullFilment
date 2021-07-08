import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Atoms/Button';
import styles from './styles.module.scss';

const FailStep = ({ setSelectedItem }) => {
  const handleClick = () => {
    setSelectedItem('secondStep');
  };
  return (
    <>
      <div className="text-center mb-4">
        <img src="/errorgloboalert.png" alt="ERROR" width="70" />
      </div>
      <h4 className="display-font text-center mb-4">No hemos podido sincronizar tu cuenta Shipedge.</h4>
      <ol className={`${styles.orderedList} p-0 ps-3`}>
        <li>
          <p className="display-font d-inline" style={{ fontSize: '16px' }}>Verifica que la información ingresada sea correcta.</p>
        </li>
        <li>
          <p className="display-font d-inline" style={{ fontSize: '16px' }}>Recuerda seguir los pasos que te mostramos en el gif:</p>
        </li>
      </ol>
      <div className="my-4 text-center">
        <img src="./sincronizacion-shipedge.gif" alt="imagen" width="350" />
      </div>
      <div className="text-center pt-5">
        <Button
          className="btn btn-secondary px-5"
          text="Reintentar"
          onClick={handleClick}
        />
      </div>
    </>
  );
};

FailStep.propTypes = {
  setSelectedItem: PropTypes.func.isRequired,
};

export default FailStep;
