import React from 'react';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Layout from './components/Templates/Layout';
import Inventory from './pages/inventarios';
import Orders from './pages/ordenes';

import './styles/main.scss';

const App = () => {
    return (
        <Router>
                <Switch>
                    <Layout>
                        <Route exact path="/">
                            <Orders />
                        </Route>
                        <Route exact path="/inventario">
                            <Inventory />
                        </Route>
                    </Layout>
                </Switch>
        </Router>
    );
}
    

export default App;