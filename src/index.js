import ReactDOM from 'react-dom';
import ddInit from 'utils/dd';
import { ToastContainer } from 'react-toastify';
import * as GTM from 'utils/gtm';
import reportWebVitals from './reportWebVitals';
import { AuthKeyclockProvider } from './context/userKeyclockContext';
import { AuthProvider } from './context/userContex';
import App from './App';

ddInit();
GTM.initialize();

ReactDOM.render(
  <AuthKeyclockProvider>
    <AuthProvider>
      <App />
      <ToastContainer />
    </AuthProvider>
  </AuthKeyclockProvider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
