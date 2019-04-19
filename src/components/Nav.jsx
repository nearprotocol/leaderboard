import React from 'react';
import { Link, withRouter } from "react-router-dom";
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

  componentWillMount() {
    // console.log(this.state.user);
    // console.log(fire.auth().currentUser)
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
      <nav className="Nav" >
        <ul>
          <li>
            <Link to="/">
              <img src="https://nearprotocol.com/wp-content/themes/near-19/assets/img/logo.svg?t=1553011311" alt=""/>
            </Link>
            hack ONE
          </li>
          { this.state.user ?
            <React.Fragment>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <a href="#" onClick={this.signOut}>Sign Out</a>
              </li>
            </React.Fragment>
            :
          <li>
            <Link to="/sign-up">Sign Up</Link>
          </li>
          }
        </ul>  
      </nav>
    );
  }
}
export default withRouter(Nav);