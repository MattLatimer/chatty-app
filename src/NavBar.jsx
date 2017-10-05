import React, {Component} from 'react';

class NavBar extends Component {
  constructor(props) {
    super(props)
  }

    render() {
      const c = this.props.userCount;
      return(
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className='userCount'>{c} user{(c===1)?'':'s'} online.</span>
        </nav>
      )
  }
}

export default NavBar;