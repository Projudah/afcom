'use client'
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { FaPhoneAlt, FaEnvelope, FaCommentDots } from 'react-icons/fa';
import BrowseNavbar from '../../common/BrowseStoreHeader';
import '../../../../styles/helpModal.css'; // Ensure this file exists and has the correct styles

const CustomerSupport = () => {
  const router = useRouter();
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  // Open the email form modal
  const handleShowEmailForm = () => setShowEmailForm(true);
  const handleCloseEmailForm = () => setShowEmailForm(false);

  // Handle email form submission
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    alert(`Your email has been sent to erivwoganre@gmail.com. We will get back to you soon!`);
    setShowEmailForm(false);
  };

  // Handle chat input
  const handleChatInput = (e) => {
    setChatMessage(e.target.value);
  };

  // Submit chat message
  const handleChatSubmit = () => {
    if (chatMessage.trim()) {
      setChatHistory([...chatHistory, { message: chatMessage, fromCustomer: true }]);
      setChatMessage('');
    }
  };

  // Handle back navigation
  const handleBack = () => {
    router.push('/browse-stores');
  };

  return (
    <div>
    <BrowseNavbar />
    <div className="customer-support-container">
    <Button variant="secondary" onClick={handleBack} className="back-button mb-3">
          Back
     </Button>
      <h2 className="support-title">Contact Us for Support</h2>
      <div className="support-options">
        {/* Phone Support */}
        <div className="support-option">
          <FaPhoneAlt className="support-icon" />
          <h5>Call Us</h5>
          <p>Speak to our support team</p>
          <Button variant="primary" href="tel:+1234567890">
            Call Now
          </Button>
        </div>

        {/* Email Support */}
        <div className="support-option">
          <FaEnvelope className="support-icon" />
          <h5>Email Us</h5>
          <p>Send us your request via email</p>
          <Button variant="primary" onClick={handleShowEmailForm}>
            Send Email
          </Button>
        </div>

        {/* Text Chat Support */}
        <div className="support-option">
          <FaCommentDots className="support-icon" />
          <h5>Chat with Us</h5>
          <p>Message our support team in real-time</p>
          <Button variant="primary" onClick={() => setShowChat(true)}>
            Start Chat
          </Button>
        </div>
      </div>

      {/* Email Form Modal */}
      <Modal show={showEmailForm} onHide={handleCloseEmailForm} className="email-modal">
        <Modal.Header closeButton>
          <Modal.Title>Email Support</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEmailSubmit}>
            <Form.Group controlId="supportEmail">
              <Form.Label>Your Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="supportMessage">
              <Form.Label>Your Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describe your issue"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </Form.Group>

            <p className="support-email-note">Alternatively, you can reach us directly at: <strong>africancommunity@gmail.com</strong></p>

            <Button variant="primary" type="submit">
              Send Email
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Real-time Chat */}
      <Modal show={showChat} onHide={() => setShowChat(false)} className="chat-modal">
        <Modal.Header closeButton>
          <Modal.Title>Live Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="chat-history">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`chat-message ${chat.fromCustomer ? 'customer' : 'support'}`}>
                <p>{chat.message}</p>
              </div>
            ))}
          </div>
          <Form.Group controlId="chatInput">
            <Form.Control
              type="text"
              placeholder="Type a message..."
              value={chatMessage}
              onChange={handleChatInput}
              onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleChatSubmit}>
            Send
          </Button>
        </Modal.Body>
      </Modal>
    </div>
    </div>
  );
};

export default CustomerSupport;
