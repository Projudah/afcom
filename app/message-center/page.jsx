'use client'
import React, { useState } from 'react';
import { ListGroup, FormControl, InputGroup, Button, Modal, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaThumbtack, FaTrashAlt, FaArchive } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import '../styles/messageCenter.css'; // Prefix CSS to avoid conflicts

const MessageCenter = () => {
  const router = useRouter();
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Minnie Guo', message: 'I sent you a message', profile: 'url-to-minnie-photo.jpg', lastActive: 'Friday', pinned: false, archived: false, read: false },
    { id: 2, sender: 'Mark Wang', message: '[Image]', profile: 'url-to-mark-photo.jpg', lastActive: 'Thursday', pinned: true, archived: false, read: true },
    { id: 3, sender: 'Jaxon Li', message: '😊', profile: 'url-to-jaxon-photo.jpg', lastActive: 'Wednesday', pinned: false, archived: true, read: true },
    { id: 4, sender: 'Foxen Beauty', message: 'Welcome!', profile: 'url-to-foxen-logo.jpg', lastActive: 'Tuesday', pinned: false, archived: false, read: false }
  ]);

  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [filter, setFilter] = useState('All');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  // Open chat
  const openChat = (message) => {
    setActiveChat(message);
    // Mark the message as read when opened
    setMessages(prevMessages =>
      prevMessages.map(msg => (msg.id === message.id ? { ...msg, read: true } : msg))
    );
  };

  // Pin a message
  const togglePin = (id) => {
    setMessages(prevMessages =>
      prevMessages.map(msg => (msg.id === id ? { ...msg, pinned: !msg.pinned } : msg))
    );
  };

  // Archive a message
  const archiveMessage = (id) => {
    setMessages(prevMessages =>
      prevMessages.map(msg => (msg.id === id ? { ...msg, archived: !msg.archived } : msg))
    );
  };

  // Show delete confirmation modal
  const confirmDelete = (message) => {
    setMessageToDelete(message);
    setShowDeleteModal(true);
  };

  // Delete a message after confirmation
  const deleteMessage = () => {
    setMessages(prevMessages => prevMessages.filter(msg => msg.id !== messageToDelete.id));
    setShowDeleteModal(false);
  };

  // Handle filtering of messages
  const filteredMessages = messages.filter(msg => {
    if (filter === 'Unread') return !msg.read;
    if (filter === 'Pinned') return msg.pinned;
    if (filter === 'Archived') return msg.archived;
    return true;
  });

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      // Logic to send message
      setNewMessage('');
    }
  };

  return (
    <div className="prefix-message-center">
      <div className="prefix-header">
        <Button className="prefix-back-button" onClick={() => router.push('/browse-stores')}>Back to Home</Button>
        <h2>Message Center</h2>
        <p>Here’s where you can manage all your conversations with ease.</p>
      </div>

      {!activeChat ? (
        <>
          {/* Search and Filter Section */}
          <div className="prefix-search-filter">
            <InputGroup className="mb-3 prefix-search-bar">
              <FormControl placeholder="Search messages..." />
            </InputGroup>
            <Dropdown onSelect={(eventKey) => setFilter(eventKey)}>
              <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                {filter}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="All">All</Dropdown.Item>
                <Dropdown.Item eventKey="Unread">Unread</Dropdown.Item>
                <Dropdown.Item eventKey="Pinned">Pinned</Dropdown.Item>
                <Dropdown.Item eventKey="Archived">Archived</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <ListGroup className="prefix-message-list">
            {filteredMessages.map((message) => (
              <ListGroup.Item key={message.id} className="prefix-message-item">
                <div className="prefix-message-avatar" onClick={() => openChat(message)}>
                  <img src={message.profile} alt="Profile" className="prefix-avatar-image" />
                </div>
                <div className="prefix-message-info" onClick={() => openChat(message)}>
                  <h5 className={message.read ? '' : 'prefix-unread-message'}>{message.sender}</h5>
                  <p>{message.message}</p>
                </div>
                <div className="prefix-message-date">
                  <p>{message.lastActive}</p>
                </div>
                <div className="prefix-message-actions">
                  {/* Pin Icon with Tooltip */}
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>{message.pinned ? 'Unpin' : 'Pin'}</Tooltip>}
                  >
                    <FaThumbtack
                      className={`prefix-pin-icon ${message.pinned ? 'pinned' : ''}`}
                      onClick={() => togglePin(message.id)}
                    />
                  </OverlayTrigger>

                  {/* Archive Icon with Tooltip */}
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>{message.archived ? 'Unarchive' : 'Archive'}</Tooltip>}
                  >
                    <FaArchive
                      className="prefix-archive-icon"
                      onClick={() => archiveMessage(message.id)}
                    />
                  </OverlayTrigger>

                  {/* Delete Icon with Tooltip */}
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Delete</Tooltip>}
                  >
                    <FaTrashAlt
                      className="prefix-delete-icon"
                      onClick={() => confirmDelete(message)}
                    />
                  </OverlayTrigger>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      ) : (
        <Modal show={activeChat} onHide={() => setActiveChat(null)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Chat with {activeChat.sender}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="prefix-chat-box">
              <p>{activeChat.message}</p>
            </div>
            <InputGroup className="prefix-message-reply">
              <FormControl
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button variant="primary" onClick={handleSendMessage}>Send</Button>
            </InputGroup>
          </Modal.Body>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the message from {messageToDelete?.sender}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={deleteMessage}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MessageCenter;
