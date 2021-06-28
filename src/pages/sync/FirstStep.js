import React from 'react';

import PropTypes from 'prop-types';
import Button from '../../components/Atoms/Button';
import Current from '../../assets/brand/firstStep.svg';

const FirstStep = ({ setSelectedItem }) => (
  <>
    <div className="card-img mb-4">
      <a href="#!" className="d-flex justify-content-end" style={{ cursor: 'pointer' }} onClick={() => setSelectedItem('failStep')}>
        <span aria-hidden="true" className="p-0 pe-3" style={{ fontSize: '22px' }}>&times;</span>
      </a>
      <div className="text-center mb-5">
        <img src="./fulfill1.png" alt="imagen" width="220" />
      </div>
    </div>
    <div className="text-center">
      <h4 className="display-font">Gestiona tu bodega</h4>
      <p className="display-font" style={{ fontSize: '16px' }}>
        Sincroniza tu cuenta Shipedge para acceder a
        <br />
        tus órdenes de servicio e inventario.
      </p>
      <h4 className="display-font mt-5">¿Cómo hacerlo?</h4>
      <p className="display-font" style={{ fontSize: '16px' }}>
        Sigue las instrucciones que te presentaremos
        <br />
        a continuación.
      </p>
    </div>
    <div className="text-center pt-4">
      <Button
        className="btn btn-secondary px-5"
        text="Siguiente"
        onClick={() => setSelectedItem('secondStep')}
      />
      <a href="#!" className="mt-4 d-block" onClick={() => setSelectedItem('secondStep')}>
        <img src={Current} alt="current" />
      </a>
    </div>
  </>
);

FirstStep.propTypes = {
  setSelectedItem: PropTypes.func.isRequired,
};

export default FirstStep;
