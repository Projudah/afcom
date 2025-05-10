// src/components/HelpModal.jsx
import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import Link from 'next/link';

const HelpModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Help & Support</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          <ListGroup.Item>
            <Link to="/complaint" onClick={handleClose}>File a Complaint</Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link to="/faq" onClick={handleClose}>FAQ</Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link to="/customer-support" onClick={handleClose}>Customer Support</Link>
          </ListGroup.Item>
          {/* Add more links as needed */}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HelpModal;
