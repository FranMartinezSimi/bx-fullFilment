import React from 'react'

import { CSVReader } from 'react-papaparse';
import Button from 'components/Atoms/Button';
import loadArrow from 'assets/brand/loadarrow.svg';

// const buttonRef = React.createRef();

const UploadCsv = ({setDataToValidate, setDataToUpload}) => {

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
          borderColor: '#eaeaea',
          borderRadius: 16,
        },
        dropAreaActive: {
          borderColor: '#0d6efd',
        },
        dropFile: {
          width: '100%',
          background: '#eaeaea',
        },
        fileSizeInfo: {
          // color: '#fff',
          backgroundColor: '#eaeaea',
          borderRadius: 3,
          lineHeight: 1,
          marginBottom: '0.5em',
          padding: '0 0.4em',
        },
        fileNameInfo: {
          // color: '#fff',
          backgroundColor: '#eaeaea',
          borderRadius: 3,
          fontSize: 14,
          lineHeight: 1,
          padding: '0 0.4em',
        },
        removeButton: {
          color: 'blue',
        },
        progressBar: {
          backgroundColor: '#333333',
        },
      }}
    >
      <span>
        <p>
          Carga o arrastra el archivo .cvs
        </p> 
      <Button
          text="Cargar archivo"
          className="btn btn-primary"
          imgPrev={(<img src={loadArrow} alt="upload" width="14"/>)}
        />
      </span>
    </CSVReader>
  );
}
 
export default UploadCsv;