import { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

import Button from 'components/Atoms/Button';
import zoom from 'assets/brand/zoom.svg';
import arrowDown from 'assets/brand/arrow-down.svg';
import downloadArrow from 'assets/brand/downloadarrow.svg';
import uploadArrow from 'assets/brand/uploadarrow.svg';
import PropTypes from 'prop-types';

const GlobalFilter = ({
  // preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  handleClick,
  handleClickInventory,
  update,
  exportData,
  hadleClickDropDown,
}) => {
  // const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const [dropDown, setDropDown] = useState(false);

  const onChange = useAsyncDebounce((targetValue) => {
    setGlobalFilter(targetValue.trim() || undefined);
  }, 200);

  const handleClickDropDown = (e) => {
    e.preventDefault();
    setDropDown(!dropDown);
  };

  const checkUrl = (window.location.pathname === '/inventario');
  return (
    <div className="container-fluid px-2">
      <div className="row d-md-flex justify-content-between align-items-start">
        <div className="col-md-6 px-0">
          <ul className="d-md-flex align-items-center">
            <li className="me-4 position-relative">
              <input
                value={value || ''}
                className="form-control px-4"
                style={{ borderRadius: '50rem', border: '1px solid #1A6F99', minWidth: '200px' }}
                onChange={(e) => {
                  setValue(e.target.value);
                  onChange(e.target.value);
                }}
                placeholder="Búsqueda"
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
            {!checkUrl ? (
              <li className="me-5">
                <Button
                  text="Subir Órdenes"
                  className="btn btn-secondary me-3 py-3"
                  imgPrev={<img src={uploadArrow} alt="Actualizar Ordenes" width="13" />}
                  onClick={handleClick}
                />
              </li>
            ) : (
              <li className="me-5">
                <a href="#!" className="btn btn-secondary" onClick={handleClickInventory}>
                  Programar Reposición
                </a>
              </li>
            )}
            <li>
              <a href="#!" onClick={handleClickDropDown} className="position-relative">
                <ul className="d-flex align-items-center bg-white px-4" style={{ border: '1px solid #155C80', height: '40px', borderRadius: 16 }}>
                  <li>
                    <img src={downloadArrow} alt="download" width="14" />
                  </li>
                  <li className="mx-2">
                    <span>
                      Descargar
                      {' '}
                      {!checkUrl ? 'órdenes' : 'inventario'}
                    </span>
                  </li>
                  <li>
                    <img src={arrowDown} alt="Show" width="12" />
                  </li>
                </ul>
              </a>
              <div
                className={`${dropDown ? '' : 'd-none'} bg-white shadow position-absolute p-4`}
                style={{ width: 190, borderRadius: 15 }}
                onBlur={() => setDropDown(false)}
              >
                <a href="#!" className="d-block" onClick={(e) => { e.preventDefault(); exportData('csv', true); }}>
                  <span>
                    Descargar todas
                  </span>
                </a>
                {!checkUrl && (
                  <>
                    <hr />
                    <a href="#!" className="d-block" onClick={hadleClickDropDown}>
                      <span>
                        Descargar por fecha
                      </span>
                    </a>
                  </>
                )}
              </div>
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
  hadleClickDropDown: () => {},
};

GlobalFilter.propTypes = {
  globalFilter: PropTypes.func,
  setGlobalFilter: PropTypes.func,
  handleClick: PropTypes.func,
  hadleClickDropDown: PropTypes.func,
};

export default GlobalFilter;
