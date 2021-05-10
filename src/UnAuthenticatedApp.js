import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Sync from './pages/sync';
import './styles/main.scss';

const UnauthenticatedApp = ({setUser}) => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Sync setUser={setUser}/>
                </Route>
            </Switch>
        </Router>
    );
}

export default UnauthenticatedApp;