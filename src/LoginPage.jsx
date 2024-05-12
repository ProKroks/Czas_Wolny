import * as React from 'react';
import {useState, useEffect} from 'react';
import {Container, Box, Paper, Typography, FormControl, TextField, Button, Link} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {theme, buttonFormsStyle} from "./AppStyles";
import {ThemeProvider} from "@mui/material/styles";
import logo from './Logo.jpg';
// import { initializeApp } from "firebase/app";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };
// const app = initializeApp(firebaseConfig);
// const auth = getAuth();
const validatePassword = (password: string) => {
    return password.length >= 6;
};

const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@edu\.p\.lodz\.pl$/;
    return re.test(String(email).toLowerCase());
}
export default function LoginPage() {
    const navigate = useNavigate();
    const handleLogin = async (email: string, password: string) => {
        try {
            // await signInWithEmailAndPassword(auth, email, password);
            navigate('/home');
        } catch (error) {
            console.error(error);
            // Tutaj możesz obsłużyć błędy logowania, np. wyświetlić komunikat o błędzie
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

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        setEmailError(validateEmail(newEmail) ? '' : 'Invalid email address');
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        setPasswordError(validatePassword(newPassword) ? '' : `Password must be at least ${minLength} characters`);
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
                    
                ><Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 2,
                    }}
                ><img
                    src={logo}
                    alt="Company Logo"
                    style={{height: '64px', borderRadius: '32px'}}
                />
                </Box>
                <Typography variant="h4" align="center" gutterBottom>
                        Witaj w aplikacji Czas Wolny
                    </Typography>
                    <FormControl error={!!emailError}>
                        <TextField
                            sx={{fontFamily: 'FallingSkyBd', borderRadius: '20px'}}
                            error={!!emailError}
                            helperText={!!emailError ? emailError : ''}
                            name="email"
                            label="Email"
                            type="email"
                            size="small"
                            InputProps={{style: {borderRadius: '20px'}}}
                            placeholder="Email" 
                            placeholder="user@edu.p.lodz.pl"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </FormControl>
                    <FormControl error={!!passwordError}>
                        <TextField
                            sx={{fontFamily: 'FallingSkyBd', borderRadius: '2rem'}}
                            error={!!passwordError}
                            helperText={!!passwordError ? passwordError : ''}
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="password"
                            size="small"
                            InputProps={{style: {borderRadius: '20px'}}}
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </FormControl>
                    <Button sx={buttonFormsStyle} onClick={() => handleLogin(email, password)} disabled={!isFormValid}>
                    Log in
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
                </Paper>
            </Container>
        </ThemeProvider>
    );
}