import React from 'react'
import Leaderboard from './components/Leaderboard';
import Nav from './components/Nav'

export default class App extends React.Component {
  render() {
    return(
      <main className="app-container">
        <Nav/>
        <Leaderboard />
      </main>
    );
  }
}