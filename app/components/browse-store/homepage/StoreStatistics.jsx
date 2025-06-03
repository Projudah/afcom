// src/components/StoreStatistics.jsx
'use client';
import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import '../../../styles/browseStoreLayout.css';
// import '../../../styles/scopedStoreStatisticsScoped.css';


const StoreStatistics = ({ stats }) => {
  return (
    <Box className="store-statistics" sx={{ color:'#007bff;', p: 4, mb: 4, textAlign: 'center' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h4">{stats.totalStores}</Typography>
          <Typography variant="body1">Stores</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h4">{stats.totalCategories}</Typography>
          <Typography variant="body1">Categories</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h4">{stats.totalUsers}</Typography>
          <Typography variant="body1">Users</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StoreStatistics;
