import { useState } from 'react';
import {
  useTable, useSortBy, usePagination, useFilters, useGlobalFilter,
} from 'react-table';
import PropTypes from 'prop-types';
import { useExportData } from 'react-table-plugins';
import Papa from 'papaparse';
import ContextualMenuRight from 'components/Molecules/ContextualMenuRight';
import GlobalFilter from 'components/Molecules/ResolutorFilter';
import Pagination from 'components/Molecules/Pagination';
import DropZone from 'components/Molecules/DropZone';
import Sort from 'assets/brand/sort.svg';
import SortUp from 'assets/brand/sortUp.svg';
import SortDown from 'assets/brand/sortDown.svg';
import dropZoneDownload from 'assets/brand/dropZoneDownload.svg';
import Button from 'components/Atoms/Button';
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
  hadleClickDropDown,
  update,
  noFilters,
}) {
  const [showSlideNav, setShowSlideNav] = useState(false);
  const [slideNavData, setSlideNavData] = useState(false);
  const [form, setForm] = useState({
    motivo: '',
    descTicket: '',
    clienteID: '',
    archivo: '',
    orderId: '',
  });
  const [error, setError] = useState({
    descTicket: false,
  });
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
    setFilter,
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

  const rowClick = (rowData) => {
    console.log(rowData);
    setSlideNavData(rowData);
    setShowSlideNav(true);
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === 'motivo' || e.target.name === 'descTicket') {
      setError((oldState) => ({
        ...oldState,
        [e.target.name]: false,
      }));
    }
  };

  return (
    <>
      {!noFilters && (
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
          handleClick={handleClick}
          handleClickUpdate={handleClickUpdate}
          hadleClickDropDown={hadleClickDropDown}
          update={update}
          getExportFileBlob={getExportFileBlob}
          exportData={exportData}
          setFilter={setFilter}
        />
      )}
      {page.length > 0 ? (
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
                    <tr
                      style={{ whiteSpace: 'nowrap' }}
                      {...row.getRowProps()}
                      onClick={() => rowClick(row.original)}
                    >
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {pageCount > 1 && (
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
        </>
      ) : (
        <div className="text-center">
          <img src="/errorpage.png" alt="Contenido no encontrado" data-testid="image" />
          <p>No se encontraron datos</p>
        </div>
      )}
      <ContextualMenuRight
        menuContextOpen={showSlideNav}
        handleClick={() => setShowSlideNav(false)}
      >
        {slideNavData && (
          <>
            <ul className="d-flex justify-content-between">
              <li>
                <h2>{slideNavData.motivo}</h2>
                <p>
                  <img src="/user.png" alt="" />
                  <span>
                    Creado por cliente id:
                    {' '}
                  </span>
                  <span>{slideNavData.clienteID}</span>
                </p>
              </li>
              <li>
                <small className={`badge--${slideNavData.status.replace(' ', '').toLowerCase()} px-4 py-1`}>
                  { slideNavData.status }
                </small>
              </li>
            </ul>
            <p className="py-4">
              {slideNavData.descTicket}
            </p>
            {slideNavData.archivo.length > 1 && (
            <ul>
              <li>
                <p className="fs-5 mb-4">Archivos Adjuntos</p>
                <ul>
                  {slideNavData.archivo.map((file) => (
                    <li key={file.path} className={styles.fileItem}>
                      <a href="!#">
                        <ul className="d-flex justify-content-between align-items-center">
                          <li>
                            {`${file.path} `}
                            <span className={styles.fileSize}>{`${file.size} KB`}</span>
                          </li>
                          <li>
                            <button className={styles.closeButton} type="button">
                              <img src={dropZoneDownload} alt="Descargar" />
                            </button>
                          </li>
                        </ul>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            )}
            <form className="py-5">
              <div className="form-group mb-5">
                <label htmlFor="textArea" className="w-100">
                  Comentario
                  <span className="text-danger"> *</span>
                  <textarea
                    className="form-control"
                    rows="4"
                    id="textArea"
                    placeholder="Agrega un comentario"
                    name="descTicket"
                    onChange={handleChange}
                  />
                  {error.descTicket && (<span className="text-danger">Debes completar este campo para continuar</span>)}
                </label>
              </div>
              <div className="form-group mb-5 d-none">
                <DropZone
                  boxText="Arrastra tu archivo o selecciona desde tu computadora"
                  title="Carga tu archivo"
                  subTitle="Adjunta la evidencia, puede ser en formato jpg o png (opcional)"
                />
              </div>
              <div className="text-end">
                <Button
                  className="btn btn-secondary fs-5 px-5"
                  text="Crear"
                  submit
                />
              </div>
            </form>
          </>
        )}
      </ContextualMenuRight>
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
