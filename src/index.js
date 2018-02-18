import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import Routes from './Routes';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const Root = () => ( 
  <BrowserRouter>
    <App>
      <Routes />
    </App>
  </BrowserRouter>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
