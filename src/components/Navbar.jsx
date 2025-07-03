import React from 'react';
import {
  Box, Button, Typography
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isAdd = location.pathname === '/add-student';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: { xs: 2, sm: 0 },
        px: { xs: 2, sm: 4 },
        py: 2,
        backgroundColor: '#1976d2',
        color: '#fff',
      }}
    >
      <Typography
        variant="h6"
        fontWeight={600}
        sx={{
          textAlign: { xs: 'center', sm: 'left' },
          width: { xs: '100%', sm: 'auto' }
        }}
      >
        Student Management App
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1, sm: 2 },
          width: { xs: '100%', sm: 'auto' }
        }}
      >
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{
            backgroundColor: isHome ? '#01579b' : '#0288d1',
            borderBottom: isHome ? '3px solid #fff' : 'none',
            '&:hover': {
              backgroundColor: isHome ? '#004d8b' : '#0277bd',
            },
            color: '#fff',
            justifyContent: 'flex-start',
            width: { xs: '100%', sm: 'auto' },
            fontSize: { xs: '0.9rem', sm: '1rem' }, 
            py: { xs: 1, sm: 1.5 }
          }}
        >
          <HomeIcon sx={{ marginRight: 1 }} />
          Home
        </Button>

        <Button
          variant="contained"
          onClick={() => navigate('/add-student')}
          sx={{
            backgroundColor: isAdd ? '#2e7d32' : '#43a047',
            borderBottom: isAdd ? '3px solid #fff' : 'none',
            '&:hover': {
              backgroundColor: isAdd ? '#1b5e20' : '#388e3c',
            },
            color: '#fff',
            justifyContent: 'flex-start',
            width: { xs: '100%', sm: 'auto' },
            fontSize: { xs: '0.9rem', sm: '1rem' }, 
            py: { xs: 1, sm: 1.5 }
          }}
        >
          <AddIcon sx={{ marginRight: 1 }} />
          Add Student
        </Button>
      </Box>
    </Box>
  );
};

export default Navbar;
