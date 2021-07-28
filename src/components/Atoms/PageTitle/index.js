import React from 'react';
import PropTypes from 'prop-types';

const PageTitle = ({
  title, titleSize, subtitle, className, subtitleClassName,
}) => {
  const finalSize = titleSize || '22px';
  return (
    <div className={className}>
      <h6 className="display-font" style={{ fontSize: finalSize, fontWeight: 700 }}>{title}</h6>
      {subtitle
          && <p style={{ fontSize: '16px' }} className={subtitleClassName}>{subtitle}</p>}
    </div>
  );
};

PageTitle.defaultProps = {
  title: '',
  titleSize: '',
  subtitle: '',
  subtitleClassName: '',
  className: '',
};

PageTitle.propTypes = {
  title: PropTypes.string,
  titleSize: PropTypes.string,
  subtitle: PropTypes.string,
  subtitleClassName: PropTypes.string,
  className: PropTypes.string,
};

export default PageTitle;
