import { useCallback, useState } from 'react';
import cs from 'classnames';

import { ReactComponent as ArrowDown } from 'assets/brand/arrow-down.svg';

import styles from './styles.module.scss';

const DropdownButton = ({ children, items = [] }) => {
  const [show, setShow] = useState(false);

  const toggleShow = useCallback(() => {
    setShow((prevState) => !prevState);
  }, []);

  const handleKeyDown = (event) => {
    event.preventDefault();
  };

  const handleClickItem = (onClick) => () => {
    setShow(false);

    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={styles.contentButton}>
      <button type="button" onClick={toggleShow} className={styles.button}>
        {children}
        {' '}
        <ArrowDown width={12} height={12} />
      </button>
      {show && (
        <div className={cs(styles.dropdown, 'shadow')}>
          {items.map(({ label, onClick }, index) => (
            <div
              key={label}
              className={styles.item}
              onClick={handleClickItem(onClick)}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={index}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
