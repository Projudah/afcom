'use client';
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

// NavBar and footer
import BrowseNavbar from '../components/browse-store/common/BrowseStoreHeader';
import Footer from '../components/browse-store/common/BrowseStoreFooter';


const AllStores = () => {

    // ← Here’s the only addition: define your stores locally
  const stores = [
    { id: 3, name: 'New African Restaurant', description: 'Authentic African cuisine.', image: 'path/to/african-restaurant.jpg' },
    { id: 4, name: 'New African Hair Salon', description: 'Traditional African hairstyles.', image: 'path/to/african-hair-salon.jpg' },
    { id: 5, name: 'Popular African Clothing Store', description: 'Beautiful African fashion.', image: 'path/to/african-clothing-store.jpg' },
    { id: 6, name: 'Popular African Market', description: 'Fresh produce and groceries.', image: 'path/to/african-market.jpg' },
    // …add more if you like
  ];


  const router = useRouter();
  // const location = useLocation();
  // const { stores } = location.state || {}; // Get stores from location state

  if (!stores) {
    return <div>No stores available</div>; // Handle case when no stores are passed
  }

  return (
    <div> 
    <BrowseNavbar />
    <Container className="mt-5">
      
       <Button variant="secondary" onClick={() => router.push('/browse-stores')}>
        Back
      </Button>
      <h2 className="section-title">All Stores</h2>
      <Row>
        {stores.map((store, idx) => (
          <Col md={4} key={`${store.id}-${idx}`} className="mb-4">
            <Card>
              <Card.Img variant="top" src={store.image} />
              <Card.Body>
                <Card.Title>{store.name}</Card.Title>
                <Card.Text>{store.description}</Card.Text>
                <Button variant="primary" href={`/store/${store.id}`}>
                  Visit Store
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    <Footer />
    </div>
  );
};

export default AllStores;
