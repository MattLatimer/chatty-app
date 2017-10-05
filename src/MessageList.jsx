import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const renderedMessages = this.props.messages.map(message => {
      return (
        <Message
          type={message.type}
          key={message.id}
          userName={message.userName || 'Anonymous'}
          content={message.message}
          color={message.colorId}
        ></Message>
      )
    });

    return(
      <div className="messages">{renderedMessages}</div>
    )
  }
}

export default MessageList;