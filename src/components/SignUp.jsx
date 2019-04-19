import React from "react";
import fire from '../fire';
import Card from './Card';
import { Redirect } from 'react-router';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConf: "",
      newSignUp: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleSignUp = this.toggleSignUp.bind(this);
  }

  validateForm() {
    if (this.state.newSignUp && (this.state.password !== this.state.passwordConf)) {
      return false;
    }
    return this.state.email.length > 0 && this.state.password.length > 6;
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.newSignUp){
      fire.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {

        // HANDLE redirect
        this.handleSuccess(res);
      })
      .catch(error => {
        // Handle Errors here.
        // var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
    } else {
      fire.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        this.handleSuccess(res);
      })  
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
    }
  }

  handleSuccess(user) {
    this.props.history.push('/profile');
  }

  signUpOrInText() {
    return this.state.newSignUp ? "Sign Up" : "Sign In";
  }

  existingAccountText() {
    return this.state.newSignUp ? "Sign in to existing account" : "Sign up for new account";
  }

  toggleSignUp(e) {
    e.preventDefault();
    this.setState({
      newSignUp: !this.state.newSignUp
    });
  }

  render() {
    if (this.state.isLoggedIn) {
      return <Redirect to="/profile" />
    } else {
      return (
        <Card cardTitle={this.signUpOrInText()}>
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input id="email" type="text" placeholder="email" onChange={this.handleChange} value={this.state.email}/>
            </div>
            <div className="form-group">
              <input id="password" type="password" placeholder="password" onChange={this.handleChange} value={this.state.password}/>
            </div>
            { this.state.newSignUp ? 
              <div className="form-group">
                <input id="passwordConf" type="password" placeholder="you know the drill" onChange={this.handleChange} value={this.state.passwordConf}/>
              </div>
            : ""}
            <button
              disabled={!this.validateForm()}
              type="submit">
              {this.signUpOrInText()}
            </button>
            <a href="" onClick={this.toggleSignUp}>
              {this.existingAccountText()}
            </a>
          </form>
        </Card>
      );
    }
  }
}