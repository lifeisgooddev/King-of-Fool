import React from 'react';
import ReactDOM from 'react-dom/client';
import { Web3ReactProvider } from '@web3-react/core'

import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { getLibrary } from './utils/web3React'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <React.StrictMode>
      <App />
      <NotificationContainer/>
    </React.StrictMode>
  </Web3ReactProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
