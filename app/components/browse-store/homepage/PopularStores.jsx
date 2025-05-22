'use client'
import React, { useState } from 'react';
import { Row, Col, Card, Container, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ShowAllItemsModal from './ShowAllItemsModal'; // Import the modal
import '../../../styles/browseStoreLayout.css';

const PopularStores = ({ stores }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false); // Modal state

  const itemsPerPage = 3;

  const handleNext = () => {
    if (currentIndex + itemsPerPage < stores.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const visibleStores = stores.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <Container className="mt-5">
      <div className="header-controls-container">
        <h2 className="section-title">Most Popular Stores</h2>
        <div className="controls-container">
          <Button variant="outline-secondary" onClick={handlePrev} disabled={currentIndex === 0}>
            &lt;
          </Button>
          <Button variant="outline-secondary" onClick={handleNext} disabled={currentIndex + itemsPerPage >= stores.length}>
            &gt;
          </Button>
          <div className="custom-see-all-btn" onClick={handleShowModal}>
            View More
          </div>
        </div>
      </div>
      <div className="carousel-container">
        <Row>
          {visibleStores.map((store, index) => (
            <Col md={4} key={store.id} className="mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card>
                  <Card.Img variant="top" src={store.image} />
                  <Card.Body>
                    <Card.Title>{store.name}</Card.Title>
                    <Card.Text>{store.description}</Card.Text>
                    <Button variant="primary"  href={`/store/${store.id}`}>
                      Visit Store
                    </Button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>

      {/* Modal for showing all stores */}
      <ShowAllItemsModal
        show={showModal}
        handleClose={handleCloseModal}
        items={stores}
        title="Most Popular Stores"
        type="popular-store"
      />
    </Container>
  );
};

export default PopularStores;
