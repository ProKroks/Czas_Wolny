import * as React from 'react';
import {ThemeProvider} from '@mui/material/styles';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './LoginPage';
import Home from './Home';
import {theme} from "./AppStyles"
import SignUp from "./SignUp";

export default function App() {

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/signup" component={SignUp}/>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/home" element={<Home/>}/>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}