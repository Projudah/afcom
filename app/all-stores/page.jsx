import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

// NavBar and footer
import BrowseNavbar from '../common/BrowseStoreHeader';
import Footer from '../common/BrowseStoreFooter';
// NavBar and footer


const AllStores = () => {
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
        {stores.map((store) => (
          <Col md={4} key={store.id} className="mb-4">
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
