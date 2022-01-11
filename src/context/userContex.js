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
});

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState({
    userParsed: null,
    seller: {
      emailContact: '',
      nameContact: '',
      nameSeller: '',
      phoneContact: '',
    },
  });

  const bxBusinessActiveFulfillment = localStorage.getItem(
    'bxBusinessActiveFulfillment',
  );

  useEffect(() => {
    if (bxBusinessActiveFulfillment) {
      setUser(bxBusinessActiveFulfillment);
    }
  }, [bxBusinessActiveFulfillment]);

  useEffect(() => {
    if (!user) return;

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
  }, [user]);

  return <AuthContext.Provider value={{ user, setUser, ...auth }} {...props} />;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
