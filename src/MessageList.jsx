import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log('Rendering <MessageList/>');
    return (
      <div className="messages">
        <Message
        name="Anonymous1"
        content="I won't be impressed with technology until I can download food."
        ></Message>
      </div>
    );
  }
}

export default MessageList;