import { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import jwt from 'jwt-decode';

import * as GTM from 'utils/gtm';
import { useKeyclockAuth } from 'context/userKeyclockContext';
import { SocketContext, socket } from './context/useContextSocketSeller';
import { useAuth } from './context/userContex';
import { InventoryProvider } from './context/useInventory';
import { RepositionProvider } from './context/useReposition';

import UnLoggedUserApp from './UnLoggedUserApp';
import ResolutorApp from './ResolutorApp';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnAuthenticatedApp';

import 'react-toastify/dist/ReactToastify.css';
import './styles/main.scss';

const App = () => {
  const { userKeyclock } = useKeyclockAuth();
  const { user } = useAuth();
  const [resolutor, setResolutor] = useState(false);

  useEffect(() => {
    if (userKeyclock) {
      const userKeyclockData = JSON.parse(userKeyclock);
      const TOKEN = userKeyclockData.access_token;
      const USER_DATA = jwt(TOKEN);

      setResolutor(
        USER_DATA.realm_access.roles.some(
          (item) => item === 'fulfillment-resolutor',
        ),
      );

      GTM.setDataLayer({
        userId: USER_DATA?.preferred_username || '',
      });

      GTM.addUserIdEvent({ email: USER_DATA.email });
    }
  }, [userKeyclock]);

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
          <InventoryProvider>
            <RepositionProvider>
              <AuthenticatedApp />
            </RepositionProvider>
          </InventoryProvider>
        </SocketContext.Provider>
      )}
    </HelmetProvider>
  );
};

export default App;
