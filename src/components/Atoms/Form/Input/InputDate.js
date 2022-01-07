import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <button
    type="button"
    style={{ borderRadius: 16, border: '1px solid #1A6F99', minHeight: 40 }}
    className="form-control text-start "
    onClick={onClick}
    ref={ref}
  >
    {value}
  </button>
));

const InputDate = ({ format = 'dd/MM/yyyy', showTimeSelect, selected, onChange }) => (
  <DatePicker
    dateFormat={format}
    showTimeSelect={showTimeSelect}
    selected={selected}
    onChange={(date) => handleDateChange(date)}
    // timeClassName={handleColor}
    customInput={<CustomInput />}
    minDate={Date.now()}
    filterDate={isWeekday}
    // filterTime={filterPassedTime}
    // locale="es-ES"
    timeIntervals={30}
    minTime={setHours(setMinutes(new Date(), 30), 8)}
    maxTime={setHours(setMinutes(new Date(), 30), 16)}
  />
);

export default InputDate;
