// src/components/browse-store/store/DiscountDetailModal.jsx
'use client';

import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import '../../../../styles/storeDetails.css';

const DiscountDetailModal = ({
  show,
  handleClose,
  discount,
  products,
  services,
  addToCart,
}) => {
  if (!discount) return null;

  // Ensure arrays
  const safeProducts = Array.isArray(products) ? products : [];
  const safeServices = Array.isArray(services) ? services : [];

  // Filter discounted items
  const discountedProducts = safeProducts.filter(
    (p) =>
      Array.isArray(discount.products) && discount.products.includes(p.id)
  );
  const discountedServices = safeServices.filter(
    (s) =>
      Array.isArray(discount.services) && discount.services.includes(s.id)
  );

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header className="contactModal-Header bg-primary text-white" closeButton>
        <Modal.Title className="fw-bold">{discount.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-light p-4 rounded-bottom">
        <p className="fs-5 text-secondary mb-3">{discount.description}</p>
        <p className="fs-6 mb-4">
          <strong>Discount Percentage:</strong> {discount.percentage}%
        </p>

        {discountedProducts.length > 0 && (
          <>
            <h5 className="fw-semibold mb-3">Discounted Products</h5>
            <Row className="g-3">
              {discountedProducts.map((product) => (
                <Col md={4} key={product.id}>
                  <div className="bg-white p-3 rounded shadow-sm text-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="img-fluid rounded mb-2"
                    />
                    <h6 className="mt-2">{product.name}</h6>
                    <p className="text-secondary mb-2">{product.price}</p>
                    <Button
                      variant="success"
                      onClick={() => addToCart(product)}
                      className="w-100"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Col>
              ))}
            </Row>
          </>
        )}

        {discountedServices.length > 0 && (
          <>
            <h5 className="fw-semibold mt-4 mb-3">Discounted Services</h5>
            <Row className="g-3">
              {discountedServices.map((service) => (
                <Col md={4} key={service.id}>
                  <div className="bg-white p-3 rounded shadow-sm text-center">
                    <h6>{service.name}</h6>
                    <p className="text-secondary mb-3">
                      <strong>Price:</strong> {service.price}
                    </p>
                    {/* If you need a button, uncomment below */}
                    {/* <Button variant="outline-primary" onClick={() => addToCart(service)} className="w-100">
                      Inquire
                    </Button> */}
                  </div>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Modal.Body>

      <Modal.Footer className="bg-light border-top-0">
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DiscountDetailModal;
