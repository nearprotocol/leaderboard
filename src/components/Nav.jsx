import React from 'react';
import { Link } from "react-router-dom";

export default class Nav extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <nav className="Nav" >
        <ul>
          <li>
            <Link to="/">
              <img src="https://nearprotocol.com/wp-content/themes/near-19/assets/img/logo.svg?t=1553011311" alt=""/>
            </Link>
            hack ONE
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>  
      </nav>
    );
  }
}