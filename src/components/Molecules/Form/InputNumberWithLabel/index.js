import PropTypes from 'prop-types';

import Label from 'components/Atoms/Form/Label';
import { InputNumber } from 'components/Atoms/Form/Input';

const InputNumberWithLabel = ({
  lableClassName,
  label,
  inputClassName,
  id,
  ...props
}) => (
  <div className="form-group">
    <Label className={`w-100 ${lableClassName}`} id={id} label={label}>
      <InputNumber
        className={`w-100 ${inputClassName}`}
        id={id}
        name={id}
        {...props}
      />
    </Label>
  </div>
);

InputNumberWithLabel.defaultProps = {
  lableClassName: undefined,
  label: undefined,
  inputClassName: undefined,
  id: undefined,
  disabled: false,
  value: undefined,
  onChangeText: undefined,
  placeholder: undefined,
  readOnly: false,
};

InputNumberWithLabel.propTypes = {
  lableClassName: PropTypes.string,
  label: PropTypes.string,
  inputClassName: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
};

export default InputNumberWithLabel;
