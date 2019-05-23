import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';
import App from './App';

const Root = () => ( 
  <BrowserRouter>
    <App>
      <Routes />
    </App>
  </BrowserRouter>
);

ReactDOM.render(<Root />, document.getElementById('root'));
