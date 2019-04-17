console.log("Running")
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <App /> ,
  document.getElementById('app-container'));

module.hot.accept();