'use client';
import React, { useState, useMemo } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
  Chip,
  Alert,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import { format as formatDateFns, parseISO } from 'date-fns';
import CancelIcon from '@mui/icons-material/Cancel';
import EditBookingModal from '../components/store-owner/common/EditBookingModal';
import StoreOwnerNavbar from '../components/store-owner/common/StoreOwnerHeader';
import Sidebar from '../components/store-owner/common/SideBar';

const initialEnquiries = [
  {
    id: 1,
    fullName: 'Jane Doe',
    email: 'jane@example.com',
    phone: '+234812345678',
    eventType: 'Wedding',
    start: '2025-06-21T10:00',
    end:   '2025-06-21T18:00',
    guests: 150,
    message: 'Please arrange stage backdrop in white & purple. ',
    status: 'pending',    // 'pending' | 'deposit' | 'paid'
  },
  {
    id: 2,
    fullName: 'John Smith',
    email: 'john@example.com',
    phone: '+234812300000',
    eventType: 'Conference',
    start: '2025-06-21T15:00',
    end:   '2025-06-21T17:00',
    guests: 200,
    message: 'Need projector & sound system.',
    status: 'pending',
  },
  // …more…
];

export default function BookingList() {
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMsg, setViewMsg] = useState('');
  const [msgOpen, setMsgOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

      // cancel confirmation
    const [toCancel, setToCancel]   = useState(null);
    const [cancelOpen, setCancelOpen] = useState(false);
  

  // detect conflicts
  const conflicts = useMemo(() => {
    const map = {};
    enquiries.forEach(e => map[e.id] = false);
    enquiries.forEach((a,i) => {
      const aStart = parseISO(a.start), aEnd = parseISO(a.end);
      enquiries.slice(i+1).forEach(b => {
        const bStart = parseISO(b.start), bEnd = parseISO(b.end);
        if (aStart < bEnd && bStart < aEnd) {
          map[a.id] = map[b.id] = true;
        }
      });
    });
    return map;
  }, [enquiries]);

  // apply search/status filter
  const filtered = useMemo(() =>
    enquiries
      .filter(e =>
        e.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(e => statusFilter === 'all' || e.status === statusFilter)
      .sort((a,b) => b.id - a.id)
  , [enquiries, searchTerm, statusFilter]);

  const handleSave = updated => {
    setEnquiries(enqs => enqs.map(e => e.id===updated.id ? updated : e));
    setEditing(null);
  };

  const handleNotify = e => {
    alert(`Notify ${e.fullName} at ${e.email} to reschedule.`);
  };

  const handleCancelConfirm = () => {
    setEnquiries(enqs =>
      enqs.map(e => e.id === toCancel.id
        ? { ...e, status: 'cancelled' }
        : e
      )
    );
    setCancelOpen(false);
  };


  return (
    <Box sx={{ display:'flex', minHeight:'100vh' }}>
      <Box sx={{ position:'fixed', width:'100%', zIndex:1000 }}>
        <StoreOwnerNavbar ownerName="Admin" onMenuClick={()=>setSidebarOpen(true)} />
      </Box>
      <Sidebar show={sidebarOpen} handleClose={()=>setSidebarOpen(false)} />

      <Box component="main" sx={{ flex:1, mt:'64px', p:3 }}>
        <Typography variant="h4" gutterBottom>Booking Enquiries</Typography>

        {/* Search & Status Filter */}
        <Box sx={{ display:'flex', gap:2, mb:2, flexWrap:'wrap' }}>
          <TextField
            size="small"
            placeholder="Search name or email…"
            value={searchTerm}
            onChange={e=>setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            sx={{ flex:1, minWidth:200 }}
          />
          <FormControl size="small" sx={{ minWidth:160 }}>
            <Select
              value={statusFilter}
              onChange={e=>setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="deposit">Deposit Paid</MenuItem>
              <MenuItem value="paid">Paid In Full</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Global conflict alert */}
        {Object.values(conflicts).some(v=>v) && (
          <Alert severity="error" sx={{ mb:2 }}>
            Some bookings have overlapping dates. Please review & reschedule.
          </Alert>
        )}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {[
                  'Name','Email','Phone','Event',
                  'Start','End','Guests','Status','Msg','Edit','Notify'
                ].map(h=>(
                  <TableCell key={h}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map(e => {
                const isConflict = conflicts[e.id];
                return (
                  <TableRow key={e.id} sx={isConflict ? { bgcolor:'#ffe5e5' } : null}>
                    <TableCell>{e.fullName}</TableCell>
                    <TableCell>{e.email}</TableCell>
                    <TableCell>{e.phone}</TableCell>
                    <TableCell>{e.eventType}</TableCell>
                    <TableCell>
                      {formatDateFns(new Date(e.start), 'yyyy-MM-dd h:mm a')}
                    </TableCell>
                    <TableCell>
                      {formatDateFns(new Date(e.end),   'yyyy-MM-dd h:mm a')}
                    </TableCell>
                    <TableCell>{e.guests}</TableCell>
                    <TableCell>
                      <Chip
                        label={e.status}
                        color={ e.status==='pending' ? 'error'
                             : e.status==='deposit' ? 'warning'
                             : 'success' }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={()=>{ setViewMsg(e.message); setMsgOpen(true); }}
                      >
                        <VisibilityIcon sx={{ color:'#0422c9;' }} fontSize="small" />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={()=>setEditing(e)}>
                        <EditIcon sx={{ color:'#0422c9;' }}   fontSize="small" />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      {isConflict && (
                        <IconButton
                          color="error"
                          size="small"
                          onClick={()=>handleNotify(e)}
                        >
                          <NotificationImportantIcon  fontSize="small"/>
                        </IconButton>
                      )}
                    </TableCell>
                     <TableCell>
                          <IconButton
                               size="small"
                               onClick={()=>{
                               setToCancel(e);
                               setCancelOpen(true);
                              }}
                            disabled={e.status==='cancelled'}
                            >
                            <CancelIcon
                               fontSize="small"
                               color={e.status==='cancelled'?'disabled':'error'}
                            />
                     </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* View Message */}
        <Dialog open={msgOpen} onClose={()=>setMsgOpen(false)}>
          <DialogTitle>Customer Message</DialogTitle>
          <DialogContent>
            <Typography>{viewMsg}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>setMsgOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Edit Booking */}
        {editing && (
          <EditBookingModal
            booking={editing}
            open={Boolean(editing)}
            onClose={()=>setEditing(null)}
            onSave={handleSave}
            existingEnquiries={enquiries}
          />
        )}
         {/* Cancel Confirmation */}
                <Dialog open={cancelOpen} onClose={()=>setCancelOpen(false)}>
                  <DialogTitle>Confirm Cancellation</DialogTitle>
                  <DialogContent>
                    <Typography>
                      Are you sure you want to cancel booking for <strong>{toCancel?.fullName}</strong>
                    </Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={()=>setCancelOpen(false)}>No</Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleCancelConfirm}
                    >
                      Yes, Cancel
                    </Button>
                  </DialogActions>
                </Dialog>
      </Box>
    </Box>
  );
}
