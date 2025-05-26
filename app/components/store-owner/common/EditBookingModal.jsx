// components/EditBookingModal.jsx
'use client';
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Box,
  Typography,
  Alert,
  FormControl
} from '@mui/material';
import {
  LocalizationProvider,
  DatePicker,
  TimePicker
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { parseISO } from 'date-fns';
import '../../../styles/bookingModal.css';

const steps = ['Details','Schedule Viewing','Confirm'];

export default function EditBookingModal({
  booking,
  open,
  onClose,
  onSave,
  existingEnquiries = []
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState({ ...booking });

  // Step 0 fields
  const [conflictStart, setConflictStart] = useState(false);
  const [conflictEnd,   setConflictEnd]   = useState(false);

  // Step 1 (viewing) fields
  const [viewDate, setViewDate] = useState(
    booking.viewingDate
      ? parseISO(`${booking.viewingDate}T00:00`)
      : null
  );
  const [viewTime, setViewTime] = useState(
    booking.viewingTime
      ? parseISO(`${booking.viewingDate}T${booking.viewingTime}`)
      : null
  );
  const [conflictViewing, setConflictViewing] = useState(false);

  // --- detect conflicts on Step 0 for start/end ---
  useEffect(() => {
    if (activeStep === 0 && data.start && data.end) {
      const s = parseISO(data.start);
      const e = parseISO(data.end);

      let cs = false, ce = false;
      existingEnquiries.forEach(ex => {
        if (ex.id === booking.id) return;
        const es = parseISO(ex.start);
        const ee = parseISO(ex.end);

        // overlap if s < ee && s >= es  OR  e > es && e <= ee  OR  s <= es && e >= ee
        if (s < ee && s >= es) cs = true;
        if (e > es && e <= ee)   ce = true;
        if (s <= es && e >= ee)  { cs = true; ce = true; }
      });

      setConflictStart(cs);
      setConflictEnd(ce);
    } else {
      setConflictStart(false);
      setConflictEnd(false);
    }
  }, [activeStep, data.start, data.end, booking.id, existingEnquiries]);

  // --- detect conflicts on Step 1 for viewing slot ---
  useEffect(() => {
    if (activeStep === 1 && viewDate && viewTime) {
      const selected = new Date(
        viewDate.getFullYear(), viewDate.getMonth(), viewDate.getDate(),
        viewTime.getHours(), viewTime.getMinutes()
      );
      const conflict = existingEnquiries.some(ex => {
        if (ex.id === booking.id) return false;
        const es = parseISO(ex.start);
        const ee = parseISO(ex.end);
        return selected >= es && selected <= ee;
      });
      setConflictViewing(conflict);
    } else {
      setConflictViewing(false);
    }
  }, [activeStep, viewDate, viewTime, booking.id, existingEnquiries]);

  const next = () => {
    if (activeStep === 1) {
      const isoDate = viewDate.toISOString().slice(0,10);
      const hhmm    = viewTime.toTimeString().slice(0,5);
      setData(d => ({
        ...d,
        viewingDate: isoDate,
        viewingTime: hhmm
      }));
    }
    setActiveStep(s => s + 1);
  };
  const back = () => setActiveStep(s => s - 1);
  const confirm = () => { onSave(data); onClose(); };

  // disable Next whenever there's any conflict in the current step
  const stepHasConflict =
    (activeStep === 0 && (conflictStart || conflictEnd)) ||
    (activeStep === 1 && conflictViewing);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ background: 'linear-gradient(90deg, #0F1C3C, #2F61C2)', color:'#fff' }}>Edit Booking Ref: {booking.id}</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ py: 2 }}>
          {steps.map(label => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <Box component="form" sx={{ display: 'grid', gap: 2, mt: 2 }}>
            {['fullName','email','phone','eventType'].map(key => (
              <TextField
                key={key}
                label={{
                  fullName:  'Customer Name',
                  eventType: 'Event Type'
                }[key] || key}
                value={data[key]}
                onChange={e => setData(d => ({ ...d, [key]: e.target.value }))}
                fullWidth margin="dense"
              />
            ))}

            {['start','end'].map(key => (
              <TextField
                key={key}
                label={key === 'start'
                  ? 'Start Date/Time'
                  : 'End Date/Time'
                }
                type="datetime-local"
                value={data[key]}
                onChange={e => setData(d => ({
                  ...d,
                  [key]: e.target.value
                }))}
                InputLabelProps={{ shrink: true }}
                fullWidth margin="dense"
                error={ key==='start' ? conflictStart : conflictEnd }
                helperText={
                  key==='start'
                    ? conflictStart && 'Conflicts with an existing booking'
                    : conflictEnd   && 'Conflicts with an existing booking'
                }
              />
            ))}

            {(conflictStart || conflictEnd) && (
              <Alert severity="error">
                Your requested <strong>{conflictStart ? 'start' : 'end'}</strong> time overlaps another booking.
              </Alert>
            )}

            <TextField
              label="Guests"
              type="number"
              value={data.guests}
              onChange={e => setData(d => ({
                ...d,
                guests: e.target.value
              }))}
              fullWidth margin="dense"
            />
          </Box>
        )}

        {activeStep === 1 && (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ display: 'grid', gap: 2, mt: 2 }}>
              <DatePicker
                label="Viewing Date"
                value={viewDate}
                onChange={setViewDate}
                renderInput={params => (
                  <TextField
                    {...params}
                    fullWidth
                    error={conflictViewing}
                    helperText={conflictViewing && 'Viewing slot conflicts'}
                  />
                )}
              />
              <TimePicker
                label="Viewing Time"
                value={viewTime}
                onChange={setViewTime}
                renderInput={params => (
                  <TextField
                    {...params}
                    fullWidth
                    error={conflictViewing}
                    helperText={conflictViewing && 'Viewing slot conflicts'}
                  />
                )}
              />
            </Box>
            {conflictViewing && (
              <Alert severity="error" sx={{ mt: 2 }}>
                Selected viewing overlaps another booking.
              </Alert>
            )}
          </LocalizationProvider>
        )}

        {activeStep === 2 && (
          <Box sx={{ mt: 2 }}>
            <Typography className='review-details' variant="h6">Review Details:</Typography>
            {Object.entries(data).map(([k,v])=>(
              <Typography key={k} sx={{ mb:1 }}>
                <strong>{k.replace(/([A-Z])/g,' $1')}:</strong> {String(v)}
              </Typography>
            ))}
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {activeStep > 0 && <Button onClick={back}>Back</Button>}
        <Button
          variant="contained"
          onClick={ activeStep < steps.length - 1 ? next : confirm }
          disabled={stepHasConflict}
          sx={{ backgroundColor: '#0422c9;' }}
        >
          {activeStep < steps.length - 1 ? 'Next' : 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
