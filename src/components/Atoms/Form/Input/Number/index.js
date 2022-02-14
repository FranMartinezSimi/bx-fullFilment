import { forwardRef } from 'react';
import cs from 'classnames';

import styles from './inputNumber.module.scss';

const InputNumber = forwardRef(({ onChange, className, ...props }, ref) => {
  const handleChange = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <input
      ref={ref}
      type="number"
      onChange={handleChange}
      {...props}
      className={cs('form-control', styles.input, {
        [styles.disabled]: props.readOnly || props.disabled,
        [className]: Boolean(className),
      })}
    />
  );
});

export default InputNumber;
