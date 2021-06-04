import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const PageLayout = ({ title, description, children }) => (
  <>
    <Helmet>
      <title>{`${title ? `${title} | ` : ''} Fulfillment By BlueExpress`}</title>
      <meta
        name="description"
        content={`${description ? `${description} | ` : ''} Fulfillment By BlueExpress'`}
      />
    </Helmet>
    {children}
  </>
);

PageLayout.defaultProps = {
  title: '',
  description: '',
};

PageLayout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default PageLayout;
