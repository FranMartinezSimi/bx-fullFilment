import React from 'react';
import styles from './styles.module.scss';

const OrderCorrection = ({ dataToValidate, dataWhitErrors }) => {
  console.log('dataToValidate', dataToValidate);
  console.log('dataWhitErrors', dataWhitErrors);
  return (
    <>
      {dataWhitErrors.length > 0 && (
        <ul className={`px-4 py-0 m-0 ${styles.list}`}>
          {dataWhitErrors.map((item) => (
            <li key={item.key} className="list-item">
              <div className="list-item--header">
                <p>
                  Nº de OS:
                  {item.item.NUMERO_ORDEN}
                </p>
                Fila:
                {' '}
                {item.key}
                {item.errors.length > 1 ? ', Errores en' : ', Error en'}
                {' '}
                {item.errors.map((value, key) => (key > 0 ? `- ${value}` : `${value} `))}
              </div>
              <div className="list-item--form">
                {item.errors.map((value) => (
                  <label htmlFor="inputNombre" className="form-label text-uppercase w-100">
                    <span className="d-block">
                      {`nuevo ${value}`}
                    </span>
                    <input className="" type="text" placeholder={value.toLowerCase()} />
                  </label>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default OrderCorrection;
