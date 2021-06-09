import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ErrorPage from 'pages/404';
import Layout from './components/Templates/Layout';
import Home from './pages/home';
import Orders from './pages/ordenes';
import Inventory from './pages/inventarios';
import UpdateOrders from './pages/ordenes/subir-ordenes';

import './styles/main.scss';

const App = () => (
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/ordenes">
          <Orders />
        </Route>
        <Route exact path="/inventario">
          <Inventory />
        </Route>
        <Route exact path="/ordenes/subir-ordenes">
          <UpdateOrders />
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </Layout>
  </Router>
);

export default App;
