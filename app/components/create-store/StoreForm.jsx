'use client'
import React, { useState } from 'react';
import { Form, Button, Container, Alert, InputGroup, Modal } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import '../../styles/storeForm.css';

import AddressAutocomplete from './AddressAutoComplete'; // Adjust the path as needed

const StoreForm = ({ store, setStore, handleSubmit }) => {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStore({ ...store, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setAgreeTerms(e.target.checked);
  };

  const handleFileChange = (e) => {
    // Here we set the logo file into the store object.
    // You may choose to process or preview the file as needed.
    setStore({ ...store, logo: e.target.files[0] });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (store.password !== store.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!agreeTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }
    setError('');
    router.push('/upload-files');
    // Optionally call handleSubmit(e) if needed
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  // Assume your store object now has an address field instead of type
  const suggestions = [
    "200 Towerhill, Dr, Richmond Hill",
    "123 Main Street, Toronto",
    "456 Elm Street, Ottawa",
    // Add more suggestions as needed
  ];

  const handleAddressChange = (newAddress) => {
    setStore(prevStore => ({
      ...prevStore,
      address: newAddress,
    }));
  };

  return (
    <Container className="storeForm-main-container">
      <Form onSubmit={handleFormSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group controlId="formStoreName" className='storeForm-container'>
          <Form.Label>Store Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={store.name}
            onChange={handleChange}
            placeholder='Store Name'
            required
          />
        </Form.Group>

        {/* New logo upload section */}
        <Form.Group controlId="formStoreLogo" className="storeForm-container">
          <Form.Label>Store Logo</Form.Label>
          <Form.Control 
            type="file"
            name="logo"
            onChange={handleFileChange}
            accept="image/*"
          />
        </Form.Group>

        {/* Change this field to address if desired */}
        <Form.Group controlId="formStoreAddress" className="storeForm-container">
          <Form.Label>Store Address</Form.Label>
          <AddressAutocomplete 
            value={store.address}
            onChange={(newAddress) =>
              setStore(prevStore => ({ ...prevStore, address: newAddress }))
            }
          />
        </Form.Group>
        <Form.Group controlId="formStoreType" className='storeForm-container'>
          <Form.Label>Store Type</Form.Label>
          <Form.Control
            type="text"
            name="type"
            value={store.type}
            onChange={handleChange}
            placeholder='E.g: Restaurant, salon, skincare....'
          />
        </Form.Group>

        <Form.Group controlId="formStoreCategory" className='storeForm-container'>
          <Form.Label>Store Category</Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={store.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Restaurant">Restaurant</option>
            <option value="generalStore">General Store</option>
            <option value="hair-items">Hair products and services</option>
            <option value="homemadeGoods">Homemade goods</option>
            <option value="Others">Others</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formEmail" className='storeForm-container'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={store.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group controlId="formPhoneNumber" className='storeForm-container'>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={store.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </Form.Group>
        <Form.Group controlId="formWebsite" className="storeForm-container">
          <Form.Label>Website</Form.Label>
          <Form.Control
            type="url"
            name="website"
            value={store.website}
            onChange={handleChange}
            placeholder="https://yourwebsite.com"
          />
        </Form.Group>

        <Form.Group className="businessType-checkbox-container">
          <Form.Label>Will the store be selling products or providing services?</Form.Label>
          <div>
            <Form.Check
              type="checkbox"
              label="Selling Products"
              name="businessTypeProducts"
              value="products"
              checked={store.businessType.includes('products')}
              onChange={(e) => {
                const checked = e.target.checked;
                if (checked) {
                  setStore(prev => ({
                    ...prev,
                    businessType: [...prev.businessType, 'products']
                  }));
                } else {
                  setStore(prev => ({
                    ...prev,
                    businessType: prev.businessType.filter(item => item !== 'products')
                  }));
                }
              }}
              inline
            />
            <Form.Check
              type="checkbox"
              label="Providing Services"
              name="businessTypeServices"
              value="services"
              checked={store.businessType.includes('services')}
              onChange={(e) => {
                const checked = e.target.checked;
                if (checked) {
                  setStore(prev => ({
                    ...prev,
                    businessType: [...prev.businessType, 'services']
                  }));
                } else {
                  setStore(prev => ({
                    ...prev,
                    businessType: prev.businessType.filter(item => item !== 'services')
                  }));
                }
              }}
              inline
            />
          </div>
        </Form.Group>
        <Form.Group controlId="formDescription" className='storeForm-container'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={store.description}
            onChange={handleChange}
            placeholder="Enter store description"
            rows={4}
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className='storeForm-container'>
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={store.password}
              onChange={handleChange}
              placeholder='Enter your password'
              required
            />
            <InputGroup.Text>
              <Button variant="outline-secondary" onClick={toggleShowPassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formConfirmPassword" className='storeForm-container'>
          <Form.Label>Confirm Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={store.confirmPassword}
              onChange={handleChange}
              placeholder='Confirm your password'
              required
            />
            <InputGroup.Text>
              <Button variant="outline-secondary" onClick={toggleShowConfirmPassword}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formAgreeTerms">
          <Form.Check
            type="checkbox"
            // label="I agree to the terms and conditions"
            label={<>I agree to the <span style={{ color: '#0F1C3C', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setShowTermsModal(true)}>Terms and Conditions</span></>}
            checked={agreeTerms}
            onChange={handleCheckboxChange}
            required
            className='agree-checkbox'
          />
        </Form.Group>

        <Button className='create-store-btn' variant="primary" type="submit" disabled={!agreeTerms}>
          Next
        </Button>
      </Form>
      
     {/* Terms and Conditions Modal */}
     <Modal show={showTermsModal} onHide={() => setShowTermsModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Terms and Conditions</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              <p>
                {/* Insert your detailed terms and conditions here */}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Phasellus nec faucibus mauris. Suspendisse potenti. Donec at elit euismod, vehicula magna a, blandit risus. Fusce at ex ut nisl auctor fermentum. In hac habitasse platea dictumst. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent rutrum, nibh sed fringilla laoreet, felis massa tincidunt nisl, sed varius sem leo id massa.
              </p>
              <p>
                Sed in arcu ut tortor malesuada sollicitudin. Mauris auctor dui nec ante vestibulum, in consequat velit vulputate. Integer volutpat lorem ut tellus fermentum, quis porta mi bibendum. Aenean id feugiat lorem.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowTermsModal(false)}>
                Decline
              </Button>
              <Button variant="primary" onClick={() => { setAgreeTerms(true); setShowTermsModal(false); }}>
                Accept
              </Button>
            </Modal.Footer>
          </Modal>
    </Container>
    
  );
};

export default StoreForm;
