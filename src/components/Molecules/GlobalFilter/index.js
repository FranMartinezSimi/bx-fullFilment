import { useState } from 'react';
import { useAsyncDebounce } from 'react-table';
import cs from 'classnames';
import PropTypes from 'prop-types';

import zoom from 'assets/brand/zoom.svg';
import styles from './styles.module.scss';

const GlobalFilter = ({
  globalFilter,
  setGlobalFilter,
  update,
  buttonChildren,
}) => {
  const [value, setValue] = useState(globalFilter);

  const onChange = useAsyncDebounce((targetValue) => {
    setGlobalFilter(targetValue.trim() || undefined);
  }, 200);

  return (
    <div className="row d-md-flex justify-content-between align-items-start">
      <div className="col-md-6">
        <ul className="d-md-flex align-items-center">
          <li className="me-4 position-relative">
            <input
              value={value || ''}
              className={cs(styles.searchInput, 'form-control ps-4')}
              onChange={(e) => {
                setValue(e.target.value);
                onChange(e.target.value);
              }}
              placeholder="Búsqueda"
            />
            <span className={styles.searchIcon}>
              <img src={zoom} alt="Show" width="16" />
            </span>
          </li>
          <li className="d-none d-md-block">{update && update}</li>
        </ul>
      </div>
      <div className="col-md-6">{buttonChildren}</div>
    </div>
  );
};

GlobalFilter.defaultProps = {
  globalFilter: () => {},
  setGlobalFilter: () => {},
  buttonChildren: null,
};

GlobalFilter.propTypes = {
  globalFilter: PropTypes.func,
  setGlobalFilter: PropTypes.func,
  buttonChildren: PropTypes.node,
};

export default GlobalFilter;
