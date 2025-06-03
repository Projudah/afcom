'use client'
import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { 
  FaTwitter, FaThumbsUp, FaInstagram, FaFacebook, FaWhatsapp, FaGlobe, 
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaStar, FaComments,
  FaCheckCircle, FaTimesCircle 
} from 'react-icons/fa';
import InquiryModal from './GeneralInquiryModal';
import RateUsModal from '../store/RateUsModal'; // Import the RateUsModal component
import ChatBox from './ChatBox';
import '../../../styles/storeDetails.css';

const StoreDetailHeader = ({ store }) => {
  const [showChatBox, setShowChatBox] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [showRateUsModal, setShowRateUsModal] = useState(false);
  const [rating, setRating] = useState(0); // To store user rating

  // New state for verification
  const [isVerified, setIsVerified] = useState(store.verified || false);

  // Handlers for Inquiry Modal
  const handleInquiryModalShow = () => setShowInquiryModal(true);
  const handleInquiryModalClose = () => setShowInquiryModal(false);

  // Handlers for Rate Us Modal
  const handleRateUsModalShow = () => setShowRateUsModal(true);
  const handleRateUsModalClose = () => setShowRateUsModal(false);

  // Function to handle the rating submission from the modal
  const handleRatingSubmit = (newRating) => {
    setRating(newRating);
    setShowRateUsModal(false); // Close modal after submission
  };

  // Display stars based on the rating
  const displayStars = () => {
    const totalStars = 5;
    return (
      [...Array(totalStars)].map((_, i) => (
        <FaStar
          key={i}
          color={i < rating ? "#ffc107" : "#e4e5e9"}
        />
      ))
    );
  };

  return (
    <div className="store-detail-header-wrapper"> 
      <Card className="store-detail-header">
         {/* Verification Badge & Toggle */}
        <div className="store-verification">
            {isVerified ? (
                <span className="verified-badge">
                      <FaCheckCircle /> Verified
                      </span>
            ) : (
                  <span className="unverified-badge">
                  <FaTimesCircle /> Not Verified
                  </span>
          )}
            </div>
        <Card.Body>
          <Row className="align-items-center">
            <Col md={2} className="text-center">
              <img src={store.logo} alt={store.name} className="store-logo" />
              <div className="review-section">
                <div className="stars">
                  {displayStars()}
                </div>
                <p>{store.reviews} reviews</p>
              </div>
            </Col>
            <Col md={7}>
              <Row>
                <Col md={12} className="store-name">
                  <Card.Title as="h1">{store.name}</Card.Title>
                  <div className="social-icons">
                    <FaTwitter className="icon" />
                    <FaInstagram className="icon" />
                    <FaFacebook className="icon" />
                    <FaWhatsapp className="icon" />
                  </div>
                </Col>
              </Row>
              <Card.Text>
                <FaMapMarkerAlt /> {store.location}
              </Card.Text>
              {/* <Card.Text>
                <FaPhone /> {store.phone.join(', ')}
              </Card.Text> */}
              <Card.Text>
                <FaEnvelope /> {store.email}
                <span className="email-website-separator"></span>
                <FaGlobe /> <a href={store.website} target="_blank" rel="noopener noreferrer">{store.website}</a>
              </Card.Text>
            </Col>
            <Col md={3} className="align-items-center d-flex justify-content-end">
              <div className="storeDetails-button-group">
                <Button variant="primary" className="inquiry-button mr-2" onClick={handleInquiryModalShow}>
                  <FaEnvelope className="storeDetails-button-icon" /> Contact Us
                </Button>
                <Button variant="primary" className="inquiry-button mr-2" onClick={handleRateUsModalShow}>
                  <FaThumbsUp className="storeDetails-button-icon" /> Rate Us
                </Button>
                <Button variant="success" className="storeDetails-chat-button" onClick={() => setShowChatBox(!showChatBox)}>
                  <FaComments className="storeDetails-button-icon" /> Chat With Us
                </Button>
              </div> 

            </Col>
          </Row>
        </Card.Body>
      </Card>
  
      {/* Inquiry Modal */}
      <InquiryModal show={showInquiryModal} handleClose={handleInquiryModalClose} />

      {/* Rate Us Modal */}
      <RateUsModal show={showRateUsModal} handleClose={handleRateUsModalClose} onSubmitRating={handleRatingSubmit} />

      {/* Optional Chat Box */}
      {showChatBox && <ChatBox storeName={store.name} />}
    </div>
  );
};

export default StoreDetailHeader;



// Any changes made are stored here




  {/*
               <div className="storeDetails-button-group">
                  <Button variant="primary" className="inquiry-button mr-2" onClick={() => setShowChatBox(!showChatBox)}>
                    <FaComments className="storeDetails-button-icon" /> Chat with us
                  </Button>
                  <Button variant="primary" className="inquiry-button mr-2" onClick={handleRateUsModalShow}>
                    <FaThumbsUp className="storeDetails-button-icon" /> Rate us
                  </Button>
                </div>*/}