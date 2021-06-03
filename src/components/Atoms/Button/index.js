import React from 'react';
import PropTypes from 'prop-types';

const ButtonSubmit = ({
  loading, text, className, submit, onClick, imgPrev, imgNext
}) => (
  <button
    className={className}
    type={submit ? 'submit' : 'button'}
    disabled={loading}
    onClick={onClick}
  >
    {imgPrev && (
      <span className="me-2">
        {imgPrev}
      </span>
    )}
    <span className="font-weight-bold px-1">
      {`${text} `}
    </span>
    {imgNext&& (
      <span className="ms-2">
        {imgNext}
      </span>
    )}
    {loading && <span className="me-2 spinner-grow spinner-grow-sm text-light" role="status" aria-hidden="true" />}
  </button>
);

ButtonSubmit.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string,
  className: PropTypes.string,
  submit: PropTypes.string,
  onClick: PropTypes.func,
  imgPrev: PropTypes.node,
  imgNext: PropTypes.node
}
 
export default ButtonSubmit;
