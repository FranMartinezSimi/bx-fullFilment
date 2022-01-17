import PropTypes from 'prop-types';
import cs from 'classnames';

import Modal from '../Modal';

import styles from './alertModal.module.scss';

const AlertModal = ({
  showModal,
  onClose,
  message,
  children,
  image,
}) => (
  <Modal showModal={showModal} size="md" onClick={onClose}>
    <div className="row">
      <div className="col-12 mb-5 d-flex justify-content-center align-item-center">
        {image || <img alt="alert" src="/bgerrors.png" width={102} height={98} />}
      </div>
      <div className="col-12 mb-5 d-flex justify-content-center align-item-center paragraph3 px-4 text-center">
        {message || children}
      </div>
      <div className="col-12 mb-5 d-flex justify-content-center align-item-center px-5">
        <button
          type="button"
          className={cs(styles.btn, 'btn btn-secondary')}
          onClick={onClose}
        >
          Aceptar
        </button>
      </div>
    </div>
  </Modal>
);

AlertModal.defaultProps = {
  message: undefined,
  children: undefined,
};

AlertModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.node,
  children: PropTypes.node,
};

export default AlertModal;
