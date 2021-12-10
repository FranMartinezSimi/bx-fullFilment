import { CSVReader } from 'react-papaparse';
import plus from 'assets/brand/plus.svg';
import PropTypes from 'prop-types';

const UploadCsv = ({
  setDataToValidate, setDataToUpload, setDataWhitErrors, size, title,
}) => {
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

  const styleSmall = {
    dropArea: {
      borderColor: '#3363FF',
      borderRadius: 10,
      background: '#FBFBFB',
      padding: 11,
    },
    dropAreaActive: {
      borderColor: '#0d6efd',
    },
    dropFile: {
      width: '100%',
      background: '#FBFBFB',
      height: '100px',
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
  };

  const styleXl = {
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
        skipEmptyLines: true,
      }}
      style={size === 'small' ? styleSmall : styleXl}
    >
      <span className={`${size === 'small' ? 'd-flex align-items-center' : ''}`}>
        <div className={`${size === 'small' ? 'me-3' : 'my-3'}`}>
          <img src={plus} alt="Ordenes" width={`${size === 'small' ? '30' : '50'}`} />
        </div>
        <ul className="mb-0">
          {title && (
            <li>
              <p className="mb-0 mt-2">
                <b>
                  {title}
                </b>
              </p>
            </li>
          )}
          <li>
            {size === 'small' ? (
              <small style={{ fontSize: 10 }}>
                Arrastra tu archivo o selecciona desde tu computadora
              </small>
            ) : (
              <p>
                Arrastra tu archivo o selecciona desde tu computadora
              </p>
            )}
          </li>
        </ul>
      </span>
    </CSVReader>
  );
};

UploadCsv.defaultProps = {
  setDataToValidate: () => { },
  setDataToUpload: () => { },
  setDataWhitErrors: () => { },
  title: '',
  size: '',
};

UploadCsv.propTypes = {
  setDataToValidate: PropTypes.func,
  setDataToUpload: PropTypes.func,
  setDataWhitErrors: PropTypes.func,
  title: PropTypes.string,
  size: PropTypes.string,
};
export default UploadCsv;
