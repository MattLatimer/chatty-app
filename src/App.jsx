import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: ''},
      messages: [],
      userCount: 0
    };
    
    this.submitMessage = this.submitMessage.bind(this);
    this.submitName = this.submitName.bind(this);
  }
  
  submitName = (userName) => {
    this.socket.send(JSON.stringify(
      {type: 'postNotification', message: `${this.state.currentUser.name || 'Anonymous'} has changed their name to ${userName || 'Anonymous'}`}
    ))
    this.setState({
      currentUser: {name: userName}
    })
  }

  submitMessage = (message, userName) => {
    if (userName !== this.state.currentUser.name) {
      this.submitName(userName);
    }
    this.socket.send(JSON.stringify(
      {type: 'postMessage', userName: userName, message: message}
    ));
  };
  
componentDidMount() {
  this.socket = new WebSocket(`ws://${location.hostname}:3001`);
  
  this.socket.onopen = (event) => {
    console.log("Connected to Server.");
  };

  this.socket.onmessage = (incoming) => {
    const message = JSON.parse(incoming.data);
    if (message.type === 'userCount') {
      this.setState({userCount: message.content})
    } else {
      const newMessages = this.state.messages.concat(message);
      this.setState({messages: newMessages});
    }
  };
}

  render() {
    return (
      <main>
        <NavBar userCount={this.state.userCount}/>
        <MessageList messages={this.state.messages}></MessageList>
        <ChatBar
          userName={this.state.currentUser.name}
          submitMessage={this.submitMessage}
          submitName={this.submitName}
        ></ChatBar>
      </main>
    );
  }
}

export default App;