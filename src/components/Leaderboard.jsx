import React from 'react';
import Card from './Card';
import fire from '../fire';

const DATA = {
  title: 'Leaderboard',
  people: [
    {
      name: 'Bad Boi Vlad',
      image: 'http://lorempixel.com/120/120',
      score: 20051
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

// DATA.people = DATA.people.concat(peeps);
// console.log(DATA)

export default class Leaderboard extends React.Component {
  constructor () {
    super(); 
  }
  componentWillMount(){
    this.setState(DATA);

    // let usersRef = fire.database().ref('users').orderByKey();
    let db = fire.database()
    let ref = db.ref("users");
    ref.on('value', dataSnapshot => {
      console.log(dataSnapshot.val())
      let newPeople = [];
      let peeps = dataSnapshot.val()
      let k = Object.keys(peeps);
      for (let i = 0; i < k.length; i++) {
        newPeople.push({
          name: peeps[k[i]].name,
          image: peeps[k[i]].image,
          score: peeps[k[i]].score
        })
      }
      this.setState({
        people: newPeople,
        loading: false
      });
    });

    // usersRef.on('value', snapshot => {
    //   let newPeople = [];
    //   let peeps = snapshot.val()
    //   for (let i=0;i<peeps.length; i++) {
    //     newPeople.push({
    //       name: peeps[i].name,
    //       image: peeps[i].image,
    //       score: peeps[i].score
    //     })
    //   }
    //   this.setState({
    //     people: newPeople
    //   });
    // });
  }
  render () {
    return (
      <div className="CardContainer">
        <Card cardTitle={this.state.title}>
          <List people={this.state.people}/> 
        </Card>
      </div>
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