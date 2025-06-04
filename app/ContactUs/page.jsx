'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Divider,
  Stack,
} from '@mui/material';

export default function ContactUs() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    // Add your backend integration or email service call here
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, mb: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Stack spacing={2}>
         <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Button
                onClick={() => router.back()}
                variant="text"
                size="small"
                sx={{
                textTransform: 'none',
                fontSize: '0.85rem',
                pl: 0,
                color: 'primary.main',
                '&:hover': {
                    backgroundColor: 'transparent',
                    textDecoration: 'underline',
                },
                }}
            >
                ← Back
            </Button>
            </Box>

          <Typography variant="h5" gutterBottom>
            Contact Us
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              margin="normal"
              value={form.name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              margin="normal"
              value={form.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Subject"
              name="subject"
              margin="normal"
              value={form.subject}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Message"
              name="message"
              multiline
              rows={4}
              margin="normal"
              value={form.message}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Send Message
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              📍 Our Office
            </Typography>
            <Typography>Remote</Typography>

            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              📞 Phone
            </Typography>
            <Typography>+234 801 234 5678</Typography>

            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              ✉️ Email
            </Typography>
            <Typography>bookjare26@gmail.com</Typography>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
