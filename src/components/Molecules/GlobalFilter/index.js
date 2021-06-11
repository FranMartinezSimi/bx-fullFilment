import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';
// import reload from 'assets/brand/reload.svg';
import PropTypes from 'prop-types';

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  handleClick,
  handleClickUpdate,
  update,
  // setUpdate
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
        <div className="col px-0">
          <ul className="d-flex align-items-center">
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
            <li>
              {update && update}
            </li>
          </ul>
        </div>
        {!checkUrl && (
          <div className="col">
            <ul className="d-flex justify-content-end">
              <li className="me-5">
                <a href="#!" className="btn btn-complementary" onClick={handleClick}>
                  Subir Órdenes
                </a>
              </li>
              <li>
                <a href="#!" className="btn btn-complementary" onClick={handleClickUpdate}>
                  {/* <img src={reload} className="me-2" alt="Actualizar" width="25" /> */}
                  <span>
                    Descargar Órdenes
                  </span>
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

GlobalFilter.defaultProps = {
  preGlobalFilteredRows: {},
  globalFilter: () => {},
  setGlobalFilter: () => {},
  handleClick: () => {},
  handleClickUpdate: () => {},
};

GlobalFilter.propTypes = {
  preGlobalFilteredRows: PropTypes.shape(PropTypes.object),
  globalFilter: PropTypes.func,
  setGlobalFilter: PropTypes.func,
  handleClick: PropTypes.func,
  handleClickUpdate: PropTypes.func,
};

export default GlobalFilter;
