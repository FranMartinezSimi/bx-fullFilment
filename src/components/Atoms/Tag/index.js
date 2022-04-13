import cs from 'classnames';

import styles from './tag.module.scss';

const Tag = ({ children, variant, background, color }) => (
  <span
    className={cs(styles.tag, {
      [styles.warning]: variant === 'warning',
      [styles.danger]: variant === 'danger',
      [styles.info]: variant === 'info',
      [styles.success]: variant === 'success',
      [styles.outline]: variant === 'outline',
      [styles.default]: variant === 'default',
    })}
    style={{
      ...(background ? { background } : {}),
      ...(color ? { color } : {}),
    }}
  >
    {children}
  </span>
);

export default Tag;
