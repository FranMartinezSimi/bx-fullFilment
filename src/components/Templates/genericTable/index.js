import {
  useTable, useSortBy, usePagination, useFilters, useGlobalFilter,
} from 'react-table';
import { useExportData } from 'react-table-plugins';
import Pagination from '../../Molecules/Pagination';
import Sort from '../../../assets/brand/sort.svg';
import SortUp from '../../../assets/brand/sortUp.svg';
import SortDown from '../../../assets/brand/sortDown.svg';
import styles from './styles.module.scss';

function MainTable({
  columns,
  data,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    preGlobalFilteredRows,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
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

      <div className={`${styles.tableWrapper} table-responsive bg-white`} style={{ overflowY: 'hidden' }}>
        <table {...getTableProps()} className={`table table-hover mb-0 ${styles.table}`}>
          <thead style={{ background: '#99B1FF' }}>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className={styles.tableRowHeader}>
                {headerGroup.headers.map((column) => (
                  <th
                    className={styles.tableTh}
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
        pageSize={false}
        setPageSize={setPageSize}
        preGlobalFilteredRows={preGlobalFilteredRows}
      />

    </>
  );
}

export default MainTable;
