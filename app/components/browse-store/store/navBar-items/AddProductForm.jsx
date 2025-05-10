'use client'
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddProductForm = ({ show, handleClose, addProduct }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e, addMore) => {
    e.preventDefault();
    const newProduct = { id: Date.now(), name, price, image };
    addProduct(newProduct);
    if (addMore) {
      setName('');
      setPrice('');
      setDescription('');
      setImage(null);
    } else {
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className='inquiryModal-Header' closeButton>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e, false)}>
          <Form.Group controlId="formProductName" className='inquiry-container'>
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formProductPrice" className='inquiry-container'>
            <Form.Label>Regular Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter regular price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formProductPrice" className='inquiry-container'>
            <Form.Label>Sales Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter sales price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formProductDescription" className='inquiry-container'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formProductImage" className='inquiry-container'>
            <Form.Label>Product Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-between mt-3">
            <Button variant="secondary" onClick={(e) => handleSubmit(e, true)}>
              Add More
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

export default AddProductForm;
