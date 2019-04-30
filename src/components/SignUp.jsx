import React from "react";
import fire from '../fire';
import Card from './Card';
import { Redirect } from 'react-router';
import Select from 'react-select';
import {countries} from '../utils/countries';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      country: {
        value: "",
        label: ""
      },
      password: "",
      passwordConf: "",
      name: "",
      newSignUp: true,
      countries: countries,
      team: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleSignUp = this.toggleSignUp.bind(this);

  }

  // TODO: This is bad and I feel bad for writing it
  validateForm() {
    let newSignup = this.state.newSignUp;
    let enteredPassword = this.state.password.length > 6;
    let confirmedPassword = (this.state.password === this.state.passwordConf);
    let selectedCountry = this.state.country.value.length > 0;
    let selectedTeam = this.state.team.length > 0;
    let enteredEmail = this.state.email.length > 0;

    return newSignup
        && enteredPassword
        && confirmedPassword
        && selectedCountry
        && selectedTeam
        && enteredEmail
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSelect(value) {
    this.setState({
      country: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.newSignUp){
      fire.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        let user = res.user;

        // TODO: refactor into obj
        this.writeUserData(
          user.uid,
          this.state.name,
          this.state.email,
          this.state.country,
          this.state.team);

        this.writeTeamData(
          user.uid,
          this.state.team
        )

        user.sendEmailVerification()
        .then(function () {
          // Email sent. Don't trip dog.
        }).catch(function (error) {
          console.log(error)
        });
      })
      .catch(error => {
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
        var errorMessage = error.message;
        alert(errorMessage);
      });
    }
  }

  generateRandomImageLink() {
    let x = Math.floor(Math.random()*10);
    return `http://lorempixel.com/10${x}/10${x}`;
  }

  writeUserData(userId, name, email, country, team) {
    fire.database().ref('users/' + userId).set({
      name: name,
      email: email,
      image: this.generateRandomImageLink(),
      country: country,
      team: team,
      score: 100
    }).then(res => {
      this.handleSuccess(res);
    });
  }

  writeTeamData(userId, teamName) {
    fire.database().ref('teams/').push({
      name: teamName,
      image: this.generateRandomImageLink(),
      score: 100,
      leaderId: userId
    }).then(res => {
      this.handleSuccess(res);
    });
  }

  handleSuccess(res) {
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
            { this.state.newSignUp ?
            <React.Fragment>
              <div className="form-group">
                  <input id="name" type="text" placeholder="leader name" onChange={this.handleChange} value={this.state.name} required />
              </div>
              <div className="form-group">
                <input id="team" type="text" placeholder="team name" onChange={this.handleChange} value={this.state.team} required />
              </div>
              <div className="form-group">
                <Select
                  isSearchable={true}
                  value={ this.state.country }
                  placeholder="country"
                  onChange={ this.handleSelect }
                  options={ this.state.countries } 
                  required />
              </div>
            </React.Fragment>
            : ""}
            <div className="form-group">
              <input id="email" type="text" placeholder="email" onChange={this.handleChange} value={this.state.email}/>
            </div>
            <div className="form-group">
              <input id="password" type="password" placeholder="password" onChange={this.handleChange} value={this.state.password}/>
            </div>
            { this.state.newSignUp ? 
              <div className="form-group">
                <input id="passwordConf" type="password" placeholder="confirm password" onChange={this.handleChange} value={this.state.passwordConf}/>
              </div>
            : ""}
            <div className="form-group">
              <button
                className="form-button"
                disabled={!this.validateForm()}
                type="submit">
                { this.signUpOrInText() }
              </button>
              <a className="spacer" href="" onClick={this.toggleSignUp}>
                {this.existingAccountText()}
              </a>
            </div>
          </form>
        </Card>
      );
    }
  }
}

// class SelectList extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       optionValue: ""
//     }
//   }
//   render() {
//     let options = this.props.options.map((option, i) => {
//       return <option value={option.value}>{option.text}</option>;
//     });
//     return (
//       <select value={this.state.optionValue} onChange={this.props.callback} >
//         { options }
//       </select>
//     );
//   }
// }