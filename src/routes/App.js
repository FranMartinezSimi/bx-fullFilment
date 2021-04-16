import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Layout from '../containers/Layout';
import OrdersList from '../components/OrdersList';
import SyncLayout from '../components/shipedge-sync/SyncLayout';

const App = () => (
    <BrowserRouter>
        <Layout>
            <Switch>
                <Route exact path="/" component={SyncLayout}/>
                <Route exact path="/orders" component={OrdersList}/>
            </Switch>
        </Layout>
    </BrowserRouter>
);

export default App;