import React from 'react';

const OrderCorrection = ({ dataToValidate, dataWhitErrors }) => {
  console.log('dataToValidate', dataToValidate);
  console.log('dataWhitErrors', dataWhitErrors);
  return (
    <>
      {dataWhitErrors.length > 0 && (
        <ul>
          {dataWhitErrors.map((item) => (
            <li key={item.key}>
              <div>
                Fila:
                {' '}
                {item.key}
                {item.errors.length > 1 ? ', Errores en' : ', Error en'}
                {' '}
                {item.errors.map((value, key) => (key > 0 ? `- ${value}` : `${value} `))}
              </div>
              <div>
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
