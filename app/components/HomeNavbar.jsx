import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Link from 'next/link';
import '../styles/homeNavBar.css';

const Navbar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: '#0F1C3C' }}>
      <Toolbar className="home-navBar">
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          ZolaConnect
        </Typography>
        <Link href="/" passHref>
          <Button color="inherit">Home</Button>
        </Link>
        <Link href="/create-store" passHref>
          <Button color="inherit">Create Store</Button>
        </Link>
        <Link href="/browse-stores" passHref>
          <Button color="inherit">Browse Stores</Button>
        </Link>
        <Link href="/store-owner/login" passHref>
          <Button color="inherit">Store Owner</Button>
        </Link>
        <Link href="/blog" passHref>
          <Button color="inherit">Blog</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;