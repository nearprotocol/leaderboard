import React from 'react';

export default class ProfileTag extends React.Component {
  render() {
    return(
      <div>
        <div>hello</div>
        <div>{this.props.name}</div>
        <div>{this.props.image}</div>
      </div>
    );
  }
}