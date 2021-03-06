import { CSVReader } from 'react-papaparse';
import plus from 'assets/brand/add.svg';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const UploadCsvFull = ({
  setDataToValidate,
  setDataToUpload,
  setDataWhitErrors,
  size,
  title,
  description,
  onChange,
}) => {
  const handleOnDrop = (data) => {
    const dataWhitErrors = data.some((item) => item.errors.length > 0);

    if (dataWhitErrors) {
      setDataWhitErrors([
        {
          key: 'error en archivo:',
          errors: ['El formato de archivo debe ser ,csv delimitado por cómas'],
          format: true,
        },
      ]);
      onChange([]);
      return;
    }
    const formatData = data.map((item) => item.data);
    setDataToValidate(formatData);
    onChange(formatData);
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
      borderRadius: 10,
      background: '#FBFBFB',
      width: '100%',
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
      <span
        className={`${size === 'small' ? 'd-flex align-items-center' : ''}`}
      >
        <div className={`${size === 'small' ? 'me-3' : 'my-3'}`}>
          <div className="d-flex justify-content-center">
            <img
              src={plus}
              alt="Ordenes"
              width={`${size === 'small' ? '30' : '50'}`}
            />
          </div>
        </div>
        <ul className="mb-0">
          {title && (
            <li>
              <p className="mb-0 mt-2">
                <b>{title}</b>
              </p>
            </li>
          )}
          <li>
            {size === 'small' ? (
              <div className="d-flex justify-content-center">
                <small style={{ fontSize: 10 }}>
                  <p style={{ background: 'red' }}>{description}</p>
                </small>
              </div>
            ) : (
              <p className={styles.pFile}>{description}</p>
            )}
          </li>
        </ul>
      </span>
    </CSVReader>
  );
};

UploadCsvFull.defaultProps = {
  setDataToValidate: () => {},
  setDataToUpload: () => {},
  setDataWhitErrors: () => {},
  title: '',
  size: '',
  description:
    'Arrastra tu archivo o selecciona desde tu computadora en formato Csv y Excel.',
};

UploadCsvFull.propTypes = {
  setDataToValidate: PropTypes.func,
  setDataToUpload: PropTypes.func,
  setDataWhitErrors: PropTypes.func,
  title: PropTypes.string,
  size: PropTypes.string,
  description: PropTypes.string,
};
export default UploadCsvFull;
