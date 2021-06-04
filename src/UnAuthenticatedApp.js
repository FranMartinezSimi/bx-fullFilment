import React from 'react';

// import { useAuth } from "./context/userContex";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from 'react-router-dom';
import Sync from './pages/sync';
import './styles/main.scss';

// const PrivateRoute = ({ children, ...rest }) => {
//   const { user } = useAuth();
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         (user) ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/",
//               state: { from: location },
//             }}
//           />
//         )
//       }
//     />
//   );
// };
const UnauthenticatedApp = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Sync />
      </Route>
      {/* <PrivateRoute path="*">
          <p>No Match</p>
        </PrivateRoute> */}
    </Switch>
  </Router>
);

export default UnauthenticatedApp;
