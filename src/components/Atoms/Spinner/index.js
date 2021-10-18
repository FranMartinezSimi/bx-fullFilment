import React from 'react';

const Spinner = ({ width, height }) => (
  <div className="text-center">
    <div className="spinner-border" style={{ width: `${width || '4rem'}`, height: `${height || '4rem'}`, color: '#FDA460' }} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default Spinner;
