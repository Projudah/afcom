'use client'
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../../../styles/addDiscountStyle.css';

const AddDiscountForm = ({ show, handleClose, addDiscount, products, services }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [percentage, setPercentage] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const handleCheckboxChange = (e, type) => {
    const id = parseInt(e.target.value);
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
      id: Date.now(), // Simple unique ID
      title,
      description,
      percentage,
      products: selectedProducts,
      services: selectedServices
    };
    addDiscount(newDiscount);
    // Reset form fields
    setTitle('');
    setDescription('');
    setPercentage('');
    setSelectedProducts([]);
    setSelectedServices([]);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} className="add-discount-modal">
      <Modal.Header closeButton>
        <Modal.Title>Add Discount</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="discountTitle">
            <Form.Label>Discount Title</Form.Label>
            <Form.Control 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter discount title"
              required
            />
          </Form.Group>
          <Form.Group controlId="discountDescription" className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter discount description"
              required
            />
          </Form.Group>
          <Form.Group controlId="discountPercentage" className="mt-3">
            <Form.Label>Discount Percentage</Form.Label>
            <Form.Control 
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              placeholder="Enter discount percentage"
              required
            />
          </Form.Group>
          <Form.Group controlId="selectProducts" className="mt-3">
            <Form.Label>Select Products</Form.Label>
            <div>
              {products.map(product => (
                <Form.Check
                  inline
                  key={product.id}
                  label={product.name}
                  type="checkbox"
                  value={product.id}
                  onChange={(e) => handleCheckboxChange(e, 'product')}
                />
              ))}
            </div>
          </Form.Group>
          <Form.Group controlId="selectServices" className="mt-3">
            <Form.Label>Select Services</Form.Label>
            <div>
              {services.map(service => (
                <Form.Check
                  inline
                  key={service.id}
                  label={service.name}
                  type="checkbox"
                  value={service.id}
                  onChange={(e) => handleCheckboxChange(e, 'service')}
                />
              ))}
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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
