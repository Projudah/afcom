// src/components/StoreOwner/EditStoreHeader.jsx
'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import StoreOwnerNavbar from '../../components/store-owner/common/StoreOwnerHeader';
import Sidebar from '../../components/store-owner/common/SideBar';

const fetchVenue = async (id) => ({
  id,
  name: 'KENOS AFRICAN SHOP',
  address: ' Kasapa, New Bortianor, Accra, Greater Accra, Ghana',
  email: 'poweronchristway@gmail.com',
  website: ' http://www.kenosafricanshop.com',
  facebook: 'https://facebook.com/eventhorizon',
  twitter: 'https://twitter.com/eventhorizon',
  instagram: 'https://instagram.com/eventhorizon',
  logo: '/assets/logo.png',
  images: [
    '/assets/test1.jpg',
    '/assets/test2.jpg',
    '/assets/test3.jpg',
  ]
});

const EditStoreHeader = ({ venueId }) => {
  const [form, setForm] = useState({
    name: '',
    address: '',
    email: '',
    website: '',
    facebook: '',
    twitter: '',
    instagram: '',
    logo: '',
    images: []
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchVenue(venueId).then(v => setForm(v));
  }, [venueId]);

  const handleFieldChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleLogoUpload = e => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setForm(f => ({ ...f, logo: url }));
    }
  };

  const handleDeleteImage = idx => {
    setForm(f => ({
      ...f,
      images: f.images.filter((_, i) => i !== idx)
    }));
  };

  const handleAddImages = e => {
    const files = Array.from(e.target.files).slice(0, 10 - form.images.length);
    const urls = files.map(f => URL.createObjectURL(f));
    setForm(f => ({ ...f, images: [...f.images, ...urls] }));
  };

  const handleSave = () => {
    console.log('Updated payload:', form);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ position: 'fixed', width: '100%', zIndex: 1000 }}>
        <StoreOwnerNavbar ownerName="Admin" onMenuClick={() => setSidebarOpen(true)} />
      </div>
      <Sidebar show={sidebarOpen} handleClose={() => setSidebarOpen(false)} />

      <div style={{ flex: 1, marginTop: '64px', padding: '1rem' }}>
        <Box sx={{ maxWidth: 900, mx: 'auto', p: 2 }}>
          <Typography variant="h4" gutterBottom>
            Edit Your Store Header
          </Typography>

          <Grid container spacing={2}>
            {/* Logo upload (single image) */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Logo
              </Typography>
              {form.logo && (
                <Card sx={{ width: 120, mb: 1 }}>
                  <CardMedia
                    component="img"
                    height="120"
                    image={form.logo}
                    alt="Venue Logo"
                  />
                </Card>
              )}
              <Button
                variant="outlined"
                component="label"
                startIcon={<PhotoCamera />}
              >
                {form.logo ? 'Change Logo' : 'Upload Logo'}
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
              </Button>
            </Grid>

            {/* Other text fields */}
            {[
              { name: 'name', label: 'Name', xs: 12 },
              { name: 'address', label: 'Venue Address', xs: 12 },
              { name: 'email', label: 'Email', sm: 6, type: 'email' },
              { name: 'website', label: 'Website', sm: 6, type: 'url' },
              { name: 'facebook', label: 'Facebook URL', sm: 6, type: 'url' },
              { name: 'twitter', label: 'Twitter URL', sm: 6, type: 'url' },
              { name: 'instagram', label: 'Instagram URL', sm: 6, type: 'url' }
            ].map(({ name, label, xs = 6, sm = 6, type = 'text' }) => (
              <Grid item xs={xs} sm={sm} key={name}>
                <TextField
                  fullWidth
                  label={label}
                  name={name}
                  value={form[name]}
                  onChange={handleFieldChange}
                  type={type}
                />
              </Grid>
            ))}

            {/* Save button */}
            <Grid item xs={12}>
              <Box textAlign="right">
                <Button variant="contained" onClick={handleSave}>
                  Save Changes
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default EditStoreHeader;
