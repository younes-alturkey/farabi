import { createTheme } from '@mui/material/styles'

export const palette = {
    primary: {
        light: '#2CD3D6',
        main: '#1EA3A6',
        dark: '#177678',
        contrastText: '#fff',
    },
    secondary: {
        main: '#2a2d4c',
        light: '#383C64',
        dark: '#1A1C2E',
        contrastText: '#fff',
    },
    error: {
        main: '#f44336',
        light: '#e57373',
        dark: '#d32f2f',
        contrastText: '#fff',
    },
    warning: {
        main: '#ffa726',
        light: '#ffb74d',
        dark: '#f57c00',
        contrastText: '#fff',
    },
    info: {
        main: '#29b6f6',
        light: '#4fc3f7',
        dark: '#0288d1',
        contrastText: '#fff',
    },
    success: {
        main: '#66bb6a',
        light: '#81c784',
        dark: '#388e3c',
        contrastText: '#fff',
    },
}

const theme = createTheme({
    typography: {
        fontFamily: [
            'Changa',
            'Roboto',
            'Helvetica',
            'Arial',
            'sans-serif',
        ].join(','),
    },
    palette,
})

export default theme
