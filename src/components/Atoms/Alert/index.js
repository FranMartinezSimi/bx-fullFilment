import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ type, text, className }) => (
  <p className={`alert alert-${type} ${className}`} role="alert">{text}</p>
);
Alert.defaultProps = {
  className: '',
};
Alert.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Alert;
