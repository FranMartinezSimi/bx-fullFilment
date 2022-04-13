import {
  useState,
  useEffect,
  useCallback,
} from 'react';
import cs from 'classnames';

import RadioIcon from './radio.svg';

import styles from './radio.module.scss';

const RadioButton = ({
  disabled,
  checked,
  label,
  id,
  name,
  initialChecked,
  onChange,
  ...props
}) => {
  const [selfChecked, setSelfChecked] = useState(initialChecked);

  useEffect(() => {
    if (checked === undefined) return;
    setSelfChecked(checked);
  }, [checked]);

  const changeHandle = useCallback(
    (event) => {
      if (disabled) return;
      const selfEvent = {
        target: {
          checked: !selfChecked,
          value: props.value,
        },
        stopPropagation: event.stopPropagation,
        preventDefault: event.preventDefault,
        nativeEvent: event,
      };

      if (onChange) onChange(selfEvent);
    },
    [disabled, selfChecked, onChange],
  );

  return (
    <label
      htmlFor={id}
      className={cs(styles.radioContainer, {
        [styles.radioContainerDisabled]: disabled,
      })}
    >
      <div className={styles.radioCheck}>
        <input
          className={styles.formRadio}
          type="radio"
          checked={selfChecked}
          disabled={disabled}
          onChange={changeHandle}
          id={id}
          name={name}
          {...props}
        />
        <span>
          <RadioIcon size="16" isActive={selfChecked} />
        </span>
      </div>
      {label && <span className={styles.formRadioLabel}>{label}</span>}
    </label>
  );
};

RadioButton.defaultProps = {
  initialChecked: false,
};

RadioButton.displayName = 'RadioButton';

export default RadioButton;
