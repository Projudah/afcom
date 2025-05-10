// src/components/Sidebar.jsx
import React from 'react';
import { Offcanvas, Nav } from 'react-bootstrap';
import Link from 'next/link';

const Sidebar = ({ show, handleClose }) => {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="start">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="flex-column">
          <Nav.Link  to="/store-owner/dashboard">Dashboard</Nav.Link>
          <Nav.Link  to="/store-owner/my-store">My Store</Nav.Link>
          <Nav.Link  to="/store-owner/store-orders">Orders</Nav.Link>
          <Nav.Link  to="/store-owner/store-products">Products</Nav.Link>
          <Nav.Link  to="/store-owner/store-settings">Settings</Nav.Link>
          <Nav.Link  to="/">Logout</Nav.Link>
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Sidebar;
