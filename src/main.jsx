import React from 'react';
import './style.scss'

const DATA = {
  title: 'Leaderboard',
  people: [{
      name: 'Eugene The Dream',
      image: 'http://lorempixel.com/100/100',
      score: 9001
    },
    {
      name: 'Bad Boi Vlad',
      image: 'http://lorempixel.com/120/120',
      score: 2050
    },
    {
      name: 'Jane The Brain',
      image: 'http://lorempixel.com/110/110',
      score: 9000
    },
    {
      name: 'Bowen the... wtf!',
      image: 'http://lorempixel.com/105/105',
      score: 2103
    },
    {
      name: 'Detective Misha',
      image: 'http://lorempixel.com/101/101',
      score: 2019
    }
  ]
}

export default class Leaderboard extends React.Component {
  constructor () {
    super();
    this.state = DATA;
  }
  render () {
    return ( 
      <div className = "Leaderboard" >
        <Title title = {this.state.title}/> 
        <List people = {this.state.people}/> 
      </div>
    );
  }
}

class Title extends React.Component {
  render () {
    return ( <div className = "Title" > {this.props.title} </div>
    );
  }
}

class List extends React.Component {
  compareArray(a, b) {
    if (a.score < b.score)
      return 1;
    if (a.score > b.score)
      return -1;
    return 0;
  }
  sortArray() {
    return this.props.people.sort(this.compareArray);
  }
  render() {
    let peopleList = this.sortArray();
    let people = peopleList.map(function (person, i) {
      return <Person 
        key = {person.name}
        name = {person.name}
        score = {person.score}
        image = {person.image}/>
    });
    return ( 
      <ul> 
        {people}
      </ul>
    );
  }
}

class Person extends React.Component {
  render () {
    return ( 
      <li className = "Person" >
        <div className = "Image"
          style = {{ backgroundImage: 'url(' + this.props.image + ')'}} > </div> 
        <div className = "Name" > {this.props.name} </div> 
        <div className = "Score" > {this.props.score} </div> 
      </li>
    );
  }
}