'use client'
import { useState } from 'react';
import { Row, Col, Card, Container, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Link from 'next/link'; // Re-importing useNavigate and Link
import ShowAllItemsModal from './ShowAllItemsModal'; // Import the unified modal
import '../../../styles/browseStoreLayout.css';

const CategoryPopularStores = ({ categories }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const itemsPerPage = 3;

  const handleNext = () => {
    if (currentIndex + itemsPerPage < categories.length) {
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

  const visibleCategories = categories.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <Container className="mt-5">
      <div className="header-controls-container">
        <h2 className="section-title">Popular in Categories</h2>
        <div className="controls-container">
            <Button variant="outline-secondary" onClick={handlePrev} disabled={currentIndex === 0}>
              &lt;
            </Button>
            <Button variant="outline-secondary" onClick={handleNext} disabled={currentIndex + itemsPerPage >= categories.length}>
              &gt;
            </Button>
            <div className="custom-see-all-btn" onClick={handleShowModal}>
              View More
            </div>
        </div>
      </div>
      <div className="carousel-container">
        <Row>
          {visibleCategories.map((category, index) => (
            <Col md={4} key={category.name} className="mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card>
                  <Card.Img variant="top" src={category.image} />
                  <Card.Body>
                    <Card.Title>{category.name}</Card.Title>
                    {/* Use Link for navigation */}
                    <Button variant="primary"  to={`/category/${category.name.toLowerCase()}`}>
                      Visit {category.name}
                    </Button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>

      {/* Modal for showing all categories */}
      <ShowAllItemsModal
        show={showModal}
        handleClose={handleCloseModal}
        items={categories}
        title="Popular Categories"
        type="category" // Pass the type as "category"
      />
    </Container>
  );
};

export default CategoryPopularStores;
