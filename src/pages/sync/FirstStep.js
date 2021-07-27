import PropTypes from 'prop-types';
import Button from '../../components/Atoms/Button';

const FirstStep = ({ setSelectedItem, signOut }) => (
  <>
    <div className="my-4 text-center">
      <a href="#!" className="d-flex justify-content-end" style={{ cursor: 'pointer' }} onClick={signOut}>
        <span aria-hidden="true" className="p-0 pe-3" style={{ fontSize: '22px' }}>&times;</span>
      </a>
      <div className="text-center mb-5">
        <img src="./fulfill1.png" alt="imagen" width="200" />
      </div>
    </div>
    <div className="text-center">
      <h4 className="display-font fs-3">Gestiona tu bodega</h4>
      <p className="display-font" style={{ fontSize: '15px' }}>
        Sincroniza tu cuenta Shipedge para acceder a
        <br />
        tus órdenes de servicio e inventario.
      </p>
      <h4 className="display-font fs-3 mt-5">¿Cómo hacerlo?</h4>
      <p className="display-font" style={{ fontSize: '15px' }}>
        Sigue las instrucciones que te presentaremos
        <br />
        a continuación.
      </p>
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
            className="btn btn-secondary px-5 fs-5"
            text="Siguiente"
            onClick={() => setSelectedItem('secondStep')}
          />
        </li>
      </ul>
    </div>
  </>
);

FirstStep.propTypes = {
  setSelectedItem: PropTypes.func.isRequired,
};

export default FirstStep;
