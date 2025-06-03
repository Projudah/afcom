// // src/components/ForgotPassword.jsx
// 'use client'
// import React, { useState } from 'react';
// import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
// import CustomNavbar from '../../HomeNavbar'; // Import the CustomNavbar component
// import '../../../styles/authentication.css';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Implement password reset logic here
//     // Example: Send a password reset email via API
//     if (email) {
//       setMessage('Password reset instructions have been sent to your email.');
//       setError('');
//     } else {
//       setError('Please enter a valid email address.');
//       setMessage('');
//     }
//   };

//   return (
//     <div>
//       <CustomNavbar />
//     <Container className="forgot-password-container">
//       <Row className="justify-content-md-center">
//         <Col md={6}>
//           <div className="forgot-password-box">
//             <h2 className="my-4 text-center">Forgot Password</h2>
//             {message && <Alert variant="success">{message}</Alert>}
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
//               <div className="login-button-container">
//                 <Button variant="primary" type="submit" className="storeOwner-login-button">
//                     Reset Password
//                 </Button>
//                 </div>
//             </Form>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//     </div>
//   );
// };

// export default ForgotPassword;
