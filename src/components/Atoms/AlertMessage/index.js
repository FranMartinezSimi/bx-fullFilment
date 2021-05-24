import React from 'react'

const AlertMessage = ({ type, message }) => {
  let component;
  switch (type) {
    case 'danger':
      component = <img src="/emoti-sad.png" alt="sad" width="30"/>;
      break;
    default:
      component = null;
  }
  return (
    <div className={`alert-${type}--icon alert alert-${type}`}>
      <ul className="d-flex align-items-center mb-0">
        <li className="me-3">
          { component }
        </li>
        <li>
          <p className={`font-weight-bold mb-0`} role="alert">
            {message}
          </p>
        </li>
      </ul>
    </div>
  );
}
 
export default AlertMessage;