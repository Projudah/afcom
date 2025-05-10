// src/components/ReviewList.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaStar, FaTrash } from 'react-icons/fa';
import '../../../../styles/review.css'

const ReviewList = ({ reviews, deleteReview }) => {
  return (
    <div className="review-list">
      {reviews.map((review, index) => (
        <Card key={review.id} className="mb-3">
          <Card.Body>
            <div className="align-items-center d-flex justify-content-between">
              <div>
                <div className="star-rating">
                  {[...Array(5)].map((star, i) => (
                    <FaStar
                      key={i}
                      color={i < review.rating ? '#ffc107' : '#e4e5e9'}
                      size={20}
                    />
                  ))}
                </div>
                <Card.Text>{review.comment}</Card.Text>
                {review.image && <img src={review.image} alt="Review" className="review-image" />}
              </div>
              <Button variant="danger" onClick={() => deleteReview(review.id)}>
                <FaTrash />
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default ReviewList;

