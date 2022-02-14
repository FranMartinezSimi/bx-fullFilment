import { useState } from 'react';
import jwt from 'jwt-decode';

import LoginService from 'services/auth/login.service';
import useNotify from 'hooks/useNotify';
import { useKeyclockAuth } from 'context/userKeyclockContext';
import { useAuth } from 'context/userContex';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setUserKeyclock } = useKeyclockAuth();
  const { setActiveSession } = useAuth();

  const login = async (username, password) => {
    try {
      const response = await LoginService(username, password);
      const {
        access_token: accessToken,
        refresh_token: refreshToken,
        error_description: errorDescription,
      } = response || {};

      if (!accessToken) {
        return Promise.reject(new Error(errorDescription));
      }

      const USER_ACTIVE = window.localStorage.getItem(
        'bxBusinessActiveFulfillment',
      );

      if (USER_ACTIVE) {
        const userActiveData = JSON.parse(USER_ACTIVE);
        const USER_DATA = jwt(accessToken);
        const { sub } = USER_DATA;
        const compare = sub === userActiveData.credential.user.sub;

        if (!compare) {
          useNotify('error', 'Usuario no coincide con el recordado');

          return Promise.reject(
            new Error('Usuario no coincide con el almacenado en local storage'),
          );
        }
      }

      const bxBusinessActiveSession = localStorage.setItem(
        'bxBusinessActiveSession',
        JSON.stringify(response),
      );
      localStorage.setItem('__access-token__', JSON.stringify(accessToken));
      localStorage.setItem('__refresh-token__', JSON.stringify(refreshToken));

      setUserKeyclock(bxBusinessActiveSession);
      setActiveSession(response);
      setLoading(false);

      return Promise.resolve();
    } catch (error) {
      if (error.status === 401) {
        useNotify('error', 'Los datos ingresados son incorrectos');
      }

      if (error.status >= 500) {
        useNotify('error', 'Los servicios no responden...');
      }

      return Promise.resolve();
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    login,
  };
};

export default useLogin;
