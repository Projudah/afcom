

'use client';

import React from 'react';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import '../../../styles/footer.css';

const Footer = () => {
  return (
    <footer 
      className="footer mt-auto py-3" 
      style={{
        background: 'linear-gradient(135deg, #02192F 0%, #064876 100%)',
        color: '#fff'
      }}
    >
      <Container>
        <Row xs={1} sm={2} md={5} className="gy-4">
          <Col>
            <h6 className="footer-title">ABOUT US</h6>
            <ul className="list-unstyled">
              <li><Link href="/ContactUs" className="footer-text">Contact Us</Link></li>
              <li><Link href="/blog" className="footer-text">Blog</Link></li>
              <li><Link href="/updates" className="footer-text">Get Latest Updates</Link></li>
              <li><Link href="/about" className="footer-text">About Us</Link></li>

            </ul>
          </Col>
          <Col>
            <h6 className="footer-title">Our Clients</h6>
            <ul className="list-unstyled">
              <li><Link href="/about" className="footer-text">About Us</Link></li>
              <li><Link href="/store-owner/login" className="footer-text">Client Portal</Link></li>
              <li><Link href="/create-store" className="footer-text">Become a Client</Link></li>
            </ul>
          </Col>
          <Col>
            <h6 className="footer-title">Follow Us</h6>
            <ul className="list-unstyled">
              <li><Link href="https://facebook.com" className="footer-text" target="_blank">Facebook</Link></li>
              <li><Link href="https://twitter.com" className="footer-text" target="_blank">Twitter</Link></li>
              <li><Link href="https://instagram.com" className="footer-text" target="_blank">Instagram</Link></li>
            </ul>
          </Col>
          <Col>
            <h6 className="footer-title">Useful Links</h6>
            <ul className="list-unstyled">
              <li><Link href="/terms" className="footer-text">Terms and Conditions</Link></li>
              <li><Link href="/faqs" className="footer-text">FAQs</Link></li>
              <li><Link href="/disclaimer" className="footer-text">Disclaimer</Link></li>
              {/* <li><Link href="/disclaimer" className="footer-text">Returns</Link></li> */}
              {/* <li><Link href="/careers" className="footer-text">Careers</Link></li> */}
              <li><Link href="/pricing" className="footer-text">Pricing</Link></li>

            </ul>
          </Col>
          {/* <Col>
            <h6 className="footer-title">Our Support</h6>
            <ul className="list-unstyled">
              <li><Link href="/customer-support" className="footer-text">Help Center</Link></li>
              <li><Link href="/privacy" className="footer-text">Privacy Policy</Link></li>
              <li><Link href="/complaint" className="footer-text">Report Issues</Link></li>
              <li><Link href="/pricing" className="footer-text">Pricing</Link></li>
            </ul>
          </Col> */}
        </Row>
        <Row className="border-top pt-3">
          <Col md={6} className="text-left">
            <p>© 2024 Company name. All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
