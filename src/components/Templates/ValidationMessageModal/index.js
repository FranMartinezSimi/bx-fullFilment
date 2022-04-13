import PropTypes from 'prop-types';
import cs from 'classnames';

import Modal from '../Modal';
import ValidationMessage from '../ValidationMessage';

import styles from './styles.module.scss';

const ValidationMessageModal = ({
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
  showModal,
  onClose,
  onAccept,
}) => (
  <Modal size="lg" showModal={showModal} onClick={onClose}>
    <ValidationMessage
      type={type}
      customMessage={customMessage}
      leftIndicatorText={leftIndicatorText}
      leftIndicatorValue={leftIndicatorValue}
      centerIndicatorText={centerIndicatorText}
      centerIndicatorValue={centerIndicatorValue}
      rightIndicatorText={rightIndicatorText}
      rightIndicatorValue={rightIndicatorValue}
      columns={columns}
      dataTable={dataTable}
    />
    <div className="row">
      <div className="col-12 d-flex justify-content-center align-items-center mb-5">
        <button type="button" onClick={onAccept} className={cs(styles.button, 'btn btn-secondary')}>
          Aceptar
        </button>
      </div>
    </div>
  </Modal>
);

ValidationMessageModal.defaultProps = {
  ...ValidationMessage.defaultProps,
};

ValidationMessageModal.propTypes = {
  ...ValidationMessage.propTypes,
  showModal: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
};

export default ValidationMessageModal;
