'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CustomNavbar from '../components/HomeNavbar';
import { sampleBlogPosts } from '../data/sampleBlogPost';

export default function BlogPage() {
  const theme = useTheme();
  const [blogPosts, setBlogPosts] = useState(sampleBlogPosts);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    author: '',
    organization: '',
    date: '',
    image: null,
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewBlog(prev => ({
      ...prev,
      [name]: value,
      date: new Date().toISOString()
    }));
  };

  const handleImageUpload = e => {
    setNewBlog(prev => ({
      ...prev,
      image: URL.createObjectURL(e.target.files[0])
    }));
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    setBlogPosts(prev => [{ ...newBlog }, ...prev]);
    setShowModal(false);
    setNewBlog({
      title: '',
      content: '',
      author: '',
      organization: '',
      date: '',
      image: null,
    });
  };

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
      <CustomNavbar />

      <Box sx={{ px: 3, py: 4 }}>
        <Grid container spacing={4}>
          {/* Sidebar */}
          <Grid item md={3}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                label="Search blogs"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                sx={{ mb: 2 }}
              />

              <Typography variant="h6">Recent Posts</Typography>
              <ul>
                {blogPosts.slice(0, 5).map((post, i) => (
                  <li key={i}>
                    <Link href={`/blog/${i}`} passHref>
                      <Typography component="a">{post.title}</Typography>
                    </Link>
                  </li>
                ))}
              </ul>

              <Typography variant="h6">Popular Posts</Typography>
              <ul>
                {blogPosts.slice(0, 5).map((post, i) => (
                  <li key={i}>
                    <Link href={`/blog/${i}`} passHref>
                      <Typography component="a">{post.title}</Typography>
                    </Link>
                  </li>
                ))}
              </ul>
            </Paper>
          </Grid>

          {/* Blog Posts */}
          <Grid item md={9}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                mb: 3,
                bgcolor: theme.palette.primary.main,
                '&:hover': { bgcolor: theme.palette.primary.dark }
              }}
              onClick={() => setShowModal(true)}
            >
              Create Blog Post
            </Button>

            <Grid container spacing={2}>
              {filteredPosts.map((post, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {post.image && (
                      <CardMedia
                        component="img"
                        height="120"
                        image={post.image}
                        alt={post.title}
                      />
                    )}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        {post.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {post.author} | {post.organization} |{' '}
                        {new Date(post.date).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {post.content.slice(0, 100)}...
                      </Typography>
                    </CardContent>
                    <Box sx={{ p: 1 }}>
                      <Link href={`/blog/${index}`} passHref>
                        <Button size="small" component="a">
                          Read More
                        </Button>
                      </Link>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Create Blog Modal */}
      <Dialog open={showModal} onClose={() => setShowModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>Create Blog Post</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            label="Title"
            name="title"
            fullWidth
            value={newBlog.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            label="Author"
            name="author"
            fullWidth
            value={newBlog.author}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            label="Organization"
            name="organization"
            fullWidth
            value={newBlog.organization}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            label="Content"
            name="content"
            fullWidth
            multiline
            rows={4}
            value={newBlog.content}
            onChange={handleInputChange}
          />
          <Button component="label" sx={{ mt: 2 }}>
            Upload Image
            <input hidden accept="image/*" type="file" onChange={handleImageUpload} />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
          <Button onClick={handleFormSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
