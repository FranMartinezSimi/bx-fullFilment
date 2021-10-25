import PropTypes from 'prop-types';
import Button from '../../components/Atoms/Button';
import styles from './styles.module.scss';

const FailStep = ({ setSelectedItem, signOut }) => {
  const handleClick = () => {
    setSelectedItem('secondStep');
  };
  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }}>
      <div className="text-center mb-4 position-relative" style={{ marginLeft: '-32px' }}>
        <ul className="d-flex align-items-center justify-content-center mb-5">
          <li className="me-3">
            <img src="/errorgloboalert.png" alt="ERROR" width="70" />
          </li>
          <li>
            <h4 className="display-font mb-4 pt-2 text-start">No hemos podido sincronizar tu cuenta Shipedge.</h4>
          </li>
        </ul>
      </div>
      <ol className={`${styles.orderedList} p-0`}>
        <li>
          <p className="display-font d-inline" style={{ fontSize: '18px' }}>Verifica que la información ingresada sea correcta.</p>
        </li>
        <li>
          <p className="display-font d-inline" style={{ fontSize: '18px' }}>Recuerda seguir los pasos que te mostramos en la siguiente imagen:</p>
        </li>
      </ol>
      <div className="my-4 text-center">
        <img src="./sincronizacion-shipedge.gif" alt="imagen" width="400" />
      </div>
      <div className="text-center pt-5">
        <ul className="d-flex align-items-center justify-content-center">
          <li className="me-5">
            <Button
              className="btn btn-complementary fs-5"
              text="Volver al login"
              onClick={signOut}
            />
          </li>
          <li className="ms-5">
            <Button
              className="btn btn-secondary px-4 fs-5"
              text="Reintentar"
              onClick={handleClick}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

FailStep.propTypes = {
  setSelectedItem: PropTypes.func.isRequired,
};

export default FailStep;
