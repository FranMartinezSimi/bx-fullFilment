
import React from 'react';
import {
  useTable, useSortBy, usePagination, useFilters, useGlobalFilter,
} from 'react-table';
import GlobalFilter from '../../Molecules/GlobalFilter';
import Pagination from '../../Molecules/Pagination'
import styles from './styles.module.scss'

function MainTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    page,
    rows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex },
  } = useTable({
    columns,
    data,
    initialState: { pageIndex: 0 },
  },
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination);

  const firstPageRows = page.slice(0, 20);

  return ( 
    <>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <div className={`${styles.tableWrapper} table-responsive bg-white mt-4 mb-5`} style={{overflowY: 'hidden'}}>
        <table {...getTableProps()} className="table table-borderless mb-0">
          <thead className="bg-grey">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                  width={column.width}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? column.isSortedDesc ? ' 🔽' : ' 🔼' : ''}
                  </span>
                </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {firstPageRows.map((row) => {
              prepareRow(row);
              return (
                <tr style={{ whiteSpace: 'nowrap' }} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>
                      <span className="d-block py-1 my-1">
                        {cell.render('Cell')}
                      </span>
                    </td>
                  ))}
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td>
                  <p>No se encontraron resultados...</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      <Pagination
        pageIndex={pageIndex}
        previousPage={previousPage}
        nextPage={nextPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        gotoPage={gotoPage}
        pageCount={pageCount}
        pageOptions={pageOptions}
      />

    </>
  );
}
 
export default MainTable;