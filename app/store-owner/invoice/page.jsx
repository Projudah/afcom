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
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import StoreOwnerNavbar from '../../components/store-owner/common/StoreOwnerHeader';
import Sidebar           from '../../components/store-owner/common/SideBar';

export default function InvoicesPage() {
  const theme = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [form, setForm] = useState({
    bookingRef: '',
    customerName: '',
    email: '',
    amount: '',
    invoiceDate: null,
    dueDate: null
  });

  const [invoices, setInvoices] = useState([]);

  // Load from localStorage (replace with API fetch as needed)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('invoices') || '[]');
    setInvoices(saved);
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleDateChange = field => date => {
    setForm(f => ({ ...f, [field]: date }));
  };

  const handleCreate = () => {
    const newInv = {
      ...form,
      id: Date.now(),
      invoiceDate: form.invoiceDate?.toLocaleDateString(),
      dueDate:    form.dueDate?.toLocaleDateString()
    };
    const updated = [newInv, ...invoices];
    setInvoices(updated);
    localStorage.setItem('invoices', JSON.stringify(updated));

    // Reset form
    setForm({
      bookingRef: '',
      customerName: '',
      email: '',
      amount: '',
      invoiceDate: null,
      dueDate: null
    });
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Fixed Navbar */}
      <Box sx={{ position: 'fixed', width: '100%', zIndex: 1000 }}>
        <StoreOwnerNavbar ownerName="Admin" onMenuClick={() => setSidebarOpen(true)} />
      </Box>

      {/* Sidebar */}
      <Sidebar show={sidebarOpen} handleClose={() => setSidebarOpen(false)} />

      {/* Main */}
      <Box
        component="main"
        sx={{
          flex: 1,
          mt: '64px',
          p: 3,
          bgcolor: 'background.default'
        }}
      >
        <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Invoices
          </Typography>

          {/* Generate New Invoice */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Generate New Invoice
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Booking Reference"
                  name="bookingRef"
                  value={form.bookingRef}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Customer Name"
                  name="customerName"
                  value={form.customerName}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Amount"
                  name="amount"
                  type="number"
                  value={form.amount}
                  onChange={handleChange}
                />
              </Grid>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Invoice Date"
                    value={form.invoiceDate}
                    onChange={handleDateChange('invoiceDate')}
                    renderInput={params => <TextField fullWidth {...params} />}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Due Date"
                    value={form.dueDate}
                    onChange={handleDateChange('dueDate')}
                    renderInput={params => <TextField fullWidth {...params} />}
                  />
                </Grid>
              </LocalizationProvider>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={handleCreate}
                  disabled={
                    !form.bookingRef ||
                    !form.customerName ||
                    !form.email ||
                    !form.amount ||
                    !form.invoiceDate ||
                    !form.dueDate
                  }
                  sx={{
                    mt: 1,
                    bgcolor: theme.palette.primary.main,
                    '&:hover': { bgcolor: theme.palette.primary.dark }
                  }}
                >
                  Create Invoice
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* Invoice List */}
          <Typography variant="h6" gutterBottom>
            All Generated Invoices
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ref</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Invoice Date</TableCell>
                  <TableCell>Due Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.length ? (
                  invoices.map(inv => (
                    <TableRow key={inv.id}>
                      <TableCell>{inv.bookingRef}</TableCell>
                      <TableCell>{inv.customerName}</TableCell>
                      <TableCell>{inv.email}</TableCell>
                      <TableCell>CAD {inv.amount}</TableCell>
                      <TableCell>{inv.invoiceDate}</TableCell>
                      <TableCell>{inv.dueDate}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No invoices yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}
