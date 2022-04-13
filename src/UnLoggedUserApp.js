import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import ErrorPage from 'pages/404';
import LogIn from './pages/login';
import './styles/main.scss';

const UnauthenticatedApp = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <LogIn />
      </Route>
      <Route exact path="*">
        <div style={{ background: '#EAF8FF', minHeight: '100vh' }}>
          <ErrorPage />
        </div>
      </Route>
    </Switch>
  </Router>
);

export default UnauthenticatedApp;
