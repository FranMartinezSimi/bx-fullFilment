import { useCallback, forwardRef } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import styles from './text.module.scss';

const InputText = forwardRef(({
  className,
  id,
  disabled,
  value,
  onChangeText,
  placeholder,
  readOnly,
  onClick,
}, ref) => {
  const onChangeHandle = useCallback((event) => {
    if (onChangeText) {
      onChangeText(event.target.value);
    }
  }, []);

  return (
    <input
      ref={ref}
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
      readOnly={readOnly}
      onClick={onClick}
    />
  );
});

InputText.defaultProps = {
  className: undefined,
  id: undefined,
  disabled: false,
  value: undefined,
  onChangeText: undefined,
  onClick: undefined,
  placeholder: undefined,
  readOnly: false,
};

InputText.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
};

export default InputText;
