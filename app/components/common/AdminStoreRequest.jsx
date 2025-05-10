// src/components/AdminStoreRequests.jsx
'use client'
import React, { useState } from 'react';
import { Modal, Button, ListGroup, Form, Alert } from 'react-bootstrap';
import '../../styles/storeForm.css'

const AdminStoreRequests = ({ show, handleClose, requests, handleRequestAction }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
  };

  const handleAction = (action) => {
    handleRequestAction(selectedRequest.id, action, additionalInfo);
    setSelectedRequest(null);
    setAdditionalInfo('');
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Manage Store Requests</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {requests.length === 0 ? (
          <Alert variant="info">No requests available</Alert>
        ) : (
          <ListGroup>
            {requests.map((request) => (
              <ListGroup.Item key={request.id} action onClick={() => handleRequestClick(request)}>
                {request.storeName} - {request.storeType} ({request.storeCategory})
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}

        {selectedRequest && (
          <div className="admin-request-details">
            <h4>Request Details</h4>
            <p><strong>Store Name:</strong> {selectedRequest.storeName}</p>
            <p><strong>Store Type:</strong> {selectedRequest.storeType}</p>
            <p><strong>Store Category:</strong> {selectedRequest.storeCategory}</p>
            <p><strong>Email:</strong> {selectedRequest.email}</p>
            <p><strong>Phone:</strong> {selectedRequest.phone}</p>
            <p><strong>Description:</strong> {selectedRequest.description}</p>

            {selectedRequest.businessType === 'products' ? (
              <div>
                <h5>Files Uploaded</h5>
                <ul>
                  {selectedRequest.files.map((file, index) => (
                    <li key={index}>{file}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <h5>No files uploaded for service-based stores.</h5>
              </div>
            )}

            <Form.Group controlId="formAdditionalInfo">
              <Form.Label>Additional Information or Documents Required:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
              />
            </Form.Group>

            <Button variant="success" onClick={() => handleAction('approve')}>Approve</Button>
            <Button variant="warning" onClick={() => handleAction('request_more_info')}>Request More Info</Button>
            <Button variant="danger" onClick={() => handleAction('decline')}>Decline</Button>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminStoreRequests;
