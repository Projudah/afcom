// src/components/UploadFiles.jsx
'use client'
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import '../styles/uploadFiles.css';

const UploadFiles = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const router = useRouter();
  
    const handleFileChange = (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 10) {
        alert('You can only upload a maximum of 10 files');
      } else {
        setSelectedFiles(files);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Add your form submission logic here
      console.log('Files uploaded:', selectedFiles);
      router.push('/'); // Redirect to home or any other page after uploading
    };
  
    const handleSkip = () => {
      router.push('/');
    };

  return (
    <Container className='uploadFiles-container'>
      <h2 className="my-4 text-center">Upload Business Files</h2>
      <p className='my-4 text-center'> Pleae upload your business registration documents in order for you to become a verified and trusted member</p>
      <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFile">
          <Form.Label>Upload Business Registration Documents</Form.Label>
          <Form.Control type="file" multiple onChange={handleFileChange} required />
          {selectedFiles.length > 0 && (
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
        </Form.Group>
        <div className='uploadBusinessFiles-btn-container'>
        <Button variant="primary" type="submit" className="mr-2">
          Upload
        </Button>
        <Button variant="secondary" onClick={handleSkip}>
          Skip
        </Button>
        </div>
      </Form>
    </Container>
  );
};

export default UploadFiles;
