'use client'
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import BrowseNavbar from '../components/browse-store/common/BrowseStoreHeader';
import Footer from '../components/browse-store/common/BrowseStoreFooter';
import '../styles/categories.css';


const CategoryPage = () => {
  const { categoryName } = useParams(); // Get the category name from the URL
  const [stores, setStores] = useState([]);

  useEffect(() => {
    // Simulate fetching stores by category from backend
    const allStores = [
      { id: 1, name: 'African Restaurant', type: 'Restaurant', category: 'restaurants', description: 'Authentic African cuisine.', image: 'path/to/restaurant.jpg' },
      { id: 1, name: 'African Restaurant', type: 'Restaurant', category: 'restaurants', description: 'Authentic African cuisine.', image: 'path/to/restaurant.jpg' },
      { id: 1, name: 'African Restaurant', type: 'Restaurant', category: 'restaurants', description: 'Authentic African cuisine.', image: 'path/to/restaurant.jpg' },
      { id: 2, name: 'African Hair Salon', type: 'Salon', category: 'salons', description: 'Traditional African hairstyles.', image: 'path/to/salon.jpg' },
      // Add more stores with appropriate categories
    ];

    const filteredStores = allStores.filter(store => store.category === categoryName.toLowerCase());
    setStores(filteredStores);
  }, [categoryName]);

  return (
    <div className="page-container">
      <div className="content-wrap">
        <BrowseNavbar />
        <Container>
          <h2 className="section-title">{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h2>
          <Row>
            {stores.map((store) => (
              <Col md={4} key={store.id} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={store.image} alt={store.name} />
                  <Card.Body>
                    <Card.Title>{store.name}</Card.Title>
                    <Card.Text>{store.description}</Card.Text>
                    <Button variant="primary" as={Link} to={`/store/${store.id}`}>
                      Enter Store
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          {stores.length === 0 && <p>No stores found in this category.</p>}
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
