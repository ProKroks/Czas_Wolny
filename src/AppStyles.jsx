import {AppBar, Stack, createTheme, IconButton, Box, Toolbar, Typography, Menu, MenuList, MenuItem} from '@mui/material';



export const theme = createTheme({
  palette: {
    primary: {
      main: '#2A78B6',
    },
    secondary: {
      main: '#CDECFE',
    },
    text: {
      primary: '#000000',
      secondary: '#FFFFFF',
    },
  },
  typography: {
    allVariants: { fontFamily: 'FallingSkyBd, FallingSkyBlk' }
  },
});
export const buttonFormsStyle = {
    fontFamily: 'FallingSkyBd',
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
