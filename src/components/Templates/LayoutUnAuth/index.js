import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const Layout = ({ title, description, children }) => (
  <>
    <Helmet>
      <title>{`${title ? `${title} | ` : ''} Fulfillment By BlueExpress`}</title>
      <meta
        name="description"
        content={`${description ? `${description} | ` : ''} Fulfillment By BlueExpress'`}
      />
    </Helmet>
    <div className="container-fluid bg-background-login" style={{ backgroundImage: 'url("/background-login.jpg")' }}>
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-sm-10 col-md-8 col-xl-6 col-xxl-5">
          {children}
        </div>
      </div>
    </div>
  </>
);

Layout.defaultProps = {
  title: '',
  description: '',
};

Layout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Layout;
