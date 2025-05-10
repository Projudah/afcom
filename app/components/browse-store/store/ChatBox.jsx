'use client'
import React, { useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';
import '../../../styles/chatBox.css';

const ChatBox = ({ storeName, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'customer' }]);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-box-header">
        <span>Chat with {storeName}</span>
        <Button variant="link" className="chat-box-close" onClick={onClose}>
          <FaTimes />
        </Button>
      </div>
      <div className="chat-box-messages">
        {messages.map((message, index) => (
          <div key={index} className={`chat-box-message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <InputGroup className="chat-box-input">
        <FormControl
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <InputGroup.Append>
          <Button variant="primary" onClick={handleSendMessage}>
            <FaPaperPlane />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
};

export default ChatBox;