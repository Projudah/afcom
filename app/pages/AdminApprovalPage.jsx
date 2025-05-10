'use client'
import React, { useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import '../../styles/adminStoreVerification.css'; // Make sure the path is correct

const AdminStoreVerification = ({ storeData }) => {
  // Initialize with storeData.verified if available, otherwise false.
  const [isVerified, setIsVerified] = useState(storeData.verified || false);

  const toggleVerification = () => {
    // Here you would normally call an API to update the verification status.
    setIsVerified(!isVerified);
  };

  return (
    <Container fluid className="admin-verification-page">
      {/* Verification Badge at the top right */}
      <Row className="justify-content-end">
        <Col md={3} className="text-right">
          <div className="verification-badge">
            {isVerified ? (
              <div className="verified">
                <FaCheckCircle className="icon" />
                <span>Verified</span>
              </div>
            ) : (
              <div className="not-verified">
                <FaTimesCircle className="icon" />
                <span>Not Verified</span>
              </div>
            )}
            <Button 
              variant="outline-primary" 
              onClick={toggleVerification} 
              className="toggle-btn"
            >
              {isVerified ? "Unverify" : "Verify"}
            </Button>
          </div>
        </Col>
      </Row>

      {/* Store Information */}
      <Row>
        <Col md={12}>
          <Card className="store-info-card">
            <Card.Body>
              <h1>{storeData.name}</h1>
              <p><strong>Location:</strong> {storeData.location}</p>
              <p><strong>Email:</strong> {storeData.email}</p>
              <p><strong>Phone:</strong> {storeData.phone.join(', ')}</p>
              {/* Add additional store details as needed */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminStoreVerification;
