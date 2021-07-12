import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from 'components/Molecules/Card';
import { CSSTransition } from 'react-transition-group';
import NavigationDots from 'components/Atoms/NavigationDots';
import styles from './styles.module.scss';

const FourthStep = ({ selectedItem, setSelectedItem }) => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(selectedItem === 'fourthStep');
  }, [selectedItem]);
  return (
    <CSSTransition
      in={active}
      timeout={300}
      classNames="alert"
      unmountOnExit
    >
      <Card className="shadow" cardBackground="/onboarding-bg4.png">
        <ul className="d-flex flex-column justify-content-between mb-0" style={{ minHeight: '440px' }}>
          <li className="my-4 text-center">
            <div className={`${styles.cardImageContainer} m-auto mb-5`}>
              <img src="./onboarding-ico4.png" alt="imagen" />
            </div>
          </li>
          <li className="text-center">
            <h1 className="display-font">Sincroniza con Shipedge</h1>
            <p style={{ fontSize: 16 }}>
              Verifica la cantidad de tus productos y entérate de su stock.
            </p>
          </li>
          <li className="text-center pt-4">
            <ul className="d-flex justify-content-between align-items-center m-auto" style={{ maxWidth: '400px' }}>
              <li>
                <a href="#!">Atrás</a>
              </li>
              <li>
                <NavigationDots active={selectedItem} setSelectedItem={setSelectedItem} />
              </li>
              <li>
                <a href="#!">Continuar</a>
              </li>
            </ul>
          </li>
          <li className="d-flex w-100">
            <a href="#!" className="ms-auto">Salir del tour</a>
          </li>
        </ul>
      </Card>
    </CSSTransition>
  );
};

FourthStep.propTypes = {
  setSelectedItem: PropTypes.func.isRequired,
};

export default FourthStep;
