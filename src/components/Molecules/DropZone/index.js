import { useDropzone } from 'react-dropzone';
import plus from 'assets/brand/plus.svg';

const Dropzone = ({ boxText }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ maxFiles: 12 });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path}
      {' '}
      -
      {file.size}
      {' '}
      bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
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
      <aside className="">
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
};

export default Dropzone;
