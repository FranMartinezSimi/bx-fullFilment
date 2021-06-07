import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../../Molecules/Header';
import Sidebar from '../../Molecules/Sidebar';
import Footer from '../../Molecules/Footer';

const Layout = ({ children }) => {
  const [activeNavbar, setActiveNavbar] = useState(false);
  return (
    <div className="d-flex bg-ligth-blue">
      <Sidebar activeNavbar={activeNavbar} />
      <div className="App flex-fill">
        <Header activeNavbar={activeNavbar} setActiveNavbar={setActiveNavbar} />
        <main className="container content-wrapper">
          <div className="row">
            <div className="col-12">{children}</div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
