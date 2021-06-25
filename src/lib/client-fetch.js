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
  // window.localStorage.removeItem('bxBusinessActiveSession');
  // window.location.reload();
};

export default async function clientFetch(
  endpoint,
  { body, ...customConfig } = {},
  { withAuth = true, _retry = false } = { withAuth: true, _retry: false },
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
      if (response.ok) {
        // console.log('ok');
        return response.json();
      }
      const errorMessage = await response.text();
      // const grantError = {...errorMessage, status: response.status}
      console.log('error de token', errorMessage);
      return Promise.reject(new Error(errorMessage));
    })
    .catch(async (error) => {
      console.log('error', error);
      const theError = JSON.parse(error.message);
      console.log('Status', theError);
      const expectedError = theError && theError.message === 'Unauthorized';
      console.log({ expectedError });

      if (!expectedError) {
        cleanTokens();
        const errorMessage = error.message;
        console.log('error no esperado < 500', errorMessage);
        return Promise.reject(new Error(errorMessage));
      }

      if (theError.message === 'Unauthorized' && !_retry) {
        console.log('error:', theError.message);
        _retry = true;
        const refreshToken = getRefreshToken();
        console.log({ refreshToken });

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
        const _refreshTokenResponse = await window.fetch(urlLogin, requestOptions, {
          withAuth: false,
        });

        console.log(_refreshTokenResponse);

        if (_refreshTokenResponse.ok) {
          const {
            _accessToken,
            _refreshToken,
          } = await _refreshTokenResponse.json();
          // cleanTokens();
          console.log('funca');
          setAccessToken(_accessToken);
          setRefreshToken(_refreshToken);
          return clientFetch(
            endpoint,
            { body, ...customConfig },
            { withAuth, _retry },
          );
        }
      }
      return Promise.reject(error);
    });
}
