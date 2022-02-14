import cs from 'classnames';
import Modal from '../Modal';

import styles from './deleteRepositionModal.module.scss';

const DeleteRepositionModal = ({
  showModal,
  onCancel,
  onAccept,
  replenishmentId,
  onChangeText,
}) => {
  const onChange = (event) => {
    onChangeText(event.target.value);
  };

  return (
    <Modal showModal={showModal} onClick={onCancel}>
      <div className="row px-5 pb-4">
        <div className="col-12 mb-4 d-flex justify-content-center">
          <img src="/errorgloboalert.png" alt="globe" />
        </div>
        <div className="col-12 mb-4 d-flex justify-content-center">
          <span className="paragraph1">
            Escribe el motivo de la eliminacion de la reposición de inventario.
          </span>
        </div>
        <div className="col-12 mb-4 d-flex justify-content-center align-items-center">
          <textarea
            name="motivo"
            className={styles.textarea}
            placeholder="Escribe el comentario..."
            onChange={onChange}
          />
        </div>
        <div className="col-12 mb-4 d-flex justify-content-center">
          ¿Esta seguro que desea eliminar Reposición de Inventario
          {' '}
          {replenishmentId}
          ?
        </div>
        <div className="col-12 d-flex justify-content-center align-items-center">
          <div className={styles.contentBtn}>
            <button
              type="button"
              className={cs(styles.button, 'btn btn-complementary')}
              onClick={onCancel}
            >
              Cancelar
            </button>
            <button
              type="button"
              className={cs(styles.button, 'btn btn-secondary')}
              onClick={onAccept}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteRepositionModal;
