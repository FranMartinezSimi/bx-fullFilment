import { forwardRef } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import PropTypes from 'prop-types';

registerLocale('es', es);

const CustomInput = forwardRef(({ value, onClick, placeholder }, ref) => (
  <input
    type="button"
    className="form-control text-start"
    onClick={onClick}
    ref={ref}
    value={value || placeholder}
    style={{ height: 40 }}
  />
));

const InputDate = ({
  format = 'dd/MM/yyyy',
  showTimeSelect,
  selected,
  onChange,
  minDate,
  maxDate,
  filterDate,
  minTime,
  maxTime,
  filterTime,
  timeIntervals = 30,
  placeholder = 'Seleccionar',
}) => (
  <DatePicker
    dateFormat={format}
    showTimeSelect={showTimeSelect}
    selected={selected}
    onChange={onChange}
    customInput={<CustomInput />}
    minDate={minDate}
    maxDate={maxDate}
    filterDate={filterDate}
    filterTime={filterTime}
    locale="es"
    timeIntervals={timeIntervals}
    minTime={minTime}
    maxTime={maxTime}
    timeCaption="Hora"
    placeholderText={placeholder}
  />
);

InputDate.defaultProps = {
  format: undefined,
  showTimeSelect: undefined,
  selected: undefined,
  onChange: undefined,
  minDate: undefined,
  maxDate: undefined,
  filterDate: undefined,
  minTime: undefined,
  maxTime: undefined,
  filterTime: undefined,
  timeIntervals: undefined,
  placeholder: undefined,
};

InputDate.propTypes = {
  format: PropTypes.string,
  showTimeSelect: PropTypes.bool,
  selected: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  minTime: PropTypes.instanceOf(Date),
  maxTime: PropTypes.instanceOf(Date),
  filterDate: PropTypes.func,
  filterTime: PropTypes.func,
  timeIntervals: PropTypes.number,
  placeholder: PropTypes.string,
};

export default InputDate;
