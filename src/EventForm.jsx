// src/components/EventForm.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import './EventForm.css';

const EventForm = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/home');
    };

    return (
        <Box className="event-form">
            <Typography variant="h4" component="h1" sx={{ marginBottom: '20px' }}>
                Nowe wydarzenie
            </Typography>
            <TextField label="Nazwa" variant="outlined" fullWidth margin="normal" />
            <TextField label="Grupa" variant="outlined" fullWidth margin="normal" />
            <TextField label="Opis" variant="outlined" fullWidth margin="normal" />
            <TextField label="Termin/sala" variant="outlined" fullWidth margin="normal" />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <Button variant="contained" onClick={handleBack}>Wróć</Button>
                <Button variant="contained" color="primary">Dodaj</Button>
            </Box>
        </Box>
    );
};

export default EventForm;