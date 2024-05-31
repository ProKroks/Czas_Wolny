import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import Home from './Home';
import EventForm from './EventForm'; // Добавьте импорт компонента формы события
import { theme } from "./AppStyles";

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/add-event" element={<EventForm />} /> {/* Добавьте маршрут для формы события */}
                </Routes>
            </Router>
        </ThemeProvider>
    );
}
