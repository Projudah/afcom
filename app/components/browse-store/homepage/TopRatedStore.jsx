'use client'

import { useState } from 'react'
import { Row, Col, Card, Container, Button } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import ShowAllItemsModal from './ShowAllItemsModal'
import '../../../styles/browseStoreLayout.css'
import '../../../styles/scopedTopRatedStyle.css' // make sure this file now includes the new logo‐only rules

const TopRatedStores = ({ stores }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const itemsPerPage = 3

  const handleNext = () => {
    if (currentIndex + itemsPerPage < stores.length) {
      setCurrentIndex(currentIndex + itemsPerPage)
    }
  }
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage)
    }
  }
  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  const visibleStores = stores.slice(currentIndex, currentIndex + itemsPerPage)

  const StarRating = ({ rating, ratingCount }) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div className="star-rating-container">
        <div className="star-rating">
          {[...Array(fullStars)].map((_, idx) => (
            <FaStar key={`full-${idx}`} />
          ))}
          {hasHalfStar && <FaStarHalfAlt />}
          {[...Array(emptyStars)].map((_, idx) => (
            <FaRegStar key={`empty-${idx}`} />
          ))}
        </div>
        <div className="rating-box">{ratingCount} ratings</div>
      </div>
    )
  }

  return (
    <Container className="mt-5 popular-stores-carousel">
      <div className="header-controls-container">
        <h2 className="section-title">Top-Rated Stores</h2>
        <div className="controls-container">
          <div className="navigation-arrows-component">
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
          </div>
          <div className="custom-see-all-btn" onClick={handleShowModal}>
            View More
          </div>
        </div>
      </div>

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
        className="carousel-container"
      >
        <Row>
          {visibleStores.map((store, index) => {
            // Use full photo if available; otherwise fallback to logo or placeholder
            const imageSrc = store.image || store.logo || '/placeholder.png'
            const isLogoOnly = !store.image && !!store.logo

            return (
              <Col md={4} key={store.id} className="mb-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card>
                    <Card.Img
                      variant="top"
                      src={imageSrc}
                      alt={`${store.name} ${isLogoOnly ? 'Logo' : 'Photo'}`}
                      className={
                        isLogoOnly ? 'card-img-logo-only' : 'card-img-top'
                      }
                    />
                    <Card.Body>
                      <Card.Title className="featured-body-text">
                        {store.name}
                      </Card.Title>
                      <Card.Text className="featured-body-text">
                        {store.category}
                      </Card.Text>
                      <StarRating
                        rating={store.rating}
                        ratingCount={store.ratingCount}
                      />
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
      </motion.div>

      <ShowAllItemsModal
        show={showModal}
        handleClose={handleCloseModal}
        items={stores}
        title="Top-Rated Stores"
        type="top-rated"
      />
    </Container>
  )
}

export default TopRatedStores
