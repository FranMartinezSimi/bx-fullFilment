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
  totalPagesFetch
}) => {
  return (
    <div className="container px-0">
      <div className="row justify-content-between">
        <div className="col-md-6">
          {totalPagesFetch && (
            <p className="mb-0 text-grey">{`Mostrando 10 de ${(totalPagesFetch * 20)}`}</p>
          )}
        </div>
        <div className="col-md-6 col-xl-4">
          {pageCount > 1 && (
            <div className="bg-white d-flex align-items-center justify-content-center mb-4" style={{ borderRadius: '12px' }}>
              <div style={{ width: 43 }}>
                {pageIndex > 2 && (
                  <button
                    className="btn btn-pagination--inactive"
                    type="button"
                    onClick={() => gotoPage(0)}
                  >
                    {`<`}
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

              <button className="btn btn-primary btn-pagination" type="button">
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
};

export default Pagination;
