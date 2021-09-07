import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import plus from 'assets/brand/plus.svg';
import styles from './styles.module.scss';

const Dropzone = ({
  boxText, title, subTitle, setSelectedFiles,
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
    accept: 'image/jpeg, image/png, pdf',
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

  return (
    <section className="container">
      {files.length && files.length > 0
        ? (
          <div className="text-center">
            <h6 className="display-font text-center font-bold" style={{ fontSize: 18 }}>Validación completa</h6>
            <img src="/bgsuccess.jpg" alt="Validación completa" width="100" />
          </div>
        ) : (
          <>
            {title && (
              <h6 className="display-font text-center font-bold" style={{ fontSize: 18 }}>{title}</h6>
            )}
            {subTitle && (
              <p className="text-center">
                {subTitle}
              </p>
            )}
            <div {...getRootProps({ className: styles.dropzone })}>
              <input {...getInputProps()} />
              <span>
                <div className="my-3 text-center">
                  <img src={plus} alt="Ordenes" width="50" />
                </div>
                <p>
                  {boxText}
                </p>
              </span>
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
