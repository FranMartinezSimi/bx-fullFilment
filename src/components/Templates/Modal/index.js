import { CSSTransition } from 'react-transition-group';

import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const Modal = ({ title, subtitle, children, onClick, showModal, size}) => (
  <CSSTransition
    in={showModal}
    timeout={300}
    classNames="alert"
    unmountOnExit
  >
    <div className={styles.modal}>
      <div className={`${size === 'sm' ? styles.sm : styles.md} bg-white shadows m-auto p-3 border-0`} style={{borderRadius: '16px'}}>
        <div className="modal-header py-2 border-0 d-flex justify-content-between align-items-start">
          <div>
            <h5 className={`${styles.modalTitle} display-font mb-1`}>{title}</h5>
            {subtitle && (
              <p className={`${styles.modalSubtitle}`}>{subtitle}</p>
            )}
          </div>
          <button type="button" data-testid="printed-username" className={`p-0 ${styles.close}`} onClick={onClick}>
            <span aria-hidden="true" className="p-0">&times;</span>
          </button>
        </div>
        <div className="modal-body p-3">
          {children}
        </div>
      </div>
    </div>
  </CSSTransition>
);

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  size: PropTypes.string
}

export default Modal;
