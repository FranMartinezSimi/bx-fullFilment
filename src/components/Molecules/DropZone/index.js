import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import plus from 'assets/brand/plus.svg';
import styles from './styles.module.scss';

const Dropzone = ({
  boxText, title, subTitle, setSelectedFiles, className, size, internalTitle, nonvalidate,
}) => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles([...files, ...acceptedFiles]);
    setSelectedFiles([...files, ...acceptedFiles]);
  }, [files]);

  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, application/pdf',
    multiple: false,
  });

  const removeFile = (file) => () => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  const removeAll = () => {
    setFiles([]);
  };

  const component = nonvalidate ? (
    <div className="text-center">
      <h6 className="display-font text-center font-bold" style={{ fontSize: 18 }}>
        Validación completa
      </h6>
      <img src="/bgsuccess.jpg" alt="Validación completa" width="100" />
    </div>
  ) : '';

  return (
    <section className={className}>
      {files.length && files.length > 0
        ? component : (
          <>
            {title && (
              <h6 className="display-font text-center font-bold" style={{ fontSize: 18 }}>{title}</h6>
            )}
            {subTitle && (
              <p className="text-center">
                {subTitle}
              </p>
            )}
            <div {...getRootProps({ className: `${styles.dropzone} ${size === 'small' ? styles.dropzoneSmall : styles.dropzoneNormal}` })}>
              <input {...getInputProps()} />
              <div className={`${size === 'small' ? 'd-flex align-items-center' : ''}`}>
                <div className={`${size === 'small' ? 'me-3 my-2' : 'my-3 text-center'}`}>
                  <img src={plus} alt="Ordenes" width={`${size === 'small' ? '30' : '50'}`} />
                </div>
                <ul className="mb-0">
                  {internalTitle && (
                    <li>
                      <p className="mb-0 mt-2">
                        <b>
                          { internalTitle }
                        </b>
                      </p>
                    </li>
                  ) }
                  <li>
                    {size === 'small' ? (
                      <small style={{ fontSize: 10 }}>
                        {boxText}
                      </small>
                    ) : (
                      <p>
                        {boxText}
                      </p>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      <aside className="fileList ">
        <ul>
          {files.map((file) => (
            <li key={file} className={styles.fileItem}>
              <ul className="d-flex justify-content-between align-items-center">
                <li>
                  {`${file.name} `}
                  <span className={styles.fileSize}>{`${file.size} KB`}</span>
                </li>
                <li>
                  <button className={styles.closeButton} type="button" onClick={removeFile(file)}>X</button>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </aside>
      {files.length > 0 && (
        <a
          href="!#"
          onClick={(e) => { e.preventDefault(); removeAll(); }}
          className="text-center text-secondary-color"
        >
          <u>
            Eliminar todos
          </u>
        </a>
      )}
    </section>
  );
};

export default Dropzone;
