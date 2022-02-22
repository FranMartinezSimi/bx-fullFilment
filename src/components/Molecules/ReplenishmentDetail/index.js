import React from 'react';

const ReplenishmentDetail = ({ activeData }) => {
  console.log('Mani', activeData);
  const manifiesto = activeData;

  return (
    <embed
      width="100%"
      height="600px"
      src={`data:application/pdf;base64,${encodeURI(manifiesto)}`}
    />
  );
};

export default ReplenishmentDetail;
