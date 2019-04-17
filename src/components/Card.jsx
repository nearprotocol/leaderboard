import React from 'react';
export default class Card extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="CardContainer">
        <div className="Card">
          <Title title={this.props.cardTitle} />
          {this.props.children}
        </div>
      </div>
    );
  }
}


export class Title extends React.Component {
  render() {
    return (<div className="Title" > {this.props.title} </div>);
  }
}