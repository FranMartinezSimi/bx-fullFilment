import { ReactComponent as AlertIcon } from 'assets/brand/orange-alert.svg';
import styles from './styles.module.scss';

const AlertInfo = ({ message, children }) => (
  <div className={styles.container}>
    <span className={styles.icon}>
      <AlertIcon width={32} height={28} fill="blue" />
    </span>
    <div className={styles.message}>
      {message || children}
    </div>
  </div>
);

export default AlertInfo;
