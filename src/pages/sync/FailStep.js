import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Atoms/Button';

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
      <ol className="p-0 ps-3">
        <li>
          <p className="display-font d-inline" style={{ fontSize: '16px' }}>Verifica que la información ingresada sea correcta.</p>
        </li>
        <li>
          <p className="display-font d-inline" style={{ fontSize: '16px' }}>Recuerda seguir los pasos que te mostramos en la siguiente imagen:</p>
        </li>
      </ol>
      <div className="card-img my-4">
        <img className="w-100" src="./fulfill2.jpg" alt="imagen" />
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
