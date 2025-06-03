// src/components/InquiryModal.jsx
'use client';
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../../styles/storeDetails.css';

const InquiryModal = ({ show, handleClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: replace with your actual submission logic (e.g., send to backend)
    console.log({ name, email, message });
    setIsSubmitted(true);
  };

  const handleModalClose = () => {
    setName('');
    setEmail('');
    setMessage('');
    setIsSubmitted(false);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleModalClose} centered>
      <Modal.Header className="contactModal-Header text-white" closeButton>
        <Modal.Title className="fw-bold">Contact Us</Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-light p-4 rounded-bottom">
        {isSubmitted ? (
          <div className="text-center py-4">
            <h5 className="text-success mb-3">✅ Thank you!</h5>
            <p className="fs-5 text-secondary mb-4">
              We have received your message. We’ll be in touch within 24 hours.
            </p>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
          </div>
        ) : (
          <>
            <p className="fs-5 text-secondary mb-4">
              Have a question or need assistance? Fill out the form below, and we’ll get back to you as soon as possible.
            </p>

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="contactName" className="mb-3">
                <Form.Label className="fw-semibold">Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="shadow-sm"
                />
              </Form.Group>

              <Form.Group controlId="contactEmail" className="mb-3">
                <Form.Label className="fw-semibold">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="shadow-sm"
                />
              </Form.Group>

              <Form.Group controlId="contactMessage" className="mb-4">
                <Form.Label className="fw-semibold">Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  required
                  className="shadow-sm"
                />
              </Form.Group>

              <div className="d-flex justify-content-end">
                <Button variant="outline-secondary" onClick={handleModalClose} className="me-2">
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Send Message
                </Button>
              </div>
            </Form>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default InquiryModal;
