// src/components/browse-store/store/ItemInquiryModal.jsx
'use client';

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../../styles/storeDetails.css';

function InquiryModal({ item, isOpen, onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      itemId: item.id,
      itemName: item.name,
      ...form,
    };
    // TODO: send `payload` to your backend or email service
    console.log(payload);
    setIsSubmitted(true);
  }

  function handleModalClose() {
    setIsSubmitted(false);
    setForm({ name: '', email: '', phone: '', message: '' });
    onClose();
  }

  if (!item) return null;

  return (
    <Modal show={isOpen} onHide={handleModalClose} centered>
      <Modal.Header className="contactModal-Header bg-primary text-white" closeButton>
        <Modal.Title className="fw-bold">
          Enquire About {item.name}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-light p-4 rounded-bottom">
        {isSubmitted ? (
          <div className="text-center py-4">
            <h5 className="text-success mb-3">✅ Thank you!</h5>
            <p className="fs-5 text-secondary mb-4">
              We received your inquiry about “{item.name}.” We’ll be in touch within 24 hours.
            </p>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
          </div>
        ) : (
          <>
            {item.price && (
              <p className="fs-5 mb-3">
                <strong>Price:</strong> {item.price}
              </p>
            )}
            <p className="fs-6 text-secondary mb-4">
              {item.shortDescription ||
                'Let us know what you’d like—pricing, quantity, or any questions.'}
            </p>

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="inquiryName" className="mb-3">
                <Form.Label className="fw-semibold">Name*</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  className="shadow-sm"
                />
              </Form.Group>

              <Form.Group controlId="inquiryEmail" className="mb-3">
                <Form.Label className="fw-semibold">Email*</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="shadow-sm"
                />
              </Form.Group>

              <Form.Group controlId="inquiryPhone" className="mb-3">
                <Form.Label className="fw-semibold">Phone (optional)</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="123-456-7890"
                  className="shadow-sm"
                />
              </Form.Group>

              <Form.Group controlId="inquiryMessage" className="mb-4">
                <Form.Label className="fw-semibold">Message*</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  required
                  className="shadow-sm"
                />
              </Form.Group>

              {/* Hidden fields so the backend knows which item was clicked */}
              <input type="hidden" name="itemId" value={item.id} />
              <input type="hidden" name="itemName" value={item.name} />

              <div className="d-flex justify-content-end">
                <Button
                  variant="outline-secondary"
                  onClick={handleModalClose}
                  className="me-2"
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Send Enquiry
                </Button>
              </div>
            </Form>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default InquiryModal;
