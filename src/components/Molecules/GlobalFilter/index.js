import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';
import PropTypes from 'prop-types';

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  handleClick,
  update,
  exportData,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);

  const onChange = useAsyncDebounce((targetValue) => {
    setGlobalFilter(targetValue.trim() || undefined);
  }, 200);

  const checkUrl = (window.location.pathname === '/inventario');
  return (
    <div className="container-fluid px-2">
      <div className="row d-md-flex justify-content-between align-items-start">
        <div className="col-md-6 px-0">
          <ul className="d-md-flex align-items-center">
            <li className="me-4">
              <input
                value={value || ''}
                className="form-control px-4"
                style={{ borderRadius: '50rem' }}
                onChange={(e) => {
                  setValue(e.target.value);
                  onChange(e.target.value);
                }}
                placeholder={`Buscar en ${count} items`}
              />
            </li>
            <li className="d-none d-md-block">
              {update && update}
            </li>
          </ul>
        </div>
        <div className="col-md-6">
          <ul className="d-flex justify-content-md-end">
            {!checkUrl && (
              <li className="me-5">
                <a href="#!" className="btn btn-complementary" onClick={handleClick}>
                  Subir Órdenes
                </a>
              </li>
            )}
            <li>
              <a href="#!" className="btn btn-complementary" onClick={() => { exportData('csv', true); }}>
                <span>
                  Descargar todas
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

GlobalFilter.defaultProps = {
  globalFilter: () => {},
  setGlobalFilter: () => {},
  handleClick: () => {},
};

GlobalFilter.propTypes = {
  globalFilter: PropTypes.func,
  setGlobalFilter: PropTypes.func,
  handleClick: PropTypes.func,
};

export default GlobalFilter;
