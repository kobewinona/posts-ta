import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';

import store from '../src/store/storeConfig';

import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import './vendor/normalize.css';
import './vendor/fonts/inter.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
