import PropTypes from 'prop-types';
import closeX from 'assets/brand/closeX.svg';
import styles from './styles.module.scss';

const ContextualMenuRight = ({
  children,
  title,
  subtitle,
  menuContextOpen,
  handleClick,
}) => (
  <>
    <a
      href="#!"
      className={`${styles.backbround} ${menuContextOpen ? styles.backbroundOpen : ''}`}
      onClick={handleClick}
    >
      {' '}
    </a>
    <div className={`${styles.contextualMenuright} ${menuContextOpen ? styles.open : ''} shadow`}>
      <div className="container py-4 px-5">
        <div className="text-end">
          <button type="button" className={`btn ${styles.btnClose}`} onClick={handleClick}>
            <img src={closeX} alt="Cuenta" width="16" />
          </button>
        </div>
        {title && (
          <h2>
            {title}
          </h2>
        )}
        {subtitle && (
          <p>{subtitle}</p>
        )}
        <div className="bg-white row py-4">
          <div className="col-12">
            {children}
          </div>
        </div>
      </div>
    </div>
  </>
);

export default ContextualMenuRight;

ContextualMenuRight.defaultProps = {
  title: '',
  subtitle: '',
};

ContextualMenuRight.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  menuContextOpen: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
