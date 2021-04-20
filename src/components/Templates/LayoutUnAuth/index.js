import React from 'react';

const Layout = ({children}) => {
    return (
        <div className="container-fluid bg-ligth-grey">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-sm-8 col-md-6 col-lg-4">
              {children}
            </div>
          </div>
        </div>
    )
}

export default Layout;