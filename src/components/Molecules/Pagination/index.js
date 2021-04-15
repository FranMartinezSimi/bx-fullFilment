import React from "react";

const Pagination = ({
  pageIndex,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  gotoPage,
  pageCount,
  pageOptions,
}) => {
  return (
    <>
      {pageCount > 1 && (
        <div className="d-flex align-items-center justify-content-center mb-4">
          <div style={{ width: 43 }}>
            {pageIndex > 2 && (
              <button
                className="btn btn-pagination--inactive"
                type="button"
                onClick={() => gotoPage(0)}
              >
                &rbrace;
              </button>
            )}
          </div>

          <div style={{ width: 43 }}>
            {pageIndex > 1 && (
              <button
                className="btn btn-pagination--inactive"
                type="button"
                onClick={() => gotoPage(pageIndex - 2)}
              >
                {pageIndex - 1}
              </button>
            )}
          </div>

          <div style={{ width: 43 }}>
            {canPreviousPage && (
              <button
                className="btn btn-pagination--inactive"
                type="button"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                {canPreviousPage && pageIndex}
              </button>
            )}
          </div>

          <button className="btn btn-primary btn-pagination" type="button">
            {pageIndex + 1}
          </button>

          <div style={{ width: 43 }}>
            {canNextPage && (
              <button
                className="btn btn-pagination--inactive"
                type="button"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                {canNextPage && pageIndex + 2}
              </button>
            )}
          </div>

          <div style={{ width: 43 }}>
            {pageIndex + 2 < pageOptions.length && (
              <button
                className="btn btn-pagination--inactive"
                type="button"
                onClick={() => gotoPage(pageIndex + 2)}
                disabled={!canNextPage}
              >
                {pageIndex + 3}
              </button>
            )}
          </div>

          <div style={{ width: 43 }}>
            {pageIndex + 3 < pageOptions.length && (
              <button
                className="btn btn-pagination--inactive"
                type="button"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                &gt;
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Pagination;
