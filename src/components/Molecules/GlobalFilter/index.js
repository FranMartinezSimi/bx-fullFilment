import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';
import reload from 'assets/brand/reload.svg'

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  handleClick,
  handleClickUpdate
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value.trim() || undefined);
  }, 200);

  const checkUrl = (window.location.pathname === '/inventario');

  return (
    <div className="container-fluid px-2">
      <div className="row d-md-flex justify-content-between align-items-start">
        <div className="col-sm-6 col-md-4 col-lg-3 px-0">
          <input
            value={value || ''}
            className="form-control"
            style={{borderRadius: '50rem'}}
            onChange={(e) => {
              setValue(e.target.value);
              onChange(e.target.value);
            }}
            placeholder={`Buscar en ${count} items`}
          />
        </div>
        {!checkUrl && (
          <div className="col-sm-6">
            <ul className="d-flex justify-content-end">
              <li className="me-5">
                <a href="#!" className="btn btn-complementary" onClick={handleClick}>
                  Subir Orden
                </a>
              </li>
              <li>
                <a href="#!" className="btn btn-complementary" onClick={handleClickUpdate}>
                  <img src={reload} className="me-2" alt="Actualizar" width="25"/>
                  <span>
                    Actualizar
                  </span>
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default GlobalFilter;