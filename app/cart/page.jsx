'use client'
import React, { useState, useEffect } from 'react';
import { Modal, Button, ListGroup, FormControl } from 'react-bootstrap';
import { FaPhone } from 'react-icons/fa';

const Cart = ({ show, handleClose, cartItems, updateCartItem, storeEmail }) => {
  const [localCartItems, setLocalCartItems] = useState(cartItems);

  useEffect(() => {
    setLocalCartItems(cartItems);
  }, [cartItems]);

  const handleQuantityChange = (itemId, newQuantity) => {
    setLocalCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
    updateCartItem(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId) => {
    setLocalCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    updateCartItem(itemId, 0);
  };

  const handleConfirmOrder = () => {
    // Logic to send notification email or perform checkout action
    alert('Order confirmed! Notification sent to store owner.');
  };

  const handleCallStoreOwner = () => {
    window.location.href = `tel:${storeEmail}`;
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Your Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {localCartItems.length === 0 ? (
            <ListGroup.Item>No items in cart</ListGroup.Item>
          ) : (
            localCartItems.map(item => (
              <ListGroup.Item key={item.id}>
                {item.name} - ${item.price}
                <FormControl
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  className="ml-2"
                />
                <Button variant="danger" onClick={() => handleRemoveItem(item.id)} className="ml-2">
                  Remove
                </Button>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleConfirmOrder}>
          Confirm Order
        </Button>
        <Button variant="outline-info" onClick={handleCallStoreOwner}>
          <FaPhone /> Call Store Owner
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Cart;
