import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, Card, CardContent, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, getDocs, query, where, limit } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './Home.css';

const years = [
    { id: 1, name: '1 Rok' },
    { id: 2, name: '2 Rok' },
    { id: 3, name: '3 Rok' },
];

const groups = {
    1: Array.from({ length: 11 }, (_, i) => ({ id: i + 1, name: `Grupa ${i + 1}` })),
    2: Array.from({ length: 8 }, (_, i) => ({ id: i + 1, name: `Grupa ${i + 1}` })),
    3: [
        { id: 'EAiBD1', name: 'EAiBD 1' },
        { id: 'EAiBD2', name: 'EAiBD 2' },
        { id: 'EAiBD3', name: 'EAiBD 3' },
        { id: 'TI1', name: 'TI 1' },
        { id: 'TI2', name: 'TI 2' },
        { id: 'TI3', name: 'TI 3' },
        { id: 'IO1', name: 'IO 1' },
        { id: 'IO2', name: 'IO 2' },
        { id: 'IO3', name: 'IO 3' },
    ],
};

const Home = () => {
    const [activeYear, setActiveYear] = useState(1);
    const [activeGroup, setActiveGroup] = useState(1);
    const [isGroupsOpen, setIsGroupsOpen] = useState(false);
    const [isYearsOpen, setIsYearsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [startMonth] = useState(new Date().getMonth());
    const [startYear] = useState(new Date().getFullYear());
    const [events, setEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const navigate = useNavigate();
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    const fetchEvents = useCallback(async (year, group) => {
        let groupName = '';

        if (year === 1) {
            groupName = `2I ${group}`;
        } else if (year === 2) {
            groupName = `4I ${group}`;
        } else if (year === 3) {
            const match = group.match(/([A-Z]+)(\d+)/);
            if (match) {
                const [, specialty, number] = match;
                groupName = `6I ${specialty} ${number}`;
            }
        }

        const q = query(collection(db, 'tasks'), where('group', '==', groupName));
        const querySnapshot = await getDocs(q);
        const eventsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(eventsList);
    }, [db]);

    const fetchUpcomingEvents = useCallback(async () => {
        const q = query(collection(db, 'tasks'), where('deadline', '>=', new Date()), limit(4));
        const querySnapshot = await getDocs(q);
        const upcomingEventsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return upcomingEventsList;
    }, [db]);

    useEffect(() => {
        const fetchEventsData = async () => {
            fetchEvents(activeYear, activeGroup);
            const upcomingEventsData = await fetchUpcomingEvents();
            setUpcomingEvents(upcomingEventsData);
        };

        fetchEventsData();
    }, [activeYear, activeGroup, fetchEvents, fetchUpcomingEvents]);

    const today = new Date();
    const isToday = (year, month, day) => {
        return year === today.getFullYear() && month === today.getMonth() && day === today.getDate();
    };

    const handleYearClick = (id) => {
        if (id === activeYear) {
            setIsYearsOpen(!isYearsOpen);
        } else {
            setActiveYear(id);
            setIsYearsOpen(false);
            setActiveGroup(groups[id][0].id);
            fetchEvents(id, groups[id][0].id);
        }
    };

    const handleGroupClick = (id) => {
        if (id === activeGroup) {
            setIsGroupsOpen(!isGroupsOpen);
        } else {
            setActiveGroup(id);
            setIsGroupsOpen(false);
            fetchEvents(activeYear, id);
        }
    };

    const generateCalendarCells = (year, month) => {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfWeek = new Date(year, month, 1).getDay(); // Воскресенье = 0, Понедельник = 1, и т.д.

        let cells = [];
        for (let i = 0; i < (firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1); i++) { // Сдвигаем, если воскресенье
            cells.push(<div className="calendar-cell empty" key={`empty-${i}`}></div>);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const eventForDay = events.find(event => {
                const eventDate = new Date(event.deadline.seconds * 1000);
                return eventDate.getDate() === day && eventDate.getMonth() === month && eventDate.getFullYear() === year;
            });

            const isTodayClass = isToday(year, month, day) ? 'today' : '';
            const eventClass = eventForDay ? 'event' : '';

            cells.push(
                <div
                    className={`calendar-cell ${isTodayClass} ${eventClass}`}
                    key={day}
                    onClick={() => eventForDay && alert(`Szczegóły: ${eventForDay.title}\nOpis: ${eventForDay.description}\nGrupa: ${eventForDay.group}\nCzas: ${new Date(eventForDay.deadline.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`)}
                >
                    {day}
                </div>
            );
        }
        return cells;
    };

    const handleAddEvent = () => {
        navigate('/add-event');
    };

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

    const handleLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            navigate('/login'); // Redirect to the login page
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const monthNames = [
        'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
        'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
    ];

    const dayNames = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'];

    return (
        <Box className="outer-container">
            <Box className="home" sx={{ padding: '20px' }}>
                <Box className="account-info">
                    <Typography variant="body1">
                        {user.email}
                    </Typography>
                    <Button variant="contained" onClick={handleLogout}>
                        Wyloguj się
                    </Button>
                </Box>
                <Box className="year-and-group">
                    <Box className="year-container">
                        <Button
                            variant="contained"
                            onClick={() => handleYearClick(activeYear)}
                            className="year-button"
                        >
                            {years.find(year => year.id === activeYear).name}
                        </Button>
                        {isYearsOpen && (
                            <Box className="year-list">
                                {years.filter(year => year.id !== activeYear).map(year => (
                                    <Button
                                        key={year.id}
                                        onClick={() => handleYearClick(year.id)}
                                        className="year-item"
                                    >
                                        {year.name}
                                    </Button>
                                ))}
                            </Box>
                        )}
                    </Box>
                    <Box className="group-container">
                        <Button
                            variant="contained"
                            onClick={() => handleGroupClick(activeGroup)}
                            className="group-button"
                        >
                            {groups[activeYear].find(group => group.id === activeGroup).name}
                        </Button>
                        {isGroupsOpen && (
                            <Box className="group-list">
                                {groups[activeYear].filter(group => group.id !== activeGroup).map(group => (
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
                </Box>
                <Card className="events-card">
                    <CardContent>
                        <Typography variant="h6" component="div" className="events-title">
                            Wydarzenia
                        </Typography>
                        {upcomingEvents.length === 0 ? (
                            <Typography className="event-item">
                                Brak nadchodzących wydarzeń
                            </Typography>
                        ) : (
                            upcomingEvents.map(event => (
                                <Typography key={event.id} className="event-item">
                                    {`${event.title}, ${event.description}, Grupa ${event.group}, ${new Date(event.deadline.seconds * 1000).toLocaleDateString()} ${new Date(event.deadline.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                                </Typography>
                            ))
                        )}
                    </CardContent>
                </Card>
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
                    <Box className="day-names">
                        {dayNames.map((day, index) => (
                            <Typography key={index} variant="body2" className="day-name">
                                {day}
                            </Typography>
                        ))}
                    </Box>
                    <Box className="calendar-grid">
                        {generateCalendarCells(currentYear, currentMonth)}
                    </Box>
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

