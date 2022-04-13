import React, { useState, useEffect } from 'react';

import Card from 'components/Molecules/Card';
import styles from './styles.module.scss';

const OrderCorrection = ({
  dataWhitErrors, setDataToValidate,
}) => {
  const [dataToCorrect, setDataToCorrect] = useState([]);
  const [validatedData, setValidatedData] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
  };

  const handleValidate = (e) => {
    e.preventDefault();
    setDataToValidate(validatedData);
  };

  const handleChange = (e, value, index) => {
    const fixedData = [...dataWhitErrors];
    fixedData[index][value] = e.target.value;
    setValidatedData(fixedData);
  };

  useEffect(() => {
    if (!dataWhitErrors[0].format) {
      const wrongItems = dataWhitErrors.filter((item) => (item.errors));
      setDataToCorrect(wrongItems);
    }
  }, [dataWhitErrors]);

  return (
    <>
      {!dataWhitErrors[0].format && dataWhitErrors.length > 0 && (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <h2 className="display-font my-5">Por favor corrige tus errores</h2>
            </div>
            <div className="col-md-9">
              <Card className="shadow p-md-0">
                <ul className={`p-0 m-0 ${styles.list}`}>
                  {dataToCorrect.map((item) => (
                    <li key={item.key} className={styles.listItem}>
                      <ul className={`d-flex flex-row p-3 w-100 ${styles.listItemHeader}`}>
                        <li className="me-3">
                          <strong>
                            {`Nº Fila: ${item.key + 1}`}
                          </strong>
                        </li>
                        <li>
                          {item.errors.length > 1 ? ' Errores en:' : ' Error en:'}
                          <small className="text-danger p-2">
                            {item.errors.map((value, key) => (key > 0 ? ` / ${value}` : `${value} `))}
                          </small>
                        </li>
                        <li className="ms-auto">
                          <a href="!#" className="px-2 py-5" onClick={handleClick}>
                            +
                          </a>
                        </li>
                      </ul>
                      <div className={`container ${styles.listItemForm}`}>
                        <div className="row">
                          {item.errors.map((value) => (
                            <div className="col-md-4">
                              <label htmlFor={value.toLowerCase()} className="form-label text-uppercase w-100">
                                <span className="">
                                  {`${value}`}
                                </span>
                                <input
                                  className="form-control"
                                  type="text"
                                  name={value.toLowerCase()}
                                  placeholder={`ingresa ${value.toLowerCase()}`}
                                  onChange={(e) => handleChange(e, value, item.key)}
                                />
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
            <div className="col-9">
              <div className="text-end mt-4">
                <a href="#!" className="btn btn-complementary" onClick={handleValidate}>Validar Datos</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderCorrection;
