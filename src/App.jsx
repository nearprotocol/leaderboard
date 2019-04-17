import React from 'react';
import Leaderboard from './components/Leaderboard';
import Nav from './components/Nav';
import Profile from './components/Profile';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './style.scss'

export default class App extends React.Component {
  render() {
    return(
      <Router>
        <main className="app-container">
          <Nav/>
          <Route exact path="/" component={Leaderboard} />
          <Route path="/profile" component={Profile} />
        </main>
      </Router>
    );
  }
}
