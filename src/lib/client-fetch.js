import { apiUrl, APIConstans } from '../config';

const urlLogin = process.env.REACT_APP_AUTH_URL;
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
    headers.key = apiKeys.credential.key;
    headers.account_id = apiKeys.credential.accountId;
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
      const grantError = { errorMessage, status: response.status };
      // console.log('error de token', errorMessage);
      return Promise.reject(grantError);
    })
    .catch(async (error) => {
      // console.log('error', error);
      const theError = error;
      // console.log('Status', theError);
      const expectedError = theError && theError.status === 401;
      // console.log({ expectedError });

      if (!expectedError) {
        const errorMessage = error.message;
        // console.log('error no esperado', errorMessage);
        // cleanTokens();
        // window.localStorage.removeItem('bxBusinessActiveSession');
        // window.location.reload();
        return Promise.reject(new Error(errorMessage));
      }

      if (theError.status === 401 && !_retry) {
        // console.log('error:', theError);
        _retry = true;
        const refreshToken = getRefreshToken();
        // console.log(refreshToken.replaceAll('"', ''));

        const newHeaders = new Headers();
        newHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

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

        if (_refreshTokenResponse.status === 400) {
          cleanTokens();
          window.localStorage.removeItem('bxBusinessActiveSession');
          window.location.assign('/');
          window.location.reload();
          return Promise.reject(error);
        }

        if (_refreshTokenResponse.ok) {
          const finalydata = await _refreshTokenResponse.json();
          // cleanTokens();
          // console.log('finalydata', finalydata);
          setAccessToken(finalydata.access_token);
          setRefreshToken(finalydata.refresh_token);
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
