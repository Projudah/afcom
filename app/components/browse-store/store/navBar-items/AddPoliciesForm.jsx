// src/components/browse-store/store/EditPoliciesForm.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../../../styles/storeDetails.css';

const EditPoliciesForm = ({ show, handleClose, policies, updatePolicies }) => {
  const [returnPolicy, setReturnPolicy] = useState('');
  const [shippingPolicy, setShippingPolicy] = useState('');
  const [privacyPolicy, setPrivacyPolicy] = useState('');

  useEffect(() => {
    if (policies) {
      setReturnPolicy(policies.returnPolicy);
      setShippingPolicy(policies.shippingPolicy);
      setPrivacyPolicy(policies.privacyPolicy);
    }
  }, [policies]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPolicies = { returnPolicy, shippingPolicy, privacyPolicy };
    updatePolicies(updatedPolicies);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header className="contactModal-Header text-white" closeButton>
        <Modal.Title className="fw-bold">Edit Policies</Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-light p-4 rounded-bottom">
        <p className="fs-5 text-secondary mb-4">
          Update your store policies below. All fields are required.
        </p>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formReturnPolicy" className="mb-3">
            <Form.Label className="fw-semibold">Return Policy</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={returnPolicy}
              onChange={(e) => setReturnPolicy(e.target.value)}
              required
              className="shadow-sm"
            />
          </Form.Group>

          <Form.Group controlId="formShippingPolicy" className="mb-3">
            <Form.Label className="fw-semibold">Shipping Policy</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={shippingPolicy}
              onChange={(e) => setShippingPolicy(e.target.value)}
              required
              className="shadow-sm"
            />
          </Form.Group>

          <Form.Group controlId="formPrivacyPolicy" className="mb-4">
            <Form.Label className="fw-semibold">Privacy Policy</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={privacyPolicy}
              onChange={(e) => setPrivacyPolicy(e.target.value)}
              required
              className="shadow-sm"
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="outline-secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditPoliciesForm;
