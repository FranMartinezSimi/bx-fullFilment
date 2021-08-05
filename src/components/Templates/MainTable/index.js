import React from 'react';
import {
  useTable, useSortBy, usePagination, useFilters, useGlobalFilter,
} from 'react-table';
import PropTypes from 'prop-types';
import { useExportData } from 'react-table-plugins';
import Papa from 'papaparse';
import GlobalFilter from '../../Molecules/GlobalFilter';
import Pagination from '../../Molecules/Pagination';
import Sort from '../../../assets/brand/sort.svg';
import SortUp from '../../../assets/brand/sortUp.svg';
import SortDown from '../../../assets/brand/sortDown.svg';
import styles from './styles.module.scss';

function getExportFileBlob({
  columns, data, fileType,
}) {
  if (fileType === 'csv') {
    const headerNames = columns
      .filter((col) => (col.exportValue !== 'ver' && col.exportValue !== 'label'))
      .map((col) => col.exportValue.replace('Nº', 'Nro'));
    const csvString = Papa.unparse({ fields: headerNames, data });
    return new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  }
  return false;
}
function MainTable({
  columns,
  data,
  handleClick,
  handleClickUpdate,
  handleDropDown,
  update,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    state,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    preGlobalFilteredRows,
    setGlobalFilter,
    setPageSize,
    exportData,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      getExportFileBlob,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useExportData,
  );

  return (
    <>
      <pre className="d-none">
        <code>
          {JSON.stringify(
            {
              pageSize,
              pageCount,
            },
            null,
            2,
          )}
        </code>
      </pre>

      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
        handleClick={handleClick}
        handleClickUpdate={handleClickUpdate}
        handleDropDown={handleDropDown}
        update={update}
        getExportFileBlob={getExportFileBlob}
        exportData={exportData}
      />
      <div className={`${styles.tableWrapper} table-responsive bg-white mt-4 mb-5`} style={{ overflowY: 'hidden' }}>
        <table {...getTableProps()} className={`table table-borderless table-hover mb-0 ${styles.table}`}>
          <thead style={{ background: '#99B1FF' }}>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className={styles.tableRowHeader}>
                {headerGroup.headers.map((column) => (
                  <th
                    className={`display-font ${styles.tableTh}`}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render('Header')}
                    {!column.isSorted
                      ? (
                        <span className={styles.symbol}>
                          <img src={Sort} alt="sort" className="ms-2" width="8" />
                        </span>
                      )
                      : (
                        null
                      )}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? (<img src={SortDown} alt="sortDown" className="ms-2" width="10" />)
                          : (<img src={SortUp} alt="sortUp" className="ms-2" width="10" />)
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr style={{ whiteSpace: 'nowrap' }} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
            {page.length === 0 && (
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
        pageSize={pageSize}
        setPageSize={setPageSize}
        preGlobalFilteredRows={preGlobalFilteredRows}
      />

    </>
  );
}

MainTable.defaultProps = {
  handleClick: () => {},
  handleClickUpdate: () => {},
};

MainTable.propTypes = {
  handleClick: PropTypes.func,
  handleClickUpdate: PropTypes.func,
};

export default MainTable;
