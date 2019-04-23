import React from 'react';

export default class ProfileTag extends React.Component {
  render() {
    return(
      <div className="ProfileTag">
        <div className="Image" style={{ backgroundImage: 'url(' + this.props.image + ')'}}></div>
        <div>{this.props.name}</div>
      </div>
    );
  }
}