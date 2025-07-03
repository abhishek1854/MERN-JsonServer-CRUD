import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';

const WarningModal = ({ open, onClose, onConfirm, message }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="warning-dialog-title">
      <DialogTitle id="warning-dialog-title">Action Required</DialogTitle>
      <DialogContent sx={{ px: { xs: 1, sm: 3 }, py: { xs: 1, sm: 2 } }}>
        <Typography sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WarningModal;
