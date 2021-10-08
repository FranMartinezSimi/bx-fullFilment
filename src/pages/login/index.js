import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useKeyclockAuth } from 'context/userKeyclockContext';
import jwt from 'jwt-decode';
import useNotify from 'hooks/useNotify';
import LogoBlue from 'assets/brand/logoBlue.svg';
import eyeOpen from 'assets/brand/eyeOpen.svg';
import eyeClose from 'assets/brand/eyeClose.svg';
import Button from 'components/Atoms/Button';
import styles from './styles.module.scss';

const urlLogin = process.env.REACT_APP_AUTH_URL;

const LogIn = () => {
  const { setUserKeyclock } = useKeyclockAuth();
  const [passwordShown, setPasswordShown] = useState(false);
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
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((result) => {
        if (result && result?.access_token) {
          const USER_ACTIVE = window.localStorage.getItem('bxBusinessActiveFulfillment');
          const accessToken = result.access_token;
          const refreshToken = result.refresh_token;

          if (USER_ACTIVE) {
            const userActiveData = JSON.parse(USER_ACTIVE);
            const USER_DATA = jwt(accessToken);
            const { sub } = USER_DATA;
            const compare = sub === userActiveData.credential.user.sub;

            if (!compare) {
              useNotify('error', 'Usuario no coincide con el recordado');
              return Promise.reject(new Error('Usuario no coincide con el almacenado en local storage'));
            }
          }

          const bxBusinessActiveSession = localStorage.setItem('bxBusinessActiveSession', JSON.stringify(result));
          localStorage.setItem('__access-token__', JSON.stringify(accessToken));
          localStorage.setItem('__refresh-token__', JSON.stringify(refreshToken));

          setUserKeyclock(bxBusinessActiveSession);
          setLoading(false);

          return result;
        }

        return Promise.reject(new Error(result.error_description));
      })
      .catch((error) => {
        if (error.status === 401) {
          useNotify('error', 'Los datos ingresados son incorrectos');
        }

        if (error.status >= 500) {
          useNotify('error', 'Los servicios no responden...');
        }
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
        <div className="row h-100 justify-content-end align-items-center">
          <div className="col-md-4">
            <div className={`${styles.formImg} text-center py-4 my-5`}>
              <img src={LogoBlue} alt="BlueExpress" width="111" />
            </div>
            <div className={`${styles.formContainer} text-center py-5 my-5 m-auto`}>
              <h3 className={`${styles.formTitle} display-font`}>Ingresa con tu nombre de usuario</h3>
              <form className="form mt-5" onSubmit={handleSubmit(handleSingIn)}>
                <div className="form-group text-start my-4">
                  <label htmlFor="username" className="form-label w-100">
                    <span className={`${styles.formLabel}`}>
                      Nombre de usuario
                    </span>
                    <input
                      type="text"
                      className={`${styles.formInput} ${errors.username ? styles.formInputError : ''} form-control mt-2`}
                      name="username"
                      placeholder="Introduce un nombre"
                      {...register('username', {
                        required: true,
                      })}
                    />
                    {errors.username && (
                      <span className={`${styles.formInputSpanError}`}>Email requerido</span>
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
                      className={`${styles.formInput} ${errors.password ? styles.formInputError : ''} form-control mt-2`}
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
                      <span className={`${styles.formInputSpanError}`}>Password Requerido</span>
                    )}
                  </label>
                </div>
                <div className="form-group">
                  <Button
                    className="btn btn-secondary mt-4 w-100 fs-4"
                    text="Ingresar"
                    loading={loading}
                    submit
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="d-none d-md-block col-md-7 p-0">
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
