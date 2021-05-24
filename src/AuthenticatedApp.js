import React from 'react';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Layout from './components/Templates/Layout';
import Home from './pages/home';
import Orders from './pages/ordenes';
import Inventory from './pages/inventarios';
import UpdateOrders from './pages/ordenes/subir-ordenes';

import './styles/main.scss';

const App = () => {
    return (
        <Router>
                <Switch>
                    <Layout>
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
                    </Layout>
                </Switch>
        </Router>
    );
}
    

export default App;
