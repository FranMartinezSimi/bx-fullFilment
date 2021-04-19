import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LayoutUnAuth from './components/Templates/LayoutUnAuth';
import Sync from './pages/sync';
import './styles/main.scss';

const UnauthenticatedApp = ({setUser}) => {
    return (
        <Router>
                <Switch>
                    <LayoutUnAuth>
                        <Route exact path="/">
                            <Sync setUser={setUser}/>
                        </Route>
                    </LayoutUnAuth>
                </Switch>
        </Router>
    );
}

export default UnauthenticatedApp;