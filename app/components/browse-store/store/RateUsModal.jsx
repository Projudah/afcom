// src/components/browse-store/store/RateUsModal.jsx
'use client';

import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import '../../../styles/storeDetails.css';

const RateUsModal = ({ show, handleClose, onSubmitRating }) => {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Navigate to the Reviews section (adjust path if needed)
  const navigateToReview = () => {
    router.push('/#reviews');
    handleClose();
  };
  const navigateToAddReview = () => {
    router.push('/add-review'); // Adjust the path to your Add Review page
    handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitRating(rating);
    setIsSubmitted(true);
  };

  const handleModalClose = () => {
    setRating(0);
    setIsSubmitted(false);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleModalClose} centered>
      <Modal.Header className="contactModal-Header bg-primary text-white" closeButton>
        <Modal.Title className="fw-bold">Rate Us</Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-light p-4 rounded-bottom">
        {isSubmitted ? (
          <div className="text-center py-4">
            <h5 className="text-success mb-3">✅ Thanks for Rating!</h5>
            <p className="fs-5 text-secondary mb-4">
              Your feedback helps us improve. Feel free to add a detailed review if you'd like.
            </p>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
          </div>
        ) : (
          <>
            <p className="fs-5 text-secondary mb-3">
              Tap a star below to set your rating:
            </p>

            <div className="mb-4 star-rating d-flex justify-content-center">
              {[...Array(5)].map((_, index) => {
                const currentRating = index + 1;
                return (
                  <FaStar
                    key={index}
                    size={30}
                    color={
                      currentRating <= (hover || rating)
                        ? '#ffc107'
                        : '#e4e5e9'
                    }
                    onClick={() => setRating(currentRating)}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                    style={{ cursor: 'pointer', marginRight: index < 4 ? '8px' : '0' }}
                  />
                );
              })}
            </div>

            <div className="d-flex justify-content-center gap-2">
              <Button variant="outline-primary" onClick={navigateToReview}>
                <span className="fw-semibold" onClick={navigateToAddReview} >Add Review</span>
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={rating === 0}
              >
                <span className="fw-semibold">Submit Rating</span>
              </Button>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default RateUsModal;
