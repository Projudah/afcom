// src/pages/ComplaintPage.jsx
'use client'
import { useState } from 'react';
import { Container, Button, Form, Alert, InputGroup } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import BrowseNavbar from '../components/browse-store/common/BrowseStoreHeader';
import '../styles/helpModal.css'; // Ensure this file exists and has the correct styles

const ComplaintPage = () => {
  const router = useRouter();

  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, subject, details });
    setShowAlert(true);
    setName('');
    setEmail('');
    setSubject('');
    setDetails('');
  };

  // Handle back navigation
  const handleBack = () => {
    router.push('/browse-stores');
  };

  return (
    <div>
      <BrowseNavbar />
      <Container className="complaint-container">
        <Button variant="secondary" onClick={handleBack} className="back-button mb-3">
          Back
        </Button>
        <h2 className="complaint-title my-4 text-center">File a Complaint</h2>

        {/* Alert for successful submission */}
        {showAlert && <Alert variant="success" className="complaint-alert">Your complaint has been submitted successfully!</Alert>}

        {/* Complaint Form */}
        <Form onSubmit={handleSubmit}>
          {/* Name Field */}
          <Form.Group controlId="formName" className="complaint-form-group">
            <Form.Label>Name</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>

          {/* Email Field */}
          <Form.Group controlId="formEmail" className="complaint-form-group mt-3">
            <Form.Label>Email address</Form.Label>
            <InputGroup>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>

          {/* Subject Field */}
          <Form.Group controlId="formSubject" className="complaint-form-group mt-3">
            <Form.Label>Subject</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Enter subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>

          {/* Details Field */}
          <Form.Group controlId="formDetails" className="complaint-form-group mt-3">
            <Form.Label>Details</Form.Label>
            <InputGroup>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter details of your complaint"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3 submit-button">
            Submit Complaint
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default ComplaintPage;
