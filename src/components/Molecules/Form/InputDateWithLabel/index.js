import PropTypes from 'prop-types';

import Label from 'components/Atoms/Form/Label';
import { InputDate } from 'components/Atoms/Form/Input';

const InputDateWithLabel = ({
  lableClassName,
  label,
  id,
  format,
  showTimeSelect,
  selected,
  onChange,
  minDate,
  maxDate,
  filterDate,
  minTime,
  maxTime,
  filterTime,
  timeIntervals,
  placeholder,
}) => (
  <div className="form-group">
    <Label className={`w-100 ${lableClassName}`} id={id} label={label}>
      <InputDate
        format={format}
        showTimeSelect={showTimeSelect}
        selected={selected}
        onChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
        filterDate={filterDate}
        filterTime={filterTime}
        timeIntervals={timeIntervals}
        minTime={minTime}
        maxTime={maxTime}
        placeholder={placeholder}
      />
    </Label>
  </div>
);

InputDateWithLabel.defaultProps = {
  lableClassName: undefined,
  label: undefined,
  id: undefined,
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

InputDateWithLabel.propTypes = {
  lableClassName: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
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

export default InputDateWithLabel;
