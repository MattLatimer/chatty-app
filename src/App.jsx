import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentUser: {name: 'Bob'},
      messages: [],
    };
    
    this.submitMessage = this.submitMessage.bind(this);
  }
  
  submitMessage = (message, userName) => {
    console.log("MESSAGE:", userName, message);
    this.socket.send(JSON.stringify({userName, message}));


    // let tempMessages = this.state.messages.slice();
    // tempMessages.push({
    //   id: this.state.nextId++,
    //   username: userName || 'Anonymous',
    //   content: message
    // });
    // this.setState({
    //   messages: tempMessages
    // })
  }
  
componentDidMount() {
  console.log("componentDidMount <App />");
  // setTimeout(() => {
  //   console.log("Simulating incoming message");
  //   // Add a new message to the list of messages in the data store
  //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
  //   const messages = this.state.messages.concat(newMessage)
  //   // Update the state of the app component.
  //   // Calling setState will trigger a call to render() in App and all child components.
  //   this.setState({messages: messages})
  // }, 3000);

  this.socket = new WebSocket("ws://localhost:3001");
  
  this.socket.onopen = (event) => {
    console.log("Connected to Server.");
  };

  this.socket.onmessage = (incoming) => {
    console.log("incoming message");
    const message = JSON.parse(incoming.data);
    const messages = this.state.messages.concat(message);
    this.setState({messages: messages});
  };
}

  render() {
    console.log('Rendering <App/>');

    return (
      <main>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}></MessageList>
        <ChatBar
          userName={this.state.currentUser.name}
          submitMessage={this.submitMessage}
        ></ChatBar>
      </main>
    );
  }
}
export default App;
