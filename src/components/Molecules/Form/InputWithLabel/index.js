import PropTypes from 'prop-types';

import Label from 'components/Atoms/Form/Label';
import { InputText } from 'components/Atoms/Form/Input';

const InputWithLabel = ({
  lableClassName,
  label,
  inputClassName,
  id,
  disabled,
  value,
  onChangeText,
  placeholder,
  readOnly,
}) => (
  <div className="form-group">
    <Label className={`w-100 mb-4 ${lableClassName}`} id={id} label={label}>
      <InputText
        className={`w-100 ${inputClassName}`}
        id={id}
        disabled={disabled}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </Label>
  </div>
);

InputWithLabel.defaultProps = {
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

InputWithLabel.propTypes = {
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

export default InputWithLabel;
