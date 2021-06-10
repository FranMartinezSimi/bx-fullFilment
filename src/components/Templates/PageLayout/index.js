import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import Breadcrumb from '../../Molecules/Breadcrumb';

const PageLayout = ({
  title, description, children, noBreadcrumb,
}) => (
  <>
    <Helmet>
      <title>{`${title ? `${title} | ` : ''} Fulfillment By BlueExpress`}</title>
      <meta
        name="description"
        content={`${description ? `${description} | ` : ''} Fulfillment By BlueExpress'`}
      />
    </Helmet>
    {!noBreadcrumb && (
      <Breadcrumb />
    )}
    {children}
  </>
);

PageLayout.defaultProps = {
  title: '',
  description: '',
  noBreadcrumb: false,
};

PageLayout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  noBreadcrumb: PropTypes.bool,
};

export default PageLayout;
