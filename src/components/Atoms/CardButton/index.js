import PropTypes from 'prop-types';
import cs from 'classnames';

import styles from './cardButton.module.scss';

const CardButton = ({ children, onClick, className, disabled, placeHolder }) => (
  <button
    type="button"
    className={cs(styles.button, className)}
    onClick={onClick}
    disabled={disabled}
  >
    {placeHolder}
    {children}
  </button>
);

CardButton.propsType = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  placeHolder: PropTypes.string,
};

export default CardButton;
