import Card from 'components/Molecules/Card';
import styles from './styles.module.scss';

const CustomCard = ({
  title,
  subtitle,
  image,
  btnText,
  onClick,
  contentClassName,
}) => (
  <Card className={contentClassName}>
    <div className={`row d-flex justify-content-center align-items-center ${styles.row}`}>
      <div className="col-12 d-flex justify-content-center mb-4">
        <img
          style={{ width: '75px', height: '63,85px' }}
          className="px-2"
          src={image}
          alt={image}
        />
      </div>
      <div className="col-12 d-flex justify-content-center mb-2">
        <span className={`${styles.titulo}`}>{title}</span>
      </div>
      <div className="col-12 d-flex justify-content-center mb-2">
        <p className={styles.parrafo}>{subtitle}</p>
      </div>
      <div className="col-12 d-flex justify-content-center mb-2">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onClick}
          style={{ fontSize: 17, width: '204px' }}
        >
          {btnText}
        </button>
      </div>
    </div>
  </Card>
);

export default CustomCard;
