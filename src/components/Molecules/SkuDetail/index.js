import React from 'react';
import PropTypes from 'prop-types';
import AlerRed from 'assets/brand/alertRed.png';

import Button from 'components/Atoms/Button';

const SkuDetail = ({ onClick, msj, textBtn, display, img }) => {
  let imga = (
    <img
      src="/bgsuccess.jpg"
      alt="Proceso completado"
      width="150"
      style={{ display: '' || display }}
    />
  );
  const imgModal = (n) => {
    if (n === 'success') {
      imga = <img src="/bgsuccess.jpg" alt="Proceso completado" width="150" style={{ display: '' || display }} />;
    } else if (n === 'alert') {
      imga = <img src={AlerRed} alt="Proceso completado" width="150" style={{ display: '' || display }} />;
    }
  };
  imgModal(img);
  return (
    <>
      <ul className="text-center mb-5">
        <li>
          {imga}
        </li>
        <li className="py-4" style={{ fontSize: 16 }}>

          {msj}
          <br />
          {' '}

        </li>
        <li>
          <Button
            className="btn btn-secondary fs-5 px-5"
            text={textBtn}
            onClick={onClick}
          />
        </li>
      </ul>
    </>
  );
};

SkuDetail.defaultProps = {
  msj: '',
  textBtn: '',
  display: '',
  img: '',
  onClick: undefined,
};

SkuDetail.propTypes = {
  msj: PropTypes.string,
  textBtn: PropTypes.string,
  img: PropTypes.string,
  display: PropTypes.string,
  onClick: PropTypes.func,

};

export default SkuDetail;
