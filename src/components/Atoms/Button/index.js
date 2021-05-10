import React from 'react'

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

export default ButtonSubmit;