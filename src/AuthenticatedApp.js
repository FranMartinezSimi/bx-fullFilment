import React from "react";

import { useAuth } from "./context/userContex";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Layout from "./components/Templates/Layout";
import Home from "./pages/home";
import Orders from "./pages/ordenes";
import Inventory from "./pages/inventarios";
import UpdateOrders from "./pages/ordenes/subir-ordenes";

import "./styles/main.scss";

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        (user) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
const App = () => {
  return (
    <Router>
      <Switch>
        <Layout>
          <PrivateRoute exact path="/">
            <Home />
          </PrivateRoute>
          <PrivateRoute exact path="/ordenes">
            <Orders />
          </PrivateRoute>
          <PrivateRoute exact path="/inventario">
            <Inventory />
          </PrivateRoute>
          <PrivateRoute exact path="/ordenes/subir-ordenes">
            <UpdateOrders />
          </PrivateRoute>
        </Layout>
      </Switch>
    </Router>
  );
};

export default App;
