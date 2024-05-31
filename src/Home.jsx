import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import './Home.css';

const groups = [
    { id: 1, name: 'Grupa 1' },
    { id: 2, name: 'Grupa 2' },
    { id: 3, name: 'Grupa 3' },
    { id: 4, name: 'Grupa 4' },
    { id: 5, name: 'Grupa 5' },
    { id: 6, name: 'Grupa 6' },
];

const Home = () => {
    const [activeGroup, setActiveGroup] = useState(1);
    const [isGroupsOpen, setIsGroupsOpen] = useState(false);
    const navigate = useNavigate();

    const handleGroupClick = (id) => {
        if (id === activeGroup) {
            setIsGroupsOpen(!isGroupsOpen);
        } else {
            setActiveGroup(id);
            setIsGroupsOpen(false);
        }
    };

    const generateCalendarCells = () => {
        const daysInMonth = 31;
        const firstDayOfWeek = 1;

        let cells = [];
        for (let i = 0; i < firstDayOfWeek; i++) {
            cells.push(<div className="calendar-cell empty" key={`empty-${i}`}></div>);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            cells.push(<div className="calendar-cell" key={day}>{day}</div>);
        }
        return cells;
    };

    const handleAddEvent = () => {
        navigate('/add-event');
    };

    return (
        <Box className="home" sx={{ padding: '20px' }}>
            <Typography variant="h4" component="h1" sx={{ marginBottom: '20px', color: '#fff' }}>
                Ustalenie terminów
            </Typography>
            <Box className="group-and-events" sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <Box className="group-container" sx={{ position: 'relative', marginRight: '20px' }}>
                    <Button
                        variant="contained"
                        onClick={() => handleGroupClick(activeGroup)}
                        sx={{ backgroundColor: '#fff', color: '#000', borderRadius: '5px' }}
                    >
                        {groups.find(group => group.id === activeGroup).name}
                    </Button>
                    {isGroupsOpen && (
                        <Box className="group-list">
                            {groups.filter(group => group.id !== activeGroup).map(group => (
                                <Button
                                    key={group.id}
                                    onClick={() => handleGroupClick(group.id)}
                                    sx={{ display: 'block', width: '100%', padding: '10px', textAlign: 'left', color: '#000' }}
                                >
                                    {group.name}
                                </Button>
                            ))}
                        </Box>
                    )}
                </Box>
                <Card sx={{ minWidth: 275, borderRadius: '5px' }}>
                    <CardContent>
                        <Typography variant="h6" component="div">
                            Wydarzenia
                        </Typography>
                        <Typography sx={{ mb: 1.5 }}>
                            Wydarzenie 1
                        </Typography>
                        <Typography sx={{ mb: 1.5 }}>
                            Wydarzenie 2
                        </Typography>
                        <Typography sx={{ mb: 1.5 }}>
                            Wydarzenie 3
                        </Typography>
                        <Typography sx={{ mb: 1.5 }}>
                            Wydarzenie 4
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
            <Box className="calendar" sx={{ position: 'relative', backgroundColor: '#fff', color: '#000', padding: '20px', borderRadius: '10px' }}>
                <Typography variant="h5" component="div" sx={{ marginBottom: '20px' }}>
                    Styczeń 2024
                </Typography>
                <Box className="calendar-grid" sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
                    {generateCalendarCells()}
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAddEvent}
                    sx={{ position: 'absolute', top: '10px', right: '10px' }}
                >
                    dodaj wydarzenie
                </Button>
            </Box>
        </Box>
    );
};

export default Home;
