import React from 'react'

const ButtonSubmit = ({
  loading, text, className, submit, onClick,
}) => (
  <button
    className={className}
    type={submit ? 'submit' : 'button'}
    disabled={loading}
    onClick={onClick}
  >
    <span className="font-weight-bold px-1">
      {`${text} `}
    </span>
    {loading && <span className="me-2 spinner-grow spinner-grow-sm text-light" role="status" aria-hidden="true" />}
  </button>
);

export default ButtonSubmit;