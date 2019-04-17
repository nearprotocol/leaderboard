import React from 'react';
import Card from './Card';
import ProfileTag from './ProfileTag'
export default class Profile extends React.Component {
  constructor() {
    super();
  }
  render() {
    return(
        <Card cardTitle="Profile">
            <ul>
              <li>
                <ProfileTag name="test" image="test2" />
              </li>
              <li>

              </li>
              <li>Score: </li>
            </ul>
        </Card>
    );
  }
}