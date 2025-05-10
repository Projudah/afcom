'use client'
import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { Button } from 'react-bootstrap';
import ShowAllItemsModal from './ShowAllItemsModal';
import '../../../styles/browseStoreLayout.css';

const FeaturedProduct = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const itemsPerPage = 4; // Number of items to display per page

  const handleNext = () => {
    if (currentIndex + itemsPerPage < products.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerPage);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="popular-products-section">
      <div className="header-controls-container">
        <motion.h4
          className="section-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Featured Products
        </motion.h4>
        <div className="controls-container">
          <Button variant="outline-secondary" onClick={handlePrev} disabled={currentIndex === 0}>
            &lt;
          </Button>
          <Button variant="outline-secondary" onClick={handleNext} disabled={currentIndex + itemsPerPage >= products.length}>
            &gt;
          </Button>
          <div className="custom-see-all-btn" onClick={handleShowModal}>
            View more
          </div>
        </div>
      </div>
      <Grid container spacing={3}>
        {visibleProducts.map((product, index) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="popular-product-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="popular-product-image"
                />
                <CardContent>
                  <Typography className="featured-body-text" variant="h6">{product.name}</Typography>
                  <Typography className="featured-body-text" variant="body2" color="textSecondary">
                    {product.storeName}
                  </Typography>
                  <Typography className="featured-body-text" variant="body1">{product.price}</Typography>
                  <Button variant="primary" href={`/product/${product.id}`} sx={{ mt: 2 }}>
                    View Product
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Modal to display all products */}
      <ShowAllItemsModal
        show={showModal}
        handleClose={handleCloseModal}
        items={products}
        title="Featured Products"
        type="product"
      />
    </div>
  );
};

export default FeaturedProduct;
