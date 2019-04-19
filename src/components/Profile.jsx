import React from 'react';
import Card from './Card';
import ProfileTag from './ProfileTag';
import fire from '../fire';

export default class Profile extends React.Component {
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
            email: prof.email,
            team: "Berry Club"
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
                <ProfileTag name={this.state.profile.name} image="Image" />
              </li>
              <li>team: {this.state.profile.team}</li>
              <li>
                {this.state.profile.email}
              </li>
              <li>Score: TBA</li>
            </ul>
        </Card>
    );
  }
}