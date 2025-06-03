// src/components/Store/StoreNavBar.jsx
'use client';

import Link from 'next/link';
import { Nav } from 'react-bootstrap';

const StoreNavBar = ({ activeKey, onSelect }) => {
  return (
    <Nav variant="tabs" activeKey={activeKey} onSelect={onSelect}>
      <Nav.Item>
        <Nav.Link eventKey="services">Services</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="about">About</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="policies">Policies</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="reviews">Reviews</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="discounts">Discounts</Nav.Link>
      </Nav.Item>
      
      {/* Back button pushed to far right */}
      <Nav.Item className="ms-auto">
        <Nav.Link as={Link} href="/browse-stores" className="text-secondary">
          ← Back to Home 
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default StoreNavBar;
