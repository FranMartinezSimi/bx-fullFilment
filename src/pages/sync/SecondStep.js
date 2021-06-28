import React, { useState } from 'react';
import { useAuth } from 'context/userContex';
import clientFetch from 'lib/client-fetch';
import jwt from 'jwt-decode';

import Button from 'components/Atoms/Button';
import Current from 'assets/brand/secondStep.svg';
import ArrowBack from 'assets/brand/back.svg';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const SecondStep = ({ setSelectedItem }) => {
  const { setUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    account_id: '',
    key: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickGoBack = () => {
    setSelectedItem('firstStep');
  };

  const handleClick = () => {
    if (form.account_id.trim() === '' || form.key.trim() === '') {
      setErrorMessage('Todos los datos son obligatorios');
      setError(true);
      return;
    }

    setLoading(true);

    const TOKEN = window.localStorage.getItem('__access-token__');
    const USER_DATA = jwt(TOKEN);
    const { sub, name, email } = USER_DATA;

    // console.log('data:', { sub, name, email });

    clientFetch('user/sync-oms-shipedge/v1/validate', {
      headers: {
        key: form.key,
        warehouse: 'bx1',
        account_id: form.account_id,
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      body: {
        sub,
        name,
        email,
      },
    })
      .then((data) => {
        // console.log(data);
        if (data.status === 'successful') {
          const bxBusinessActiveFulfillment = localStorage.setItem('bxBusinessActiveFulfillment', JSON.stringify(form));
          setLoading(false);
          setUser(bxBusinessActiveFulfillment);
          return;
        }
        setSelectedItem('failStep');
      })
      .catch((err) => {
        console.log('error', err);
        setSelectedItem('failStep');
      });
  };
  return (
    <>
      {loading
        ? (
          <div className="w-100 d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '400px' }}>
            <div className="text-center py-5">
              <div className="spinner-border fs-1" style={{ width: '6rem', height: '6rem', color: '#FDA460' }} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
            <p>Espera mientras sincronizamos tu cuenta Shipedge</p>
          </div>
        )
        : (
          <>
            <div className="card-img mb-4">
              <ul className="d-flex justify-content-between align-items-center">
                <li>
                  <a href="#!" onClick={() => setSelectedItem('firstStep')}>
                    <img src={ArrowBack} alt="back" width="20" />
                  </a>
                </li>
                <li>
                  <a href="#!" onClick={() => setSelectedItem('failStep')}>
                    <span aria-hidden="true" className="p-0 pe-3" style={{ fontSize: '22px' }}>&times;</span>
                  </a>
                </li>
              </ul>
              <div className="text-center">
                <img src="./fulfill2.jpg" alt="imagen" width="300" />
              </div>
            </div>
            <ol className={`${styles.orderedList} p-0 ps-3`}>
              <li>
                <a href="https://bx1.shipedge.com/login.php" target="_blank" rel="noreferrer" className="display-font" style={{ fontSize: '16px' }}>Ingresa a este link a Shipedge</a>
              </li>
              <li>
                <p className="display-font d-inline" style={{ fontSize: '16px' }}>Copia tu Account ID y Key, (sigue los pasos de la imagen) y luego pégala en esta pantalla.</p>
              </li>
            </ol>
            <div className="pt-2">
              <form className="form">
                <div className="form-group">
                  <label htmlFor="accountId" className="form-label w-100">
                    <span>
                      Account ID
                    </span>
                    <input
                      type="text"
                      className="form-control mt-2"
                      name="account_id"
                      placeholder="Account ID"
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="form-group pt-2">
                  <label htmlFor="key" className="form-label w-100">
                    <span>
                      Key
                    </span>
                    <input
                      type="text"
                      className="form-control mt-2"
                      name="key"
                      placeholder="Key"
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </form>
              { error
                ? <p className="alert alert-danger mt-3" role="alert">{errorMessage}</p>
                : null}
              <div className="text-center">
                <Button
                  className="btn btn-secondary mt-4 px-5"
                  text="Siguiente"
                  onClick={handleClick}
                  loading={loading}
                />
                <a href="#!" className="mt-4 d-block" onClick={handleClickGoBack}>
                  <img src={Current} alt="current" />
                </a>
              </div>
            </div>
          </>
        )}
    </>
  );
};

SecondStep.propTypes = {
  setSelectedItem: PropTypes.func.isRequired,
};

export default SecondStep;
