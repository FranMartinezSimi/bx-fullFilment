import PropTypes from 'prop-types';
import cs from 'classnames';

import styles from './cardButton.module.scss';

const CardButton = ({ children, onClick, className, disabled }) => (
  <button
    type="button"
    className={cs(styles.button, className)}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

CardButton.propsType = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default CardButton;
