import React from 'react';
import '../style.scss'

const DATA = {
  title: 'Leaderboard',
  people: [{
      name: 'Eugene The Dream',
      image: 'http://lorempixel.com/100/100',
      score: 8001
    },
    {
      name: 'Bad Boi Vlad',
      image: 'http://lorempixel.com/120/120',
      score: 20051
    },
    {
      name: 'Jane The Brain',
      image: 'http://lorempixel.com/110/110',
      score: 3000
    },
    {
      name: 'Bowen.sh!',
      image: 'http://lorempixel.com/105/105',
      score: 3103
    },
    {
      name: 'Detective Misha',
      image: 'http://lorempixel.com/101/101',
      score: 2019
    }
  ]
}

const firstNames = [
  "Bowen",
  "Detective",
  "Eugene",
  "Jane",
  "Berry"
];
const lastNames = [
  " Misha",
  " Dave",
  " The Dream",
  " The Train",
  " The What the fucccccccsa",
  ".sh"
]

function generateName() {
  let first = firstNames[Math.random() * firstNames.length | 0];
  let last = lastNames[Math.random() * lastNames.length | 0];
  return first + last;
}

let peeps = [...Array(20).keys()].map(x=> {
  return {
    name: generateName(),
    image: `http://lorempixel.com/10${x}/10${x}`,
    score: Math.floor(Math.random() * 10000)
  }
})
// console.log(peeps);

DATA.people = DATA.people.concat(peeps);
console.log(DATA)

export default class Leaderboard extends React.Component {
  constructor () {
    super();
    
  }
  render () {
    this.state = DATA;
    return (
      <div className="CardContainer">
        <div className="Leaderboard" >
          <Title title = {this.state.title}/> 
          <List people = {this.state.people}/> 
        </div>
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
    let people = peopleList.map((person, i) => {
      return <Person 
              key = {person.name + i}
              name = {person.name}
              score = {person.score}
              image = {person.image}/>});
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