// src/components/MessageThread.jsx
'use client'
import React, { useState } from 'react';
import Link from 'next/link';

const MessageThread = ({ thread }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    // Logic to send message
    // For now, just update local state
    setNewMessage('');
  };

  return (
    <div>
      <h1>Message Thread</h1>
      <Link href="/messages">Back to Message Center</Link>
      <div>
        {thread && thread.map(msg => (
          <div key={msg.id}>
            <strong>{msg.sender}:</strong>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message here"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default MessageThread;
