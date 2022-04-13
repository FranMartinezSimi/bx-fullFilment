const LoginSrvice = async (username, password) => {
  try {
    const urlLogin = process.env.REACT_APP_AUTH_URL;
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const urlencoded = new URLSearchParams();
    urlencoded.append('grant_type', 'password');
    urlencoded.append('client_id', 'public-cli');
    urlencoded.append('username', username.trim());
    urlencoded.append('password', password.trim());

    const response = await fetch(urlLogin, {
      method: 'POST',
      headers,
      body: urlencoded,
      redirect: 'follow',
    });

    if (!response.ok) {
      return Promise.reject(response);
    }

    const jsonData = await response.json() || {};

    return jsonData;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default LoginSrvice;
