// // src/components/Login.jsx
// 'use client'
// import { useRouter } from 'next/navigation';
// import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
// import CustomNavbar from '../../HomeNavbar'; // Import the CustomNavbar component
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import Link from 'next/link';
// import '../../../styles/authentication.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);

//     const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//     };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Implement authentication logic here
//     // Example: Check email and password against hardcoded values or an API
//     if (email === 'storeowner@example.com' && password === 'password') {
//       router.push('/store-owner/my-store'); // Redirect to the store owner's dashboard
//     } else {
//       setError('Invalid email or password');
//     }
//   };

//   return (
//     <div>
//       <CustomNavbar />
//     <Container className="login-container">
//       <Row className="justify-content-md-center">
//         <Col md={6}>
//           <div className="login-box">
//             <h2 className="my-4 text-center">Store Owner Login</h2>
//             {error && <Alert variant="danger">{error}</Alert>}
//             <Form onSubmit={handleSubmit}>
//               <Form.Group controlId="formBasicEmail" className='storeForm-container'>
//                 <Form.Label>Email address</Form.Label>
//                 <Form.Control
//                   type="email"
//                   placeholder="Enter email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group controlId="formBasicPassword" className='storeForm-container'>
//                 <Form.Label>Password</Form.Label>
//                 <div className="password-input-container">
//                     <Form.Control
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     />
//                     <span onClick={togglePasswordVisibility} className="password-toggle-icon">
//                     {showPassword ? <FaEyeSlash /> : <FaEye />}
//                     </span>
//                 </div>
//                 </Form.Group>
//               <div className="login-button-container">
//                 <Button variant="primary" type="submit" className="storeOwner-login-button">
//                     Login
//                 </Button>
//                 </div>
//                 <div className="mt-3 text-center">
//                 <Link href="/store-owner/forgot-password" className="forgot-password-link">Forgot Password?</Link>
//                 </div>
//             </Form>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//     </div>
//   );
// };

// export default Login;
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  Button,
  Container,
  Alert,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import background from "../../assets/latestImage.jpg";
import "../../styles/authentication.css";

const StoreOwnerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetInfo, setResetInfo] = useState("");

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demonstration, we assume these credentials are valid:
    if (email === "storeowner@example.com" && password === "password") {
      router.push("/store-owner/my-store");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleResetPasswordClick = () => {
    setResetEmail(email);
    setResetInfo("");
    setShowResetModal(true);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    // For demo purposes, assume valid store owner email is 'storeowner@example.com'
    if (resetEmail === "storeowner@example.com") {
      setResetInfo("A password reset link has been sent to your email.");
      setTimeout(() => setShowResetModal(false), 2000);
    } else {
      setResetInfo("We do not have that email in our database.");
    }
  };

  const handleResetModalClose = () => {
    setShowResetModal(false);
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
              <h2 className="auth-heading">Store Owner Login</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
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
                  <div className="password-input-container">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span
                      onClick={togglePasswordVisibility}
                      className="password-toggle-icon"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </Form.Group>
                <Button variant="primary" type="submit" className="auth-btn">
                  Login
                </Button>
              </Form>
              <div className="auth-footer mt-3">
                <p>
                  <span
                    className="auth-link"
                    style={{ cursor: "pointer" }}
                    onClick={handleResetPasswordClick}
                  >
                    Forgot Password?
                  </span>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Reset Password Modal */}
      <Modal show={showResetModal} onHide={handleResetModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleResetSubmit}>
            <Form.Group controlId="resetEmail" className="authForm-group">
              <Form.Label>Enter your email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email address"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
            </Form.Group>
            {resetInfo && <Alert variant="info">{resetInfo}</Alert>}
            <Button variant="primary" type="submit" className="auth-btn">
              Reset Email
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StoreOwnerLogin;
