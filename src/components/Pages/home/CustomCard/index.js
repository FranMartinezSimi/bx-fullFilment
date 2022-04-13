import cs from 'classnames';
import { useHistory } from 'react-router-dom';

import Card from 'components/Molecules/Card';
import inscribe from 'assets/brand/homeCard1.svg';
import callendar from 'assets/brand/homeCard2.svg';

import styles from './styles.module.scss';

const CustomCard = ({ contentClassName }) => {
  const { push } = useHistory();

  const goToReplenishment = () => {
    push('/reposition/create');
  };

  const goToLoadOrder = () => {
    push('/ordenes/subir-ordenes');
  };

  return (
    <Card className={contentClassName}>
      <div className={cs(styles.row, 'row d-flex justify-content-center align-items-center')}>
        <div className="col-12 d-flex align-items-center">
          <img
            className={cs(styles.img, 'px-2')}
            src={callendar}
            alt={callendar}
            width="68"
            height="62"
          />
          <div>
            <div className={styles.title}>Reposición de inventario</div>
            <button
              type="button"
              className={cs(styles.btn, 'btn btn-secondary')}
              onClick={goToReplenishment}
            >
              Programar
            </button>
          </div>
        </div>
        <div className="col-12 d-flex align-items-center">
          <img
            className={cs(styles.img, 'px-2')}
            src={inscribe}
            alt={inscribe}
            width="80"
            height="63"
          />
          <div>
            <div className={styles.title}>Órdenes de servicios</div>
            <button
              type="button"
              className={cs(styles.btn, 'btn btn-secondary')}
              onClick={goToLoadOrder}
            >
              Cargar Órdenes
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CustomCard;
