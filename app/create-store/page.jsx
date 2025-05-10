// src/pages/CreateStore.jsx
'use client'
import React, { useState } from 'react';
import StoreForm from '../components/create-store/StoreForm';
import { Container } from 'react-bootstrap';
import '../styles/createStore.css';
// src/index.js or src/App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from '../components/HomeNavbar'; // Import the CustomNavbar component



const CreateStore = () => {
  const [store, setStore] = useState({
    name: '',
    address: '',
    type: '',
    category: '',
    email: '',
    phone: '',
    website: '',
    businessType: [],
    description: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false  
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Store created:', store);
    // Add your form submission logic here
  };

  return (
    <div>
      <CustomNavbar />
    <Container className="create-store-container">
      <h2 className="my-4 text-center">Create Your Store</h2>
      <StoreForm store={store} setStore={setStore} handleSubmit={handleSubmit} />
    </Container>
    </div>
  );
};

export default CreateStore;
