import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    
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
      ],
      nextId: 4
    };
    
    this.submitMessage = this.submitMessage.bind(this);
  }
  
  submitMessage = (message, userName) => {
    console.log("MESSAGE:", message);
    let tempMessages = this.state.messages.slice();
    tempMessages.push({
      id: this.state.nextId++,
      username: userName || 'Anonymous',
      content: message
    });
    this.setState({
      messages: tempMessages
    })
  }
  
componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
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
