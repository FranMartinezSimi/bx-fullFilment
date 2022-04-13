import React, { useCallback, useState } from 'react';
import cs from 'classnames';

import calendarIcon from 'assets/brand/calendar.svg';
import Date from '../Date';

import styles from './dateRange.module.scss';

const DateRange = ({ placeholder, onFilter, minDate, maxDate }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [initDate, setInitDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const toggleButton = useCallback(
    () => setShowMenu((prevState) => !prevState),
    [],
  );
  const onFilterHandle = useCallback(() => {
    onFilter(initDate, endDate);
  }, [initDate, endDate]);

  return (
    <div className={styles.content}>
      <button
        className={cs(styles.inputButton, 'px-4')}
        type="button"
        onClick={toggleButton}
      >
        <img src={calendarIcon} alt="calendar" width="14" className="me-2" />
        {' '}
        <span>{placeholder}</span>
      </button>
      <div
        className={cs(styles.menu, 'py-5 px-4 shadow', {
          [styles.show]: showMenu,
        })}
      >
        <div className="w-100 mb-4">
          <Date
            placeholder="Fecha Inicial"
            showTimeSelect={false}
            selected={initDate}
            onChange={setInitDate}
            minDate={minDate}
            maxDate={maxDate}
            selectsStart
            startDate={initDate}
            endDate={endDate}
          />
        </div>

        <div className="w-100 mb-4">
          <Date
            placeholder="Fecha Final"
            showTimeSelect={false}
            selected={endDate}
            onChange={setEndDate}
            maxDate={maxDate}
            selectsEnd
            startDate={initDate}
            endDate={endDate}
            minDate={initDate}
          />
        </div>

        <button type="button" className="btn btn-secondary w-100" onClick={onFilterHandle}>
          Filtrar
        </button>
      </div>
    </div>
  );
};

export default DateRange;
