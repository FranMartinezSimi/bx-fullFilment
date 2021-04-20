import React, {useState} from 'react';

import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnAuthenticatedApp'
import './styles/main.scss';

const App = () => {
    const [user, setUser] = useState(false);
    return (
        <>
            {user
                ? <AuthenticatedApp />
                : <UnauthenticatedApp setUser={setUser}/>
            }
        </>
    );
}
 
export default App;