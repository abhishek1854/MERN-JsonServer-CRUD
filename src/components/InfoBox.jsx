import React, {useEffect, useState} from 'react';
import { Box, Typography } from '@mui/material';
import subjects from '../data/subjects';
import localStorageService from '../utils/localStorage';
import { getStudents } from '../utils/jsonServerApis';

const InfoBox = ({students}) => {
  // const [studentCount, setStudentCount] = useState(0);
  const totalStudents = students.length;
  const totalSubjects = subjects.length;

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 2,
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: '1 1 180px',
          maxWidth: 180,
          minWidth: 140,
          backgroundColor: '#e3f2fd',
          px: 2,
          py: 1,
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight={600}
          color="primary"
          sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}
        >
          Students
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontSize: { xs: '1.5rem', sm: '1.8rem' }, fontWeight: 700 }}
        >
          {totalStudents}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: '1 1 180px',
          maxWidth: 180,
          minWidth: 140,
          backgroundColor: '#f1f8e9',
          px: 2,
          py: 1,
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight={600}
          color="success.main"
          sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}
        >
          Subjects
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontSize: { xs: '1.5rem', sm: '1.8rem' }, fontWeight: 700 }}
        >
          {totalSubjects}
        </Typography>
      </Box>
    </Box>
  );
};

export default InfoBox;
