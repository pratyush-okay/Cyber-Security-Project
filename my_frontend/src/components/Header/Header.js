// Header.js
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import './Header.css'; 

const Header = () => {
  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <img
          src="93cf1f47-7d7b-4934-8db4-b89361ac14ad.png"
          alt="Logo"
          style={{ marginRight: '30px' }} 
          className="logo" 
        />
        <Typography variant="h3" className='font_header'>
          find your code vulnerabilities
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
