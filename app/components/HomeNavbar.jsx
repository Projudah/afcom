import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Link from 'next/link';
import '../styles/homeNavBar.css';

const Navbar = () => {
  return (
    <AppBar position="static" style={{ background: 'linear-gradient(135deg, #02192F 0%, #064876 100%)' }}>
      <Toolbar className="home-navBar">
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          ZolaConnect
        </Typography>
        <Link href="/" passHref>
          <Button sx={{ color: '#ffffff' }}>Home</Button>
        </Link>
        <Link href="/create-store" passHref>
          <Button sx={{ color: '#ffffff' }}>Create Store</Button>
        </Link>
        <Link href="/browse-stores" passHref>
          <Button sx={{ color: '#ffffff' }}>Browse Stores</Button>
        </Link>
        <Link href="/store-owner/login" passHref>
          <Button sx={{ color: '#ffffff' }}>Store Owner</Button>
        </Link>
        <Link href="/blog" passHref>
          <Button sx={{ color: '#ffffff' }}>Blog</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;