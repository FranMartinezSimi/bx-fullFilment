import React from 'react';

const Spinner = ({ width = '4rem', height = '4rem', color = '#FDA460' }) => (
  <div className="text-center">
    <div className="spinner-border" style={{ width, height, color }} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default Spinner;
