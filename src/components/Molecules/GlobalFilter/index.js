import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className="container-fluid px-2">
      <div className="row d-md-flex justify-content-between align-items-center">
        <div className="col-md-4 col-lg-3 px-0">
          <input
            value={value || ''}
            className="form-control"
            style={{borderRadius: '50rem'}}
            onChange={(e) => {
              setValue(e.target.value);
              onChange(e.target.value);
            }}
            placeholder={`${count} items...`}
          />
        </div>
        <div className="col-md-2">
          <div className="text-end">
            <a href="#!" className="btn btn-complementary">
              Subir Orden
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlobalFilter;