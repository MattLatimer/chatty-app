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
    console.log('Name change:', userName);
    if (userName !== this.state.currentUser.name) {
      this.socket.send(JSON.stringify(
        [{type: 'postNotification', message: `${this.state.currentUser.name || 'Anonymous'} has changed their name to ${userName || 'Anonymous'}`}]
      ));
      this.setState({
        currentUser: {name: userName}
      })
    }
  }

  submitMessage = (message, userName) => {
    console.log('MESSAGE:', userName, message);
    const output = [];
    if (userName !== this.state.currentUser.name) {
      output.push({type: 'postNotification', message: `${this.state.currentUser.name || 'Anonymous'} has changed their name to ${userName || 'Anonymous'}`})
      this.setState({
        currentUser: {name: userName}
      })
    }
    output.push({type: 'postMessage', userName: userName, message: message})
    this.socket.send(JSON.stringify(output));
  };
  
componentDidMount() {
  console.log("componentDidMount <App />");

  this.socket = new WebSocket(`ws://${location.hostname}:3001`);
  
  this.socket.onopen = (event) => {
    console.log("Connected to Server.");
  };

  this.socket.onmessage = (incoming) => {
    console.log("incoming message");
    const message = JSON.parse(incoming.data);
    if (message.type === 'userCount') {
      this.setState({userCount: message.message})
    } else {
      const messages = this.state.messages.concat(message);
      this.setState({messages: messages});
    }
  };
}

  render() {
    console.log('Rendering <App/>');

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
