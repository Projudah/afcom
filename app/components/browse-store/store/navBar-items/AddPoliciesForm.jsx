// src/components/EditPoliciesForm.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

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
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className='inquiryModal-Header' closeButton>
        <Modal.Title>Edit Policies</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formReturnPolicy" className='inquiry-container'>
            <Form.Label>Return Policy</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={returnPolicy}
              onChange={(e) => setReturnPolicy(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formShippingPolicy" className='inquiry-container'>
            <Form.Label>Shipping Policy</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={shippingPolicy}
              onChange={(e) => setShippingPolicy(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPrivacyPolicy" className='inquiry-container'>
            <Form.Label>Privacy Policy</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={privacyPolicy}
              onChange={(e) => setPrivacyPolicy(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditPoliciesForm;
