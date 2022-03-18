import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Table from '../MainTable';
import styles from './validation.module.scss';

const AlertTypes = {
  success: 'bgsuccess',
  warning: 'bgincomplete',
  error: 'bgError',
};

const MessageTypes = {
  success: 'Se ha validado correctamente el archivo cargado.',
  warning: 'Se han econtrado errores, verificar los SKU no agregados.',
  error: (
    <p>
      No se han agregado los SKU.
      <br />
      {' '}
      Revisa y vuelve cargar el archivo.
    </p>
  ),
};

const ValidationMessage = ({
  type,
  customMessage,
  leftIndicatorText,
  leftIndicatorValue,
  centerIndicatorText,
  centerIndicatorValue,
  rightIndicatorText,
  rightIndicatorValue,
  columns,
  dataTable,
}) => {
  const [showDetail, setShowDetail] = useState(false);
  const image = useMemo(() => AlertTypes[type], [type]);
  const message = useMemo(
    () => customMessage || MessageTypes[type],
    [type, customMessage],
  );

  const toggleDetail = useCallback(() => {
    setShowDetail((prevState) => !prevState);
  }, []);

  return (
    <div className="row px-4">
      <div className="col-12 d-flex justify-content-center align-items-center mb-5">
        <img src={`/${image}.jpg`} alt="alert" width="143" height="141" className={styles.image} />
      </div>
      <div className="col-12 mb-5 text-center paragraph3">
        {message}
        {' '}
        {type !== 'success' && (
          <button type="button" className={styles.detailBtn} onClick={toggleDetail}>
            Ver detalle
          </button>
        )}
      </div>
      <div className="col-12 mb-5">
        <div className={styles.indicators}>
          <div className={styles.counter}>
            <p className="mini-subtitle mb-3">{leftIndicatorText}</p>
            <span className="h4">{leftIndicatorValue}</span>
          </div>
          <div className={styles.counter}>
            <p className="mini-subtitle mb-3">{centerIndicatorText}</p>
            <span className="h4">{centerIndicatorValue}</span>
          </div>
          <div className={styles.counter}>
            <p className="mini-subtitle mb-3">{rightIndicatorText}</p>
            <span className="h4">{rightIndicatorValue}</span>
          </div>
        </div>
      </div>
      {showDetail && (
      <div className="col-12">
        <Table columns={columns} data={dataTable} noButtons noFilters />
      </div>
      )}
    </div>
  );
};

ValidationMessage.defaultProps = {
  customMessage: undefined,
};

ValidationMessage.propTypes = {
  type: PropTypes.oneOf(['success', 'warning', 'error']).isRequired,
  customMessage: PropTypes.node,
  leftIndicatorText: PropTypes.node.isRequired,
  leftIndicatorValue: PropTypes.node.isRequired,
  centerIndicatorText: PropTypes.node.isRequired,
  centerIndicatorValue: PropTypes.node.isRequired,
  rightIndicatorText: PropTypes.node.isRequired,
  rightIndicatorValue: PropTypes.node.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  dataTable: PropTypes.arrayOf.isRequired,
};

export default ValidationMessage;
