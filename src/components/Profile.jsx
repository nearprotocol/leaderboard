import React from 'react';
import Card from './Card';
import ProfileTag from './ProfileTag';
import fire from '../fire';
import { withRouter } from "react-router-dom";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      profile: {}
    }
  }

  componentDidMount() {
    let db = fire.database()
    let user = this.state.user;
    if (user) {
      let ref = db.ref("users/" + user.uid);
      ref.on('value', dataSnapshot => {
        let prof = dataSnapshot.val();
        this.setState({
          profile: {
            name: prof.name,
            image: prof.image,
            email: prof.email,
            team: prof.team,
            score: prof.score
          }
        })
      });  
    }

  }
  render() {
    return(
      <Card cardTitle="Profile">
          <ul>
            <li>
              <ProfileTag name={this.state.profile.name} image={this.state.profile.image} />
            </li>
          { this.state.profile.team ?
            <li>team: {this.state.profile.team}</li>
            : ""}
            <li>
              {this.state.profile.email}
            </li>
          <li>Score: {this.state.profile.score}</li>
          </ul>
      </Card>
    );
  }
}
export default withRouter(Profile);