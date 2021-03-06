import React from 'react';
import { Route, Link, withRouter } from "react-router-dom";
import Leaderboard from './Leaderboard';
import Profile from './Profile';
import SignUp from './SignUp';
import fire from '../fire';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      data: [],
      loading: true
    }
    this.signOut = this.signOut.bind(this);
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
        this.setState({
          user: user
        });
      } else {
        // User is signed out.
        console.log("well shit");
        this.setState({
          user:null
        });
      }
    });
  }

  signOut(e) {
    e.preventDefault();
    fire.auth().signOut()
    .then(res => {
    })
    .catch(err => {
      console.log(err.message);
    });
    this.props.history.push('/');
  }

  render() {
    return (
      <React.Fragment>
        <nav className="Nav" >
          <ul>
            <li>
              <Link to="/">
                <img src="https://nearprotocol.com/wp-content/themes/near-19/assets/img/logo.svg?t=1553011311" alt=""/>
              </Link>
              hack ONE
            </li>
            { this.state.user ?
              <ul>
                <li>
                  <Link to="/">Leaderboard</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <a href="#" onClick={this.signOut}>Sign Out</a>
                </li>
              </ul>
              :
            <li>
              <Link to="/sign-up">Sign Up</Link>
            </li>
            }
          </ul>  
        </nav>

        <Route exact path="/" component={Leaderboard} />
        <Route exact path="/home" component={Leaderboard} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route path="/profile" component={() => <Profile user={this.state.user} />} />
      </React.Fragment>
    );
  }
}
export default withRouter(Nav);