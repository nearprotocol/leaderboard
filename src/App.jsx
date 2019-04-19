import React from 'react';
import Leaderboard from './components/Leaderboard';
import Nav from './components/Nav';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import fire from './fire';
// import Admin from ''
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import './style.scss'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return(
      <Router>
        <main className="app-container">
          <Nav user={this.state.user}/>
          
          <React.Fragment>
            <Route exact path="/" component={Leaderboard} />
            <Route exact path="/home" component={Leaderboard} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route path="/profile" component={Profile} />
          </React.Fragment>
        </main>
      </Router>
    );
  }
}
