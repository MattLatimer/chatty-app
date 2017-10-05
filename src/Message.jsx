import React, {Component} from 'react';

class Message extends Component {
  constructor(props){
    super(props);
  }
  render() {
    console.log('Rendering <Message/>');
    switch (this.props.type) {
    case 'incomingMessage':
      return (
        <div className="message">
          <span className="message-username">{this.props.name}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      );
      break;
    case 'incomingNotification':
      return (
        <div className='message system'>
          {this.props.content}
        </div>
      )
      break;
    default:
      console.log(`Received message with unknown type: ${this.props.type}`)  
    }
  }
}

export default Message;