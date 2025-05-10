// src/components/LatestStoresCarousel.jsx
import React from 'react';
import { Carousel, Button, Container } from 'react-bootstrap';
import { Grow } from '@mui/material';
import '../../../styles/browseStoreLayout.css';

const LatestStoresCarousel = ({ stores }) => {
  return (
    <Container className="mt-5">
      <h2 className="section-title">Latest Stores</h2>
      <Carousel>
        {stores.map((store, index) => (
          <Carousel.Item key={store.id}>
            <Grow in timeout={index * 500}>
              <div>
                <img
                  className="carousel-image d-block w-100"
                  src={store.image}
                  alt={store.name}
                />
                <Carousel.Caption>
                  <h3 className='latest-stores-name'>{store.name}</h3>
                  <p className='latest-stores-description'>{store.description}</p>
                  <Button variant="primary" href={`/store/${store.id}`}>
                    Visit Shop
                  </Button>
                </Carousel.Caption>
              </div>
            </Grow>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default LatestStoresCarousel;
