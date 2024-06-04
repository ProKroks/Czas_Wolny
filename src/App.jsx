import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import Home from './Home';
import SignUp from "./SignUp";
import EventForm from './EventForm'; // Импорт компонента формы события
import ConfirmationPage from './ConfirmationPage'; // Импорт компонента страницы подтверждения
import { theme } from "./AppStyles";


export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/add-event" element={<EventForm />} /> {/* Маршрут для формы события */}
                    <Route path="/confirmation" element={<ConfirmationPage />} /> {/* Маршрут для страницы подтверждения */}
                    <Route path="/login" element={<LoginPage />} /> {/* Маршрут для страницы логина */}
                </Routes>
            </Router>
        </ThemeProvider>
    );
}
