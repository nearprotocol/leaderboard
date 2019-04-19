import React from 'react';
import Nav from './components/Nav';

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
          <Nav/>
        </main>
      </Router>
    );
  }
}
