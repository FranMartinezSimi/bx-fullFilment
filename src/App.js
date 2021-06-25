import React from 'react';

import { HelmetProvider } from 'react-helmet-async';
import { useKeyclockAuth } from 'context/userKeyclockContext';
import { useAuth } from './context/userContex';
import UnLoggedUserApp from './UnLoggedUserApp';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnAuthenticatedApp';
import './styles/main.scss';

const App = () => {
  const { userKeyclock } = useKeyclockAuth();
  const { user } = useAuth();
  return (
    <HelmetProvider>
      {!userKeyclock && <UnLoggedUserApp />}
      {userKeyclock && !user && <UnauthenticatedApp />}
      {userKeyclock && user && <AuthenticatedApp />}
    </HelmetProvider>
  );
};

export default App;
