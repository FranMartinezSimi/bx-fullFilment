import React from 'react';
import PropTypes from 'prop-types';

const PageTitle = ({ title, subtitle, className }) => (
  <div className={className}>
    <h1 className="display-font">{title}</h1>
    {subtitle
        && <h4 className="display-font" style={{ fontSize: '18px' }}>{subtitle}</h4>}
  </div>
);

PageTitle.defaultProps = {
  title: '',
  subtitle: '',
  className: '',
};

PageTitle.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  className: PropTypes.string,
};

export default PageTitle;
