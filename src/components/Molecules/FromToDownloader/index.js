import { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import Button from 'components/Atoms/Button';
import AlertMessage from 'components/Atoms/AlertMessage';
import GetDownloadOrders from 'services/orders/getDownloadOrders';
import { exportFileBlob } from 'helpers';

import { toFormat } from 'utils/date';
import styles from './styles.module.scss';

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

const FromToDatePicker = () => {
  const DATE = new Date();
  const [loading, setLoadinng] = useState(false);
  const [startDate, setStartDate] = useState(DATE);
  const [endDate, setEndDate] = useState(DATE);
  const [error, setError] = useState(false);

  const handleClickReset = () => {
    setStartDate(DATE);
    setEndDate(DATE);
  };

  const handleSubmit = () => {
    setLoadinng(true);
    const starting = toFormat(startDate);
    const ending = toFormat(endDate);

    GetDownloadOrders({ dateInitial: starting, dateFin: ending })
      .then((data) => {
        exportFileBlob(data, `order_export_from_${starting}_to_${ending}.csv`);
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
