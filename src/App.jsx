import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  render() {
    console.log('Rendering <App/>');

  this.state = {
    currentUser: {name: 'Bob'},
    messages: [
      {
      id: 1,
      username: 'Bob',
      content: 'Has anyone seen my marbles?',
    },
    {
      id: 2,
      username: 'Anonymous',
      content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
    }
  ]
  };

    return (
      <main>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}></MessageList>
        <ChatBar userName={this.state.currentUser.name}></ChatBar>
      </main>
    );
  }
}
export default App;
