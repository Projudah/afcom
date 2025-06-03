// src/components/browse-store/store/EditAboutUsForm.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../../../styles/storeDetails.css';

const EditAboutUsForm = ({ show, handleClose, about, updateAbout }) => {
  const [history, setHistory] = useState('');
  const [mission, setMission] = useState('');
  const [vision, setVision] = useState('');
  const [team, setTeam] = useState('');

  useEffect(() => {
    if (about) {
      setHistory(about.history);
      setMission(about.mission);
      setVision(about.vision);
      setTeam(about.team);
    }
  }, [about]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedAbout = { history, mission, vision, team };
    updateAbout(updatedAbout);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header className="contactModal-Header text-white" closeButton>
        <Modal.Title className="fw-bold">Edit About Us</Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-light p-4 rounded-bottom">
        <p className="fs-5 text-secondary mb-4">
          Update the About Us content below. Changes will reflect immediately.
        </p>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formHistory" className="mb-3">
            <Form.Label className="fw-semibold">History</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={history}
              onChange={(e) => setHistory(e.target.value)}
              className="shadow-sm"
            />
          </Form.Group>

          <Form.Group controlId="formMission" className="mb-3">
            <Form.Label className="fw-semibold">Mission</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              className="shadow-sm"
            />
          </Form.Group>

          <Form.Group controlId="formVision" className="mb-3">
            <Form.Label className="fw-semibold">Vision</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              className="shadow-sm"
            />
          </Form.Group>

          <Form.Group controlId="formTeam" className="mb-4">
            <Form.Label className="fw-semibold">Our Team</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className="shadow-sm"
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="outline-secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditAboutUsForm;
