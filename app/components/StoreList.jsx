'use client'
import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Box, IconButton } from '@mui/material';
import Link from 'next/link';
import { FaTrash } from 'react-icons/fa';
import DeleteConfirmationModal from './store-owner/common/DeleteConfirmationModal';

const StoreList = ({ stores, deleteStore }) => {
  const [open, setOpen] = useState(false);
  const [storeIdToDelete, setStoreIdToDelete] = useState(null);

  const handleOpen = (storeId) => {
    setStoreIdToDelete(storeId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setStoreIdToDelete(null);
  };

  const handleConfirm = () => {
    deleteStore(storeIdToDelete);
    handleClose();
  };

  return (
    <Box>
      {stores.map((store) => (
        <Card key={store.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h5">{store.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {store.type}
            </Typography>
            <Typography variant="body1">{store.description}</Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 2,
              }}
            >
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  component={Link}
                  to={`/store/${store.id}`}
                  variant="contained"
                >
                  View Details
                </Button>
                <Button
                  component={Link}
                  to="/message-center"
                  variant="contained"
                  color="secondary"
                >
                  Message center
                </Button>
              </Box>
              <IconButton color="error" onClick={() => handleOpen(store.id)}>
                <FaTrash />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ))}
      <DeleteConfirmationModal open={open} handleClose={handleClose} handleConfirm={handleConfirm} />
    </Box>
  );
};

export default StoreList;
