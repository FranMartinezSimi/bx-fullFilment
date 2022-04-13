import React from 'react';
import DropdownButton from 'components/Molecules/DropdownButton';
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
              <DropdownButton
                items={items}
              >
                <img src={calendar} alt="download" width="14" />
                {' '}
                Selecciona Mes
              </DropdownButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default DropDownCalendar;
