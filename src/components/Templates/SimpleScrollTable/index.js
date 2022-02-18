import { useTable, useSortBy } from 'react-table';
import cs from 'classnames';

import styles from './styles.module.scss';

const SimpleScrollTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    { columns, data },
    useSortBy,
  );

  return (
    <div className={styles.table} {...getTableProps()}>
      <div className={styles.tHead}>
        {headerGroups.map((headerGroup) => (
          <div className={styles.tr}>
            {headerGroup.headers.map((column) => (
              <div
                className={cs(styles.th, {
                  [styles.centered]: headerGroup.headers.length === 1 || column.centered,
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
            No hay datos para mostrar
          </div>
        )}
        {rows.map((row, index) => {
          prepareRow(row);

          return (
            <div className={styles.tr} key={String(index)}>
              {row.cells.map((cell) => (
                <div
                  className={cs(styles.td, {
                    [styles.centered]: cell.column.centered,
                  })}
                  style={cell.column.flex ? { flex: cell.column.flex } : {}}
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
