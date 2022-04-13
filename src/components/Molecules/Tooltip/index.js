import ReactTooltip from 'react-tooltip';

import styles from './tooltip.module.scss';

const Tooltip = ({ children, position = 'bottom', text }) => (
  <>
    <p
      data-tip={text}
      data-place={position}
      data-effect="solid"
      data-multiline
      data-background-color="#bfeaff"
      data-text-color="#000"
      data-arrow-color="#bfeaff"
      className={styles.tooltip}
    >
      {children}
    </p>
    <ReactTooltip />
  </>
);

export default Tooltip;
