import React from 'react';

import { CSVReader } from 'react-papaparse';
import plus from 'assets/brand/plus.svg';
import PropTypes from 'prop-types';

const UploadCsv = ({ setDataToValidate, setDataToUpload, setDataWhitErrors }) => {
  const handleOnDrop = (data) => {
    const dataWhitErrors = data.some((item) => item.errors.length > 0);

    if (dataWhitErrors) {
      setDataWhitErrors([{
        key: 'error en archivo:',
        errors: ['El formato de archivo debe ser ,csv delimitado por cómas'],
        format: true,
      }]);
      return;
    }

    const formatData = data.map((item) => item.data);
    setDataToValidate(formatData);
  };

  const handleOnError = (err) => {
    setDataWhitErrors(err);
    setDataToValidate([]);
  };

  const handleOnRemoveFile = () => {
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
      accept="text/csv, .csv"
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
};

UploadCsv.defaultProps = {
  setDataToValidate: () => {},
  setDataToUpload: () => {},
  setDataWhitErrors: () => {},
};

UploadCsv.propTypes = {
  setDataToValidate: PropTypes.func,
  setDataToUpload: PropTypes.func,
  setDataWhitErrors: PropTypes.func,
};
export default UploadCsv;
