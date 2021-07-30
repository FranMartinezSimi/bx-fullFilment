import { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import clientFetch from 'lib/client-fetch';
import Papa from 'papaparse';
import Button from 'components/Atoms/Button';

import styles from './styles.module.scss';

const FromToDatePicker = () => {
  const DATE = new Date();
  const [startDate, setStartDate] = useState(DATE);
  const [endDate, setEndDate] = useState(DATE);
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      type="button"
      className={`form-control text-start ${styles.input}`}
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ));
  function getExportFileBlob(data) {
    console.log('data', data);
    const headerNames = ['Id', 'Fecha de creación', 'fecha', 'Nombre', 'Apellido', 'Id de orden', 'Nro de orden', 'Estado', 'Nro de tracking'];
    const csvString = Papa.unparse({ fields: headerNames, data });

    return new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  }
  const handleClickReset = () => {
    setStartDate(DATE);
    setEndDate(DATE);
  };
  const handleSubmit = () => {
    const starting = `${startDate.getDate()}-${startDate.getMonth()}-${startDate.getFullYear()}`;
    const ending = `${endDate.getDate()}-${endDate.getMonth()}-${endDate.getFullYear()}`;

    console.log('startDate', starting);
    console.log('endDate', ending);
    clientFetch('order/v1/orders/getOrdersListDate', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      body: {
        dateInitial: starting,
        dateFin: ending,
      },
    })
      .then((data) => {
        getExportFileBlob(data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  return (
    <div className="row">
      <div className="col-6">
        <p>
          Fecha de inicio
        </p>
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          customInput={<ExampleCustomInput />}
          maxDate={Date.now()}
        />
      </div>
      <div className="col-6">
        <p>
          Fecha final
        </p>
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={Date.now()}
          customInput={<ExampleCustomInput />}
        />
      </div>
      <div className="col-12 mt-5 mb-3">
        <ul className="d-flex justify-content-end">
          <li>
            <Button
              text="Eliminar"
              className="btn btn-complementary me-5"
              onClick={handleClickReset}
            />
          </li>
          <li>
            <Button
              text="Descargar"
              className="btn btn-secondary me-5"
              onClick={handleSubmit}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FromToDatePicker;
