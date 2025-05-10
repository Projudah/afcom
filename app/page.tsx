'use client'
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Link from 'next/link'; // Use Next.js' Link
import Navbar from './components/HomeNavbar'; // Import the CustomNavbar component
import './styles/home.css';

const Homepage = () => {
  return (
    <>
      <Navbar />
      <Container fluid className="home-container">
        <Row className="align-items-center h-100 justify-content-center">
          <Col md={10} lg={10} xl={8} className="home-content text-center">
            <h1 className="hero-title">Welcome to African Community</h1>
            <p className="hero-subtitle">Find and market services in your community.</p>
            <div className="home-buttons">
              <Link href="/browse-stores" passHref>
                <Button variant="primary" className="home-button browse-btn">
                  Browse Stores
                </Button>
              </Link>
              <Link href="/customer/sign-up" passHref>
                <Button variant="outline-primary" className="home-button signup-btn">
                  Sign Up
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Homepage;