// src/components/StoreOwner/CustomerEnquiries.jsx
'use client';
import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CancelIcon from '@mui/icons-material/Cancel';
import StoreOwnerNavbar from '../components/store-owner/common/StoreOwnerHeader';
import Sidebar from '../components/store-owner/common/SideBar';
import { format as formatDateFns, parseISO } from 'date-fns';
import '../styles/browseStoreLayout.css';

// Initial enquiries data now only has id, fullName, email, itemName, message
const initialEnquiries = [
  {
    id: 1,
    fullName: 'Jane Doe',
    email: 'jane@example.com',
    itemName: 'Deluxe Wedding Package',
    message: 'Please arrange stage backdrop in white & purple.',
  },
  {
    id: 2,
    fullName: 'John Smith',
    email: 'john@example.com',
    itemName: 'Soap Dispenser',
    message: 'Need 50 dispensers for our new office.',
  },
  // …more enquiries…
];

export default function CustomerEnquiries() {
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // For viewing a single enquiry’s details
  const [viewing, setViewing] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);

  // For deleting/cancel confirmation
  const [toDelete, setToDelete] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  // Filter by searchTerm (name or email)
  const filtered = useMemo(
    () =>
      enquiries.filter(
        (e) =>
          e.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.email.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [enquiries, searchTerm]
  );

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    setEnquiries((prev) => prev.filter((e) => e.id !== toDelete.id));
    setDeleteOpen(false);
    setToDelete(null);
  };

  // Pagination handlers
  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box sx={{ position: 'fixed', width: '100%', zIndex: 1000 }}>
        <StoreOwnerNavbar ownerName="Admin" onMenuClick={() => setSidebarOpen(true)} />
      </Box>
      <Sidebar show={sidebarOpen} handleClose={() => setSidebarOpen(false)} />

      <Box component="main" sx={{ flex: 1, mt: '64px', p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Customer Enquiries
        </Typography>

        {/* Search field */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <TextField
            size="small"
            placeholder="Search name or email…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ flex: 1, minWidth: 200 }}
          />
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {['ID', 'Name', 'Email', 'Item', 'Message', 'Actions'].map((h) => (
                  <TableCell key={h}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((e) => (
                  <TableRow key={e.id}>
                    <TableCell>{e.id}</TableCell>
                    <TableCell>{e.fullName}</TableCell>
                    <TableCell>{e.email}</TableCell>
                    <TableCell>{e.itemName}</TableCell>
                    <TableCell>
                      {e.message.length > 40
                        ? e.message.slice(0, 37) + '…'
                        : e.message}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setViewing(e);
                          setViewOpen(true);
                        }}
                      >
                        <VisibilityIcon sx={{ color: '#0422c9' }} fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setToDelete(e);
                          setDeleteOpen(true);
                        }}
                      >
                        <CancelIcon
                          fontSize="small"
                          sx={{ color: '#d32f2f' }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filtered.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[]}
          />
        </TableContainer>

        {/* View Enquiry Dialog */}
        <Dialog open={viewOpen} onClose={() => setViewOpen(false)}>
          <DialogTitle sx={{ background: 'linear-gradient(90deg, #0F1C3C, #2F61C2)', color:'#fff' }} >Enquiry Details</DialogTitle>
          <DialogContent dividers>
            {viewing && (
              <>
                <Typography gutterBottom>
                  <strong>ID:</strong> {viewing.id}
                </Typography>
                <Typography gutterBottom>
                  <strong>Name:</strong> {viewing.fullName}
                </Typography>
                <Typography gutterBottom>
                  <strong>Email:</strong> {viewing.email}
                </Typography>
                <Typography gutterBottom>
                  <strong>Item:</strong> {viewing.itemName}
                </Typography>
                <Typography gutterBottom>
                  <strong>Message:</strong> {viewing.message}
                </Typography>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setViewOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
          <DialogTitle sx={{ background: 'linear-gradient(90deg, #0F1C3C, #2F61C2)', color:'#fff' }}>Confirm Delete</DialogTitle>
          <DialogContent dividers>
            <Typography>
              Are you sure you want to delete the enquiry from {' '}
              <strong>{toDelete?.fullName}</strong> ?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteConfirm}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
