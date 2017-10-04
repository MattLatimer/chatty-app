import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    // console.log('Rendering <MessageList/>');
    const messages = this.props.messages.map(message => {
      return (
        <Message
          key={message.id}
          name={message.userName}
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