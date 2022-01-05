import React from 'react';

const ReplenishmentDetail = ({ activeData }) => {
  const manifiesto = activeData.replace(' ', '');

  return (
    <embed
      width="100%"
      height="600px"
      src={`data:application/pdf;base64,${encodeURI(manifiesto)}`}
    />
  );
};

export default ReplenishmentDetail;
