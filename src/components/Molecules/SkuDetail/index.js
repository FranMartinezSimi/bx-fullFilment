import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Atoms/Button';

const SkuDetail = ({ onClick }) => {
  const component = '';

  return (
    <div>
      {component}
      <ul className="text-center mb-5">
        <li>
          <img src="/bgsuccess.jpg" alt="Proceso completado" width="150" />
        </li>
        <li className="py-4" style={{ fontSize: 16 }}>
          {'Producto agregado con éxito  '}
          <br />
          {' '}

        </li>
        <li>
          <Button
            className="btn btn-secondary fs-5 px-5"
            text="Aceptar"
            onClick={onClick}
          />
        </li>
      </ul>
    </div>
  );
};

SkuDetail.defaultProps = {

  onClick: undefined,
};

SkuDetail.propTypes = {

  onClick: PropTypes.func,

};

export default SkuDetail;
