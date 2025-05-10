// src/pages/AdminStoreRequestsPage.jsx
'use client'
import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import AdminStoreRequests from '../components/common/AdminStoreRequest';

const AdminStoreRequestsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [requests, setRequests] = useState([
    { id: 1, storeName: 'Example Store 1', storeType: 'Restaurant', storeCategory: 'Food', email: 'example1@example.com', phone: '123-456-7890', description: 'A great restaurant', businessType: 'products', files: ['file1.pdf', 'file2.jpg'] },
    { id: 2, storeName: 'Example Store 2', storeType: 'Salon', storeCategory: 'Beauty', email: 'example2@example.com', phone: '123-456-7891', description: 'A wonderful salon', businessType: 'services', files: ['file3.pdf'] },
    { id: 1, storeName: 'Example Store 1', storeType: 'Restaurant', storeCategory: 'Food', email: 'example1@example.com', phone: '123-456-7890', description: 'A great restaurant', businessType: 'products', files: ['file1.pdf', 'file2.jpg'] },
    { id: 2, storeName: 'Example Store 2', storeType: 'Salon', storeCategory: 'Beauty', email: 'example2@example.com', phone: '123-456-7891', description: 'A wonderful salon', businessType: 'services', files: ['file3.pdf'] },
    { id: 1, storeName: 'Example Store 1', storeType: 'Restaurant', storeCategory: 'Food', email: 'example1@example.com', phone: '123-456-7890', description: 'A great restaurant', businessType: 'products', files: ['file1.pdf', 'file2.jpg'] },
    { id: 2, storeName: 'Example Store 2', storeType: 'Salon', storeCategory: 'Beauty', email: 'example2@example.com', phone: '123-456-7891', description: 'A wonderful salon', businessType: 'services', files: ['file3.pdf'] }


]);

  const handleRequestAction = (requestId, action, message = '') => {
    // Implement the logic to handle the request action (approve, request more info, decline)
    console.log(`Request ${action} with ID: ${requestId}`);
    if (message) {
      console.log(`Message: ${message}`);
    }
    // Update requests state or perform API call here
  };

  return (
    <Container>
      <h1>Admin Store Requests</h1>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Manage Requests
      </Button>
      <AdminStoreRequests
        show={showModal}
        handleClose={() => setShowModal(false)}
        requests={requests}
        handleRequestAction={handleRequestAction}
      />
    </Container>
  );
};

export default AdminStoreRequestsPage;
