import React from 'react'

const Spinner = () => (
  <div className="text-center py-5">
    <div className="spinner-border" style={{width: "4rem", height: "4rem"}} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default Spinner;
