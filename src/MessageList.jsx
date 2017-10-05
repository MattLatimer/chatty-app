import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log('Rendering <MessageList/>');
    const messages = this.props.messages.map(message => {
      console.log("COLOR:", message.colorId);
      return (
        <Message
          type={message.type}
          key={message.id}
          name={message.userName || 'Anonymous'}
          content={message.message}
          color={message.colorId}
        ></Message>
      )
    });
    return(
      <div className="messages">
      {messages}
      </div>
    )
  }
}

export default MessageList;