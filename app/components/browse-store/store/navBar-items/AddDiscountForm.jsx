// src/components/browse-store/store/AddDiscountForm.jsx
'use client';

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../../../styles/storeDetails.css';

const AddDiscountForm = ({ show, handleClose, addDiscount, products, services }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [percentage, setPercentage] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const handleCheckboxChange = (e, type) => {
    const id = parseInt(e.target.value, 10);
    if (type === 'product') {
      if (e.target.checked) {
        setSelectedProducts([...selectedProducts, id]);
      } else {
        setSelectedProducts(selectedProducts.filter(pid => pid !== id));
      }
    } else if (type === 'service') {
      if (e.target.checked) {
        setSelectedServices([...selectedServices, id]);
      } else {
        setSelectedServices(selectedServices.filter(sid => sid !== id));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDiscount = {
      id: Date.now(),
      title,
      description,
      percentage,
      products: selectedProducts,
      services: selectedServices,
    };
    addDiscount(newDiscount);
    setTitle('');
    setDescription('');
    setPercentage('');
    setSelectedProducts([]);
    setSelectedServices([]);
    handleClose();
  };

  const safeProducts = Array.isArray(products) ? products : [];
  const safeServices = Array.isArray(services) ? services : [];

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header className="contactModal-Header text-white" closeButton>
        <Modal.Title className="fw-bold">Add Discount</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body className="bg-light p-4 rounded-bottom">
          <p className="fs-5 text-secondary mb-4">
            Define a new discount by specifying title, description, percentage, and selecting applicable items.
          </p>

          <Form.Group controlId="discountTitle" className="mb-3">
            <Form.Label className="fw-semibold">Discount Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter discount title"
              required
              className="shadow-sm"
            />
          </Form.Group>

          <Form.Group controlId="discountDescription" className="mb-3">
            <Form.Label className="fw-semibold">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter discount description"
              required
              className="shadow-sm"
            />
          </Form.Group>

          <Form.Group controlId="discountPercentage" className="mb-4">
            <Form.Label className="fw-semibold">Discount Percentage</Form.Label>
            <Form.Control
              type="number"
              value={percentage}
              onChange={e => setPercentage(e.target.value)}
              placeholder="Enter discount percentage"
              required
              className="shadow-sm"
            />
          </Form.Group>

          <Form.Group controlId="selectProducts" className="mb-4">
            <Form.Label className="fw-semibold">Select Products</Form.Label>
            <div>
              {safeProducts.map(product => (
                <Form.Check
                  inline
                  key={product.id}
                  label={product.name}
                  type="checkbox"
                  value={product.id}
                  onChange={e => handleCheckboxChange(e, 'product')}
                />
              ))}
              {safeProducts.length === 0 && (
                <div className="text-muted">No products available</div>
              )}
            </div>
          </Form.Group>

          <Form.Group controlId="selectServices" className="mb-4">
            <Form.Label className="fw-semibold">Select Services</Form.Label>
            <div>
              {safeServices.map(service => (
                <Form.Check
                  inline
                  key={service.id}
                  label={service.name}
                  type="checkbox"
                  value={service.id}
                  onChange={e => handleCheckboxChange(e, 'service')}
                />
              ))}
              {safeServices.length === 0 && (
                <div className="text-muted">No services available</div>
              )}
            </div>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className="bg-light border-top-0">
          <Button variant="outline-secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save Discount
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddDiscountForm;
