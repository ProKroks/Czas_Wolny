import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import './EventForm.css';
import logo from './logopl.png'; // Upewnij się, że ścieżka do logotypu jest poprawna

const EventForm = () => {
    const navigate = useNavigate();
    const [eventData, setEventData] = useState({
        nazwa: '',
        grupa: '',
        opis: '',
        termin: ''
    });

    // Funkcja do obsługi zmiany wartości pól formularza
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    // Funkcja do nawigacji do strony głównej
    const handleBack = () => {
        navigate('/home');
    };

    // Funkcja do obsługi wysłania formularza
    const handleSubmit = (e) => {
        e.preventDefault();
        // Zakomentowano wywołanie API do dodawania wydarzenia
        /*
        try {
            const response = await fetch('URL_DO_API', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            });

            if (response.ok) {
                navigate('/confirmation');
            } else {
                console.error('Błąd przy dodawaniu wydarzenia');
            }
        } catch (error) {
            console.error('Wystąpił błąd:', error);
        }
        */
        navigate('/confirmation');
    };

    return (
        <Box className="event-form" component="form" onSubmit={handleSubmit}>
            <img src={logo} alt="Politechnika Łódzka Logo" className="logo" />
            <Typography variant="h4" component="h1" className="form-title">
                Nowe wydarzenie
            </Typography>
            <TextField
                label="Nazwa"
                variant="outlined"
                fullWidth
                margin="normal"
                name="nazwa"
                value={eventData.nazwa}
                onChange={handleChange}
            />
            <TextField
                label="Grupa"
                variant="outlined"
                fullWidth
                margin="normal"
                name="grupa"
                value={eventData.grupa}
                onChange={handleChange}
            />
            <TextField
                label="Opis"
                variant="outlined"
                fullWidth
                margin="normal"
                name="opis"
                value={eventData.opis}
                onChange={handleChange}
            />
            <TextField
                label="Termin/sala"
                variant="outlined"
                fullWidth
                margin="normal"
                name="termin"
                value={eventData.termin}
                onChange={handleChange}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <Button variant="contained" onClick={handleBack}>Wróć</Button>
                <Button variant="contained" color="primary" type="submit">Dodaj</Button>
            </Box>
        </Box>
    );
};

export default EventForm;
