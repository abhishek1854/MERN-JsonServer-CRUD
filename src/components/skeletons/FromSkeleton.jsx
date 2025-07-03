import React from 'react';
import {
    Box,
    Skeleton,
    Typography
} from '@mui/material';

const FormSkeleton = () => {
    return (
        <Box sx={{ textAlign: 'center', mt: 4, px: 2 }}>
            <Box
                sx={{
                    width: '100%',
                    minWidth: { xs: '90vw', sm: 0 },
                    maxWidth: 500,
                    mx: 'auto',
                    mt: 4,
                    p: { xs: 2, sm: 3 },
                    borderRadius: 2,
                    boxShadow: 3,
                    bgcolor: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight={600}
                    textAlign="center"
                    sx={{ fontSize: { xs: '1.3rem', sm: '1.5rem' } }}
                >
                    <Skeleton variant="text" width="60%" sx={{ mx: 'auto' }} />
                </Typography>

                <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
                <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 1 }} />

                <Skeleton variant="rectangular" height={40} sx={{ borderRadius: 1 }} />
            </Box>

            <Box
                sx={{
                    mt: 2,
                    color: '#1976d2',
                    borderColor: '#1976d2',
                    px: 2,
                    py: 1,
                    fontSize: { xs: '0.85rem', sm: '1rem' },
                    width: '15%',
                    mx: 'auto',
                }}
            >
                <Skeleton variant="rectangular" height={36} sx={{ borderRadius: 20 }} />
            </Box>
        </Box>
    );
};

export default FormSkeleton;
