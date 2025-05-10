// // src/components/SignUp.jsx
// 'use client'
// import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import Header from '../../browse-store/common/BrowseStoreHeader';
// import Footer from '../../browse-store/common/BrowseStoreFooter';
// import '../../../styles/authentication.css';

// const SignUp = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const router.push = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Perform sign up logic here
//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//     } else {
//       // Register the user
//       router.push('/customer/dashboard'); // Redirect after successful sign up
//     }
//   };

//   return (
//     <div>
//      <Header />
//      <Container className="signup-container">
//       <Row className="justify-content-md-center">
//         <Col md={6}>
//           <div className="login-box">
//             <h2 className="my-4 text-center">Customer Sign Up</h2>
//             {error && <Alert variant="danger">{error}</Alert>}
//             <Form onSubmit={handleSubmit}>
//               <Form.Group controlId="formBasicEmail" className='authForm-container'>
//                 <Form.Label>Email address</Form.Label>
//                 <Form.Control
//                   type="email"
//                   placeholder="Enter email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group controlId="formBasicPassword" className='authForm-container'>
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group controlId="formConfirmPassword" className='authForm-container'>
//                 <Form.Label>Confirm Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   placeholder="Confirm Password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   required
//                 />
//               </Form.Group>

//               <div className="login-button-container">
//                 <Button variant="primary" type="submit" className="signup-button">
//                   Sign Up
//                 </Button>
//               </div>

//               <div className="mt-3 text-center">
//                 <span>Already have an account? </span>
//                 <Link to="/customer/login" className="login-link">Login</Link>
//               </div>

//               <div className="mt-3 text-center">
//                 <Button variant="outline-primary" className="google-signup-button">
//                   Sign up with Google
//                 </Button>
//               </div>
//             </Form>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//     <Footer />
//     </div>
//   );
// };

// export default SignUp;

"use client";
import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Modal,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Next.js router

import background from "../../assets/latestImage.jpg";
import "../../styles/authentication.css";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [promoConsent, setPromoConsent] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!termsAccepted) {
      setError("You must accept the Terms and Conditions to proceed.");
      return;
    }
    // Perform sign up logic here (e.g., call API, update database)
    setError("");
    router.push("/customer/dashboard"); // Redirect after successful sign up
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div
      className="auth-page"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="auth-overlay"></div>
      <button
        className="btn btn-outline-secondary auth-back-btn"
        onClick={handleBack}
      >
        Back
      </button>
      <Container className="auth-container">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <div className="auth-card">
              <h2 className="auth-heading">Customer Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFullName" className="authForm-group">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group
                  controlId="formPhoneNumber"
                  className="authForm-group"
                >
                  <Form.Label>Phone Number (Optional)</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Form.Group>

                <Form.Group
                  controlId="formBasicEmail"
                  className="authForm-group"
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group
                  controlId="formBasicPassword"
                  className="authForm-group"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group
                  controlId="formConfirmPassword"
                  className="authForm-group"
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* Terms & Conditions and Promo Consent */}
                <Form.Group controlId="formTerms" className="authForm-group">
                  <Form.Check
                    type="checkbox"
                    label={
                      <>
                        I agree to the{" "}
                        <span
                          style={{
                            color: "#0F1C3C",
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                          onClick={() => setShowTermsModal(true)}
                        >
                          Terms and Conditions
                        </span>
                      </>
                    }
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPromo" className="authForm-group">
                  <Form.Check
                    type="checkbox"
                    label="I agree to receive promotional messages and offers."
                    checked={promoConsent}
                    onChange={(e) => setPromoConsent(e.target.checked)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="auth-btn">
                  Sign Up
                </Button>
              </Form>
              <div className="auth-footer mt-3">
                <p>
                  Already have an account?{" "}
                  <Link href="/customer/login" className="auth-link">
                    Login
                  </Link>
                </p>
                <p>Or sign up with:</p>
                <Button variant="outline-primary" className="google-btn">
                  Sign up with Google
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Terms and Conditions Modal */}
      <Modal
        show={showTermsModal}
        onHide={() => setShowTermsModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Terms and Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "60vh", overflowY: "auto" }}>
          <p>
            {/* Insert your detailed terms and conditions here */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            facilisi. Phasellus nec faucibus mauris. Suspendisse potenti. Donec
            at elit euismod, vehicula magna a, blandit risus. Fusce at ex ut
            nisl auctor fermentum. In hac habitasse platea dictumst. Vestibulum
            ante ipsum primis in faucibus orci luctus et ultrices posuere
            cubilia curae; Praesent rutrum, nibh sed fringilla laoreet, felis
            massa tincidunt nisl, sed varius sem leo id massa.
          </p>
          <p>
            Sed in arcu ut tortor malesuada sollicitudin. Mauris auctor dui nec
            ante vestibulum, in consequat velit vulputate. Integer volutpat
            lorem ut tellus fermentum, quis porta mi bibendum. Aenean id feugiat
            lorem.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTermsModal(false)}>
            Decline
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setTermsAccepted(true);
              setShowTermsModal(false);
            }}
          >
            Accept
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SignUp;
