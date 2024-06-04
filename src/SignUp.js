import {Container, Box, Paper, Typography, FormControl, TextField, Button} from '@mui/material';
import {ThemeProvider} from "@mui/material/styles";
import {theme} from "./AppStyles";
import React from "react";
class SignUp extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };



    render() {
        return (
            <ThemeProvider theme={theme}>
                <Container>
                    <Paper>
                        <Box>
                            <Typography variant="h5">Rejestracja</Typography>
                            <form onSubmit={this.handleSubmit}>
                                <FormControl>
                                    <TextField
                                        type="text"
                                        name="username"
                                        onChange={this.handleChange}
                                        label="Nazwa użytkownika"
                                    />
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        type="email"
                                        name="email"
                                        onChange={this.handleChange}
                                        label="Email"
                                    />
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        type="password"
                                        name="password"
                                        onChange={this.handleChange}
                                        label="Hasło"
                                    />
                                </FormControl>
                                <Button type="submit">Zarejestruj się</Button>
                            </form>
                        </Box>
                    </Paper>
                </Container>
            </ThemeProvider>
        );
    }
}
export default SignUp;