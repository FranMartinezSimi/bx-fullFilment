import { useCallback } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import styles from './InputText.module.scss';

const InputText = ({
  className,
  id,
  disabled,
  value,
  onChangeText,
  placeholder,
  readOnly,
}) => {
  const onChangeHandle = useCallback((event) => {
    if (onChangeText) {
      onChangeText(event.target.value);
    }
  }, []);

  return (
    <input
      type="text"
      className={cs('form-control', {
        [styles.disabled]: readOnly || disabled,
        [className]: Boolean(className),
      })}
      name={id}
      id={id}
      disabled={readOnly || disabled}
      value={value}
      onChange={onChangeHandle}
      placeholder={placeholder}
      // readOnly={readOnly}
    />
  );
};

InputText.defaultProps = {
  className: undefined,
  id: undefined,
  disabled: false,
  value: undefined,
  onChangeText: undefined,
  placeholder: undefined,
  readOnly: false,
};

InputText.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
};

export default InputText;
