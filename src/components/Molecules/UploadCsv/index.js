import React from 'react'

import { CSVReader } from 'react-papaparse';
import plus from 'assets/brand/plus.svg';

// const buttonRef = React.createRef();

const UploadCsv = ({ setDataToValidate, setDataToUpload, setDataWhitErrors }) => {

  const handleOnDrop = (data) => {
    console.log('dataToValidate', data);

    const formatData = data.map((item) => item.data)
    setDataToValidate(formatData)
  };


  const handleOnError = (err, file, inputElem, reason) => {
    console.log('error', err);
    setDataToValidate([])
  };

  const handleOnRemoveFile = (data) => {
    console.log('dataRemove', data);
    setDataToValidate([]);
    setDataWhitErrors([]);
    setDataToUpload(null);
  };
  
  return (
    <CSVReader
      onDrop={handleOnDrop}
      onError={handleOnError}
      addRemoveButton
      onRemoveFile={handleOnRemoveFile}
      config={{
        header: true,
      }}
      style={{
        dropArea: {
          borderColor: '#3363FF',
          borderRadius: 0,
          background: '#FBFBFB',
        },
        dropAreaActive: {
          borderColor: '#0d6efd',
        },
        dropFile: {
          width: '100%',
          background: '#FBFBFB',
          height: '100px',
          padding: '10px 0',
          alignItems: 'center',
        },
        fileSizeInfo: {
          color: '#3363FF',
          background: '#FBFBFB',
        },
        fileNameInfo: {
          background: '#FBFBFB',
          fontSize: 12,
        },
        removeButton: {
          color: 'blue',
        },
        progressBar: {
          backgroundColor: '#2BB9FF',
        },
      }}
    >
      <span>
        <div className="my-3">
          <img src={plus} alt="Ordenes" width="50" />
        </div>
        <p>
        Arrastra tu archivo o selecciona desde tu computadora
        </p>
      </span>
    </CSVReader>
  );
}
 
export default UploadCsv;