import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Box } from '@mui/material';

const Layout = () => {

  return (
    <>
      <Box sx={{
        height: 'fit-content',
        width: '100vw',
        overflow: 'hidden',    
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Navbar />
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;