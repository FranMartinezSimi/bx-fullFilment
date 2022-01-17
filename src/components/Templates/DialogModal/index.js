import PropTypes from 'prop-types';
import cs from 'classnames';

import AlerRed from 'assets/brand/alertRed.png';
import Modal from '../Modal';

import styles from './dialogModal.module.scss';

const DialogModal = ({
  showModal,
  onAccept,
  onCancel,
  message,
  children,
  image,
}) => (
  <Modal showModal={showModal} size="md" onClick={onCancel}>
    <div className="row">
      <div className="col-12 mb-5 d-flex justify-content-center align-item-center">
        {image || <img alt="alert" src={AlerRed} width={102} height={98} />}
      </div>
      <div className="col-12 mb-5 d-flex justify-content-center align-item-center">
        {message || children}
      </div>
      <div className="col-12 mb-5 d-flex justify-content-between align-item-center px-5">
        <button
          type="button"
          className={cs(styles.btn, 'btn btn-complementary')}
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button
          type="button"
          className={cs(styles.btn, 'btn btn-secondary')}
          onClick={onAccept}
        >
          Aceptar
        </button>
      </div>
    </div>
  </Modal>
);

DialogModal.defaultProps = {
  message: undefined,
  children: undefined,
};

DialogModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  message: PropTypes.node,
  children: PropTypes.node,
};

export default DialogModal;
