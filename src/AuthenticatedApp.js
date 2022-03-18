import { useAuth } from 'context/userContex';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ErrorPage from 'pages/404';
import CreateReposition from 'pages/reposition/create';
import ReplenishmentDetail from 'pages/reposition/detail';
import Layout from './components/Templates/Layout';
import Home from './pages/home';
import Orders from './pages/ordenes';
import Onboarding from './pages/onboarding';
import Errors from './pages/ordenes/subir-ordenes/UpdatedWidthErrors';
import Inventory from './pages/inventarios';
import Issues from './pages/incidencias';
import Reposition from './pages/reposition';
import IssueDetail from './pages/incidencias/IssueDetail';
import UpdateOrders from './pages/ordenes/subir-ordenes';
import Grafico from './pages/ordenes/grafico';
import SellerReport from './pages/ordenes/reporte-mensual';
import CreateInventory from './pages/inventarios/create';
import MonthsOfInventory from './pages/monthsOfInventory';

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
          {userActive ? (
            <Route exact path="/">
              <Home />
            </Route>
          ) : (
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
          <Route exact path="/inventario/sku">
            <CreateInventory />
          </Route>
          <Route exact path="/incidencias">
            <Issues />
          </Route>
          <Route path="/incidencia/:id">
            <IssueDetail />
          </Route>
          <Route exact path="/reposition">
            <Reposition />
          </Route>
          <Route exact path="/reposition/detail/:replenishment_id">
            <ReplenishmentDetail />
          </Route>
          <Route exact path="/reposition/create">
            <CreateReposition />
          </Route>
          <Route path="/reposition/create">
            <CreateReposition />
          </Route>
          <Route path="/meses-de-inventario">
            <MonthsOfInventory />
          </Route>
          <Route exact path="/ordenes/subir-ordenes">
            <UpdateOrders />
          </Route>
          <Route exact path="/ordenes/grafico">
            <Grafico />
          </Route>
          <Route exact path="/ordenes/reporte-mensual">
            <SellerReport />
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
