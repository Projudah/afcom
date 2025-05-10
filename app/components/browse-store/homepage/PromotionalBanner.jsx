// src/components/PromotionalBanner.jsx
// import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import '../../../styles/browseStoreLayout.css';

const PromotionalBanner = () => {
  return (
    <Box className="promotional-banner" sx={{ p: 4, mb: 4 }}>
      <Typography variant="h4" className="banner-title" gutterBottom>
        Special Offer: Save 20% on Your First Purchase!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Join now and get an exclusive discount on selected stores.
      </Typography>
      <Button variant="contained" href="/sign-up">
        Sign Up Now
      </Button>
    </Box>
  );
};

export default PromotionalBanner;
