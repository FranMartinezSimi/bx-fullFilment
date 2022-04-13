import React, {
  createContext, useState, useEffect, useContext,
} from 'react';

const AuthContext = createContext({});

const AuthKeyclockProvider = (props) => {
  const [userKeyclock, setUserKeyclock] = useState(null);

  const bxBusinessActiveSession = localStorage.getItem('bxBusinessActiveSession');

  useEffect(() => {
    if (bxBusinessActiveSession) {
      setUserKeyclock(bxBusinessActiveSession);
    }
  }, [bxBusinessActiveSession]);

  return <AuthContext.Provider value={{ userKeyclock, setUserKeyclock }} {...props} />;
};

const useKeyclockAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthKeyclockProvider');
  }
  return context;
};

export { AuthKeyclockProvider, useKeyclockAuth };
