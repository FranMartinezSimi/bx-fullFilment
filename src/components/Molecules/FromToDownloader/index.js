import { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import clientFetch from 'lib/client-fetch';
import Papa from 'papaparse';
import Button from 'components/Atoms/Button';
import AlertMessage from 'components/Atoms/AlertMessage';

import styles from './styles.module.scss';

const FromToDatePicker = () => {
  const DATE = new Date();
  const [loading, setLoadinng] = useState(false);
  const [startDate, setStartDate] = useState(DATE);
  const [endDate, setEndDate] = useState(DATE);
  const [error, setError] = useState(false);
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
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
    const transform = JSON.stringify(data);
    const csvString = Papa.unparse(transform);

    const blob = new Blob([csvString]);
    const file = document.createElement('a');
    file.href = URL.createObjectURL(blob, { type: 'text/csv;charset=utf-8;' });
    file.download = `order_export_from_${startDate.getDate()}-${startDate.getMonth() + 1}-${startDate.getFullYear()}_to_${endDate.getDate()}-${endDate.getMonth() + 1}-${endDate.getFullYear()}.csv`;
    document.body.appendChild(file);
    file.click();
    document.body.removeChild(file);
  }
  const handleClickReset = () => {
    setStartDate(DATE);
    setEndDate(DATE);
  };
  const handleSubmit = () => {
    setLoadinng(true);
    const starting = `${startDate.getDate()}-${startDate.getMonth() + 1}-${startDate.getFullYear()}`;
    const ending = `${endDate.getDate()}-${endDate.getMonth() + 1}-${endDate.getFullYear()}`;

    clientFetch('order/v1/orders/getOrdersDownload', {
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
        setLoadinng(false);
      })
      .catch(() => {
        setLoadinng(false);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
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
          customInput={<CustomInput />}
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
          customInput={<CustomInput />}
        />
      </div>
      <div className="col-12 mt-5 mb-3">
        {error && (<AlertMessage type="danger" message="Ocurrio un error de comunicación con el servidor..." />)}
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
              loading={loading}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FromToDatePicker;
