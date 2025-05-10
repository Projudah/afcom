import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';

const DiscountDetailModal = ({ show, handleClose, discount, products, services, addToCart }) => {
  if (!discount) return null;

  // Filter out the discounted products and services based on the discount IDs
  const discountedProducts = products.filter(p => discount.products.includes(p.id));
  const discountedServices = services.filter(s => discount.services.includes(s.id));

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{discount.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{discount.description}</p>
        <p><strong>Discount Percentage:</strong> {discount.percentage}%</p>
        {discountedProducts.length > 0 && (
          <>
            <h5 className="mt-3">Discounted Products</h5>
            <Row>
              {discountedProducts.map(product => (
                <Col md={4} key={product.id} className="mb-3">
                  <div className="product-card text-center">
                    <img src={product.image} alt={product.name} className="img-fluid rounded" />
                    <h6 className="mt-2">{product.name}</h6>
                    <p>{product.price}</p>
                    <Button variant="success" onClick={() => addToCart(product)}>
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
            <h5 className="mt-3">Discounted Services</h5>
            <Row>
              {discountedServices.map(service => (
                <Col md={4} key={service.id} className="mb-3">
                  <div className="service-card text-center p-3 border rounded">
                    <h6>{service.name}</h6>
                    <p><strong>Price:</strong> {service.price}</p>
                    <Button variant="success" onClick={() => addToCart(service)}>
                      Add to Cart
                    </Button>
                  </div>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DiscountDetailModal;
