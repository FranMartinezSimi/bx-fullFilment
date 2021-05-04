import React, { useState } from 'react';
import { useAuth } from 'context/userContex'
import { clientFetch } from 'lib/client-fetch';

import Button from 'components/Atoms/Button';
import Current from 'assets/brand/secondStep.svg';
import ArrowBack from 'assets/brand/back.svg';

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
      [e.target.name] : e.target.value,
    })
  }

  const handleClickGoBack = () => {
    setSelectedItem('firstStep');
  }

  const handleClick = () => {
    
    if(form.account_id.trim() === '' || form.key.trim() === '' ) {
      setErrorMessage('Todos los datos son obligatorios');
      setError(true);
      return;
    }

    setLoading(true);

    clientFetch('credential', {
      headers: {
        "key": form.key,
        "account_id": form.account_id,
        "warehouse": "bx1"
      }
    }, )
      .then((data) => {
        if (data.status === 'successful') {
          const bxBusinessActiveFulfillment = localStorage.setItem('bxBusinessActiveFulfillment', JSON.stringify(form));
          setLoading(false);
          setUser(bxBusinessActiveFulfillment);
          return;
        }
        setSelectedItem('failStep');
      })
      .catch((error) => {
        console.log('error', error);
        setSelectedItem('failStep');

      });


  }
  return (
    <>
      {loading 
        ? (
          <div className="w-100 d-flex flex-column justify-content-center align-items-center" style={{minHeight: '400px'}}>
            <div className="text-center py-5">
              <div className="spinner-border fs-1" style={{width: "6rem", height: "6rem"}} role="status">
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
                    <img src={ArrowBack} alt="back" width="20"/>
                  </a>
                </li>
                <li>
                  <a href="#!" onClick={() => setSelectedItem('failStep')}>
                    <span aria-hidden="true" className="p-0 pe-3" style={{fontSize: '22px'}}>&times;</span>
                  </a>
                </li>
              </ul>
            <img className="w-100" src="./nonImg.jpg" alt="imagen"/>
            </div>
            <ol className="p-0 ps-3">
              <li>
                <a href="https://bx1.shipedge.com/login.php" target="_blank" rel="noreferrer" className="display-font" style={{fontSize: '16px'}}>Ingresa a este link a Shipedge</a>
              </li>
              <li>
                <p className="display-font" style={{fontSize: '16px'}}>Copia tu Account ID y Key, (sigue los pasos de la imagen) y luego pégala en esta pantalla.</p>
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
                  : null 
              }
              <div className="text-center">
                <Button
                  className="btn btn-primary mt-4"
                  text="Siguiente"
                  onClick={handleClick}
                  loading={loading}
                />
                <div className="mt-4" onClick={handleClickGoBack}>
                  <img src={Current} alt="current"/>
                </div>
              </div>
            </div>
          </>
        )
      }
    </>
  );
}

export default SecondStep;
