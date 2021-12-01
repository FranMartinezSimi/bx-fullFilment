import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import jwt from 'jwt-decode';
import TagManager from 'react-gtm-module';

import { useKeyclockAuth } from 'context/userKeyclockContext';
import { SocketContext, socket } from './context/useContextSocketSeller';
import { useAuth } from './context/userContex';
import UnLoggedUserApp from './UnLoggedUserApp';
import ResolutorApp from './ResolutorApp';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnAuthenticatedApp';

import 'react-toastify/dist/ReactToastify.css';
import './styles/main.scss';

const App = () => {
  const { userKeyclock } = useKeyclockAuth();
  const { user } = useAuth();
  let resolutor;

  if (userKeyclock) {
    const userKeyclockData = JSON.parse(userKeyclock);
    const TOKEN = userKeyclockData.access_token;
    const USER_DATA = jwt(TOKEN);
    resolutor = USER_DATA.realm_access.roles.some(
      (item) => item === 'fulfillment-resolutor',
    );
  }

  console.log(user);

  useEffect(() => {
    if (user) {
      const userParsed = JSON.parse(user);
      TagManager.initialize({
        gtmId: 'GTM-TTM6TJQ',
        dataLayer: {
          userId: userParsed?.credential?.user?.email,
        },
      });
    }
  }, [user]);

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
