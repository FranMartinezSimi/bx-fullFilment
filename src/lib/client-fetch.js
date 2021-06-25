import { apiUrl, APIConstans } from '../config';

const urlLogin = 'http://desa.sso.bluex.cl/auth/realms/fulfillment/protocol/openid-connect/token';
const ACCESS_TOKEN_KEY = '__access-token__';
const REFRESH_TOKEN_KEY = '__refresh-token__';

export const setAccessToken = (accessToken) => (
  window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
);

export const setRefreshToken = (refreshToken) => (
  window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
);

const getAccessToken = () => {
  const accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);
  return accessToken ? `Bearer ${accessToken}` : '';
};

const getRefreshToken = () => {
  const refreshToken = window.localStorage.getItem(REFRESH_TOKEN_KEY);
  return refreshToken || '';
};

export const cleanTokens = () => {
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export default async function clientFetch(
  endpoint,
  { body, ...customConfig } = {},
  { withAuth = true } = { withAuth: true },
) {
  const headers = { 'content-type': 'application/json' };
  const apiKeys = JSON.parse(window.localStorage.getItem('bxBusinessActiveFulfillment'));
  if (withAuth) {
    const accessToken = getAccessToken();
    headers.Authorization = accessToken.replaceAll('"', '');
  }

  if (apiKeys) {
    headers.key = apiKeys.key;
    headers.account_id = apiKeys.account_id;
  }
  const config = {
    method: 'POST',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  return window.fetch(`${apiUrl}/${APIConstans.fulfillment}/${endpoint}`, config)
    .then(async (response) => {
      // console.log('Response', response);
      if (response.status >= 500) {
        const errorMessage = await response.text();
        console.log('error 500', errorMessage);
        return Promise.reject(new Error(errorMessage));
      }
      if (response.status === 401) {
        console.log('error:', response.status);
        const refreshToken = getRefreshToken();

        const newHeaders = new Headers();
        newHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        newHeaders.append('apikey', process.env.REACT_APP_API_KEY_KONG);

        const urlencoded = new URLSearchParams();
        urlencoded.append('grant_type', 'refresh_token');
        urlencoded.append('client_id', 'public-cli');
        urlencoded.append('refresh_token', refreshToken.replaceAll('"', ''));

        const requestOptions = {
          method: 'POST',
          headers: newHeaders,
          body: urlencoded,
          redirect: 'follow',
        };
        fetch(urlLogin, requestOptions)
          .then((response401) => response401.json())
          .then((result) => {
            console.log('result', result);
            if (result && result?.access_token) {
              localStorage.setItem('bxBusinessActiveSession', JSON.stringify(result));
              localStorage.setItem('__access-token__', JSON.stringify(result.access_token));
              localStorage.setItem('__refresh-token__', JSON.stringify(result.refresh_token));
              return result;
            }

            return Promise.reject(new Error(result.error_description));
          })
          .catch((error) => {
            console.log(error);
            // setInvalidUserError(error);
          });
      }
      if (response.ok) {
        console.log('ok');
        return response.json();
      }
      const errorMessage = await response.text();
      return Promise.reject(new Error(errorMessage));
    });
}
