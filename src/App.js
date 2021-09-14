import React from 'react';

import { HelmetProvider } from 'react-helmet-async';
import { useKeyclockAuth } from 'context/userKeyclockContext';
import jwt from 'jwt-decode';
import { SocketContext, socket } from './context/useContextSocketSeller';
import { useAuth } from './context/userContex';
import UnLoggedUserApp from './UnLoggedUserApp';
import ResolutorApp from './ResolutorApp';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnAuthenticatedApp';
import './styles/main.scss';

const App = () => {
  const { userKeyclock } = useKeyclockAuth();
  const { user } = useAuth();
  let resolutor;
  if (userKeyclock) {
    const userKeyclockData = JSON.parse(userKeyclock);
    const TOKEN = userKeyclockData.access_token;
    const USER_DATA = jwt(TOKEN);
    resolutor = USER_DATA.realm_access.roles.some((item) => item === 'fulfillment-resolutor');
  }
  return (
    <HelmetProvider>
      {!userKeyclock && <UnLoggedUserApp />}
      {userKeyclock && resolutor && !user && (
        <SocketContext.Provider value={socket}>
          <ResolutorApp />
        </SocketContext.Provider>
      )}
      {userKeyclock && !resolutor && !user && <UnauthenticatedApp />}
      {userKeyclock && !resolutor && user && (
        <SocketContext.Provider value={socket}>
          <AuthenticatedApp />
        </SocketContext.Provider>
      )}
    </HelmetProvider>
  );
};

export default App;
