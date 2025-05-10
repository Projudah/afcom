// src/components/Store/StoreNavBar.jsx
import { Nav } from 'react-bootstrap';

const StoreNavBar = ({ activeKey, onSelect }) => {
  return (
    <Nav variant="tabs" activeKey={activeKey} onSelect={onSelect}>
      <Nav.Item>
        <Nav.Link eventKey="products">Products</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="services">Services</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="discounts">Discounts</Nav.Link>
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
    </Nav>
  );
};

export default StoreNavBar;
