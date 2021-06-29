import React from 'react';
import { useHistory } from 'react-router-dom';
import { useKeyclockAuth } from 'context/userKeyclockContext';
import { useAuth } from 'context/userContex';
import PageLayout from 'components/Templates/PageLayout';
import Button from '../../components/Atoms/Button';

const ErrorPage = () => {
  const history = useHistory();
  const { setUserKeyclock } = useKeyclockAuth();
  const { setUser } = useAuth();

  setUser(null);
  setUserKeyclock(null);
  localStorage.removeItem('__access-token__');
  localStorage.removeItem('__refresh-token__');
  localStorage.removeItem('bxBusinessActiveSession');
  localStorage.removeItem('bxBusinessActiveFulfillment');
  const handleClick = (e) => {
    e.preventDefault();
    history.push('/');
  };
  return (
    <PageLayout title="Blue360" description="Contenido no encontrado" noBreadcrumb>
      <div style={{ minHeight: '80vh' }} className="d-flex align-items-center justify-content-center">
        <ul className="w-100 text-center">
          <li>
            <img src="/errorpage.png" alt="Contenido no encontrado" data-testid="image" />
          </li>
          <li>
            <h2 className="display-font" data-testid="title">
              ¡Oh no! La página que
              <br />
              buscas no existe
            </h2>
            <p data-testid="subTitle">
              Quizás hay un error en la dirección
              , no tienes permisos o lo que buscas ya no está aquí.
            </p>
          </li>
          <li className="mt-5">
            <Button
              className="btn btn-secondary px-5"
              data-testid="button"
              text="Volver a la página principal"
              onClick={handleClick}
            />
          </li>
        </ul>
      </div>
    </PageLayout>
  );
};
export default ErrorPage;
