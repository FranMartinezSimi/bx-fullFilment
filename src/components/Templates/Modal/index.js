import { CSSTransition } from 'react-transition-group';
import styles from './styles.module.scss';

const Modal = ({ title, children, onClick, showModal}) => (
  <CSSTransition
    in={showModal}
    timeout={300}
    classNames="alert"
    unmountOnExit
  >
    <div className={styles.modal}>
      <div className="bg-white shadows w-50 m-auto p-3 border-0" style={{borderRadius: '16px'}}>
        <div className="modal-header py-2 border-0 d-flex justify-content-between align-items-end">
          <h5 className={`${styles.modalTitle} display-font`}>{title}</h5>
          <button type="button" className={`p-0 ${styles.close}`} onClick={onClick}>
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

export default Modal;
