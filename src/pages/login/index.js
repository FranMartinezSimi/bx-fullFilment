import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useKeyclockAuth } from 'context/userKeyclockContext';
import LogoBlue from 'assets/brand/logoBlue.svg';
import eyeOpen from 'assets/brand/eyeOpen.svg';
import eyeClose from 'assets/brand/eyeClose.svg';
import Button from 'components/Atoms/Button';
import Alert from 'components/Atoms/AlertMessage';
// import clientFetch, { setAccessToken, setRefreshToken } from 'lib/client-fetch';
import styles from './styles.module.scss';

const urlLogin = process.env.REACT_APP_AUTH_URL;

const LogIn = () => {
  const { setUserKeyclock } = useKeyclockAuth();
  const [passwordShown, setPasswordShown] = useState(false);
  const [invalidUserError, setInvalidUserError] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register, handleSubmit, formState: { errors },
  } = useForm();

  let component;

  if (passwordShown) {
    component = <img src={eyeClose} alt="ShowPassword" />;
  } else {
    component = <img src={eyeOpen} alt="ShowPassword" />;
  }

  const handleClick = (e) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };

  const handleSingIn = (data) => {
    setLoading(true);
    const { username, password } = data;

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // headers.append('apikey', process.env.REACT_APP_API_KEY_KONG);

    const urlencoded = new URLSearchParams();
    urlencoded.append('grant_type', 'password');
    urlencoded.append('client_id', 'public-cli');
    urlencoded.append('username', username.trim());
    urlencoded.append('password', password.trim());

    const requestOptions = {
      method: 'POST',
      headers,
      body: urlencoded,
      redirect: 'follow',
    };

    fetch(urlLogin, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result && result?.access_token) {
          // console.log('result', result);
          const bxBusinessActiveSession = localStorage.setItem('bxBusinessActiveSession', JSON.stringify(result));
          const accessToken = result.access_token;
          const refreshToken = result.refresh_token;
          // console.log('result.access_token', result.access_token);
          // console.log('result.access_token', result.refresh_token);
          localStorage.setItem('__access-token__', JSON.stringify(accessToken));
          localStorage.setItem('__refresh-token__', JSON.stringify(refreshToken));
          setUserKeyclock(bxBusinessActiveSession);
          setInvalidUserError(false);
          setLoading(false);
          return result;
        }

        return Promise.reject(new Error(result.error_description));
      })
      .catch((error) => {
        console.log(error);
        setInvalidUserError(error);
        setLoading(false);
      });
  };
  return (
    <>
      <Helmet>
        <title>Fulfillment By BlueExpress</title>
        <meta
          name="description"
          content="Fulfillment By BlueExpress"
        />
      </Helmet>
      <div className="container-fluid bg-background-login">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-md-6">
            <div className={`${styles.formImg} text-center py-5 my-5`}>
              <img src={LogoBlue} alt="BlueExpress" width="192" />
            </div>
            <div className={`${styles.formContainer} text-center py-5 my-5 m-auto`}>
              {invalidUserError && (
                <Alert className="mt-5" type="danger" message="Los datos ingresados son incorrectos" />
              )}
              <h3 className={`${styles.formTitle} display-font`}>Ingresa con tu nombre de usuario</h3>
              <form className="form mt-5" onSubmit={handleSubmit(handleSingIn)}>
                <div className="form-group text-start my-4">
                  <label htmlFor="username" className="form-label w-100">
                    <span className={`${styles.formLabel}`}>
                      Nombre de usuario
                    </span>
                    <input
                      type="text"
                      className={`${styles.formInput} form-control mt-2`}
                      name="username"
                      placeholder="miguel"
                      {...register('username', {
                        required: true,
                        // pattern: {
                        //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        //   message: 'Email Invalido',
                        // },
                      })}
                    />
                    {errors.username && (
                      <span className="input-error">Email requerido</span>
                    )}
                  </label>
                </div>
                <div className="form-group text-start my-4">
                  <label htmlFor="password" className="form-label w-100 position-relative">
                    <span className={`${styles.formLabel}`}>
                      Contraseña
                    </span>
                    <input
                      type={passwordShown ? 'text' : 'password'}
                      className={`${styles.formInput} form-control mt-2`}
                      name="password"
                      placeholder="**********"
                      {...register('password', {
                        required: true,
                      })}
                    />
                    <a href="#!" className={`${styles.formShowPassword}`} onClick={handleClick}>
                      {component}
                    </a>
                    {errors.password && (
                      <span className="input-error">Password Requerido</span>
                    )}
                  </label>
                </div>
                <div className="form-group">
                  <Button
                    className="btn btn-secondary mt-4 w-75"
                    text="Ingresar"
                    loading={loading}
                    submit
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="d-none d-md-block col-md-6 p-0">
            <div className={`${styles.ilustrationContainer}`}>
              <div className={`${styles.ilustrationImage} w-100`}>
                <img src="/bg-login-intro.png" alt="Bienvenido a la App" />
              </div>
              <svg height="100vh" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 920">
                <path d="M263.313 275.35C258.908 141.823 365.935 36.147 420 0H0v920h291.848c29.035-10.161 84.201-65.265 72.587-204.389C349.917 541.706 268.82 442.26 263.313 275.35z" fill="#fff" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
