import React from 'react';
import Header from '../../Molecules/Header';
import Sidebar from '../../Molecules/Sidebar';
import Footer from '../../Molecules/Footer';
import Breadcrumb from '../../Molecules/Breadcrumb';

const Layout = ({children}) => (
    <div className="d-flex bg-ligth-grey">
        <Sidebar />
        <div className="App flex-fill">
            <Header/>
            <div className="container  content-wrapper">
                <Breadcrumb />
                <div className="row">
                    <div className="col-12">
                        {children}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    </div>
);

export default Layout;