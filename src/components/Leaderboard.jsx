import React from 'react';
import Card from './Card';
import fire from '../fire';

const DATA = {
  title: 'Leaderboard',
  people: [
    {
      key: 1,
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
  " What The...",
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

export default class Leaderboard extends React.Component {
  constructor () {
    super(); 
  }
  componentWillMount(){
    this.setState(DATA);

    // let usersRef = fire.database().ref('users').orderByKey();
    let db = fire.database()
    let ref = db.ref("teams");
    ref.on('value', dataSnapshot => {
      console.log(dataSnapshot.val())
      let newPeople = [];
      let peeps = dataSnapshot.val()
      let keys = Object.keys(peeps);
      for (let i = 0; i < keys.length; i++) {
        newPeople.push({
          key: keys[i],
          name: peeps[keys[i]].name,
          demo: peeps[keys[i]].demo,
          image: peeps[keys[i]].image,
          score: peeps[keys[i]].score
        })
      }

      this.setState({
        people: newPeople,
        loading: false
      });
    });
  }
  render () {
    return (
      <div className="CardContainer">
        <Card cardTitle={this.state.title}>
          <List items={this.state.people}/> 
        </Card>
      </div>
    );
  }
}

class List extends React.Component {
  compareArray(_a, _b) {
    let a=_a.score;
    let b=_b.score;
    if (a < b || a == null)
      return 1;
    if (a > b)
      return -1;
    return 0;
  }
  sortArray() {
    return this.props.items.sort(this.compareArray);
  }

  componentDidUpdate() {
  }

  render() {
    let sortedItems = this.sortArray();
    let items = sortedItems.map((item, i) => {
      return <Item
                key = {item.key}
                name = {item.name}
                demo = {item.demo}
                score = {item.score}
                image = {item.image}/>});
    return (
      <ul> 
        {items}
      </ul>
    );
  }
}

class Item extends React.Component {
  render () {
    return ( 
      <li className = "Item" >
        <div className = "Image"
          style = {{ backgroundImage: 'url(' + this.props.image + ')'}} > </div> 
        <div className = "Name" > {this.props.name} </div> 
        <a className="Demo" href={this.props.demo}> demo or github</a>
        <div className = "Score" > {this.props.score} </div> 
      </li>
    );
  }
}