import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({
  pageIndex,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  gotoPage,
  pageCount,
  pageOptions,
  preGlobalFilteredRows,
  pageSize,
  setPageSize,
}) => (
  <div className="container px-0">
    <div className="row justify-content-between">
      <div className="col-md-6">
        <ul className="d-flex align-items-center">
          <li className="me-4">
            {pageSize && (
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
                className="form-select"
              >
                {[10, 20, 30, 40, 50].map((itemPageSize) => (
                  <option key={itemPageSize} value={itemPageSize}>
                    Mostrar
                    {' '}
                    {itemPageSize}
                  </option>
                ))}
              </select>
            )}
          </li>
          <li>
            {preGlobalFilteredRows && (
              <p className="mb-0 text-grey">
                {`Mostrando ${pageSize} de ${
                  preGlobalFilteredRows.length
                }`}
              </p>
            )}
          </li>
        </ul>
      </div>
      <div className="col-md-6 col-xl-4">
        {pageCount > 1 && (
          <div
            className="bg-white d-flex align-items-center justify-content-center mb-4"
            style={{ borderRadius: '12px' }}
          >
            <div style={{ width: 43 }}>
              {pageIndex > 2 && (
                <button
                  className="btn btn-pagination--inactive"
                  type="button"
                  onClick={() => gotoPage(0)}
                >
                  {'<'}
                </button>
              )}
            </div>

            {pageIndex > 1 && (
              <div style={{ width: 43 }}>
                <button
                  className="btn btn-pagination--inactive"
                  type="button"
                  onClick={() => gotoPage(pageIndex - 2)}
                >
                  {pageIndex - 1}
                </button>
              </div>
            )}

            {canPreviousPage && (
              <div style={{ width: 43 }}>
                <button
                  className="btn btn-pagination--inactive"
                  type="button"
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  {canPreviousPage && pageIndex}
                </button>
              </div>
            )}

            <button className="btn btn-secondary btn-pagination" type="button">
              {pageIndex + 1}
            </button>

            {canNextPage && (
              <div style={{ width: 43 }}>
                <button
                  className="btn btn-pagination--inactive"
                  type="button"
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  {canNextPage && pageIndex + 2}
                </button>
              </div>
            )}

            {pageIndex + 2 < pageOptions.length && (
              <div style={{ width: 43 }}>
                <button
                  className="btn btn-pagination--inactive"
                  type="button"
                  onClick={() => gotoPage(pageIndex + 2)}
                  disabled={!canNextPage}
                >
                  {pageIndex + 3}
                </button>
              </div>
            )}

            {pageIndex + 3 < pageOptions.length && (
              <div style={{ width: 43 }}>
                <button
                  className="btn btn-pagination--inactive"
                  type="button"
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
);

Pagination.propTypes = {
  pageIndex: PropTypes.number.isRequired,
  previousPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  canPreviousPage: PropTypes.bool.isRequired,
  canNextPage: PropTypes.bool.isRequired,
  gotoPage: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  pageOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  pageSize: PropTypes.number.isRequired,
  setPageSize: PropTypes.func.isRequired,
};

export default Pagination;
