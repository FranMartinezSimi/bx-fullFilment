import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import { QueryClientProvider, QueryClient } from 'react-query';

import ddInit from 'utils/dd';
import * as GTM from 'utils/gtm';
import reportWebVitals from './reportWebVitals';
import { AuthKeyclockProvider } from './context/userKeyclockContext';
import { AuthProvider } from './context/userContex';
import App from './App';

ddInit();
GTM.initialize();
const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <AuthKeyclockProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
      <ToastContainer />
    </AuthKeyclockProvider>
  </QueryClientProvider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
