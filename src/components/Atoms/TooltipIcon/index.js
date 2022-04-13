import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const TooltipIcon = ({ icon, text, color }) => {
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      <span
        className="mb-3 me-1 ms-0"
        onMouseEnter={() => setShowContent(true)}
        onMouseLeave={() => setShowContent(false)}
      >
        {icon}
      </span>
      <CSSTransition
        in={showContent}
        timeout={300}
        classNames="alert"
        unmountOnExit
      >
        <span className="position-relative">
          <ul className={`${styles.tooltipContainer}`} style={{ background: color }}>
            <li className={`${styles.tooltipTriangle}`} style={{ borderRightColor: color }} />
            <li>
              <p className="mb-0 text-center">{text}</p>
            </li>
          </ul>
        </span>
      </CSSTransition>
    </>
  );
};

TooltipIcon.defaultProps = {
  color: '',
};

TooltipIcon.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default TooltipIcon;
