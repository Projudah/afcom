'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Card,
  CardMedia
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import StoreOwnerNavbar from '../../components/store-owner/common/StoreOwnerHeader';
import Sidebar           from '../../components/store-owner/common/SideBar';

export default function EditHeader() {
  const theme = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [form, setForm] = useState({
    storeName: '',
    storeAddress: '',
    email: '',
    phone: '',
    website: '',
    twitter: '',
    instagram: '',
    facebook: '',
    logo: null,
  });

  // Stub: fetch existing header details
  useEffect(() => {
    // TODO: replace with real API call
    const existing = {
      storeName:    'My Awesome Store',
      storeAddress: '123 Main St, Lagos',
      email:        'contact@awesome.ng',
      phone:        '+2348123456789',
      website:      'https://awesome.ng',
      twitter:      'https://twitter.com/awesome',
      instagram:    'https://instagram.com/awesome',
      facebook:     'https://facebook.com/awesome',
      logoUrl:      '/assets/logo.png'
    };
    setForm({
      storeName:    existing.storeName,
      storeAddress: existing.storeAddress,
      email:        existing.email,
      phone:        existing.phone,
      website:      existing.website,
      twitter:      existing.twitter,
      instagram:    existing.instagram,
      facebook:     existing.facebook,
      logo:         existing.logoUrl
    });
  }, []);

  const handleFieldChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleLogoChange = e => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setForm(f => ({ ...f, logo: preview }));
    }
  };

  const handleSave = () => {
    // Prepare payload
    console.log('Saving header details:', form);
    // TODO: send to your API
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Navbar */}
      <Box sx={{ position: 'fixed', width: '100%', zIndex: 1000 }}>
        <StoreOwnerNavbar onMenuClick={() => setSidebarOpen(true)} />
      </Box>

      {/* Sidebar */}
      <Sidebar show={sidebarOpen} handleClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          mt: '64px',
          p: 3,
          bgcolor: 'background.default'
        }}
      >
        <Box sx={{ maxWidth: 700, mx: 'auto' }}>
          <Typography variant="h4" gutterBottom>
            Edit Store Header Details
          </Typography>

          <Paper sx={{ p: 3, mb: 4 }}>
            <Grid container spacing={2}>
              {/* Store Name */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Store Name"
                  name="storeName"
                  value={form.storeName}
                  onChange={handleFieldChange}
                />
              </Grid>

              {/* Address */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Store Address"
                  name="storeAddress"
                  value={form.storeAddress}
                  onChange={handleFieldChange}
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleFieldChange}
                />
              </Grid>

              {/* Phone */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleFieldChange}
                />
              </Grid>

              {/* Website */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Website"
                  name="website"
                  type="url"
                  value={form.website}
                  onChange={handleFieldChange}
                />
              </Grid>

              {/* Social Links */}
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Twitter URL"
                  name="twitter"
                  type="url"
                  value={form.twitter}
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Instagram URL"
                  name="instagram"
                  type="url"
                  value={form.instagram}
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Facebook URL"
                  name="facebook"
                  type="url"
                  value={form.facebook}
                  onChange={handleFieldChange}
                />
              </Grid>

              {/* Logo Upload */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Store Logo
                </Typography>
                {form.logo && (
                  <Card sx={{ maxWidth: 200, mb: 1 }}>
                    <CardMedia
                      component="img"
                      height="120"
                      image={form.logo}
                      alt="Store Logo Preview"
                    />
                  </Card>
                )}
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<PhotoCamera />}
                  sx={{
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    '&:hover': {
                      bgcolor: theme.palette.primary.light,
                      borderColor: theme.palette.primary.dark
                    }
                  }}
                >
                  Upload Logo
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleLogoChange}
                  />
                </Button>
              </Grid>

              {/* Save */}
              <Grid item xs={12} textAlign="right">
                <Button
                  variant="contained"
                  onClick={handleSave}
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    '&:hover': { bgcolor: theme.palette.primary.dark }
                  }}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
