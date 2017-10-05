import React, {Component} from 'react';

class Message extends Component {
  render() {
    switch (this.props.type) {
      case 'incomingMessage':
        return (
          <div className="message">
            <span className={`message-username color${this.props.color}`}>{this.props.userName}</span>
            <span className="message-content">{this.props.content}</span>
          </div>
        );
      case 'incomingNotification':
        return (
          <div className='message system'>{this.props.content}</div>
        )
      default:
        console.log(`Received message with unknown type: ${this.props.type}`)
        return(null);
    }
  }
}

export default Message;