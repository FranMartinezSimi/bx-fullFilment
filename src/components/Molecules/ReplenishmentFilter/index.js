import { useState, forwardRef } from 'react';
import { useAsyncDebounce } from 'react-table';

import DatePicker from 'react-datepicker';
import Button from 'components/Atoms/Button';
import zoom from 'assets/brand/zoom.svg';
import calendar from 'assets/brand/calendar.svg';
// import arrowDown from 'assets/brand/arrow-down.svg';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

// const list = ['Exitoso', 'En progreso', 'Error'];
const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  update,
  // setFilter,
  getDataByDate,
}) => {
  const count = preGlobalFilteredRows.length;
  const [ticketValue, setTicketValue] = useState(globalFilter);
  // const [dropDownState, setDropDownState] = useState(false);
  const [dropDownDate, setDropDownDate] = useState(false);

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
  // const handleClickDropDownState = (e) => {
  //   e.preventDefault();
  //   setDropDownState(!dropDownState);
  // };
  const handleClickDropDownDate = (e) => {
    e.preventDefault();
    setDropDownDate(!dropDownDate);
  };
  const handleClickFilter = (e) => {
    e.preventDefault();
    getDataByDate(startDate, endDate);
  };
  const onChange = useAsyncDebounce((targetValue) => {
    setGlobalFilter(targetValue.trim() || undefined);
  }, 200);

  return (
    <div className="container-fluid px-2">
      <div className="row d-md-flex justify-content-between align-items-start">
        <div className="col-md-6 px-0">
          <ul className="d-md-flex align-items-center">
            <li className="me-4 position-relative">
              <input
                value={ticketValue || ''}
                className="form-control px-4"
                style={{ borderRadius: '50rem', border: '1px solid #1A6F99', minWidth: '200px' }}
                onChange={(e) => {
                  setTicketValue(e.target.value);
                  onChange(e.target.value);
                }}
                placeholder={`Buscar en ${count} resultados`}
              />
              <span
                className="position-absolute"
                style={{
                  top: '25%',
                  bottom: '25%',
                  right: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img src={zoom} alt="Show" width="16" />
              </span>
            </li>
            <li className="d-none d-md-block">
              {update && update}
            </li>
          </ul>
        </div>
        <div className="col-md-6">
          <ul className="d-flex justify-content-md-end align-items-center">
            <li className="me-4">
              <a href="#!" onClick={handleClickDropDownDate} className="position-relative">
                <ul
                  className="d-flex align-items-center bg-white px-4"
                  style={{ border: '1px solid #155C80', height: '40px', borderRadius: 16 }}
                >
                  <li>
                    <img src={calendar} alt="download" width="14" />
                  </li>
                  <li className="mx-2">
                    <span>
                      Selecciona una fecha
                    </span>
                  </li>
                </ul>
              </a>
              <ul
                className={`${dropDownDate ? 'd-flex' : 'd-none'} bg-white shadow position-absolute flex-wrap py-4 px-5`}
                style={{ borderRadius: 15, zIndex: 1 }}
                onMouseLeave={() => setDropDownDate(false)}
              >
                <li className={`${styles.item} me-5`}>
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
                </li>
                <li className={styles.item}>
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
                </li>
                <li className={`${styles.itemLast} mt-3`}>
                  <Button
                    className="btn btn-secondary fs-5 px-5"
                    text="filtrar"
                    onClick={handleClickFilter}
                  />
                </li>
              </ul>
            </li>
            <li>
              {/* <a href="#!" onClick={handleClickDropDownState} className="position-relative">
                <ul
                  className="d-flex align-items-center bg-white px-4"
                  style={{ border: '1px solid #155C80', height: '40px', borderRadius: 16 }}
                >
                  <li>
                    <img src={arrowDown} alt="download" width="14" />
                  </li>
                  <li className="mx-2">
                    <span>
                      Estado de carga
                    </span>
                  </li>
                </ul>
              </a> */}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

GlobalFilter.defaultProps = {
  globalFilter: '',
  setGlobalFilter: () => { },
};

GlobalFilter.propTypes = {
  globalFilter: PropTypes.string,
  setGlobalFilter: PropTypes.func,
};

export default GlobalFilter;
