import './options.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import theme from 'app/theme'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const App: React.FC<{}> = () => {
    return (
        <Box mx="10%" my="2%">
            <Typography variant="body1">Hello Farabi</Typography>
        </Box>
    )
}

const rootElement = document.createElement('div')
document.body.append(rootElement)

const root = ReactDOM.createRoot(rootElement)
root.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
)
