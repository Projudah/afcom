'use client'
import { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container, Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Next.js router

import { FaLocationArrow, FaQuestionCircle } from 'react-icons/fa';
import HelpModal from '../../browse-store/help-modal/HelpModal';
import Cart from '../../../cart/page';
import '../../../styles/browseStoreHeader.css';

const BrowseNavbar = () => {
  const router = useRouter();

  const storeEmail = 'poweronchristway@gmail.com'; // Replace with dynamic email if needed
  const [cartShow, setCartShow] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [helpModalShow, setHelpModalShow] = useState(false);

  const handleLocationClick = () => {
    console.log('Get current location');
  };

  const handleMessageCenterNavigate = () => {
    router.push('/message-center'); // Navigate to Message Center page
  };

  const handleHelpModalClose = () => setHelpModalShow(false);
  const handleHelpModalShow = () => setHelpModalShow(true);

  return (
    <>
      <Navbar 
        expand="lg" 
        className="browse-navbar" 
        style={{
          background: 'linear-gradient(135deg, #02192F 0%, #064876 100%)',
          color: '#fff'
        }}
      >
        <Container fluid>
          <Link href="/browse-stores" passHref>
            <Navbar.Brand style={{ color: '#fff', fontWeight: '600', cursor: 'pointer' }}>
              ZolaHub
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: '#fff' }} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" onClick={handleLocationClick} className="location-link" style={{ color: '#fff' }}>
                <FaLocationArrow /> Current Location
              </Nav.Link>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{ background: '#2F61C2', border: 'none' }}>
                  Categories
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/clothing">Clothing</Dropdown.Item>
                  <Dropdown.Item href="#/restaurant">Restaurant</Dropdown.Item>
                  <Dropdown.Item href="#/hair-salon">Hair Salon</Dropdown.Item>
                  <Dropdown.Item href="#/eye-lash">Eye Lash</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
            <Form className="d-flex search-form">
              <FormControl type="text" placeholder="Search for items" className="me-2" />
              <Button variant="outline-light">Search</Button>
            </Form>
            <Nav className="ms-auto">
              <Button onClick={handleMessageCenterNavigate} className="message-center-button" variant="outline-light">
                Message Center
              </Button>
              <Link href="/customer/login" passHref>
                <Button variant="outline-light" className="login-button">
                  Sign Up / Login
                </Button>
              </Link>
              <Nav.Link onClick={handleHelpModalShow} className="help-link" style={{ color: '#fff' }}>
                <FaQuestionCircle size={24} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <HelpModal show={helpModalShow} handleClose={handleHelpModalClose} />
      <Cart show={cartShow} handleClose={() => setCartShow(false)} cartItems={cartItems} storeEmail={storeEmail} />
    </>
  );
};

export default BrowseNavbar;