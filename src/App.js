import React from 'react';

import { HelmetProvider } from 'react-helmet-async';
import { useAuth } from './context/userContex';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnAuthenticatedApp';
import './styles/main.scss';

const App = () => {
  const { user } = useAuth();
  return (
    <HelmetProvider>
      {user
        ? <AuthenticatedApp />
        : <UnauthenticatedApp />}
    </HelmetProvider>
  );
};

export default App;
