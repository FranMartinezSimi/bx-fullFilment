import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import ErrorPage from 'pages/404';
import Home from './pages/home-resolutor';
import Layout from './components/Templates/LayoutResolutor';
import './styles/main.scss';

const UnauthenticatedApp = () => (
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="*">
          <div style={{ background: '#EAF8FF', minHeight: '100vh' }}>
            <ErrorPage />
          </div>
        </Route>
      </Switch>
    </Layout>
  </Router>
);

export default UnauthenticatedApp;
