import {
  useEffect,
  useRef,
  forwardRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import {
  useTable,
  useSortBy,
  usePagination,
  useFilters,
  useGlobalFilter,
} from 'react-table';
import PropTypes from 'prop-types';
import { useExportData } from 'react-table-plugins';
import Papa from 'papaparse';
import Omit from 'lodash/omit';

import GlobalFilter from 'components/Molecules/GlobalFilter';
import Pagination from 'components/Molecules/Pagination';
import Sort from 'assets/brand/sort.svg';
import SortUp from 'assets/brand/sortUp.svg';
import SortDown from 'assets/brand/sortDown.svg';
import styles from './styles.module.scss';

function getExportFileBlob({ columns, data, fileType }) {
  if (fileType === 'csv') {
    const headerNames = columns
      .filter((col) => col.exportValue !== 'ver' && col.exportValue !== 'label')
      .map((col) => col.exportValue.replace('Nº', 'Nro'));
    const csvString = Papa.unparse({ fields: headerNames, data });
    return new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  }
  return false;
}

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <input
      type="checkbox"
      className="form-check-input"
      ref={resolvedRef}
      {...rest}
    />
  );
});
function MainTable({
  columns,
  data,
  handleClick,
  handleClickInventory,
  handleClickUpdate,
  hadleClickDropDown,
  update,
  noFilters,
  noButtons,
  buttonChildren,
  selectableRow,
  onChangeSelection,
}) {
  const [rowsSelected, setRowsSelected] = useState({});
  const [allSelected, setAllSelected] = useState(false);

  const isIndeterminate = useMemo(() => {
    if (allSelected) return false;

    return Boolean(Object.keys(rowsSelected).length);
  }, [rowsSelected, allSelected]);

  const toggleSelected = useCallback((id, row) => {
    setRowsSelected((selected) => {
      if (selected[id]) {
        return Omit(selected, id);
      }

      return {
        ...selected,
        [id]: row,
      };
    });
  }, []);

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
    flatRows,
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

  useEffect(() => {
    if (!selectableRow || !onChangeSelection) return;

    onChangeSelection(Object.keys(rowsSelected).map((id) => rowsSelected[id]));
  }, [isIndeterminate, allSelected, rowsSelected, onChangeSelection]);

  return (
    <div>
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

      {!noFilters && (
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
          handleClick={handleClick}
          handleClickInventory={handleClickInventory}
          handleClickUpdate={handleClickUpdate}
          hadleClickDropDown={hadleClickDropDown}
          update={update}
          getExportFileBlob={getExportFileBlob}
          exportData={exportData}
          noButtons={noButtons}
          buttonChildren={buttonChildren}
        />
      )}
      <div
        className={`${styles.tableWrapper} table-responsive bg-white mt-4 mb-5`}
        style={{ overflowY: 'hidden' }}
      >
        <table
          {...getTableProps()}
          className={`table table-borderless table-hover mb-0 ${styles.table}`}
        >
          <thead style={{ background: '#99B1FF' }}>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className={styles.tableRowHeader}
              >
                {selectableRow && (
                  <th className={`display-font ${styles.tableTh}`}>
                    <IndeterminateCheckbox
                      checked={allSelected}
                      indeterminate={isIndeterminate}
                      onClick={() => {
                        if (isIndeterminate || !allSelected) {
                          setAllSelected(true);
                          setRowsSelected(
                            flatRows.reduce(
                              (acum, row) => ({
                                ...acum,
                                [row.id]: row.values,
                              }),
                              {},
                            ),
                          );

                          return;
                        }

                        setAllSelected(false);
                        setRowsSelected({});
                      }}
                    />
                  </th>
                )}
                {headerGroup.headers.map((column) => (
                  <th
                    className={`display-font ${styles.tableTh}`}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render('Header')}
                    {!column.isSorted ? (
                      <span className={styles.symbol}>
                        <img src={Sort} alt="sort" className="ms-2" width="8" />
                      </span>
                    ) : null}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <img
                            src={SortDown}
                            alt="sortDown"
                            className="ms-2"
                            width="10"
                          />
                        ) : (
                          <img
                            src={SortUp}
                            alt="sortUp"
                            className="ms-2"
                            width="10"
                          />
                        )
                      ) : (
                        ''
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.length > 0 ? (
              <>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr style={{ whiteSpace: 'nowrap' }} {...row.getRowProps()}>
                      {selectableRow && (
                        <td>
                          <IndeterminateCheckbox
                            checked={Boolean(rowsSelected[row.id])}
                            style={{ cursor: 'pointer' }}
                            onClick={() => toggleSelected(row.id, row.values)}
                          />
                        </td>
                      )}
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      ))}
                    </tr>
                  );
                })}
              </>
            ) : (
              <tr>
                <td colSpan={columns.length + (selectableRow ? 1 : 0)}>
                  <p>No se encontraron datos</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {pageCount > 0 && (
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
      )}
    </div>
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
