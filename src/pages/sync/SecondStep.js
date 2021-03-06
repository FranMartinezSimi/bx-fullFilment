import { useState } from 'react';
import { useAuth } from 'context/userContex';
import { useKeyclockAuth } from 'context/userKeyclockContext';

import clientFetch from 'lib/client-fetch';
import jwt from 'jwt-decode';

import Button from 'components/Atoms/Button';
import ArrowBack from 'assets/brand/back.svg';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const SecondStep = ({ setSelectedItem }) => {
  const { setUserKeyclock } = useKeyclockAuth();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    account_id: '',
    key: '',
  });
  const [error, setError] = useState({
    account_id: false,
    key: false,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError((state) => ({
      ...state,
      [e.target.name]: false,
    }));
  };
  const handleClickClose = (e) => {
    e.preventDefault();
    localStorage.removeItem('bxBusinessActiveSession');
    localStorage.removeItem('__access-token__');
    localStorage.removeItem('__refresh-token__');
    setUserKeyclock(null);
  };
  const handleClick = () => {
    if (form.key.trim() === '') {
      setError((state) => ({
        ...state,
        key: true,
      }));
    }
    if (form.account_id.trim() === '') {
      setError((state) => ({
        ...state,
        account_id: true,
      }));
    }

    if (form.account_id.trim().length < 2 || form.key.trim().length < 2) {
      return;
    }

    setLoading(true);

    const TOKEN = window.localStorage.getItem('__access-token__');
    const USER_DATA = jwt(TOKEN);
    const { sub, name, email } = USER_DATA;

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
        onboarding: false,
      },
    })
      .then((data) => {
        if (data.status === 'successful') {
          localStorage.setItem(
            'bxBusinessActiveFulfillment',
            JSON.stringify(data),
          );
          setLoading(false);
          setUser(JSON.stringify(data));
          return;
        }
        setSelectedItem('failStep');
      })
      .catch(() => {
        setSelectedItem('failStep');
      });
  };

  return (
    <>
      {loading ? (
        <div
          className="w-100 d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: '400px' }}
        >
          <div className="text-center py-5">
            <div
              className="spinner-border fs-1"
              style={{ width: '6rem', height: '6rem', color: '#FDA460' }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          <p>Espera mientras sincronizamos tu cuenta Shipedge</p>
        </div>
      ) : (
        <div className="px-5">
          <div className="text-center d-none">
            <ul className="d-flex justify-content-between align-items-center">
              <li>
                <a
                  href="#!"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedItem('firstStep');
                  }}
                >
                  <img src={ArrowBack} alt="back" width="20" />
                </a>
              </li>
              <li>
                <a href="#!" onClick={handleClickClose}>
                  <span
                    aria-hidden="true"
                    className="p-0 pe-3"
                    style={{ fontSize: '22px' }}
                  >
                    &times;
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <ol className={`${styles.orderedList} p-0 mt-5`}>
            <li>
              <a
                href="https://bx1.shipedge.com/login.php"
                target="_blank"
                rel="noreferrer"
                className="display-font"
                style={{ fontSize: '18px' }}
              >
                Ingresa con este link a Shipedge
              </a>
            </li>
            <li>
              <p className="display-font d-inline" style={{ fontSize: '18px' }}>
                Copia tu Account ID y Key, (sigue los pasos de la imagen) y
                luego p??gala en esta pantalla.
              </p>
            </li>
          </ol>
          <div className="row pt-2">
            <div className="col-6">
              <div className="text-center">
                <img
                  src="./sincronizacion-shipedge.gif"
                  alt="imagen"
                  className="w-100"
                />
              </div>
            </div>
            <div className="col-6">
              <form className="form ps-xl-5">
                <div className="form-group mb-5">
                  <label htmlFor="accountId" className="form-label w-100">
                    <span>Account ID</span>
                    <input
                      type="text"
                      className="form-control mt-2"
                      name="account_id"
                      placeholder="Account ID"
                      onChange={handleChange}
                    />
                    {error.account_id && (
                      <span className="text-danger">
                        El campo est?? v??cio, ingresa un Account ID
                      </span>
                    )}
                  </label>
                </div>
                <div className="form-group pt-2">
                  <label htmlFor="key" className="form-label w-100">
                    <span>Key</span>
                    <input
                      type="text"
                      className="form-control mt-2"
                      name="key"
                      placeholder="Key"
                      onChange={handleChange}
                    />
                    {error.key && (
                      <span className="text-danger">
                        El campo est?? v??cio, ingresa un Account ID
                      </span>
                    )}
                  </label>
                </div>
              </form>
            </div>
            <div className="text-center mt-5 pt-4">
              <ul className="d-flex align-items-center justify-content-center">
                <li className="me-5">
                  <Button
                    className="btn btn-complementary fs-5 px-5"
                    text="Atr??s"
                    onClick={() => setSelectedItem('firstStep')}
                  />
                </li>
                <li className="ms-5">
                  <Button
                    className="btn btn-secondary px-4 fs-5"
                    text="Sincronizar"
                    onClick={handleClick}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

SecondStep.propTypes = {
  setSelectedItem: PropTypes.func.isRequired,
};

export default SecondStep;
