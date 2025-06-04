'use client'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Row, Col, Card, Container, Button } from 'react-bootstrap'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ShowAllItemsModal from './ShowAllItemsModal'
import '../../../styles/browseStoreLayout.css'
import '../../../styles/scopedCarouselStyle.css'; // Scoped styles for TopRatedStores
const PopularStores = ({ stores }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showModal, setShowModal] = useState(false)

  const itemsPerPage = 3

  const handleNext = () => {
    if (currentIndex + itemsPerPage < stores.length) {
      setCurrentIndex(currentIndex + itemsPerPage)
    }
  }
  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage)
    }
  }
  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  const visibleStores = stores.slice(currentIndex, currentIndex + itemsPerPage)

  return (
    <Container className="mt-5 popular-stores-carousel">
      <div className="header-controls-container">
        <h2 className="section-title">Most Popular Stores</h2>
        <div className="controls-container">
          <Button
            variant="outline-secondary"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            &lt;
          </Button>
          <Button
            variant="outline-secondary"
            onClick={handleNext}
            disabled={currentIndex + itemsPerPage >= stores.length}
          >
            &gt;
          </Button>
          <div className="custom-see-all-btn" onClick={handleShowModal}>
            View More
          </div>
        </div>
      </div>

      <div className="carousel-container">
        <Row>
          {visibleStores.map((store, index) => {
            // Choose the restaurant photo if available; otherwise fallback to logo.
            const imageSrc = store.image || store.logo || '/placeholder.png'
            // Determine if this is a “logo‐only” card
            const isLogoOnly = !store.image && !!store.logo

            return (
              <Col md={4} key={store.id} className="mb-4">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <Card>
                    {/* 
                      - If there's a real restaurant photo, use the normal "card-img-top" styling.
                      - If it's logo‐only, apply a special "card-img-logo-only" class to center & contain.
                    */}
                    <Card.Img
                      variant="top"
                      src={imageSrc}
                      className={isLogoOnly ? 'card-img-logo-only' : 'card-img-top'}
                      alt={`${store.name} ${isLogoOnly ? 'Logo' : 'Photo'}`}
                    />

                    <Card.Body>
                      <Card.Title style={{ fontWeight: 500, fontSize: '1.2rem' }}>
                        {store.name}
                      </Card.Title>
                      <Card.Text className="latest-stores-description">
                        {store.description}
                      </Card.Text>
                      <Button variant="contained" href={`/store/${store.id}`}>
                        Visit Store
                      </Button>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            )
          })}
        </Row>
      </div>

      <ShowAllItemsModal
        show={showModal}
        handleClose={handleCloseModal}
        items={stores}
        title="Most Popular Stores"
        type="popular-store"
      />
    </Container>
  )
}

export default PopularStores
PopularStores.propTypes = {
  stores: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      image: PropTypes.string,
      logo: PropTypes.string,
    })
  ).isRequired,
}