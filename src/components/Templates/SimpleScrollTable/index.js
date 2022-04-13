import { useTable, useSortBy } from 'react-table';
import cs from 'classnames';

import styles from './styles.module.scss';

const SimpleScrollTable = ({ columns, data, isFetching }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  return (
    <div className={styles.table} {...getTableProps()}>
      <div className={styles.tHead}>
        {headerGroups.map((headerGroup) => (
          <div className={styles.tr} key={JSON.stringify(headerGroup)}>
            {headerGroup.headers.map((column) => (
              <div
                key={column.id || column.accesor}
                className={cs(styles.th, {
                  [styles.centered]:
                    headerGroup.headers.length === 1 || column.centered,
                  [styles.sortedDesc]: column.isSorted && column.isSortedDesc,
                  [styles.sortedAsc]: column.isSorted && !column.isSortedDesc,
                })}
                {...column.getHeaderProps(column.getSortByToggleProps())}
                style={{
                  ...(column.flex ? { flex: column.flex } : {}),
                  ...(column.width ? { width: column.width } : {}),
                  ...(column.minWidth ? { minWidth: column.minWidth } : {}),
                  ...(column.maxWidth ? { maxWidth: column.maxWidth } : {}),
                }}
              >
                {column.render('Header')}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.tBody} {...getTableBodyProps()}>
        {rows.length === 0 && (
          <div className={styles.withoutData}>
            {isFetching ? 'Cargando...' : 'No hay datos para mostrar'}
          </div>
        )}
        {rows.map((row, index) => {
          prepareRow(row);

          return (
            <div className={styles.tr} key={String(index)}>
              {row.cells.map((cell) => (
                <div
                  key={cell.column.id || cell.column.accesor}
                  className={cs(styles.td, {
                    [styles.centered]: cell.column.centered,
                  })}
                  style={{
                    ...(cell.column.flex ? { flex: cell.column.flex } : {}),
                    ...(cell.column.width ? { width: cell.column.width } : {}),
                    ...(cell.column.minWidth
                      ? { minWidth: cell.column.minWidth }
                      : {}),
                    ...(cell.column.maxWidth
                      ? { maxWidth: cell.column.maxWidth }
                      : {}),
                  }}
                >
                  {cell.render('Cell')}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SimpleScrollTable;
