import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    // console.log('Rendering <MessageList/>');
    const messages = this.props.messages.map(message => {
      return (
        <Message
          type={message.type}
          key={message.id}
          name={message.userName || 'Anonymous'}
          content={message.message}
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