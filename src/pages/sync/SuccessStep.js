import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Atoms/Button';
import styles from './styles.module.scss';

const SuccessStep = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/ordenes');
  };
  return (
    <>
      <div className={`${styles.cardImg} my-4 text-center`}>
        <img className="w-100" src="./nonImg.jpg" alt="imagen" />
      </div>
      <h4 className="display-font text-center">¡Felicidades!</h4>
      <p className="display-font text-center" style={{ fontSize: '16px' }}>Tu cuenta Shipedge ha sido sincronizada con éxtio.</p>
      <div className="text-center pt-5">
        <Button
          className="btn btn-secondary px-5"
          text="Continuar"
          onClick={handleClick}
        />
      </div>
    </>
  );
};

export default SuccessStep;
