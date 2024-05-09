import {AppBar, Stack, createTheme, IconButton, Box, Toolbar, Typography, Menu, MenuList, MenuItem} from '@mui/material';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from '@mui/icons-material/Menu';
import Button from "@mui/material/Button";
import React,{useState, MouseEvent} from "react";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#430099',
        },
        secondary: {
            main: '#321450',
        },
    },
    typography: {
        allVariants: {fontFamily: 'Montserrat'}
    },
});

export const buttonFormsStyle = {
    fontFamily: 'Montserrat',
    width: '100%',
    height: '36px',
    fontSize: '14px',
    borderRadius: '2rem',
    my: 2,
    boxShadow: 1,
    backgroundColor: '#EFEFEF',
    color: theme.palette.primary.main,
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
    },
};

export const headerButtonStyle = {
    '&:hover': {
        backgroundColor: '#EFEFEF',
        color: theme.palette.primary.main,
    },
}


export function NavBar() {
    const [anchorNav, setAnchorNav] = useState<null | HTMLElement>(null);
    const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorNav(event.currentTarget);
    }
    const closeMenu = () => {
        setAnchorNav(null);
    }
    return (
        <AppBar position='static'
                sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Toolbar sx={{width: '100%', maxWidth: '1920px'}}>
                <IconButton size='large' edge='start' color='inherit' sx={{display: {xs: 'none', md: 'flex'}}}>
                    <AccountCircleIcon sx={{fontSize: '2.4rem'}}/>
                </IconButton>
                <Typography variant='h6' component='div' sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>Full
                    name</Typography>
                <Stack spacing={2} direction='row' sx={{display: {xs: 'none', md: 'flex'}}}>
                    <Button color='inherit' sx={headerButtonStyle}>Reservation</Button>
                    <Button color='inherit' sx={headerButtonStyle}>Change slot</Button>
                    <Button color='inherit' sx={headerButtonStyle}>Release slot</Button>
                    <Button color='inherit' sx={headerButtonStyle}>Logout</Button>
                </Stack>
                <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                    <IconButton size='large' edge='start' color='inherit' onClick={openMenu}>
                        <MenuIcon/>
                    </IconButton>
                    <Menu anchorEl={anchorNav} open={Boolean(anchorNav)} onClose={closeMenu}
                          sx={{display: {xs: 'flex', md: 'none'}}}>
                        <MenuList>
                            <MenuItem>Reservation</MenuItem>
                            <MenuItem>Change slot</MenuItem>
                            <MenuItem>Release slot</MenuItem>
                            <MenuItem>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
                <IconButton size='large' edge='start' color='inherit'
                            sx={{marginLeft: "auto", display: {xs: 'flex', md: 'none'}}}>
                    <AccountCircleIcon sx={{fontSize: '2.4rem'}}/>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}