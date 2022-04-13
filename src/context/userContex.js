import React, { createContext, useState, useEffect, useContext } from 'react';
import clientFetch from 'lib/client-fetch';

const AuthContext = createContext({
  user: null,
  userParsed: null,
  seller: {
    emailContact: '',
    nameContact: '',
    nameSeller: '',
    phoneContact: '',
  },
  setUser: () => {},
  setActiveSession: () => {},
  activeSession: null,
});

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [activeSession, setActiveSession] = useState(null);
  const [auth, setAuth] = useState({
    userParsed: null,
    seller: {
      emailContact: '',
      nameContact: '',
      nameSeller: '',
      phoneContact: '',
    },
  });

  useEffect(() => {
    const userStorage = localStorage.getItem('bxBusinessActiveFulfillment');

    if (!userStorage) return;

    setUser(userStorage);
  }, []);

  useEffect(() => {
    if (!user) return;

    if (!activeSession) {
      const session = localStorage.getItem('bxBusinessActiveSession');
      setActiveSession(JSON.parse(session));
      return;
    }

    const userData = JSON.parse(user);

    clientFetch('bff/v1/contact/findContact', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      body: {
        accountId: userData.credential.accountId,
      },
    }).then((sellerResponse) => {
      setAuth({
        userParsed: userData,
        seller: sellerResponse,
      });
    });
  }, [activeSession, user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        setActiveSession,
        activeSession,
        ...auth,
      }}
      {...props}
    />
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
