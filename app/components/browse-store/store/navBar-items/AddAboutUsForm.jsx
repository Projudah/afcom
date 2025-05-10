// src/components/EditAboutUsForm.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

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
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className='inquiryModal-Header' closeButton>
        <Modal.Title>Edit About Us</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formHistory" className='inquiry-container'>
            <Form.Label>History</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={history}
              onChange={(e) => setHistory(e.target.value)}
              
            />
          </Form.Group>

          <Form.Group controlId="formMission" className='inquiry-container'>
            <Form.Label>Mission</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              
            />
          </Form.Group>

          <Form.Group controlId="formVision" className='inquiry-container'>
            <Form.Label>Vision</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              
            />
          </Form.Group>

          <Form.Group controlId="formTeam" className='inquiry-container'>
            <Form.Label>Our Team</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditAboutUsForm;
