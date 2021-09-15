import { useAuth } from 'context/userContex';

import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import ErrorPage from 'pages/404';
import Layout from './components/Templates/Layout';
import Home from './pages/home';
import Orders from './pages/ordenes';
import Onboarding from './pages/onboarding';
import Errors from './pages/ordenes/subir-ordenes/UpdatedWidthErrors';
import Inventory from './pages/inventarios';
import Issues from './pages/incidencias';
import Reposicion from './pages/reposicion';
import IssueDetail from './pages/incidencias/IssueDetail';
import UpdateOrders from './pages/ordenes/subir-ordenes';

import './styles/main.scss';

const App = () => {
  const { user } = useAuth();
  const userData = JSON.parse(user);
  const userActive = userData.credential.user.onboarding
    ? userData.credential.user.onboarding
    : false;
  return (
    <Router>
      <Layout>
        <Switch>
          {userActive
            ? (
              <Route exact path="/">
                <Home />
              </Route>
            )
            : (
              <Route exact path="/">
                <Onboarding />
              </Route>
            )}
          <Route exact path="/ordenes">
            <Orders />
          </Route>
          <Route exact path="/error-ordenes">
            <Errors />
          </Route>
          <Route exact path="/inventario">
            <Inventory />
          </Route>
          <Route exact path="/incidencias">
            <Issues />
          </Route>
          <Route path="/incidencia/:id">
            <IssueDetail />
          </Route>
          <Route path="/reposicion">
            <Reposicion />
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
};

export default App;
