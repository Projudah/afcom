'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
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
  FormControl,
  Select,
  MenuItem,
  Chip,
  TextField,
  IconButton,
  Button,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack
} from '@mui/material';
import {
  LocalizationProvider,
  DatePicker
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  format,
  parseISO,
  isWithinInterval,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  addWeeks,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear
} from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
// import AppointmentProcessModal from '../components/AppointmentProcessModal';
import StoreOwnerNavbar from '../components/store-owner/common/StoreOwnerHeader';
import Sidebar from '../components/store-owner/common/SideBar';
import '../styles/bookingModal.css';

const initialAppointments = [
  {
    id: 1,
    fullName: 'Jane Doe',
    email: 'jane@example.com',
    phone: '+234812345678',
    eventType: 'Wedding',
    guests: 150,
    viewingDate: '2025-06-21',
    viewingTime: '14:30',
    status: 'pending'   // 'pending' | 'deposit' | 'paid'
  },
  {
    id: 2,
    fullName: 'John Smith',
    email: 'john@example.com',
    phone: '+234812300000',
    eventType: 'Conference',
    guests: 200,
    viewingDate: '2025-05-25',
    viewingTime: '10:00',
    status: 'deposit'
  },
  // …more…
];

export default function UpcomingAppointments() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [processing, setProcessing] = useState(null);

  // controls
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [timePreset, setTimePreset] = useState('all');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  // parse appointment datetime
  const toDateTime = a => parseISO(`${a.viewingDate}T${a.viewingTime}`);

    // cancel confirmation
  const [toCancel, setToCancel]   = useState(null);
  const [cancelOpen, setCancelOpen] = useState(false);


  const filtered = useMemo(() => {
    const now = new Date();

    // derive window from preset
    let presetWindow = null;
    switch (timePreset) {
      case 'today':
        presetWindow = { start: startOfDay(now), end: endOfDay(now) };
        break;
      case 'thisWeek':
        presetWindow = { start: startOfWeek(now), end: endOfWeek(now) };
        break;
      case 'next2Weeks':
        presetWindow = { start: now, end: endOfWeek(addWeeks(now, 2)) };
        break;
      case 'thisMonth':
        presetWindow = { start: startOfMonth(now), end: endOfMonth(now) };
        break;
      case 'thisYear':
        presetWindow = { start: startOfYear(now), end: endOfYear(now) };
        break;
      default:
        break;
    }

    return appointments
      // only future
      .filter(a => toDateTime(a) >= now)
      // search
      .filter(a =>
        a.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      // status
      .filter(a => statusFilter === 'all' || a.status === statusFilter)
      // preset window
      .filter(a => {
        if (!presetWindow) return true;
        return isWithinInterval(toDateTime(a), presetWindow);
      })
      // custom range
      .filter(a => {
        const dt = toDateTime(a);
        if (fromDate && dt < startOfDay(fromDate)) return false;
        if (toDate   && dt > endOfDay(toDate))   return false;
        return true;
      })
      // sort
      .sort((a, b) => toDateTime(a) - toDateTime(b));
  }, [appointments, searchTerm, statusFilter, timePreset, fromDate, toDate]);

  const handleStatusChange = (id, newStatus) =>
    setAppointments(appts =>
      appts.map(a => a.id === id ? { ...a, status: newStatus } : a)
    );

    const handleCancelConfirm = () => {
      setAppointments(appts =>
        appts.filter(a => a.id !== toCancel.id)
      );
      setCancelOpen(false);
    };
  const statusColor = s =>
    s === 'pending' ? 'error'
    : s === 'deposit' ? 'warning'
    : 'success';

  return (
    <Box sx={{ display:'flex', minHeight:'100vh' }}>
      <Box sx={{ position:'fixed', width:'100%', zIndex:1000 }}>
        <StoreOwnerNavbar
          ownerName="Admin"
          onMenuClick={() => setSidebarOpen(true)}
        />
      </Box>
      <Sidebar show={sidebarOpen} handleClose={() => setSidebarOpen(false)} />

      <Box component="main" sx={{ flex:1, mt:'64px', p:3 }}>
        <Typography variant="h4" gutterBottom>Upcoming Viewings</Typography>

        {/* Filters */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack direction={{ xs:'column', sm:'row' }} spacing={2} mb={2}>
            <TextField
              label="Search name or email"
              size="small"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              sx={{ flex:1 }}
            />

            <FormControl size="small" sx={{ minWidth:160 }}>
              <Select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="deposit">Deposit Paid</MenuItem>
                <MenuItem value="paid">Paid In Full</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth:180 }}>
              <Select
                value={timePreset}
                onChange={e => setTimePreset(e.target.value)}
              >
                <MenuItem value="all">All Upcoming</MenuItem>
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="thisWeek">This Week</MenuItem>
                <MenuItem value="next2Weeks">Next 2 Weeks</MenuItem>
                <MenuItem value="thisMonth">This Month</MenuItem>
                <MenuItem value="thisYear">This Year</MenuItem>
              </Select>
            </FormControl>

            <DatePicker
              label="From Date"
              value={fromDate}
              onChange={setFromDate}
              renderInput={params => <TextField {...params} size="small" />}
            />
            <DatePicker
              label="To Date"
              value={toDate}
              onChange={setToDate}
              renderInput={params => <TextField {...params} size="small" />}
            />
          </Stack>
        </LocalizationProvider>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {['#','Name','Email','Phone','Event','Viewing','Guests','Status', 'Booking Process', 'Delete'].map(h => (
                  <TableCell key={h}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.length
                ? filtered.map((a, idx) => {
                    const dt = toDateTime(a);
                    return (
                      <TableRow key={a.id}>
                        <TableCell>{idx+1}</TableCell>
                        <TableCell>{a.fullName}</TableCell>
                        <TableCell>{a.email}</TableCell>
                        <TableCell>{a.phone}</TableCell>
                        <TableCell>{a.eventType}</TableCell>
                        <TableCell>{format(dt,'yyyy-MM-dd h:mm a')}</TableCell>
                        <TableCell>{a.guests}</TableCell>
                        <TableCell>
                          <FormControl fullWidth size="small">
                            <Select
                              value={a.status}
                              onChange={e => handleStatusChange(a.id,e.target.value)}
                            >
                              <MenuItem value="pending">
                                <Chip label="Pending" color={statusColor('pending')} size="small"/>
                              </MenuItem>
                              <MenuItem value="deposit">
                                <Chip label="Deposit Paid" color={statusColor('deposit')} size="small"/>
                              </MenuItem>
                              <MenuItem value="paid">
                                <Chip label="Paid In Full" color={statusColor('paid')} size="small"/>
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell>
                         <Button 
                            className='complete-btn'
                           size="small"
                           variant="outlined"
                           sx={{ textTransform:'none' }}
                           onClick={()=>setProcessing(a)}
                         >
                           Complete Booking
                        </Button>
                       </TableCell>
                       <TableCell>
                          <IconButton
                               size="small"
                               onClick={()=>{
                               setToCancel(a);
                               setCancelOpen(true);
                              }}
                            disabled={a.status==='cancelled'}
                            >
                            <DeleteIcon
                               fontSize="small"
                               color={a.status==='cancelled'?'disabled':'error'}
                            />
                     </IconButton>
                    </TableCell>
                     </TableRow>
                    );
                  })
                : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No matching appointments.
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </TableContainer>
      {processing && (
         <AppointmentProcessModal
           open={Boolean(processing)}
           onClose={()=>setProcessing(null)}
           appointment={processing}
           allAppointments={appointments}
           onSave={updated => {
             setAppointments(a => a.map(x => x.id===updated.id ? updated : x));
             setProcessing(null);
           }}
         />
       )}
        {/* Delete Confirmation */}
        <Dialog open={cancelOpen} onClose={()=>setCancelOpen(false)}>
          <DialogTitle >Delete Booking</DialogTitle>
          <DialogContent>
            <Typography className='cancel-text'>
              Are you sure you want to delete booking for <strong>{toCancel?.fullName}</strong> on{' '}
              <strong>
                {toCancel
                  ? format(toDateTime(toCancel), 'yyyy-MM-dd h:mm a')
                  : ''}
              </strong>?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>setCancelOpen(false)}>No</Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleCancelConfirm}
            >
              Yes, Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
