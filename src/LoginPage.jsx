import * as React from 'react';
import {useState, useEffect} from 'react';
import {Container, Box, Paper, Typography, FormControl, TextField, Button, Link} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {theme, buttonFormsStyle} from "./AppStyles";
import {ThemeProvider} from "@mui/material/styles";
import logo from './Logo.jpg';

const validatePassword = (password: string) => {
    return password.length >= 3;
};

const validateEmail = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
};
export default function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = () => {
        if (isFormValid) {
            navigate('/home');
        }
    };
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const minLength = 3;
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
                        mx: 'auto', // margin left & right
                        my: 25, // margin top & bottom
                        py: 3, // padding top & bottom
                        px: 2, // padding left & right
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
                    <Typography variant="h4" component="h1" sx={{fontSize: '2rem'}}>
                        Welcome in IDEMIA!
                    </Typography>
                    <Typography variant="body2">Sign in to continue.</Typography>
                    <FormControl error={!!emailError}>
                        <TextField
                            sx={{fontFamily: 'Montserrat', borderRadius: '20px'}}
                            error={!!emailError}
                            helperText={!!emailError ? emailError : ''}
                            name="email"
                            label="Email"
                            type="email"
                            size="small"
                            InputProps={{style: {borderRadius: '20px'}}}
                            placeholder="user@gmail.com"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </FormControl>
                    <FormControl error={!!passwordError}>
                        <TextField
                            sx={{fontFamily: 'Montserrat', borderRadius: '2rem'}}
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
                    <Button sx={buttonFormsStyle} onClick={handleLogin} disabled={!isFormValid}>
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
                        Don't have an account? <Link href="https://www.wp.pl">Sign up</Link>
                    </Typography>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}