import PropTypes from 'prop-types';
import Back from '../../../assets/brand/back.svg';
import styles from './styles.module.scss';

const Card = ({
  className,
  title,
  subtitle,
  children,
  close,
  handleClose,
  back,
  handleBack,
  footer,
  cardBackground,
  onMouseLeave,
  style,
}) => (
  <div
    className={`card px-3 ${className} ${styles.mainCard}`}
    style={{
      borderRadius: '15px',
      border: 'none',
      backgroundImage: cardBackground ? `url(${cardBackground})` : null,
      ...(style || {}),
    }}
    onMouseLeave={onMouseLeave}
  >
    {title
      ? (
        <ul className="d-flex w-100 justify-content-between">
          {back && (
            <li>
              <a href="#!" onClick={handleBack}>
                <img src={Back} alt="volver" />
              </a>
            </li>
          )}
          <li>
            {title && (
              <h4>{title}</h4>
            )}
            {subtitle && (
              <p>{subtitle}</p>
            )}
          </li>
          {close && (
            <li>
              <a href="#!" onClick={handleClose}>
                <span aria-hidden="true" className="p-0 pe-3" style={{ fontSize: '22px' }}>&times;</span>
              </a>
            </li>
          )}
        </ul>
      )
      : null}
    <div className="card-body">
      {children}
    </div>
    {footer && footer}
  </div>
);

Card.defaultProps = {
  className: '',
  title: '',
  subtitle: '',
  children: null,
  close: false,
  handleClose: () => { },
  back: false,
  handleBack: () => { },
  onMouseLeave: () => { },
  footer: null,
  cardBackground: '',
};

Card.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
  close: PropTypes.bool,
  handleClose: PropTypes.func,
  back: PropTypes.bool,
  handleBack: PropTypes.func,
  onMouseLeave: PropTypes.func,
  footer: PropTypes.node,
  cardBackground: PropTypes.string,
};

export default Card;
