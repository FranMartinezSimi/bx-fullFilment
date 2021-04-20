import React from 'react'

const Alert = ({type, text, className}) => (
  <p className={`alert alert-${type} ${className}`} role="alert">{text}</p>
);
 
export default Alert;