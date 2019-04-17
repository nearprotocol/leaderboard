import React from 'react';

export default class Nav extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <nav className="Nav" >
        <ul>
          <li>
            <a href="https://nearprotocol.com">
              <img src="https://nearprotocol.com/wp-content/themes/near-19/assets/img/logo.svg?t=1553011311" alt=""/>
            </a>
            hack ONE
          </li>
          <li>
          </li>
        </ul>  
      </nav>
    );
  }
}