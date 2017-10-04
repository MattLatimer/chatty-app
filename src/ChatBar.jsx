import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props)
    this.state = {userName: this.props.userName, message: ''};
  }
  
  handleNameChange = (event) => {
    this.setState({userName: event.target.value});
  }

  handleMessageChange = (event) => {
    this.setState({message: event.target.value});
  }

  onEnter = (event) => {
    if (event.key === 'Enter' && this.state.message !== '') {
      this.props.submitMessage(this.state.message, this.state.userName);
      this.setState({message: ''});
    }
  }

  render() {
    console.log('Rendering <ChatBar/>');
    return (
      <footer className="chatbar">
        <input 
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          value={this.state.userName}
          onChange={this.handleNameChange}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={this.state.message}
          onChange={this.handleMessageChange}
          onKeyPress={this.onEnter}
        />
      </footer>
    );
  }
}

export default ChatBar;