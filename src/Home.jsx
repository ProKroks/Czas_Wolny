import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './Home.css';

// Definicja grup
const groups = [
    { id: 1, name: 'Grupa 1' },
    { id: 2, name: 'Grupa 2' },
    { id: 3, name: 'Grupa 3' },
    { id: 4, name: 'Grupa 4' },
    { id: 5, name: 'Grupa 5' },
    { id: 6, name: 'Grupa 6' },
];

const Home = () => {
    const [activeGroup, setActiveGroup] = useState(1); // Stan aktywnej grupy
    const [isGroupsOpen, setIsGroupsOpen] = useState(false); // Stan rozwinięcia listy grup
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // Bieżący miesiąc
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // Bieżący rok
    const [startMonth] = useState(new Date().getMonth()); // Miesiąc początkowy
    const [startYear] = useState(new Date().getFullYear()); // Rok początkowy
    const navigate = useNavigate();

    // Funkcja sprawdzająca czy dana data to dzisiaj
    const today = new Date();
    const isToday = (year, month, day) => {
        return year === today.getFullYear() && month === today.getMonth() && day === today.getDate();
    };

    // Funkcja obsługująca kliknięcie w grupę
    const handleGroupClick = (id) => {
        if (id === activeGroup) {
            setIsGroupsOpen(!isGroupsOpen);
        } else {
            setActiveGroup(id);
            setIsGroupsOpen(false);
        }
    };

    // Funkcja generująca komórki kalendarza
    const generateCalendarCells = (year, month) => {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfWeek = new Date(year, month, 1).getDay(); // Wartość dnia tygodnia (Niedziela = 0, Poniedziałek = 1, itd.)

        let cells = [];
        // Dodanie pustych komórek, aby wyrównać początek miesiąca
        for (let i = 0; i < (firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1); i++) { // Sunięcie, jeśli niedziela
            cells.push(<div className="calendar-cell empty" key={`empty-${i}`}></div>);
        }
        // Dodanie komórek dni miesiąca
        for (let day = 1; day <= daysInMonth; day++) {
            cells.push(
                <div
                    className={`calendar-cell ${isToday(year, month, day) ? 'today' : ''}`}
                    key={day}
                >
                    {day}
                </div>
            );
        }
        return cells;
    };

    // Funkcja obsługująca kliknięcie przycisku dodania wydarzenia
    const handleAddEvent = () => {
        navigate('/add-event');
    };

    // Funkcja obsługująca przejście do następnego miesiąca
    const handleNextMonth = () => {
        if (currentYear > startYear || currentMonth < startMonth + 2) {
            if (currentMonth === 11) {
                setCurrentMonth(0);
                setCurrentYear(currentYear + 1);
            } else {
                setCurrentMonth(currentMonth + 1);
            }
        }
    };

    // Funkcja obsługująca przejście do poprzedniego miesiąca
    const handlePreviousMonth = () => {
        if (currentYear > startYear || currentMonth > startMonth) {
            if (currentMonth === 0) {
                setCurrentMonth(11);
                setCurrentYear(currentYear - 1);
            } else {
                setCurrentMonth(currentMonth - 1);
            }
        }
    };

    // Nazwy miesięcy
    const monthNames = [
        'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
        'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
    ];

    // Skróty dni tygodnia
    const dayNames = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'];

    return (
        <Box className="outer-container">
            <Box className="home" sx={{ padding: '20px' }}>
                {/* Sekcja grup i wydarzeń */}
                <Box className="group-and-events">
                    <Box className="group-container">
                        <Button
                            variant="contained"
                            onClick={() => handleGroupClick(activeGroup)}
                            className="group-button"
                        >
                            {groups.find(group => group.id === activeGroup).name}
                        </Button>
                        {isGroupsOpen && (
                            <Box className="group-list">
                                {groups.filter(group => group.id !== activeGroup).map(group => (
                                    <Button
                                        key={group.id}
                                        onClick={() => handleGroupClick(group.id)}
                                        className="group-item"
                                    >
                                        {group.name}
                                    </Button>
                                ))}
                            </Box>
                        )}
                    </Box>
                    <Card className="events-card">
                        <CardContent>
                            <Typography variant="h6" component="div" className="events-title">
                                Wydarzenia
                            </Typography>
                            <Typography className="event-item">
                                Wydarzenie 1
                            </Typography>
                            <Typography className="event-item">
                                Wydarzenie 2
                            </Typography>
                            <Typography className="event-item">
                                Wydarzenie 3
                            </Typography>
                            <Typography className="event-item">
                                Wydarzenie 4
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
                {/* Sekcja kalendarza */}
                <Box className="calendar">
                    <Box className="calendar-header">
                        <IconButton
                            onClick={handlePreviousMonth}
                            disabled={currentYear === startYear && currentMonth === startMonth}
                            className={`calendar-nav ${currentYear === startYear && currentMonth === startMonth ? 'disabled' : ''}`}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h5" component="div" className="calendar-title">
                            {monthNames[currentMonth]} {currentYear}
                        </Typography>
                        <IconButton
                            onClick={handleNextMonth}
                            disabled={currentYear === startYear && currentMonth >= startMonth + 2}
                            className={`calendar-nav ${currentYear === startYear && currentMonth >= startMonth + 2 ? 'disabled' : ''}`}
                        >
                            <ArrowForwardIcon />
                        </IconButton>
                    </Box>
                    {/* Nazwy dni tygodnia */}
                    <Box className="day-names">
                        {dayNames.map((day, index) => (
                            <Typography key={index} variant="body2" className="day-name">
                                {day}
                            </Typography>
                        ))}
                    </Box>
                    {/* Komórki kalendarza */}
                    <Box className="calendar-grid">
                        {generateCalendarCells(currentYear, currentMonth)}
                    </Box>
                    {/* Przycisk dodania wydarzenia */}
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleAddEvent}
                        className="add-event-button"
                    >
                        dodaj wydarzenie
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
