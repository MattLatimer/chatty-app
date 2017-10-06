import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    const num = this.props.userCount;
    return(
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className='userCount'>{num} user{(num===1)?'':'s'} online.</span>
      </nav>
    )
  }
}

NavBar.propTypes

export default NavBar;