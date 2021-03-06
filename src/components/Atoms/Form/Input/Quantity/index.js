import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import styles from './quantity.module.scss';

const Quantity = ({ onChange, min, max, className, value }) => {
  const [quantity, setQuantity] = useState(value || 0);

  const subtractHandle = useCallback(() => {
    const substract = quantity - 1;

    if (substract < min) return;

    setQuantity(substract);
    onChange(substract);
  }, [quantity, onChange, setQuantity]);

  const addHandle = useCallback(() => {
    const add = quantity + 1;

    if (add > max) return;

    setQuantity(add);
    onChange(add);
  }, [quantity, onChange, setQuantity]);

  const setQuantityHandle = (event) => {
    const clean = event.target.value.replace(/[^0-9]/g, '');
    const toNumber = Number(clean || 0);

    setQuantity(toNumber);
  };

  const onChangeHandle = () => {
    onChange(quantity);
  };

  return (
    <div className={cs(styles.content, className)}>
      <button
        type="button"
        className={cs(styles.button, styles['button-left'])}
        onClick={subtractHandle}
      >
        -
      </button>
      <input
        type="text"
        value={quantity}
        className={styles.input}
        style={{ width: `${4 + quantity.toString().length}ch` }}
        onChange={setQuantityHandle}
        onBlur={onChangeHandle}
      />
      <button
        type="button"
        className={cs(styles.button, styles['button-right'])}
        onClick={addHandle}
      >
        +
      </button>
    </div>
  );
};

Quantity.defaultProps = {
  min: undefined,
  max: undefined,
  className: '',
  value: 0,
};

Quantity.propTypes = {
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  className: PropTypes.string,
  value: PropTypes.number,
};

export default Quantity;
