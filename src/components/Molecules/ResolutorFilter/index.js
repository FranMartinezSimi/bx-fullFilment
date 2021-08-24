import { useState } from 'react';
import { useAsyncDebounce } from 'react-table';
import zoom from 'assets/brand/zoom.svg';
import arrowDown from 'assets/brand/arrow-down.svg';
import downloadArrow from 'assets/brand/downloadarrow.svg';
import PropTypes from 'prop-types';

const list = ['Estado del ticket', 'Abierto', 'Proceso', 'Cerrado'];
const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  update,
  setFilter,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const [dropDown, setDropDown] = useState(false);

  const handleClickDropDown = (e) => {
    e.preventDefault();
    setDropDown(!dropDown);
  };

  const onChange = useAsyncDebounce((targetValue) => {
    setGlobalFilter(targetValue.trim() || undefined);
  }, 200);

  return (
    <div className="container-fluid px-2">
      <div className="row d-md-flex justify-content-between align-items-start">
        <div className="col-md-6 px-0">
          <ul className="d-md-flex align-items-center">
            <li className="me-4 position-relative">
              <input
                value={value || ''}
                className="form-control px-4"
                style={{ borderRadius: '50rem', border: '1px solid #1A6F99' }}
                onChange={(e) => {
                  setValue(e.target.value);
                  onChange(e.target.value);
                }}
                placeholder={`Buscar en ${count} items`}
              />
              <span className="position-absolute" style={{ top: '5px', right: '8px' }}>
                <img src={zoom} alt="Show" width="16" />
              </span>
            </li>
            <li className="d-none d-md-block">
              {update && update}
            </li>
          </ul>
        </div>
        <div className="col-md-6">
          <ul className="d-flex justify-content-md-end align-items-center">
            <li>
              <a href="#!" onClick={handleClickDropDown} className="position-relative">
                <ul
                  className="d-flex align-items-center bg-white px-4"
                  style={{ border: '1px solid #155C80', height: '40px', borderRadius: 16 }}
                >
                  <li>
                    <img src={downloadArrow} alt="download" width="14" />
                  </li>
                  <li className="mx-2">
                    <span>
                      Estado del ticket
                    </span>
                  </li>
                  <li>
                    <img src={arrowDown} alt="Show" width="12" />
                  </li>
                </ul>
              </a>
              <ul
                className={`${dropDown ? '' : 'd-none'} bg-white shadow position-absolute p-4`}
                style={{ width: 190, borderRadius: 15 }}
                onMouseLeave={() => setDropDown(false)}
              >
                {list && list.map((item) => (
                  <li key={item} className="text-center">
                    {item === 'Estado del ticket' ? (
                      <a className="py-2 d-block" href="#!" onClick={() => { setFilter('status', ''); setDropDown(false); }}>
                        Todos
                      </a>
                    ) : (
                      <a className="py-2 d-block" href="#!" onClick={() => { setFilter('status', item); setDropDown(false); }}>
                        {item}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

GlobalFilter.defaultProps = {
  globalFilter: '',
  setGlobalFilter: () => {},
};

GlobalFilter.propTypes = {
  globalFilter: PropTypes.string,
  setGlobalFilter: PropTypes.func,
};

export default GlobalFilter;
