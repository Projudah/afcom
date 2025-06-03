'use client';

import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tabs,
  Tab,
  Paper,
  Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StoreOwnerNavbar from '../../components/store-owner/common/StoreOwnerHeader';
import Sidebar from '../../components/store-owner/common/SideBar';

export default function Communication({ params }) {
  const { id } = params;            // next/router dynamic param
  const theme = useTheme();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab]               = useState(0);
  const [composeOpen, setComposeOpen] = useState(false);
  const [viewOpen, setViewOpen]       = useState(false);

  const [draft, setDraft] = useState({ to: '', subject: '', body: '' });
  const [currentMsg, setCurrentMsg] = useState(null);

  const [sent, setSent] = useState([
    { id: 1, to: 'Jane Smith', ts: '2023-07-12 10:30', body: 'Hi, thanks for reaching out…' },
  ]);
  const [recv, setRecv] = useState([
    { id: 2, from: 'Ada Lovelace', ts: '2023-07-12 09:15', body: 'I’d like to check out your venue.', read: false },
  ]);

  const handleSend = () => {
    setSent(s => [
      { id: Date.now(), to: draft.to, ts: new Date().toLocaleString(), body: draft.body },
      ...s
    ]);
    setDraft({ to: '', subject: '', body: '' });
    setComposeOpen(false);
  };

  const openView = msg => {
    if (tab === 0) {
      setRecv(r => r.map(m =>
        m.id === msg.id
          ? { ...m, read: true }
          : m
      ));
    }
    setCurrentMsg(msg);
    setViewOpen(true);
  };

  const closeDialogs = () => {
    setComposeOpen(false);
    setViewOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Navbar + sidebar toggle */}
      <Box sx={{ position: 'fixed', width: '100%', zIndex: 1000 }}>
        <StoreOwnerNavbar ownerName="Admin" onMenuClick={() => setSidebarOpen(true)} />
      </Box>
      <Sidebar show={sidebarOpen} handleClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          mt: '64px',
          p: 3,
          bgcolor: 'background.default'
        }}
      >
        <Typography variant="h4" gutterBottom>
          Messages (Store ID: {id})
        </Typography>

        <Button
          variant="contained"
          onClick={() => setComposeOpen(true)}
          sx={{
            mb: 2,
            bgcolor: theme.palette.primary.main,
            '&:hover': { bgcolor: theme.palette.primary.dark }
          }}
        >
          Compose Email
        </Button>

        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          textColor="primary"
          indicatorColor="primary"
          sx={{ mb: 2 }}
        >
          <Tab label="Received" />
          <Tab label="Sent" />
        </Tabs>

        <Paper elevation={2} sx={{ p: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date & Time</TableCell>
                <TableCell>{tab === 0 ? 'Sender' : 'Recipient'}</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(tab === 0 ? recv : sent).map(msg => {
                const isUnread = tab === 0 && !msg.read;
                return (
                  <TableRow
                    key={msg.id}
                    hover
                    sx={isUnread ? {
                      bgcolor: theme.palette.primary.light
                    } : {}}
                  >
                    <TableCell>{msg.ts}</TableCell>
                    <TableCell>{tab === 0 ? msg.from : msg.to}</TableCell>
                    <TableCell>
                      {tab === 0
                        ? isUnread
                          ? <Chip label="Unread" color="primary" size="small" />
                          : <Chip label="Read" variant="outlined" color="primary" size="small" />
                        : '—'
                      }
                    </TableCell>
                    <TableCell>
                      <Button size="small" onClick={() => openView(msg)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>

        {/* Compose Dialog */}
        <Dialog open={composeOpen} onClose={closeDialogs} fullWidth maxWidth="sm">
          <DialogTitle sx={{ background: 'linear-gradient(90deg, #0F1C3C, #2F61C2)', color:'#fff' }}>
            Compose Email
            <IconButton onClick={closeDialogs} sx={{ position: 'absolute', right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <TextField
              fullWidth
              label="To"
              value={draft.to}
              onChange={e => setDraft(d => ({ ...d, to: e.target.value }))}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Subject"
              value={draft.subject}
              onChange={e => setDraft(d => ({ ...d, subject: e.target.value }))}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              multiline
              rows={6}
              label="Body"
              value={draft.body}
              onChange={e => setDraft(d => ({ ...d, body: e.target.value }))}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialogs}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSend}
              sx={{
                bgcolor: theme.palette.primary.main,
                '&:hover': { bgcolor: theme.palette.primary.dark }
              }}
            >
              Send
            </Button>
          </DialogActions>
        </Dialog>

        {/* View Message Dialog */}
        <Dialog open={viewOpen} onClose={closeDialogs} fullWidth maxWidth="sm">
          <DialogTitle sx={{ background: 'linear-gradient(90deg, #0F1C3C, #2F61C2)', color:'#fff' }}>
            Message Details
            <IconButton onClick={closeDialogs} sx={{ position: 'absolute', right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {currentMsg && (
              <>
                <Typography sx={{ mb: 1 }}>
                  <strong>Date:</strong> {currentMsg.ts}
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  <strong>{tab === 0 ? 'From:' : 'To:'}</strong> {tab === 0 ? currentMsg.from : currentMsg.to}
                </Typography>
                <Typography>{currentMsg.body}</Typography>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialogs}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
