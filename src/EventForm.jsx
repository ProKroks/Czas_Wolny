import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import './EventForm.css';

const EventForm = () => {
    const navigate = useNavigate();
    const [eventData, setEventData] = useState({
        nazwa: '',
        grupa: '',
        opis: '',
        termin: null // Используем null для DateTimePicker
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [isGroupValid, setIsGroupValid] = useState(true);
    const [groupTouched, setGroupTouched] = useState(false);

    const db = getFirestore();

    const validateForm = useCallback(() => {
        const { nazwa, grupa, opis, termin } = eventData;
        const groupPattern1 = /^2I ([1-9]|1[0-1])$/;
        const groupPattern2 = /^4I ([1-8])$/;
        const groupPattern3 = /^6I (EAIBD|TI|IO) ([1-3])$/;

        const isValidGroup = groupPattern1.test(grupa) || groupPattern2.test(grupa) || groupPattern3.test(grupa);
        setIsGroupValid(isValidGroup);

        setIsFormValid(nazwa.trim() !== '' && isValidGroup && opis.trim() !== '' && termin !== null);
    }, [eventData]);

    useEffect(() => {
        validateForm();
    }, [eventData, validateForm]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
        if (name === 'grupa') {
            setGroupTouched(true);
        }
        if (name === 'grupa' && value === '') {
            setGroupTouched(false);
            setIsGroupValid(true); // Reset group validity when the input is empty
        }
    };

    const handleBlur = (e) => {
        if (e.target.name === 'grupa' && eventData.grupa !== '') {
            setGroupTouched(true);
        } else {
            setGroupTouched(false);
        }
    };

    const handleDateChange = (newValue) => {
        setEventData({ ...eventData, termin: newValue });
    };

    const handleBack = () => {
        navigate('/home');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid) {
            try {
                const deadlineTimestamp = Timestamp.fromDate(new Date(eventData.termin));
                await addDoc(collection(db, 'tasks'), {
                    deadline: deadlineTimestamp,
                    description: eventData.opis,
                    group: eventData.grupa,
                    id: uuidv4(),
                    title: eventData.nazwa
                });
                navigate('/confirmation');
            } catch (error) {
                console.error('Error adding document: ', error);
            }
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box className="outer-container">
                <Box className="event-form-container">
                    <Box className="event-form" component="form" onSubmit={handleSubmit}>
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
                            onBlur={handleBlur}
                            error={groupTouched && !isGroupValid}
                            helperText={groupTouched && !isGroupValid ? 'Nieprawidłowy format grupy' : ''}
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
                        <DateTimePicker
                            label="Termin"
                            value={eventData.termin}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            <Button variant="contained" onClick={handleBack}>Wróć</Button>
                            <Button variant="contained" color="primary" type="submit" disabled={!isFormValid}>Dodaj</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </LocalizationProvider>
    );
};

export default EventForm;
