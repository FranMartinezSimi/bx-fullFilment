import React from 'react';
import { Helmet } from 'react-helmet-async';

const Layout = ({title, description, children}) => {
    return (
      <>
        <Helmet>
        <title>{`${title ? title+' | ' : ''} Fulfillment By BlueExpress`}</title>
        <meta
          name='description'
          content={`${description ? description+' | ' : ''} Fulfillment By BlueExpress'`}
        />
        </Helmet>
        <div className="container-fluid bg-background-login" style={{backgroundImage:  'url("/background-login.jpg")'}}>
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-sm-8 col-md-6 col-xl-4 col-xxl-3">
              {children}
            </div>
          </div>
        </div>
      </>
    )
}

export default Layout;