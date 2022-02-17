import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import ErrorPage from 'pages/404';
import Home from './pages/resolutor/home';
import Issues from './pages/resolutor/incidencias';
// import ManagementReplenishment from './pages/resolutor/managementReplenishment';
import ChangeStatus from './pages/resolutor/managementReplenishment/changeStatus';
import DeleteReplenishment from './pages/resolutor/managementReplenishment/deleteReplenishment';
import Layout from './components/Templates/Layout';
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
        <Route exact path="/incidencias">
          <Home />
        </Route>
        <Route path="/managementReplenishment/deleteReplenishment">
          <DeleteReplenishment />
        </Route>
        <Route exact path="/managementReplenishment/changeStatus">
          <ChangeStatus />
        </Route>
        <Route exact path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </Layout>
  </Router>
);

export default UnauthenticatedApp;
