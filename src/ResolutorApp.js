import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import ErrorPage from 'pages/404';
import Home from './pages/resolutor/home';
import Issues from './pages/resolutor/incidencias';
import Layout from './components/Templates/LayoutResolutor';
import './styles/main.scss';

const UnauthenticatedApp = () => (
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/incidencias">
          <Issues />
        </Route>
        <Route exact path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </Layout>
  </Router>
);

export default UnauthenticatedApp;
