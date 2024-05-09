import * as React from 'react';
import {ThemeProvider} from '@mui/material/styles';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './LoginPage';
// import HomePage from './HomePage';
import {theme} from "./AppStyles"

export default function App() {

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/home" element={<LoginPage/>}/>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}