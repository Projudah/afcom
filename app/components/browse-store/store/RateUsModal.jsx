'use client'
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const RateUsModal = ({ show, handleClose, onSubmitRating }) => {
  const router = useRouter;
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  // Function to navigate to the Reviews section
  const navigateToReview = () => {
    router.push("/#reviews"); // Adjust the path based on your routing
  };
      
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitRating(rating); // Send the selected rating back to the parent
    setRating(0); // Reset rating after submission
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Rate Us</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3 star-rating">
          {[...Array(5)].map((star, index) => {
            const currentRating = index + 1;
            return (
              <FaStar
                key={index}
                size={30}
                color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                onClick={() => setRating(currentRating)}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: "pointer" }}
              />
            );
          })}
        </div>
        <Button variant="primary" onClick={navigateToReview}>
          Add Review
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit Rating
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default RateUsModal;
