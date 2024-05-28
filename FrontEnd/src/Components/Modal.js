import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const GenericModal = ({ open, handleClose, title, message, actions }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box 
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          {message}
        </Typography>
        <Box sx={{ mt: 2 }}>
          {actions}
        </Box>
      </Box>
    </Modal>
  );
};

export default GenericModal;
