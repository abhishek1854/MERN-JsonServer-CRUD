import React from 'react';
import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const HomePageSkeleton = () => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 3,
          mb: 2,
          px: 2,
        }}
      >
        {[1, 2].map((_, i) => (
          <Box
            key={i}
            sx={{
              display: 'flex',
              maxWidth: 180,
              minWidth: 140,
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 1,
              borderRadius: 2,
              boxShadow: 1,
              bgcolor: '#f5f5f5',
            }}
          >
            <Skeleton width="60%" height={24} />
            <Skeleton width="20%" height={32} />
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          overflowX: 'auto',
          mt: 2,
          mb: 2,
          mx: 'auto',
          backgroundColor: '#fff',
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          p: { xs: 2, sm: 3 },
          px: 2,
          width: '100%',
          maxWidth: '1400px',
          minWidth: { xs: '95vw', sm: 0 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
            justifyContent: 'space-between',
            gap: 2,
            mb: 2,
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
              width: '100%',
            }}
          >
            <Skeleton variant="rectangular" height={40} width={250} sx={{ borderRadius: 1 }} />
          </Box>

          <Skeleton variant="rectangular" height={40} width={140} sx={{ borderRadius: 2 }} />
        </Box>

        <Table sx={{ minWidth: 1000, width: '100%' }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
              <TableCell sx={{ width: '30%' }}>
                <Skeleton width="60%" height={30} />
              </TableCell>
              <TableCell sx={{ width: '30%' }}>
                <Skeleton width="auto" height={30} />
              </TableCell>
              <TableCell sx={{ width: '40%' }}>
                <Skeleton width="40%" height={30} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(4)].map((_, i) => (
              <TableRow key={i}>
                <TableCell >
                  <Skeleton width="90%" height={24} />
                </TableCell>
                <TableCell>
                  <Skeleton width="80%" height={24} />
                </TableCell>
                <TableCell sx={{ display: 'flex', gap: 1 }}>
                  <Skeleton variant="rectangular" width={36} height={36} sx={{ borderRadius: 1 }} />
                  <Skeleton variant="rectangular" width={36} height={36} sx={{ borderRadius: 1 }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Box
          sx={{
            display: 'flex',
            justifyContent: { xs: 'center', sm: 'flex-end' },
            mt: 2,
          }}
        >
          <Skeleton variant="rectangular" height={36} width={300} sx={{ borderRadius: 1 }} />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePageSkeleton;
