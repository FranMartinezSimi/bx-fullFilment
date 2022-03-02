import Card from 'components/Molecules/Card';
import Spinner from 'components/Atoms/Spinner';

import styles from './styles.module.scss';

const IndicatorCard = ({ image, background, indicator, text, isFetching }) => (
  <div className="col-12 col-md-4 px-5">
    <Card className="py-4 mb-4">
      {isFetching ? (
        <div className="row mb-2">
          <div className="col-12 d-flex justify-content-center align-items-center">
            <Spinner width={32} height={32} color={background} />
          </div>
        </div>
      ) : (
        <div className="row">
          <div className={`col-6 pe-3 m-0 col-sm-6 ${styles.centerImg}`}>
            <img src={image} alt={image} />
          </div>
          <div className="col-6 col-sm-6 px-0">
            <h5
              style={{ color: background }}
              className={`text-right ${styles.colorNum}`}
            >
              {indicator}
            </h5>
          </div>
        </div>
      )}
      <div className={`col-12 col-sm-12 ${styles.colorState}`}>
        <p style={{ color: background }} className="text-center">
          {text}
        </p>
      </div>
    </Card>
  </div>
);

export default IndicatorCard;
