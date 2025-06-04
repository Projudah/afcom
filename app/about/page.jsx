'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import BrowseStoreHeader from '../components/browse-store/common/BrowseStoreHeader';

const About = () => {
  const router = useRouter();

  return (
    // <>
    //   <BrowseStoreHeader />
     <Box sx={{ py: 8, px: 2, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="md">
        <Button
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          onClick={() => router.push('/browse-store')}
          sx={{
            mb: 3,
            backgroundColor: 'primary.main',
            color: 'common.white',
            '&:hover': {
              backgroundColor: 'primary.dark',
            }
          }}
        >
          Back
        </Button>

        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 5 },
            backgroundColor: 'background.paper',
            borderRadius: 2
          }}
        >
          <Typography variant="h3" component="h1" align="center" gutterBottom>
            About Event Center Africa
          </Typography>

          <Typography variant="body1" paragraph>
            Welcome to <strong>Event Center Africa</strong>—the premier marketplace connecting
            event hosts with top‐quality venues across Nigeria and beyond.
          </Typography>

          <Typography variant="h5" gutterBottom>
            Why Partner With Us?
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography component="span">
                <strong>Maximum Exposure:</strong> Showcase your venue to thousands of planners.
              </Typography>
            </li>
            <li>
              <Typography component="span">
                <strong>Seamless Booking:</strong> Fast, secure, and trackable enquiries.
              </Typography>
            </li>
            <li>
              <Typography component="span">
                <strong>Trusted Community:</strong> Real reviews & transparent pricing.
              </Typography>
            </li>
            <li>
              <Typography component="span">
                <strong>Flexible Control:</strong> Set your rates, availability & packages.
              </Typography>
            </li>
          </Box>

          <Typography variant="h5" gutterBottom>
            Why Book With Us?
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography component="span">
                <strong>Diverse Selections:</strong> Intimate rooms to grand ballrooms.
              </Typography>
            </li>
            <li>
              <Typography component="span">
                <strong>Verified Hosts:</strong> Quality‐approved venues with photos & reviews.
              </Typography>
            </li>
            <li>
              <Typography component="span">
                <strong>Easy Search & Compare:</strong> Filter by city, capacity, style, budget, and more.
              </Typography>
            </li>
            <li>
              <Typography component="span">
                <strong>Hassle‐Free Support:</strong> 24/7 assistance with bookings and changes.
              </Typography>
            </li>
          </Box>

          <Typography variant="h5" gutterBottom>
            Our Story
          </Typography>
          <Typography variant="body1" paragraph>
            Born from a passion for bringing people together, Event Center Africa
            was founded to solve a simple problem: finding and booking event
            spaces shouldn’t be a headache. We’ve grown to a network of 500+ venues
            and a vibrant community of event professionals.
          </Typography>

          <Typography variant="h5" gutterBottom>
            Our Vision & Mission
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Vision:</strong> To be Africa’s go‐to platform for all things events—
            where every celebration finds its perfect backdrop.
          </Typography>
          <Typography variant="body1">
            <strong>Mission:</strong> Empower venue owners with powerful tools and event
            planners with effortless experiences, fostering unforgettable gatherings
            from Abuja to Cape Town.
          </Typography>
        </Paper>
      </Container>
    </Box>
   // </>
   
  );
};

export default About;
