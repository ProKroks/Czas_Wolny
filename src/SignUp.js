import * as React from 'react';
import {useState, useEffect} from 'react';
import {Container, Box, Paper, Typography, FormControl, TextField, Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {theme, buttonFormsStyle} from "./AppStyles";
import {ThemeProvider} from "@mui/material/styles";
import logo from './Logo.jpg';
import {initializeApp} from "firebase/app";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";


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

const validatePassword = (password: string) => {
    return password.length >= 6;
};

const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@edu\.p\.lodz\.pl$/;
    return re.test(String(email).toLowerCase());
}

export default function SignUp() {
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [hasUserStartedTypingConfirmPassword, setHasUserStartedTypingConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const handlePasswordConfirmChange = (event) => {
        setHasUserStartedTypingConfirmPassword(true);
        setPasswordConfirm(event.target.value);
    };
    const handleSignUp = async (email, password) => {
        if (password !== passwordConfirm) {
            alert('Hasła nie są takie same');
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);

            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const minLength = 6;
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setIsFormValid(emailError === '' && passwordError === '' && email !== '' && password !== '');
    }, [emailError, passwordError, email, password]);
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
                            style={{height: '64px', borderRadius: '32px'}}
                        />
                    </Box>
                    <Typography variant="h4" align="center" gutterBottom>
                        Zajerestruj się
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
                    <FormControl error={hasUserStartedTypingConfirmPassword }>
                        <TextField
                            sx={{fontFamily: 'FallingSkyBd', borderRadius: '2rem'}}
                            rror={hasUserStartedTypingConfirmPassword && !!passwordError}
                            helperText={hasUserStartedTypingConfirmPassword && !!passwordError ? passwordError : ''}
                            label="Potwierdź hasło"
                            name="passwordConfirm"
                            type="password"
                            placeholder="potwierdź hasło"
                            size="small"
                            InputProps={{style: {borderRadius: '20px'}}}
                            value={passwordConfirm}
                            onChange={handlePasswordConfirmChange}
                        />
                    </FormControl>
                    <Button sx={buttonFormsStyle} onClick={() => handleSignUp(email, password, passwordConfirm)}
                            disabled={!isFormValid}>
                        Sing Up
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
