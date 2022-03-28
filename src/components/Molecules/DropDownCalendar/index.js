import React from 'react';
import DropdownButtonCalendar from 'components/Molecules/DropdownButtonCalendar';
import calendar from 'assets/brand/calendar.svg';

import styles from './styles.module.scss';

const DropDownCalendar = ({ items }) => (
  <>
    <div className="d-flex justify-content-start p-0">
      <div className="col-md-4 p-0">
        <div className={styles.months}>
          <div className="row p-0">
            <div className="col-md-3 p-0 ">
              <h6
                style={{
                  fontSize: '22px',
                  fontFamily: 'mont',
                  fontStyle: 'normal',
                  width: '90px',
                  fontWeight: 'bold',
                  marginTop: '10px',
                }}
              >
                Reporte
              </h6>
            </div>
            <div className="col-md-8">
              <DropdownButtonCalendar
                items={items}
              >
                <img src={calendar} alt="download" width="10" />
                {' '}
                Selecciona Mes
              </DropdownButtonCalendar>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default DropDownCalendar;
