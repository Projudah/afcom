'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Button, Container, Alert, Row, Col, ButtonGroup, Modal } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';
import background from '../../../assets/latestImage.jpg';
import '../../../styles/authentication.css';

const CustomerLogin = () => {
  const [loginMode, setLoginMode] = useState('password'); // 'password' or 'code'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetInfo, setResetInfo] = useState('');
  
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Implement authentication logic for password login here.
    // Dummy check: assume 'customer@example.com' with password 'password'
    if (email === 'customer@example.com' && password === 'password') {
      router.push('/customer/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleSendCode = (e) => {
    e.preventDefault();
    // Check if the email exists in the database.
    if (email === 'customer@example.com') {
      setCodeSent(true);
      setInfoMessage('A login code has been sent to your email. Please check your inbox.');
      setError('');
    } else {
      setError('We do not have your email in our database.');
      setCodeSent(false);
    }
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    // For demonstration, we assume the valid code is '123456'
    if (code === '123456') {
      router.push('/customer/dashboard');
    } else {
      setError('Invalid code. Please try again.');
    }
  };

  const handleResetPasswordClick = () => {
    // Pre-fill reset email with current email (if provided)
    setResetEmail(email);
    setResetInfo('');
    setShowResetModal(true);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    // Implement your reset password logic here.
    // For this demo, we assume the email is valid if it matches our dummy email.
    if (resetEmail === 'customer@example.com') {
      setResetInfo('A password reset link has been sent to your email.');
      // Optionally close modal after a delay:
      setTimeout(() => setShowResetModal(false), 2000);
    } else {
      setResetInfo('We do not have that email in our database.');
    }
  };

  const handleResetModalClose = () => {
    setShowResetModal(false);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="auth-page" style={{ backgroundImage: `url(${background})` }}>
      <div className="auth-overlay"></div>
      <button className="btn btn-outline-secondary auth-back-btn" onClick={handleBack}>
        Back
      </button>
      <Container className="auth-container">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <div className="auth-card">
              <h2 className="auth-heading">Customer Login</h2>

              {/* Toggle for login mode */}
              <div className="mode-toggle mb-4">
                <ButtonGroup>
                  <Button
                    variant={loginMode === 'password' ? "primary" : "outline-primary"}
                    onClick={() => {
                      setLoginMode('password');
                      setError('');
                      setInfoMessage('');
                      setCodeSent(false);
                    }}
                  >
                    Password Login
                  </Button>
                  <Button
                    variant={loginMode === 'code' ? "primary" : "outline-primary"}
                    onClick={() => {
                      setLoginMode('code');
                      setError('');
                      setInfoMessage('');
                      setCodeSent(false);
                    }}
                  >
                    Code Login
                  </Button>
                </ButtonGroup>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}
              {infoMessage && <Alert variant="info">{infoMessage}</Alert>}

              {loginMode === 'password' ? (
                <Form onSubmit={handlePasswordSubmit}>
                  <Form.Group controlId="formBasicEmail" className="authForm-group">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword" className="authForm-group">
                    <Form.Label>Password</Form.Label>
                    <div className="password-input-container">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <span onClick={togglePasswordVisibility} className="password-toggle-icon">
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </Form.Group>

                  <Button variant="primary" type="submit" className="auth-btn">
                    Login
                  </Button>
                </Form>
              ) : (
                <Form onSubmit={handleCodeSubmit}>
                  <Form.Group controlId="formBasicEmail" className="authForm-group">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your registered email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  {codeSent && (
                    <Form.Group controlId="formBasicCode" className="authForm-group">
                      <Form.Label>Enter Code</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                      />
                    </Form.Group>
                  )}

                  {!codeSent ? (
                    <Button variant="primary" onClick={handleSendCode} className="auth-btn">
                      Send Login Code
                    </Button>
                  ) : (
                    <Button variant="primary" type="submit" className="auth-btn">
                      Verify Code &amp; Login
                    </Button>
                  )}
                </Form>
              )}

              <div className="auth-footer mt-3">
                <p>
                  <span 
                    className="auth-link" 
                    style={{ cursor: 'pointer' }} 
                    onClick={handleResetPasswordClick}
                  >
                    Forgot Password?
                  </span>
                </p>
                <p>
                  Don't have an account?{" "}
                  <Link to="/customer/sign-up" className="auth-link">
                    Sign Up
                  </Link>
                </p>
                <Button variant="outline-primary" className="google-btn">
                  Sign in with Google
                </Button>
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

export default CustomerLogin;
