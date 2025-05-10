// src/components/ReviewForm.jsx
'use client'
import React, { useState } from 'react';
import { Form, Button, Collapse } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import '../../../../styles/review.css';

const ReviewForm = ({ addReview }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [image, setImage] = useState(null);
    const [open, setOpen] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const newReview = { rating, comment, image };
      addReview(newReview);
      setRating(0);
      setComment('');
      setImage(null);
      setOpen(false);
    };
  
    return (
      <>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="review-form-collapse"
          aria-expanded={open}
          className="mb-3"
        >
          Add a Review
        </Button>
        <Collapse in={open}>
          <div id="review-form-collapse">
            <Form onSubmit={handleSubmit} className="review-form">
              <Form.Group>
                <Form.Label>Rating</Form.Label>
                <div className="star-rating">
                  {[...Array(5)].map((star, index) => {
                    const ratingValue = index + 1;
                    return (
                      <label key={index}>
                        <input
                          type="radio"
                          name="rating"
                          value={ratingValue}
                          onClick={() => setRating(ratingValue)}
                          style={{ display: 'none' }} // Hide the radio buttons
                        />
                        <FaStar
                          className="star"
                          color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
                          size={30}
                        />
                      </label>
                    );
                  })}
                </div>
              </Form.Group>
  
              <Form.Group controlId="formComment">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </Form.Group>
  
              <Form.Group controlId="formImage">
                <Form.Label>Upload Photo</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
                />
              </Form.Group>
  
              <Button variant="primary" type="submit" className="mt-3">
                Submit Review
              </Button>
            </Form>
          </div>
        </Collapse>
      </>
    );
  };
  
  export default ReviewForm;