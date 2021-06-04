import React, {
  createContext, useState, useEffect, useContext,
} from 'react';

const AuthContext = createContext({});

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  const bxBusinessActiveFulfillment = localStorage.getItem('bxBusinessActiveFulfillment');

  useEffect(() => {
    if (bxBusinessActiveFulfillment) {
      setUser(bxBusinessActiveFulfillment);
    }
  }, [bxBusinessActiveFulfillment]);

  return <AuthContext.Provider value={{ user, setUser }} {...props} />;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
