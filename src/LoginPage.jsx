import * as React from 'react';
import { useState, useEffect } from 'react';
import { Container, Box, Paper, Typography, FormControl, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { theme, buttonFormsStyle } from "./AppStyles";
import { ThemeProvider } from "@mui/material/styles";
import logo from './Logo.jpg';
import {initializeApp} from "firebase/app";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { Link } from 'react-router-dom';

const firebaseConfig = {
    apiKey: "AIzaSyBVWhM-O4lQmCnxKtik0rS-YTR_ToevCaA",
    authDomain: "czas-wolny-272dd.firebaseapp.com",
    projectId: "czas-wolny-272dd",
    storageBucket: "czas-wolny-272dd.appspot.com",
    messagingSenderId: "930525827801",
    appId: "1:930525827801:web:347d1204d895024a06a4c8",
    measurementId: "G-9DSZW3WWT5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const validatePassword = (password) => {
    return password.length >= 6;
};

const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@(edu\.p\.lodz\.pl|p.lodz\.pl)$/;
    return re.test(String(email).toLowerCase());
}

export default function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/home');
        } catch (error) {
            if (error.code === 'auth/invalid-credential') {
                setPasswordError('Niepoprawne hasło');
            } else {
                console.error(error);
            }
        }
    };

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const minLength = 6;
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setIsFormValid(validateEmail(email) && validatePassword(password));
    }, [email, password]);

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        setEmailError(validateEmail(newEmail) ? '' : 'Niepoprawny adres email');
    };

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        setPasswordError(validatePassword(newPassword) ? '' : `Hasło musi mieć przynajmniej ${minLength} znaków`);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isFormValid) {
            handleLogin(email, password);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container sx={{
                fontSize: '14px',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Paper
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        width: 300,
                        mx: 'auto',
                        my: 25,
                        py: 3,
                        px: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        borderRadius: '8px',
                        boxShadow: 1
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 2,
                        }}
                    >
                        <img
                            src={logo}
                            alt="Company Logo"
                            style={{ height: '64px', borderRadius: '32px' }}
                        />
                    </Box>
                    <Typography variant="h4" align="center" gutterBottom>
                        Witaj w aplikacji Czas Wolny
                    </Typography>
                    <FormControl error={!!emailError}>
                        <TextField
                            sx={{ fontFamily: 'FallingSkyBd', borderRadius: '20px' }}
                            error={!!emailError}
                            helperText={!!emailError ? emailError : ''}
                            name="email"
                            label="Email"
                            type="email"
                            size="small"
                            InputProps={{ style: { borderRadius: '20px' } }}
                            placeholder="user@p.lodz.pl"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </FormControl>
                    <FormControl error={!!passwordError}>
                        <TextField
                            sx={{ fontFamily: 'FallingSkyBd', borderRadius: '2rem' }}
                            error={!!passwordError}
                            helperText={!!passwordError ? passwordError : ''}
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="password"
                            size="small"
                            InputProps={{ style: { borderRadius: '20px' } }}
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </FormControl>
                    <Button sx={buttonFormsStyle} type="submit" disabled={!isFormValid}>
                        Zaloguj się
                    </Button>
                    <Typography
                        fontSize="sm"
                        sx={{
                            alignSelf: 'center',
                            '& a': {
                                color: theme.palette.primary.main,
                                '&:hover': {
                                    color: theme.palette.secondary.main,
                                },
                            },
                        }}
                    >
                    </Typography>
                    <Link to="/signup">Zarejestruj się</Link>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}
