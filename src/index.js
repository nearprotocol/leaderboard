console.log("Running")
import React from 'react';
import ReactDOM from 'react-dom';
import Leaderboard from './main';

ReactDOM.render(
  <Leaderboard /> ,
  document.getElementById('leaderboard'));

module.hot.accept();