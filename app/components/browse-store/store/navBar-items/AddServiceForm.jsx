// src/components/browse-store/store/AddServiceForm.jsx
'use client';

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../../../styles/storeDetails.css';

const AddServiceForm = ({ show, handleClose, addService }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e, addMore) => {
    e.preventDefault();
    const newService = { id: Date.now(), name, price, description, image };
    addService(newService);
    if (addMore) {
      setName('');
      setPrice('');
      setDescription('');
      setImage('');
    } else {
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header className="contactModal-Header text-white" closeButton>
        <Modal.Title className="fw-bold">Add Service</Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-light p-4 rounded-bottom">
        <p className="fs-5 text-secondary mb-4">
          Enter the details for your new service. You can upload an image if available.
        </p>

        <Form onSubmit={(e) => handleSubmit(e, false)}>
          <Form.Group controlId="serviceName" className="mb-3">
            <Form.Label className="fw-semibold">Service Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter service name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="shadow-sm"
            />
          </Form.Group>

          <Form.Group controlId="servicePrice" className="mb-3">
            <Form.Label className="fw-semibold">Price or Range</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter price or range"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="shadow-sm"
            />
          </Form.Group>

          <Form.Group controlId="serviceDescription" className="mb-3">
            <Form.Label className="fw-semibold">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter service description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="shadow-sm"
            />
          </Form.Group>

          <Form.Group controlId="serviceImage" className="mb-4">
            <Form.Label className="fw-semibold">Service Image (optional)</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
              className="shadow-sm"
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button
              variant="outline-secondary"
              onClick={(e) => handleSubmit(e, true)}
            >
              Add &amp; Add More
            </Button>
            <Button variant="primary" type="submit">
              Confirm
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddServiceForm;
