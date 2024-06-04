import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import './ConfirmationPage.css';

const ConfirmationPage = () => {
    const navigate = useNavigate();

    // Funkcja do nawigacji do strony głównej
    const handleBack = () => {
        navigate('/home');
    };

    return (
        <Box className="confirmation-container">
            <CheckCircleOutlineIcon className="confirmation-icon" sx={{ fontSize: 150 }} /> {/* Zielona ikona z ptaszkiem */}
            <Typography variant="h4" component="h1" sx={{ marginTop: '20px' }}>
                Wydarzenie zostało dodane!
            </Typography>
            <Button variant="contained" onClick={handleBack} sx={{ marginTop: '20px' }}>
                Wróć do strony głównej
            </Button>
        </Box>
    );
};

export default ConfirmationPage;
