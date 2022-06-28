import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter,HashRouter } from 'react-router-dom';

import './index.css';

require('dotenv').config()
ReactDOM.render(
    <HashRouter>
      <App />
    </HashRouter>,

    document.getElementById('root')


);