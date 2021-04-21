import React from 'react';

import { useAuth } from './context/userContex';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnAuthenticatedApp';
import './styles/main.scss';

const App = () => {
    const { user } = useAuth();
    return (
        <>
            {user
                ? <AuthenticatedApp />
                : <UnauthenticatedApp />
            }
        </>
    );
}
 
export default App;